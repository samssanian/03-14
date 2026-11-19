// Cinematic Web Audio API psychological thriller score engine
// Features: Algorithmic dark cathedral Convolver reverb, stereo ping-pong echo,
// lush detuned sub/string pads, generative A-Phrygian/D-minor felt-piano motifs,
// muffled 3:14 AM heartbeat pulse, and rain/air ambience.
// Starts muted by default; smoothly fades in to target volume on first interaction.

class ThrillerAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private reverbNode: ConvolverNode | null = null;
  private delayLeft: DelayNode | null = null;
  private delayRight: DelayNode | null = null;

  private isPlaying = false;
  private userManuallyPaused = false;
  private initialized = false;
  private targetVolume = 0.34;

  private padOscs: OscillatorNode[] = [];
  private lfoOsc: OscillatorNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private motifTimerId: number | null = null;
  private pulseTimerId: number | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();

  // Eerie D-minor / A-Phrygian melodic pool (Hz)
  private readonly scaleNotes = [
    220.0,  // A3
    233.08, // Bb3
    261.63, // C4
    293.66, // D4
    329.63, // E4
    349.23, // F4
    440.0,  // A4
    466.16, // Bb4
    523.25, // C5
  ];

  private motifStep = 0;

  public subscribe(cb: (playing: boolean) => void): () => void {
    this.listeners.add(cb);
    cb(this.isPlaying);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  public getPlayingState(): boolean {
    return this.isPlaying;
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private createDarkHallImpulse(ctx: AudioContext, durationSec = 4.2, decay = 2.6): AudioBuffer {
    const rate = ctx.sampleRate;
    const length = Math.floor(rate * durationSec);
    const impulse = ctx.createBuffer(2, length, rate);

    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      let lp = 0;
      for (let i = 0; i < length; i++) {
        const env = Math.pow(1 - i / length, decay);
        const white = (Math.random() * 2 - 1) * env;
        // Soft low-pass damping so reverb tail sounds warm and ominous, never harsh
        lp = lp * 0.68 + white * 0.32;
        data[i] = lp;
      }
    }
    return impulse;
  }

  private buildScoreGraph(ctx: AudioContext) {
    if (this.initialized) return;
    this.initialized = true;

    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-16, ctx.currentTime);
    compressor.knee.setValueAtTime(18, ctx.currentTime);
    compressor.ratio.setValueAtTime(4, ctx.currentTime);
    compressor.attack.setValueAtTime(0.015, ctx.currentTime);
    compressor.release.setValueAtTime(0.25, ctx.currentTime);
    compressor.connect(ctx.destination);
    this.compressor = compressor;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.connect(compressor);
    this.masterGain = master;

    // Lush algorithmic dark hall reverb
    const reverb = ctx.createConvolver();
    reverb.buffer = this.createDarkHallImpulse(ctx);
    const reverbSend = ctx.createGain();
    reverbSend.gain.setValueAtTime(0.65, ctx.currentTime);
    reverb.connect(reverbSend);
    reverbSend.connect(master);
    this.reverbNode = reverb;

    // Cross-fed stereo echo for haunting piano tails
    const delayL = ctx.createDelay(2.0);
    const delayR = ctx.createDelay(2.0);
    delayL.delayTime.setValueAtTime(0.48, ctx.currentTime);
    delayR.delayTime.setValueAtTime(0.72, ctx.currentTime);

    const fbL = ctx.createGain();
    const fbR = ctx.createGain();
    fbL.gain.setValueAtTime(0.38, ctx.currentTime);
    fbR.gain.setValueAtTime(0.35, ctx.currentTime);

    const echoFilter = ctx.createBiquadFilter();
    echoFilter.type = 'lowpass';
    echoFilter.frequency.setValueAtTime(1100, ctx.currentTime);

    const panL = ctx.createStereoPanner();
    const panR = ctx.createStereoPanner();
    panL.pan.setValueAtTime(-0.55, ctx.currentTime);
    panR.pan.setValueAtTime(0.55, ctx.currentTime);

    delayL.connect(fbL);
    fbL.connect(delayR);
    delayR.connect(fbR);
    fbR.connect(echoFilter);
    echoFilter.connect(delayL);

    delayL.connect(panL);
    delayR.connect(panR);
    panL.connect(reverb);
    panR.connect(reverb);

    this.delayLeft = delayL;
    this.delayRight = delayR;

    // 1) Warm Analog Detuned Sub + String Pad
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(240, ctx.currentTime);
    padFilter.Q.setValueAtTime(1.8, ctx.currentTime);

    const padMaster = ctx.createGain();
    padMaster.gain.setValueAtTime(0.45, ctx.currentTime);
    padFilter.connect(padMaster);
    padMaster.connect(master);
    padMaster.connect(reverb);

    // Slow breathing filter sweep LFO
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.06, ctx.currentTime);
    lfoGain.gain.setValueAtTime(140, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(padFilter.frequency);
    lfo.start();
    this.lfoOsc = lfo;

    const padVoices: Array<{ freq: number; type: OscillatorType; gain: number; pan: number }> = [
      { freq: 55.0, type: 'sine', gain: 0.42, pan: 0 },         // Deep A1 anchor
      { freq: 110.0, type: 'sawtooth', gain: 0.09, pan: -0.35 }, // Warm string left
      { freq: 110.55, type: 'sawtooth', gain: 0.09, pan: 0.35 }, // Detuned string right
      { freq: 164.81, type: 'triangle', gain: 0.11, pan: -0.2 }, // E3 fifth
      { freq: 174.61, type: 'sine', gain: 0.07, pan: 0.25 },     // F3 minor sixth tension
    ];

    padVoices.forEach(({ freq, type, gain, pan }) => {
      const osc = ctx.createOscillator();
      const vGain = ctx.createGain();
      const vPan = ctx.createStereoPanner();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      vGain.gain.setValueAtTime(gain, ctx.currentTime);
      vPan.pan.setValueAtTime(pan, ctx.currentTime);
      osc.connect(vGain);
      vGain.connect(vPan);
      vPan.connect(padFilter);
      osc.start();
      this.padOscs.push(osc);
    });

    // 2) Seamless nocturnal rain & distant wind bed
    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const out = noiseBuffer.getChannelData(ch);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const w = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + w * 0.0555179;
        b1 = 0.99332 * b1 + w * 0.0750759;
        b2 = 0.96900 * b2 + w * 0.1538520;
        b3 = 0.86650 * b3 + w * 0.3104856;
        b4 = 0.55000 * b4 + w * 0.5329522;
        b5 = -0.7616 * b5 - w * 0.0168980;
        out[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.018;
        b6 = w * 0.115926;
      }
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.setValueAtTime(520, ctx.currentTime);
    rainFilter.Q.setValueAtTime(0.65, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.18, ctx.currentTime);

    noise.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(master);
    noise.start();
    this.noiseSource = noise;
  }

  private playFeltPianoNote(freq: number, panValue: number, velocity = 0.16) {
    const ctx = this.ctx;
    if (!ctx || !this.reverbNode || !this.delayLeft || !this.masterGain || !this.isPlaying) return;

    const now = ctx.currentTime;

    // Fundamental + soft octave shimmer for felt-piano timbre
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 2, now);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1650, now);
    filter.frequency.exponentialRampToValueAtTime(340, now + 2.4);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(velocity, now + 0.035);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);

    const o2Gain = ctx.createGain();
    o2Gain.gain.setValueAtTime(0.22, now);

    const panner = ctx.createStereoPanner();
    panner.pan.setValueAtTime(panValue, now);

    osc1.connect(filter);
    osc2.connect(o2Gain);
    o2Gain.connect(filter);
    filter.connect(env);
    env.connect(panner);

    panner.connect(this.masterGain);
    panner.connect(this.reverbNode);
    panner.connect(this.delayLeft);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 3.6);
    osc2.stop(now + 3.6);
  }

  private playSubPulse() {
    const ctx = this.ctx;
    if (!ctx || !this.masterGain || !this.reverbNode || !this.isPlaying) return;

    const now = ctx.currentTime;
    // Soft cinematic muffled heartbeat / clock thump
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(72, now);
    osc.frequency.exponentialRampToValueAtTime(36, now + 0.18);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);
    gain.connect(this.reverbNode);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  private startGenerativeLoop() {
    this.stopGenerativeLoop();

    // Haunting melodic pattern cycling through eerie intervals
    const pattern = [0, 3, 4, 1, 6, 5, 3, 2];
    const playStep = () => {
      if (!this.isPlaying) return;
      const noteIdx = pattern[this.motifStep % pattern.length];
      const freq = this.scaleNotes[noteIdx];
      const pan = ((this.motifStep % 3) - 1) * 0.32;
      const vel = this.motifStep % 4 === 0 ? 0.19 : 0.13;
      this.playFeltPianoNote(freq, pan, vel);

      // Occasional deep harmonic fifth below
      if (this.motifStep % 4 === 0) {
        this.playFeltPianoNote(freq * 0.5, -pan * 0.5, 0.11);
      }

      this.motifStep += 1;
      const nextDelayMs = this.motifStep % 4 === 0 ? 2900 : 1850;
      this.motifTimerId = window.setTimeout(playStep, nextDelayMs);
    };

    // Start first delicate note quickly after fade-in begins
    this.motifTimerId = window.setTimeout(playStep, 450);

    // Subtle 3:14 heartbeat pulse every 2.4s
    this.pulseTimerId = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.playSubPulse();
    }, 2400);
  }

  private stopGenerativeLoop() {
    if (this.motifTimerId !== null) {
      window.clearTimeout(this.motifTimerId);
      this.motifTimerId = null;
    }
    if (this.pulseTimerId !== null) {
      window.clearInterval(this.pulseTimerId);
      this.pulseTimerId = null;
    }
  }

  public startAmbientOnFirstInteraction(): void {
    if (this.userManuallyPaused || this.isPlaying) return;
    this.playAmbient();
  }

  public playAmbient(): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.buildScoreGraph(ctx);
    if (!this.masterGain) return;

    const now = ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), now);
    this.masterGain.gain.linearRampToValueAtTime(this.targetVolume, now + 1.6);

    this.isPlaying = true;
    this.userManuallyPaused = false;
    this.startGenerativeLoop();
    this.notify();
  }

  public pauseAmbient(): void {
    this.stopGenerativeLoop();
    if (!this.ctx || !this.masterGain) {
      this.isPlaying = false;
      this.userManuallyPaused = true;
      this.notify();
      return;
    }
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);

    this.isPlaying = false;
    this.userManuallyPaused = true;
    this.notify();
  }

  public toggleAmbient(): void {
    if (this.isPlaying) {
      this.pauseAmbient();
    } else {
      this.userManuallyPaused = false;
      this.playAmbient();
    }
  }

  public playHoverSfx(): void {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== 'running' || !this.isPlaying) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.06);

    gain.gain.setValueAtTime(0.018, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);

    osc.connect(gain);
    if (this.reverbNode) gain.connect(this.reverbNode);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  public playClickSfx(): void {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(64, now + 0.11);

    gain.gain.setValueAtTime(0.075, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  }

  public playGlitchSfx(): void {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * 0.5);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1600, now);
    bandpass.frequency.exponentialRampToValueAtTime(130, now + 0.48);
    bandpass.Q.setValueAtTime(3.6, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    noise.connect(bandpass);
    bandpass.connect(gain);
    if (this.reverbNode) gain.connect(this.reverbNode);
    gain.connect(ctx.destination);
    noise.start(now);
  }

  public dispose(): void {
    this.stopGenerativeLoop();
    this.padOscs.forEach((o) => {
      try {
        o.stop();
      } catch {
        // ignore
      }
    });
    try {
      this.lfoOsc?.stop();
      this.noiseSource?.stop();
    } catch {
      // ignore
    }
    void this.ctx?.close();
    this.ctx = null;
  }
}

export const audioEngine = new ThrillerAudioEngine();
