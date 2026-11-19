export type Language = 'bn' | 'en';

export interface LocalizedText {
  bn: string;
  en: string;
}

export interface StoryChapter {
  id: string;
  number: string;
  title: LocalizedText;
  timestamp: string;
  location: LocalizedText;
  image: string;
  imageAlt: string;
  quote: LocalizedText;
  paragraphs: {
    bn: string[];
    en: string[];
  };
}

export interface GalleryFrame {
  id: string;
  index: string;
  title: LocalizedText;
  timestamp: LocalizedText;
  caption: LocalizedText;
  image: string;
  imageAlt: string;
}

export const HERO_BACKDROP = {
  image: '/src/assets/images/hero_endless_road_1795079397733.jpg',
  alt: 'Rain-slicked midnight highway curving into dense obsidian fog with distant red taillights',
};

export const UI_COPY = {
  kicker: {
    bn: 'রাত ০৩:১৪ · সাইকোলজিক্যাল থ্রিলার',
    en: '03:14 AM · Psychological Thriller',
  },
  heroSubtitleDefault: {
    bn: 'যেখানে স্মৃতি থেমে যায়, সময় সেখানেই এক অনন্ত চক্রে বাঁধা পড়ে।',
    en: 'Where memory refuses to end, time folds into an endless loop.',
  },
  heroSubtitleLooped: {
    bn: 'তুমি আগেও এখানে এসেছ। ঘড়িটা এখনো ০৩:১৪-তেই আটকে আছে।',
    en: "You've been here before. The clock is still trapped at 03:14.",
  },
  enterCta: {
    bn: 'সময়ের চক্রে প্রবেশ করুন',
    en: 'Enter the Loop',
  },
  scrollToBegin: {
    bn: 'গল্প শুরু করতে নিচে নামুন',
    en: 'Scroll to Begin',
  },
  navStory: {
    bn: 'গল্প',
    en: 'Story',
  },
  navGallery: {
    bn: 'গ্যালারি',
    en: 'Gallery',
  },
  navLoop: {
    bn: 'অসীম চক্র',
    en: 'The Loop',
  },
  restart: {
    bn: 'পুনরায় শুরু',
    en: 'Restart',
  },
  share: {
    bn: 'শেয়ার',
    en: 'Share',
  },
  galleryKicker: {
    bn: 'আর্কাইভ · আটটি স্থিরচিত্র',
    en: 'Archive · Eight Frames',
  },
  galleryHeading: {
    bn: 'স্মৃতির ভগ্নাংশ',
    en: 'MEMORY FRAGMENTS',
  },
  galleryLead: {
    bn: 'রাত ০৩:১৪-এর পর তোলা প্রতিটি ছবিই সেই জায়গার, যেখান থেকে তুমি অনেক আগেই ফিরে এসেছ।',
    en: 'Every photograph taken after 03:14 AM reveals a place you already left behind.',
  },
  galleryModalHint: {
    bn: 'আর্কাইভে ফিরে যেতে ESC চাপুন অথবা বন্ধ করুন।',
    en: 'Press ESC or close to return to the archive.',
  },
  loopEndHeading: {
    bn: 'তুমি কি সত্যিই গল্পের শেষে পৌঁছেছ?',
    en: "You've reached the end. Or have you?",
  },
  loopEndButton: {
    bn: 'শেষ বলে কিছু নেই—আবার শুরু করো',
    en: "You've reached the end. But have you?",
  },
  cycleComplete: {
    bn: 'চক্র সম্পন্ন',
    en: 'Cycle Complete',
  },
  audioOn: {
    bn: 'সাউন্ড চালু',
    en: 'Score On',
  },
  audioMuted: {
    bn: 'নিঃশব্দ',
    en: 'Muted',
  },
  copiedToast: {
    bn: 'লিংক কপি করা হয়েছে।',
    en: 'Link copied to clipboard.',
  },
  sharedToast: {
    bn: 'শেয়ার করা হয়েছে।',
    en: 'Shared the loop.',
  },
};

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'chapter-1',
    number: '01',
    title: {
      bn: 'রাত তিনটা চৌদ্দ',
      en: 'Three Fourteen in the Rain',
    },
    timestamp: '03:14 AM',
    location: {
      bn: 'মিরপুর ফ্লাইওভার',
      en: 'Mirpur Flyover',
    },
    image: '/src/assets/images/story_rainy_intersection_1795079397026.jpg',
    imageAlt: 'Deserted foggy urban intersection at 3 AM with cold cyan streetlight and crimson puddle reflection',
    quote: {
      bn: '“ঘড়ির কাঁটা যখন একই জায়গায় থামে, তখন সময় নয়—মানুষ নিজেকেই হারিয়ে ফেলে।”',
      en: '“When the hands of a clock freeze in place, it is not time that stops—it is the man who dissolves.”',
    },
    paragraphs: {
      bn: [
        'রাস্তা ভেজা, কিন্তু বৃষ্টি কখন থেমেছে তা অরণ্যের মনে নেই। ড্যাশবোর্ডের নীলচে আলোয় ঘড়ির স্ক্রিনে ভাসছে একটাই সময়—০৩:১৪। তিনবার ফ্লাইওভার পার হওয়ার পরও সে দেখল, বাঁ পাশের সবুজ সাইনবোর্ডটা আবার সেই একইভাবে ভেঙে ঝুলে আছে। গাড়ি থামাতে গিয়েও ব্রেকে পা পড়ে না; যেন রাস্তা নিজেই এক গোলকধাঁধার লুপ হয়ে তার চাকা টেনে ধরেছে।',
        'পাশের শূন্য সিটের ওপর একটা পুরোনো ক্যাসেট টেপ পড়ে আছে, যার গায়ে কালো কালির দাগ—লেখা নেই কোনো নাম, শুধু একটি বাক্য: “পিছনে ফিরো না।” রিয়ারভিউ মিররে তাকাতেই বুকটা হিম হয়ে গেল। পেছনের কাঁচের ওপাশে অন্ধকারে কেউ দাঁড়িয়ে আছে—কাঁচের আবছায়ায় সে স্পষ্ট দেখতে পেল নিজেকেই, কিন্তু তার চোখের মণি দুটো নীলচে শিশিরের মতো স্থির।',
        'ফোনে কোনো নেটওয়ার্ক নেই, শুধু স্ক্রিনের এক কোণে শেষ ডায়াল করা নম্বরটি বারবার জ্বলছে আর নিভছে। সে নিজেই নিজেকে কল করেছে—তিন ঘণ্টা আগে, নাকি আগামীকাল রাতে? এখানে সব উত্তর একটি বদ্ধ লুপ এর ভেতর ঘুরপাক খাচ্ছে, আর প্রতিবার ঘড়ি ০৩:১৪ থেকে এক সেকেন্ডও এগোচ্ছে না।',
      ],
      en: [
        'The asphalt glistened with rain, though Aranya could no longer remember when the storm had stopped. On the dashboard, glowing cold cyan in the dark, the digital clock held a single number—03:14 AM. Even after crossing the flyover three times, the same fractured green highway sign hung twisted on his left. His foot pressed the brake, yet the wheels refused to obey, as if the road had coiled into an invisible loop beneath the tires.',
        'On the empty passenger seat lay an unlabelled magnetic cassette stained with black ink. Only one warning was scratched across its shell: “Don’t turn back.” When Aranya glanced into the rearview mirror, his breath turned to ice. Beyond the rain-beaded rear glass, a figure stood motionless in the dark—and in that trembling silhouette, he recognized himself, staring back with pale, unblinking eyes.',
        'His phone showed no signal, only the last dialed number blinking silently in the corner of the screen. He had called his own number—three hours ago, or tomorrow night? Every question inside this city folded into the same sealed loop, while 03:14 AM refused to surrender a single second.',
      ],
    },
  },
  {
    id: 'chapter-2',
    number: '02',
    title: {
      bn: 'ছায়ার করিডোর',
      en: 'Corridor of Shadows',
    },
    timestamp: '03:14 AM',
    location: {
      bn: 'ভবন ০৪ · চতুর্থ তলা',
      en: 'Building 04 · Floor 4',
    },
    image: '/src/assets/images/story_flickering_corridor_1795079399002.jpg',
    imageAlt: 'Dark concrete apartment corridor lit by a failing crimson emergency bulb',
    quote: {
      bn: '“প্রতিটি দরজা খোলার আগেই মনে হয়—ভেতরে আমি আগে থেকেই অপেক্ষা করছিলাম।”',
      en: '“Before any door swings open, a quiet certainty whispers that you were already waiting inside.”',
    },
    paragraphs: {
      bn: [
        'লিফট কাজ করছে না, তাই চারতলার অন্ধকার সিঁড়ি বেয়ে ওঠার সময় অরণ্য নিজের পায়ের শব্দ শুনতে পেল—একটি শব্দ নয়, দুটি। একটি তার নিজের, আরেকটি ঠিক চার ধাপ পেছনে, যেন কেউ তার ছায়ার মতো ঠিক একই ছন্দে পা ফেলছে। লাল ইমার্জেন্সি বাল্বের নিচের কংক্রিট করিডোরটা আজ অস্বাভাবিক সংকীর্ণ মনে হচ্ছে, যেন দেয়ালগুলো আস্তে আস্তে ভেতরের দিকে চেপে আসছে।',
        '৪-বি ফ্ল্যাটের দরজা আগেই ভেজানো ছিল—চাবি লাগাতে হলো না, হালকা চাপ দিতেই সেটি খুলে গেল। ভেতরে ভেজা মাটি আর পুরোনো ম্যাগনেটিক টেপের গন্ধ। টেবিলের ওপর একটি আধখাওয়া চায়ের কাপ এখনো উষ্ণ, আর তার পাশে রাখা ডায়েরির পাতায় তার নিজের হাতের লেখা—কিন্তু তারিখটা আজকের নয়, আগামী সপ্তাহের।',
        'করিডোরের শেষ মাথায় আয়নাটা কুয়াশায় ঝাপসা হয়ে আছে। সামনে গিয়ে হাত দিয়ে মুছতেই সে বুঝল, সে কারও জন্য অপেক্ষা করছে না—সে নিজেই শিকার, আবার শিকারিও নিজেকেই। প্রতিটি নিঃশ্বাস এক অচেনা লুপ হয়ে বারবার এই চার দেয়ালের ভেতর ফিরে আসছে।',
      ],
      en: [
        'The elevator hung dead inside its shaft, so as Aranya climbed the dark concrete stairwell to the fourth floor, he heard his footsteps echo—not one cadence, but two. His own stride, followed exactly four steps behind by someone matching his breath beat for beat. Under the failing crimson emergency bulb, the hallway walls seemed narrower tonight, pressing slowly inward.',
        'The door to Apartment 4B stood unlatched; it yielded at the lightest touch of his palm. Inside lingered the scent of damp plaster and hot magnetic tape. On the desk sat a half-empty cup of tea still releasing faint steam, beside an open notebook written in his own handwriting—yet the date inked at the top belonged to next Tuesday.',
        'At the far end of the corridor, condensation fogged a tall mirror. When he wiped the glass clear with his sleeve, the truth settled coldly in his chest: he was not waiting for an intruder. The pursuer and the hunted were both himself, bound together inside a tightening loop that never released its grip.',
      ],
    },
  },
  {
    id: 'chapter-3',
    number: '03',
    title: {
      bn: 'ভাঙা আয়নার ওপার',
      en: 'Beyond the Fractured Glass',
    },
    timestamp: '03:14 AM',
    location: {
      bn: 'উত্তর জানালা · কাঁচ ০৯',
      en: 'North Window · Pane 09',
    },
    image: '/src/assets/images/story_shattered_reflection_1795079396988.jpg',
    imageAlt: 'Rain-streaked dark window glass showing a ghostly silhouette over blurred cyan and red city lights',
    quote: {
      bn: '“আয়নার কাঁচ যখন ফেটে যায়, তখন ছবি নয়—সত্যটাই দুই ভাগ হয়ে যায়।”',
      en: '“When glass fractures under pressure, it isn’t the reflection that splits—it is the truth.”',
    },
    paragraphs: {
      bn: [
        'জানালার কাঁচে বৃষ্টির ফোঁটাগুলো যেন উল্টো দিকে গড়িয়ে ওপরে উঠছে। বাইরে শহরে কোনো শব্দ নেই—না রিকশার ঘণ্টা, না দূরের ট্রেনের হুইসেল। লাল আর নীলচে নিওনের আবছায়ায় কাঁচের ভেতর এক অবয়ব নড়ে উঠল। অরণ্য হাত তুলল, কিন্তু কাঁচের ওপাশের ছায়াটি হাত তুলল না; সে শুধু ঘাড় ঘুরিয়ে স্থির চোখে তাকিয়ে রইল।',
        'টেপ রেকর্ডারটা নিজে থেকেই চালু হয়ে গেল। শুরুতে শুধু হিশ-হিশ সাদা শব্দ, তারপর এক ভাঙা কণ্ঠস্বর ফিসফিস করে বলল: “তুমি আবার ভুল দরজা দিয়ে ঢুকেছ, অরণ্য। এই লুপ থেকে বেরোনোর কোনো চাবি নেই, কারণ চাবিটা তুমি নিজেই লুকিয়ে ফেলেছ।” কণ্ঠস্বরটা আর কারও নয়—ওটা তার নিজেরই রেকর্ড করা গলা।',
        'কানের কাছে রক্ত জমে ঠান্ডা হয়ে গেল যখন সে টের পেল, পেছনের অন্ধকার কোণে কেউ এখন বসে বসে নিজের ঘড়ির কাঁটা ঘোরাচ্ছে। সে মুখ ফেরাতে ভয় পাচ্ছে, কারণ সে জানে অন্ধকারে বসে আছে নিজেকেই—একজন পুরোনো সংস্করণ, যে এবার আর রাস্তা ছেড়ে দিতে রাজি নয়।',
      ],
      en: [
        'Along the windowpane, raindrops began sliding upward against gravity. Outside, the city lay completely mute—no distant horns, no passing trains, not even wind through the wires. Caught between blurred crimson and cyan city lights, a dim silhouette shifted inside the glass. Aranya raised his right hand, yet the shadow on the pane did not move; it only tilted its head to watch him.',
        'Across the room, the cassette deck clicked on by itself. Through a veil of tape hiss, a cracked voice whispered from the speaker: “You walked through the wrong door again, Aranya. There is no key out of this loop, because you hid it from your own memory.” The voice belonged to no stranger—it was his own recording.',
        'A cold stillness gripped the back of his neck as a faint metallic click sounded from the dark corner behind his chair. Someone was sitting there in the dark, winding an old wristwatch backward. He was terrified to turn around, knowing the man waiting in the shadow was himself—an earlier version who refused to step aside this time.',
      ],
    },
  },
  {
    id: 'chapter-4',
    number: '04',
    title: {
      bn: 'শেষ প্ল্যাটফর্মের শব্দ',
      en: 'Sound from the Last Platform',
    },
    timestamp: '03:14 AM',
    location: {
      bn: 'ভূগর্ভস্থ টার্মিনাল',
      en: 'Sub-Level Terminal',
    },
    image: '/src/assets/images/story_empty_station_1795079397105.jpg',
    imageAlt: 'Desolate underground transit platform wrapped in violet-tinted mist with tracks vanishing into darkness',
    quote: {
      bn: '“সব ট্রেন চলার জন্য আসে না; কিছু ট্রেন শুধু ফিরে যাওয়ার জন্য দাঁড়িয়ে থাকে।”',
      en: '“Not every train arrives to carry you forward; some return only to bring you back to the start.”',
    },
    paragraphs: {
      bn: [
        'দৌড়াতে দৌড়াতে সে যখন মাটির নিচের শূন্য স্টেশনে নামল, তখন বাতাসে এক ভারী বেগুনি কুয়াশা ভাসছে। কংক্রিট পিলারের গায়ের প্রতিটি পোস্টার ছেঁড়া, শুধু একটি ডিজিটাল বোর্ডে লাল অক্ষরে লেখা: “পরবর্তী আগমন: ০৩:১৪।” রেললাইনের ওপার থেকে এক ঠান্ডা বাতাস এসে তার কোটের কলার নাড়াল, যেন টানেলের ভেতর কোনো অদেখা ট্রেন নিঃশ্বাস নিচ্ছে।',
        'প্ল্যাটফর্মের শেষ বেঞ্চের ওপর একটা কাঁচ-ভাঙা হাতঘড়ি পড়ে আছে—কাঁচ ফেটে গেছে, কাঁটা ০৩:১৪-তে আটকে। সে হাতে তুলে নিতেই দেখল, ঘড়ির পেছনের ধাতব ঢাকনায় ছোট করে খোদাই করা তার নিজের নামের আদ্যক্ষর। কতবার সে এখানে এসে এই ঘড়িটা ফেলে গেছে? সময়ের এই অচেনা লুপ কত রাত ধরে তার স্মৃতিগুলো ঘষে ঘষে মুছে দিচ্ছে?',
        'টানেলের ঘোর অন্ধকার থেকে দুটো সাদা হেডলাইট বেরিয়ে এল। কিন্তু ট্রেনের কোনো গর্জন নেই, শুধু বগির কাঁচে একসাথে অসংখ্য মুখ—সবাই তার মতো দেখতে, সবাই একযোগে তাকিয়ে আছে নিজেকেই, যেন সবাই একটি সত্য উচ্চারণের জন্য অপেক্ষা করছে।',
      ],
      en: [
        'Breathless, Aranya descended into the deserted underground station where a bruised violet haze hung beneath fluorescent hums. Every poster along the concrete pillars hung shredded, save for one departure board glowing in blood red: “NEXT ARRIVAL: 03:14.” A cold draft swept out from the black mouth of the tunnel, as though an unseen locomotive were breathing in the dark.',
        'On the last steel bench rested a shattered wristwatch—its crystal cracked in a spiderweb, its hands locked at 03:14. When he lifted it, the tarnished metal back bore his own engraved initials. How many nights had he stood on this exact platform and dropped that same watch? How long had this quiet loop been erasing his footsteps and rewriting the hour?',
        'Twin white headlights pierced the darkness of the tunnel. Yet no steel thunder shook the rails—only rows of silent carriage windows gliding past, each frame filled with familiar faces looking back at himself, waiting for him to speak the truth he kept forgetting.',
      ],
    },
  },
  {
    id: 'chapter-5',
    number: '05',
    title: {
      bn: 'প্রথম সূর্যের আগেই',
      en: 'Before the First Dawn',
    },
    timestamp: '03:14 AM',
    location: {
      bn: 'অনন্ত বাঁক',
      en: 'The Endless Curve',
    },
    image: '/src/assets/images/story_crimson_horizon_1795079397074.jpg',
    imageAlt: 'Surreal curved night highway with glowing crimson reflectors bending endlessly into obsidian fog',
    quote: {
      bn: '“শেষ বলে কিছু নেই; প্রতিটি শেষই এক নতুন শুরুর ছদ্মবেশ।”',
      en: '“Nothing truly ends here; every finale is only the beginning wearing a darker disguise.”',
    },
    paragraphs: {
      bn: [
        'স্টেশন থেকে বেরিয়ে সে আবার সেই ভেজা হাইওয়ের মাথায় এসে দাঁড়াল। আকাশের কোণে একটু নীলচে আভা দেখা যাচ্ছে, কিন্তু সূর্য উঠছে না। রাস্তার মাঝখানের লাল রিফ্লেক্টরগুলো যেন রক্তের বিন্দুর মতো এক বিশাল বৃত্তের দিকে বেঁকে গেছে—যে বৃত্তের শুরু আর শেষ একই বিন্দুতে মিশে আছে।',
        'অরণ্য বুঝতে পারল, সে কখনোই গাড়ি থেকে নামেনি, আবার কখনোই বাড়ি ফিরে যায়নি। এই পুরো শহরটা, এই বৃষ্টি, এই রাত ০৩:১৪—সবকিছুই তার নিজের ভুলের এক অবিশ্বাস্য লুপ। যে মুহূর্তে সে ভাবে সব শেষ, ঠিক সেই মুহূর্তে পেছনের হেডলাইট আবার জ্বলে ওঠে।',
        'হাতের মুঠোয় পুরোনো চাবিটা চেপে ধরে সে আবার গাড়ির দরজা খুলল। ড্যাশবোর্ডের নীলচে আলোয় স্ক্রিন আবার জ্বলে উঠল: ০৩:১৪। রিয়ারভিউ মিররে সে স্পষ্ট দেখতে পেল নিজেকেই—ক্লান্ত, চোখে অচেনা হাসি, আর হাতের শিরাগুলো এখনো কাঁচের ওপর লেখার মতো কাঁপছে। গাড়ি স্টার্ট হলো। চাকা ঘুরছে। আবার।',
      ],
      en: [
        'Emerging back onto the surface, he found himself standing at the mouth of the same rain-slicked highway. A faint cyan glow bruised the distant horizon, yet dawn never broke. Down the centerline, crimson road reflectors curved into an impossible arc—a vast circle whose ending folded silently back into its origin.',
        'At last Aranya understood: he had never stepped out of the car, and he had never made it home. The empty city, the cold rain, the frozen 03:14 AM—all of it was a memory built into an unbroken loop of his own making. The moment he believed the night had ended, twin headlights flared behind him once more.',
        'Clenching the cold ignition key in his palm, he pulled open the driver’s door. On the dark dashboard, the clock flickered back to life: 03:14 AM. Looking into the rearview mirror, he met the tired, knowing gaze of himself—his fingers still trembling on the wheel. The engine turned over. The road unspooled ahead. Again.',
      ],
    },
  },
];

