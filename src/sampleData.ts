import { ContentPlanInput, ContentDayItem } from "./types";

export const SAMPLE_INPUT: ContentPlanInput = {
  accountName: "@parenting.islami",
  brandName: "Parenting Islami Academy",
  brandDescription: "Lembaga edukasi online & komunitas orang tua yang fokus mengajarkan adab anak, mendidik anak sesuai sunnah, dan mengatasi kecanduan gadget secara praktis.",
  competitors: ["Generasi Al-Fatih", "Parenting Nabawiyah", "Rumah Main Anak"],
  competitorLinks: "instagram.com/parenting_nabawi",
  visualStyle: "Modern", // Modern, Islami, Minimalis, Elegan, Fun, dll.
  communicationTone: "Friendly", // Friendly, Santai, Storytelling, dll.
  mainCTA: "Daftar sekarang melalui link di bio",
  upcomingEvent: "Webinar Akbar 'Mendidik Anak Tangguh Era Digital' (Tanggal 25 Bulan Depan)",
  mainCampaign: "Pendaftaran Workshop Intimasi Suami Istri 3 Jam",
  goals: [
    "Meningkatkan awareness",
    "Meningkatkan engagement",
    "Meningkatkan penjualan",
    "Edukasi audiens",
    "Promosi program"
  ],
  platforms: ["Instagram Feed", "Instagram Reels", "Instagram Story", "TikTok", "YouTube Shorts"],
  primaryNiche: "Parenting Islami",
  subNiche1: "Adab Anak",
  subNiche2: "Detox Gadget Anak",
  subNiche3: "Komunikasi Pasutri",
  audienceAge: "25 - 40 Tahun",
  audienceGender: "Mayoritas Ibu (80%) dan Ayah (20%)",
  audienceLocation: "Kota-kota besar di Indonesia (Jakarta, Bandung, Surabaya, Medan, Makassar)",
  audienceProfession: "Ibu Rumah Tangga, Ibu Bekerja, Guru, Profesional Muda",
  audiencePainPoints: "Anak sering tantrum, kecanduan gadget tingkat tinggi, sulit diajak sholat, dan kurang kompaknya hubungan mendidik antara Ayah dan Ibu.",
  audienceDesires: "Anak patuh dengan adab santun tanpa perlu dimarahi secara histeris, Ayah ikut aktif mendidik, dan gadget menjadi sarana manfaat saja tanpa kecanduan.",
  audienceHabits: "Sering online setelah sholat subuh, jam istirahat siang (12.00-13.00), dan menjelang istirahat malam (20.00-22.00) di sela nidurin anak.",
  audienceLanguage: "Santai, sopan, bersahabat, sesekali memakai kata sapaan hangat seperti 'Ayah Bunda', 'Moms', 'Pak Su'.",
  audienceKnowledgeLevel: "Menengah (paham dasar-dasar agama tapi butuh panduan praktis / aplikasi sehari-hari).",
  uploadsPerWeek: 5,
  uploadDays: "Senin, Selasa, Kamis, Jumat, Sabtu",
  uploadHours: "06:00 WIB, 12:00 WIB, 19:30 WIB",
  reelsPerWeek: 3,
  feedsPerWeek: 2,
  storiesPerWeek: 7,
  carouselsPerWeek: 2,
  promoPerWeek: 1,
  educationalPerWeek: 4,
  contentFormats: ["Carousel", "Reels", "Story", "Infografis", "Quote", "Tutorial"],
  promoProductName: "E-Course Parenting Nabawiyah: 30 Hari Bebas Tantrum & Gadget",
  promoProductDescription: "Program bimbingan online interaktif selama 30 hari yang dipandu langsung oleh psikolog anak Islami untuk meredam tantrum dan mengalihkan adiksi gadget anak tanpa kekerasan.",
  promoProductBenefits: "Akses selamanya, materi video pendek bumbu animasi, modul checklist harian, lembar evaluasi PDF, dan group support tanya jawab eksklusif.",
  promoProductPrice: "Rp 349.000 (Harga Spesial Pre-Launching)",
  promoProductOffer: "Diskon 50% untuk 100 pendaftar pertama + Bonus E-Book '5 Siasat Menjinakkan Amarah Pasutri'.",
  promoProductLink: "parentingislami.academy/bebas-tantrum",
  promoProductUSP: "Satu-satunya e-course yang memadukan keilmuan psikologi modern teruji dengan metode pengasuhan sunnah Rasulullah SAW secara berimbang.",
  promoProductTestimonial: "Umi Rahma (34 th, Bandung): 'Baru hari ke-10 praktekin e-course ini, anak saya yang tadinya teriak-teriak minta HP mulai mau diajak kesepakatan jatah screen time tanpa ngamuk lagi!'",
  resources: ["Video dokumentasi", "Testimoni", "Desainer", "Copywriter", "Admin media sosial", "Website", "Brand guideline"],
  monthlyTheme: "Membentuk Akhlak Mulia & Komunikasi Positif Keluarga Muslim",
  week1SubTheme: "Pondasi Adab Anak Sebelum Ilmu",
  week2SubTheme: "Solusi Cerdas Atasi Kecanduan Screen Time",
  week3SubTheme: "Kekompakan Ayah-Bunda Adalah Kunci",
  week4SubTheme: "Manajemen Emosi Orangtua & Mengatasi Tantrum",
  importantMoments: "Awal Bulan Hijriah Baru / Persiapan Liburan Sekolah Anak",
  nationalHolidays: "Hari Anak Nasional / Hari Ibu",
  specialCampaign: "Campaign 'Tantangan 3 Hari No-Gadget Se-Rumah'",
  currentFollowers: "45,200",
  avgLikes: "1,200",
  avgComments: "75",
  avgShares: "350",
  avgSaves: "680",
  avgReach: "15,000",
  engagementRate: "4.8%",
  bestPerformingContent: "Video Reel: '3 Kalimat Sihir Saat Anak Ngamuk' (80k views, 2k saves)",
  worstPerformingContent: "Single Feed: Poster Hadits 'Tanda Kiamat Sudah Dekat' (Sedikit engagement karena terlalu kaku)",
  currentAccountIssues: "Interaksi komentar mulai sepi, audiens cenderung pasif cuma save tapi tidak like/share.",
  growthTarget: "Mencapai 55.000 followers, engagement rate naik ke 6%, dan closing 250 peserta E-Course."
};

