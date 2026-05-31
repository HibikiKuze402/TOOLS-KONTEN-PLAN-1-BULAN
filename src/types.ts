export interface ContentPlanInput {
  // A. Data Dasar Akun
  accountName: string;
  brandName: string;
  brandDescription: string;
  competitors: string[]; // [Competitor 1, 2, 3]
  competitorLinks: string;
  visualStyle: string; // Minimalis, Modern, Islami, Elegan, Fun, Youthful, Premium, Corporate, Cinematic, Edukatif
  communicationTone: string; // Formal, Friendly, Santai, Profesional, Emosional, Inspiratif, Lucu, Islami, Storytelling
  mainCTA: string;
  upcomingEvent: string;
  mainCampaign: string;

  // B. Tujuan Konten (Checkboxes)
  goals: string[]; // Awareness, Engagement, Followers, Penjualan, dll.

  // C. Platform (Checkboxes)
  platforms: string[]; // Instagram Feed, Reels, Story, TikTok, dll.

  // D. Niche Utama
  primaryNiche: string;
  subNiche1: string;
  subNiche2: string;
  subNiche3: string;

  // E. Target Audiens
  audienceAge: string;
  audienceGender: string;
  audienceLocation: string;
  audienceProfession: string;
  audiencePainPoints: string;
  audienceDesires: string;
  audienceHabits: string;
  audienceLanguage: string;
  audienceKnowledgeLevel: string;

  // F. Frekuensi Upload
  uploadsPerWeek: number;
  uploadDays: string;
  uploadHours: string;
  reelsPerWeek: number;
  feedsPerWeek: number;
  storiesPerWeek: number;
  carouselsPerWeek: number;
  promoPerWeek: number;
  educationalPerWeek: number;

  // G. Format Konten (Checkboxes)
  contentFormats: string[]; // Single image, Carousel, Reels, dll.

  // H. Produk / Program
  promoProductName: string;
  promoProductDescription: string;
  promoProductBenefits: string;
  promoProductPrice: string;
  promoProductOffer: string;
  promoProductLink: string;
  promoProductUSP: string;
  promoProductTestimonial: string;

  // I. Sumber Daya Yang Dimiliki (Checkboxes)
  resources: string[]; // Foto produk, Video dokumentasi, dll.

  // J. Tema Bulan
  monthlyTheme: string;
  week1SubTheme: string;
  week2SubTheme: string;
  week3SubTheme: string;
  week4SubTheme: string;
  importantMoments: string;
  nationalHolidays: string;
  specialCampaign: string;

  // K. Data Akun Saat Ini
  currentFollowers: string;
  avgLikes: string;
  avgComments: string;
  avgShares: string;
  avgSaves: string;
  avgReach: string;
  engagementRate: string;
  bestPerformingContent: string;
  worstPerformingContent: string;
  currentAccountIssues: string;
  growthTarget: string;
}

export type ContentPlanStatus =
  | "Ide"
  | "Siap Produksi"
  | "Proses Desain"
  | "Proses Editing"
  | "Siap Upload"
  | "Terupload"
  | "Evaluasi";

export interface ContentDayItem {
  day: number;
  date: string;
  platform: string;
  format: string;
  pilar: "Edukasi" | "Promosi" | "Engagement" | "Branding";
  theme: string;
  title: string;
  hook: string;
  body: string;
  caption: string;
  cta: string;
  hashtag: string;
  visualReference: string;
  designIdea: string;
  videoIdea: string;
  videoDuration: string; // e.g. "15-30s" or "N/A"
  assetsNeeded: string[];
  goal: string;
  priority: "Tinggi" | "Sedang" | "Rendah";
  status: ContentPlanStatus;
  
  // Detail Panel fields
  script?: string;
  imgAiPrompt?: string;
  videoAiPrompt?: string;
  designBrief?: string;
  productionChecklist?: string[];
}

export interface ContentPlanProject {
  id: string;
  createdAt: string;
  input: ContentPlanInput;
  days: ContentDayItem[];
}