export const GALLERY_FRAMES: GalleryFrame[] = [
  {
    id: 'frame-01',
    index: '01',
    title: { bn: 'স্থির ঘড়ি', en: 'Frozen Dial' },
    timestamp: { bn: '০৩:১৪ · নিদর্শন ক', en: '03:14 AM · Artifact A' },
    caption: {
      bn: 'কাঁচ ভেঙে গেছে, তবু ঘড়িটা এখনো সবকিছু মনে রেখেছে।',
      en: 'The crystal has shattered, yet the dial still remembers every second.',
    },
    image: '/src/assets/images/gallery_broken_watch_1795079396953.jpg',
    imageAlt: 'Cracked vintage wristwatch stopped at 3:14 on wet black slate',
  },
  {
    id: 'frame-02',
    index: '02',
    title: { bn: 'রিয়ারভিউ প্রতিধ্বনি', en: 'Rearview Echo' },
    timestamp: { bn: '০৩:১৪ · হাইওয়ে ০৯', en: '03:14 AM · Highway 09' },
    caption: {
      bn: 'পেছনের লাল আলো শুধু দূরের গাড়ির নয়—তুমি নিজেই পেছন থেকে আসছ।',
      en: 'Those crimson brake lights are not behind you by chance—you are catching up to yourself.',
    },
    image: '/src/assets/images/gallery_rearview_shadow_1795079397629.jpg',
    imageAlt: 'Car rearview mirror glowing with crimson brake lights in heavy rain',
  },
  {
    id: 'frame-03',
    index: '03',
    title: { bn: 'ভেজা ইটের গলি', en: 'Wet Cobble Alley' },
    timestamp: { bn: '০৩:১৪ · পুরান শহর', en: '03:14 AM · Old Quarter' },
    caption: {
      bn: 'লাল বাতির নিচে যে হেঁটে যাচ্ছে, ভেজা রাস্তায় তার কোনো ছায়া নেই।',
      en: 'Beneath the single red bulb, the figure walking away leaves no shadow on the stone.',
    },
    image: '/src/assets/images/gallery_wet_asphalt_1795079397149.jpg',
    imageAlt: 'Narrow rain-soaked brick alley at midnight lit by a single crimson bulb and cyan fog',
  },
  {
    id: 'frame-04',
    index: '04',
    title: { bn: 'নিরুত্তর বুথ', en: 'Unanswered Booth' },
    timestamp: { bn: '০৩:১৪ · মাইল ১৪', en: '03:14 AM · Mile 14' },
    caption: {
      bn: 'রিসিভার তুললেই শোনা যায়—ওপাশের লাইনে তুমি নিজেই নিঃশ্বাস নিচ্ছ।',
      en: 'Lift the receiver and listen closely: on the other end, it is your own breathing.',
    },
    image: '/src/assets/images/gallery_abandoned_booth_1795079396910.jpg',
    imageAlt: 'Fog-shrouded glass telephone booth beside an empty wet road at night',
  },
  {
    id: 'frame-05',
    index: '05',
    title: { bn: 'অসীম সিঁড়ি', en: 'Infinite Descent' },
    timestamp: { bn: '০৩:১৪ · সিঁড়িঘর খ', en: '03:14 AM · Stairwell B' },
    caption: {
      bn: 'যতই নিচে নামো, প্রতিটি ধাপ তোমাকে একই তলায় ফিরিয়ে আনে।',
      en: 'No matter how far down you climb, every turn brings you back to the fourth floor.',
    },
    image: '/src/assets/images/gallery_spiral_stairs_1795079397715.jpg',
    imageAlt: 'Top-down view of a dark concrete spiral staircase descending into void',
  },
  {
    id: 'frame-06',
    index: '06',
    title: { bn: 'কুয়াশার রেখা', en: 'Headlight Cut' },
    timestamp: { bn: '০৩:১৪ · উত্তর বাঁক', en: '03:14 AM · North Turn' },
    caption: {
      bn: 'কুয়াশার ভেতর আলোর রেখা কেটে গেছে, কিন্তু রাস্তা এখনো শেষ হয়নি।',
      en: 'Cold beams slice open the midnight fog, yet the road ahead never ends.',
    },
    image: '/src/assets/images/gallery_foggy_alley_1795079398864.jpg',
    imageAlt: 'Cold cyan car headlights slicing through dense midnight forest fog',
  },
  {
    id: 'frame-07',
    index: '07',
    title: { bn: 'সেশন ৩ — ১০/১৪', en: 'Session 3 — 10/14' },
    timestamp: { bn: '০৩:১৪ · অডিও প্রমাণ', en: '03:14 AM · Evidence Reel' },
    caption: {
      bn: 'ম্যাগনেটিক ফিতা খুলে গেছে, তবু রেকর্ড করা কণ্ঠস্বর এখনো থামেনি।',
      en: 'The magnetic ribbon lies unspooled, yet the recorded whisper refuses to stop.',
    },
    image: '/src/assets/images/gallery_tape_reel_1795079396871.jpg',
    imageAlt: 'Unspooled magnetic cassette tape tangled beside a glowing red LED recorder',
  },
  {
    id: 'frame-08',
    index: '08',
    title: { bn: 'আধখোলা দরজা', en: 'The Ajar Threshold' },
    timestamp: { bn: '০৩:১৪ · প্রস্থান শূন্য', en: '03:14 AM · Exit Zero' },
    caption: {
      bn: 'দরজা খোলা আছে। কিন্তু ওপাশে কি বেরোনোর পথ, নাকি আবার শুরু?',
      en: 'The heavy steel door stands ajar. Is that the way out, or simply the start again?',
    },
    image: '/src/assets/images/gallery_silhouette_door_1795079397001.jpg',
    imageAlt: 'Heavy metal door slightly ajar casting a beam of red and cyan light across concrete',
  },
];