export function generate30DaysPlan(input: ContentPlanInput): ContentDayItem[] {
  const days: ContentDayItem[] = [];
  const platforms = input.platforms.length > 0 ? input.platforms : ["Instagram Feed", "Instagram Reels"];
  const formats = input.contentFormats.length > 0 ? input.contentFormats : ["Carousel", "Reels", "Story", "Quote"];
  
  const contentTypes: Array<{
    pilar: "Edukasi" | "Promosi" | "Engagement" | "Branding";
    ratio: number;
  }> = [
    { pilar: "Edukasi", ratio: 0.4 },
    { pilar: "Engagement", ratio: 0.3 },
    { pilar: "Promosi", ratio: 0.2 },
    { pilar: "Branding", ratio: 0.1 }
  ];

  // Seed data topics for dynamic fallback generation
  const topics: Record<string, Array<{title: string, hook: string, desc: string, action: string}>> = {
    "Adab Anak": [
      {
        title: "Adab Sebelum Makan Sesuai Sunnah",
        hook: "Moms, Si Kecil Masih Suka Lupa Adab Makan Ini?",
        desc: "Membahas pentingnya mendidik adab makan melingkar, minum duduk, dan mencuci tangan sembari memuji makanan buatan Ibu.",
        action: "Dapatkan adab checklist harian di link bio kami"
      },
      {
        title: "Seni Mengajarkan Mengucap Salam",
        hook: "Cara Mudah Agar Anak Rajin Ucap Salam Tanpa Dipaksa",
        desc: "Berbagi tips mencontohkan salam setiap masuk kamar anak sehingga menumbuhkan kebiasaan alami bukan sekadar formalitas.",
        action: "Ketik 'SALAM' untuk baca panduan interaktif parenting gratis"
      },
      {
        title: "Mengatasi Anak Suka Menyela Pembicaraan",
        hook: "Lakukan 1 Trik Ini Saat Si Kecil Suka Memotong Obrolan PakSu & Moms",
        desc: "Gunakan trik sentuh lengan lembut sebagai isyarat bahwa anak didengar dan akan diberi giliran berbicara.",
        action: "Share postingan ini ke komunitas sekolah anak Anda"
      }
    ],
    "Detox Gadget Anak": [
      {
        title: "Tanda Anak Kecanduan Screen Time",
        hook: "MATA MERAH & MUDAH MARAH? Awas, 3 Tanda Anak Mulai Adiksi Gadget!",
        desc: "Deteksi dini perilaku manipulatif anak, penurunan konsentrasi belajar, dan tantrum hebat saat HP dijauhkan.",
        action: "Daftar E-Course Bebas Gadget kami sekarang dengan diskon 50%"
      },
      {
        title: "Ide Mainan Pengganti HP di Rumah",
        hook: "Bosan Main HP? Ini 5 Kegiatan Seru Tanpa Layar yang Bikin Anak Anteng!",
        desc: "Eksperimen sains sederhana, permainan sensori pasir kinetik, dan mendongeng kisah sahabat nabi dengan bayangan boneka tangan.",
        action: "Simpan postingan ini agar tidak hilang saat liburan besok"
      },
      {
        title: "Aturan Screen Time Sesuai Rekomendasi Medis",
        hook: "Berapa Jam Jatah HP Anak Sesuai Umur? Orang Tua Wajib Tahu Ini!",
        desc: "Mengulas batasan screen time <2 tahun (nol layar kecuali video call), 2-5 tahun (maksimal 1 jam didampingi), dan pentingnya zona bebas HP.",
        action: "Mulai batasi hari ini lewat e-course interaktif di bio"
      }
    ],
    "Komunikasi Pasutri": [
      {
        title: "Pentingnya Me Time Berdua Suami",
        hook: "Kapan Terakhir Kali Pacaran Setelah Punya Anak? Ini Bahayanya Kalau Dicuekin!",
        desc: "Pentingnya menjaga keharmonisan (heart connection) suami istri karena anak meniru energi pernikahan orang tuanya.",
        action: "Tag pasangan halalmu untuk agendakan kencan akhir pekan ini"
      },
      {
        title: "Kompak Mendidik Anak Tanpa Perdebatan di Depan Si Kecil",
        hook: "Stop Bertengkar Soal Aturan Anak di Depan Mereka! Ini Akibatnya...",
        desc: "Anak bisa mencari celah perlindungan jika Ayah Bunda tidak konsisten. Buat kesepakatan tertulis di balik pintu kamar.",
        action: "Komentar di bawah 'KOMPAK' jika mau gabung grup sharing Pasutri"
      },
      {
        title: "Kalimat Apresiasi Sederhana Untuk Suami",
        hook: "Moms, 3 Kalimat Sederhana Ini Bikin Suami Merasa Dihargai & Semangat Bantu Urus Rumah",
        desc: "Ungkapan terima kasih karena sudah bekerja keras dan mendampingi anak-anak bermain sebentar sepulang kerja.",
        action: "Save dan praktekkan nanti malam pas suami pulang kerja ya"
      }
    ],
    "Umum": [
      {
        title: "Rutinitas Subuh Keluarga Berkah",
        hook: "Mulai Jam 05.00 Pagi, Lakukan Kegiatan Ini Agar Rezeki Lancar Sekeluarga",
        desc: "Menggagas zikir pagi bersama anak, mengaji 5 ayat berputar, dan olahraga ringan tanpa gadget di pagi hari.",
        action: "Klik link bio untuk konsultasi program kurikulum anak sholeh"
      },
      {
        title: "Mendidik Rasa Syukur Sejak Dini",
        hook: "Anak Sering Mengeluh Kurang Mainan? Ajarkan Rumus Syukur Praktis Ini Saja",
        desc: "Metode kotak donasi mingguan di mana anak menyisihkan mainan lamanya untuk anak panti asuhan sebagai wujud empati.",
        action: "Tulis 'ALHAMDULILLAH' di komentar sebagai komitmen syukur"
      },
      {
        title: "Mengelola Marah Ketika Anak Menumpahkan Susu",
        hook: "Susu Tumpah Bikin Emosi Meledak? Tarik Napas 6 Detik, Lalu Lakukan Ini...",
        desc: "Melatih regulasi diri orang tua. Anak tidak sengaja menumpahkan, mereka hanya belajar koordinasi fisik. Ajak membersihkan bersama.",
        action: "Share postingan ini agar makin banyak orang tua yang sabar"
      }
    ]
  };

  const getSubthemeForWeek = (dayNum: number): string => {
    if (dayNum <= 7) return input.week1SubTheme || "Subtema Minggu 1";
    if (dayNum <= 14) return input.week2SubTheme || "Subtema Minggu 2";
    if (dayNum <= 21) return input.week3SubTheme || "Subtema Minggu 3";
    return input.week4SubTheme || "Subtema Minggu 4";
  };

  const today = new Date();

  // Create highly customized day-by-day plans
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateString = d.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    // Pick platform & format rotation
    const platform = platforms[(i - 1) % platforms.length];
    const format = formats[(i - 1) % formats.length];

    // Determine content pillar
    let pilar: "Edukasi" | "Promosi" | "Engagement" | "Branding" = "Edukasi";
    if (i % 5 === 0) {
      pilar = "Promosi";
    } else if (i % 3 === 0) {
      pilar = "Engagement";
    } else if (i % 7 === 0) {
      pilar = "Branding";
    }

    // Determine relevant niche topics based on day number
    let topicArray = topics["Umum"];
    if (input.primaryNiche.toLowerCase().includes("parent") || input.primaryNiche.toLowerCase().includes("islam")) {
      if (i % 4 === 1) topicArray = topics["Adab Anak"];
      else if (i % 4 === 2) topicArray = topics["Detox Gadget Anak"];
      else if (i % 4 === 3) topicArray = topics["Komunikasi Pasutri"];
    }

    const tIndex = (i - 1) % topicArray.length;
    const coreTopic = topicArray[tIndex];

    const subTheme = getSubthemeForWeek(i);
    let title = `${coreTopic.title} (Day ${i})`;
    let hook = coreTopic.hook;
    let desc = coreTopic.desc;
    let cta = input.mainCTA || coreTopic.action;

    // Custom overrides for Promotion Pillars
    if (pilar === "Promosi") {
      title = `Solusi Terbaik: ${input.promoProductName || "Program Unggulan Kami"}`;
      hook = `💥 BOCORAN RAHASIA: Bagaimana Membantu Ribuan Keluarga Bebas Tantrum di Rumah!`;
      desc = `Membahas tuntas benefit dari ${input.promoProductName || "Program Kami"} yang dirancang khusus untuk mengatasi masalah: ${input.audiencePainPoints || "kesulitan mendidik anak"}. Menjelaskan penawaran: ${input.promoProductOffer || "Diskon Spesial Bulan Ini"}.`;
      cta = `Amankan Kursi Anda sekarang, Klik link: ${input.promoProductLink || "bio kami"}`;
    } else if (pilar === "Branding") {
      title = `Kenali Lebih Dekat ${input.brandName || "Lembaga Kami"}`;
      hook = `Moms, Tau Nggak Sih Mengapa Kami Membangun Komunitas Ini?`;
      desc = `Cerita di balik layar (storytelling) pendirian ${input.brandName || "brand ini"}. Nilai-nilai ketaqwaan, pendampingan ramah anak, dan visi menciptakan generasi berakhlak mulia.`;
    }

    const brandName = input.brandName || "Parenting Islami";
    const hashtag = `#${brandName.toLowerCase().replace(/[^a-z0-9]/g, "")} #parentingislami #parentingnabawiyah #adabanak #parentinganak #mendidikanak #tantrumanak #stopgadget #keluargasunnah #dakwahparenting`;
    
    // Status distribution
    let status: "Ide" | "Siap Produksi" | "Proses Desain" | "Proses Editing" | "Siap Upload" = "Ide";
    if (i === 1) status = "Siap Upload";
    else if (i <= 3) status = "Proses Desain";
    else if (i <= 5) status = "Siap Produksi";

    const isVideo = ["Reels", "TikTok", "YouTube Shorts"].includes(platform) || format === "Reels" || format === "Story";
    const duration = isVideo ? "15-30s" : "N/A";

    days.push({
      day: i,
      date: dateString,
      platform,
      format,
      pilar,
      theme: `${input.monthlyTheme || "Tema Utama"} - ${subTheme}`,
      title,
      hook,
      body: desc,
      caption: `[${pilar.toUpperCase()}] \n\n${hook}\n\nAyah Bunda yang dirahmati Allah, \n${desc}\n\nSemoga kita dimudahkan mendidik anak sholeh sholehah. \n\n👉 *${cta}*\n\nTag pasangan dan sahabat perjuangan Anda ya! \n\n${hashtag}`,
      cta,
      hashtag,
      visualReference: `https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80 (Referensi visual interaksi hangat orang tua dan anak)`,
      designIdea: pilar === "Promosi" 
        ? `Canvas 1x1 / 4x5 dengan warna dominan hijau emerald melambangkan keamanan dan emas soft melambangkan premium. Tampilkan foto anak tersenyum ceria tanpa HP di tangan kiri, di sebelah kanan letakkan foto mock up E-Course serta tulisan 'DISKON 50%'.`
        : `Style Minimalis Modern, background netral krem muda agar text tajam terbaca. Gunakan font Sans Serif tebal warna charcoal gelap untuk judul hook, serta ilustrasi line-art estetik keluarga muslim bahagia.`,
      videoIdea: isVideo 
        ? `0-3 detik: Tunjukkan video ekspresi frustrasi Ibu memijat dahi saat anak merebut HP (B-Roll). Taruh teks hook besar di tengah layar.\n3-10 detik: Transisi ke adegan Ayah mengajak anak mengaji / belajar adab dengan senyum penuh cinta.\n10-15 detik: Tampilkan logo ${input.brandName} beserta instruksi untuk mengklik link bio.`
        : "N/A",
      videoDuration: duration,
      assetsNeeded: isVideo 
        ? ["Video footage b-roll ibu mengasuh anak", "Video footage interaksi ayah", "Musik latar instrumen syahdu akustik", "Logo digital PNG transparan"]
        : ["Aset foto portrait ibu anak asli", "Template postingan canva premium", "Logo digital PNG transparan"],
      goal: pilar === "Engagement" ? "Memicu audiens untuk berkomentar dan berbagi kisah pribadi." : "Mengedukasi atau mendorong konversi pendaftaran program.",
      priority: pilar === "Promosi" ? "Tinggi" : i % 2 === 0 ? "Sedang" : "Rendah",
      status,
      
      script: isVideo ? `[JUDUL DI LAYAR: MATA MERAH & MUDAH MARAH?]
(Visual: B-roll Ibu tampak lelah, sementara anak sedang memegang layar menyala di sofa)
Voice Over (Sabar namun tegas): "Ayah Bunda... Sering nggak sih ngerasa bersalah ketika anak nangis histeris kalau HP-nya kita ambil?"

(Visual: Transisi cepat ke visual interaktif puzzle kayu / mewarnai bersama Ayah)
Voice Over: "Jangan dibiarkan ya. Ini bisa jadi tanda anak kita sudah mulai teradiksi screen time. Yuk, kita alihkan pelan-pelan lewat aktivitas interaktif bareng keluarga tanpa amarah."

(Visual: Layar menampilkan Mockup Buku/E-Course dengan diskon 50%)
Voice Over: "Selengkapnya telah kami jadikan modul panduan praktis 30 hari anti-tantrum. Klik link di bio untuk amankan kuota pendaftaran Ayah Bunda sekarang!"` : undefined,
      
      imgAiPrompt: `A beautiful photorealistic portrait of an Indonesian Muslim family, mother in decent modern green emerald hijab, father with dynamic short beard smiling, and a happy 5-year-old child holding educational wooden block toys together, soft warm lighting, negative space left for text, modern photography --ar 4:5`,
      videoAiPrompt: `Close up slow motion video of an Indonesian Muslim mother gently hugging her small daughter who is laughing joyfully, warm sunshine light leaks coming from the window, cinematic look, 4k video --ar 9:16`,
      designBrief: `Gunakan palette warna hijau emerald sebagai warna dasar (#064E3B) dikombinasikan dengan putih tulang (#F9FAFB) untuk teks isi, dan aksen emas (#D97706) untuk tombol CTA reguler. Tipografi menggunakan kombinasi Montserrat (Heading) dan Open Sans (Body Text). Pastikan rasio kontras warna AA compliant demi kemudahan membaca para orang tua kelompok umur 35-40 tahun.`,
      productionChecklist: isVideo 
        ? ["Take video B-Roll ekspresi ibu", "Record voice over suara ramah bersahabat", "Download background music instrumental santai", "Edit video satukan di CapCut / Premiere", "Tingkatkan ketajaman warna (grading)", "Siapkan caption dan hashtag bundle"]
        : ["Tentukan layout visual di Canva", "Masukkan foto lisensi bebas atau rancangan sendiri", "Masukkan teks Hook berukuran besar di slide 1", "Buat slide detail isi konten edukasi (slide 2-4)", "Buat slide Call to Action (slide 5)", "Review keselarasan logo dan brand guidelines"]
    });
  }

  return days;
}
