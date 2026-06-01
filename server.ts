import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "saved_projects.json");

// Middleware to parse JSON
app.use(express.json({ limit: "50mb" }));

// Helper to read database
function readDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Gagal membaca database lokal:", error);
  }
  return [];
}

// Helper to write database
function writeDB(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Gagal menulis database lokal:", error);
  }
}

// REST API Endpoints ===================================

// GET /api/content-plans - Mengambil seluruh riwayat project
app.get("/api/content-plans", (req, res) => {
  const db = readDB();
  // Return metadata only for list (without full 30-day items to keep payload small)
  const list = db.map((p: any) => ({
    id: p.id,
    createdAt: p.createdAt,
    brandName: p.input.brandName,
    accountName: p.input.accountName,
    primaryNiche: p.input.primaryNiche,
    monthlyTheme: p.input.monthlyTheme,
    totalDays: p.days?.length || 0,
    goals: p.input.goals,
    platforms: p.input.platforms
  }));
  res.json(list);
});

// GET /api/content-plans/:id - Menampilkan detail satu project
app.get("/api/content-plans/:id", (req, res) => {
  const db = readDB();
  const project = db.find((p: any) => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: "Project tidak ditemukan" });
  }
  res.json(project);
});

// POST /api/content-plans/save - Menyimpan / memperbarui project
app.post("/api/content-plans/save", (req, res) => {
  const { id, input, days, groundingSources, trendSummary } = req.body;
  if (!input || !days) {
    return res.status(400).json({ error: "Input atau days tidak valid" });
  }

  const db = readDB();
  const projectId = id || `project_${Date.now()}`;
  const existingIndex = db.findIndex((p: any) => p.id === projectId);

  const updatedProject = {
    id: projectId,
    createdAt: existingIndex >= 0 ? db[existingIndex].createdAt : new Date().toISOString(),
    input,
    days,
    groundingSources: groundingSources || [],
    trendSummary: trendSummary || null
  };

  if (existingIndex >= 0) {
    db[existingIndex] = updatedProject;
  } else {
    db.unshift(updatedProject); // Newest first
  }

  writeDB(db);
  res.json(updatedProject);
});

// PUT /api/content-plans/:id - Memperbarui status / detail satu project
app.put("/api/content-plans/:id", (req, res) => {
  const db = readDB();
  const existingIndex = db.findIndex((p: any) => p.id === req.params.id);
  if (existingIndex < 0) {
    return res.status(404).json({ error: "Project tidak ditemukan" });
  }

  const { input, days, groundingSources, trendSummary } = req.body;
  const project = db[existingIndex];
  
  if (input) project.input = input;
  if (days) project.days = days;
  if (groundingSources !== undefined) project.groundingSources = groundingSources;
  if (trendSummary !== undefined) project.trendSummary = trendSummary;

  db[existingIndex] = project;
  writeDB(db);
  res.json(project);
});

// DELETE /api/content-plans/:id - Menghapus project
app.delete("/api/content-plans/:id", (req, res) => {
  const db = readDB();
  const filtered = db.filter((p: any) => p.id !== req.params.id);
  writeDB(filtered);
  res.json({ message: "Project berhasil dihapus" });
});

// Helper: Dynamic fallback trend summary based on niche
function generateBackupTrendSummary(input: any) {
  const niche = input.primaryNiche || "Kreator Konten";
  return {
    title: `Tren Hangat Mingguan: ${niche}`,
    description: `Ringkasan performa & kata kunci penelusuran paling populer di Indonesia selama 3 hari terakhir dalam bidang ${niche}.`,
    hotTags: ["#trenterkini", "#ideviral", "#kontenviral", `#${niche.toLowerCase().replace(/[^a-z0-9]/g, "")}`],
    trendsList: [
      {
        topic: `Format 'Visual Aesthetic B-Roll' dengan Voiceover Storytelling`,
        explanation: `Audiens di Indonesia sangat menyukai konten video santai bersuara lembut dengan latar belakang video estetik sinematik berdurasi di bawah 15 detik.`,
        viralityReason: `Membangun relasi emosional lebih tinggi daripada sekadar menyodorkan infografis teknis kaku.`,
        suggestedAngle: `Gunakan video di balik layar (BTS) atau aktivitas pagi hari, lalu ceritakan perjuangan atau rahasia utama brand Anda secara humanis.`
      },
      {
        topic: `Tantangan Interaktif / Micro-Learning Carousel`,
        explanation: `Infografis carousel statis yang berisi 'Tantangan 3 Hari...' atau checklist praktis yang menduplikasi lembar kerja nyata mengalami lonjakan penyimpanan (save) hingga 230% di kuartal ini.`,
        viralityReason: `Sifatnya yang 'high-value' membuat audiens merasa wajib menyimpannya untuk dipelajari ulang nanti.`,
        suggestedAngle: `Buat checklist atau template gratis yang bisa didapatkan audiens hanya dengan membagikan konten atau berkomentar di postingan Anda.`
      },
      {
        topic: `Konten Kontroversi Positif & Mitos Debunking`,
        explanation: `Meluruskan kesalahpahaman umum di masyarakat dengan pendekatan data atau studi kasus riil (misal: 'Kenapa diet ketat tanpa nasi justru bikin gemuk kembali' atau 'Mengapa koding tanpa merancang database itu jebakan sia-sia').`,
        viralityReason: `Memecah kesunyian opini umum dan mengundang audiens berdiskusi sehat di kolom komentar.`,
        suggestedAngle: `Ambil 1 mitos terbesar di niche Anda, lalu bongkar dengan tutur bahasa santun namun padat argumen kredibel.`
      }
    ]
  };
}

// Helper: Dynamic fallback generator (ketika GEMINI_API_KEY tidak diset atau error)
function generateBackupContentPlan(input: any): any[] {
  const days: any[] = [];
  const platforms = input.platforms && input.platforms.length > 0 ? input.platforms : ["Instagram Feed", "Instagram Reels"];
  const formats = input.contentFormats && input.contentFormats.length > 0 ? input.contentFormats : ["Carousel", "Reels", "Story", "Quote"];
  
  const topicsMap: Record<string, Array<{title: string, hook: string, desc: string, cta: string}>> = {
    "Pendidikan Islam": [
      {
        title: "Adab Tidur Sesuai Tuntunan Rasulullah SAW",
        hook: "Moms, Si Kecil Suka Susah Tidur Malam? Coba Terapkan 4 Adab Sunnah Ini!",
        desc: "Mengedukasi orang tua tentang kebiasaan berwudhu sebelum tidur, membaca Surah Al-Mulk / 3 Qul, menepuk kasur, dan posisi berbaring miring kanan.",
        cta: "Simpan postingan ini agar tidak terlupa nanti malam!"
      },
      {
        title: "Melatih Kesabaran Lewat Doa Pendek",
        hook: "Ketika Anak Berbuat Salah, Amalkan Doa Ini Agar Hati Tetap Tenang",
        desc: "Menjabarkan manajemen amarah bagi orang tua muslim dengan membaca ta'awudz, duduk apabila berdiri, dan mendoakan kebaikan bagi anak pelaku kekeliruan.",
        cta: "Klik link bio untuk ebook parenting Islami gratis kami"
      }
    ],
    "UMKM": [
      {
        title: "Perbandingan Kualitas Produk Kami vs Pasaran",
        hook: "Jangan Asal Beli Murah! Kenali 3 Perbedaan Penting Produk Original Kami",
        desc: "Memperlihatkan keunggulan produk secara mendetail berupa material berkualitas tinggi, ketahanan warna jahitan, dan masa garansi resmi.",
        cta: "Klaim kupon khusus diskon 15% di bio kami!"
      },
      {
        title: "Behind The Scene Keseruan Packing Pesanan",
        hook: "Seperti Apa Proses Higienis Pengemasan Produk Pesananmu? Yuk Intip!",
        desc: "Menceritakan upaya penjagaan sterilitas ruangan, ketelitian tim admin saat double check pesanan, dan sisipan kartu ucapan custom.",
        cta: "Beli sekarang sebelum kehabisan slot promo bulan ini"
      }
    ],
    "Umum": [
      {
        title: "Rahasia Produktivitas Memulai Pagi",
        hook: "Lakukan 3 Ritual Sederhana Ini Sebelum Jam 8 Pagi Biar Hari Kamu Berkah",
        desc: "Mengulas rutinitas zikir pagi, minum satu gelas air putih hangat, mencatat prioritas harian, dan no-gadget sebelum tugas pertama selesai.",
        cta: "Share ke teman dekatmu yang butuh booster pagi ini!"
      },
      {
        title: "Mengatasi Rasa Malas Menunda Pekerjaan",
        hook: "Suka Menunda Pekerjaan? Pakai Aturan 5 Menit Ini untuk Melawannya!",
        desc: "Menjelaskan teknik psikologis sederhana membujuk otak melakukan tugas membosankan hanya selama 5 menit. Seringkali setelah 5 menit kita malah terus lanjut.",
        cta: "Ikuti akun kami untuk tips harian pengembangan diri"
      }
    ]
  };

  // Pick suitable seed based on niche
  let seedArray = topicsMap["Umum"];
  const nicheLower = (input.primaryNiche || "").toLowerCase();
  if (nicheLower.includes("islam") || nicheLower.includes("didik") || nicheLower.includes("agama") || nicheLower.includes("yayasan")) {
    seedArray = topicsMap["Pendidikan Islam"];
  } else if (nicheLower.includes("jual") || nicheLower.includes("umkm") || nicheLower.includes("bisnis") || nicheLower.includes("fashion") || nicheLower.includes("kuliner")) {
    seedArray = topicsMap["UMKM"];
  }

  const today = new Date();

  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateString = d.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const platform = platforms[(i - 1) % platforms.length];
    const format = formats[(i - 1) % formats.length];
    
    // Choose content pilar
    let pilar: "Edukasi" | "Promosi" | "Engagement" | "Branding" = "Edukasi";
    if (i % 5 === 0) {
      pilar = "Promosi";
    } else if (i % 3 === 0) {
      pilar = "Engagement";
    } else if (i % 7 === 0) {
      pilar = "Branding";
    }

    const itemSeed = seedArray[(i - 1) % seedArray.length];
    let title = `${itemSeed.title} (Day ${i})`;
    let hook = itemSeed.hook;
    let body = itemSeed.desc;
    let cta = input.mainCTA || itemSeed.cta;

    if (pilar === "Promosi") {
      title = `Solusi Terbaik: ${input.promoProductName || "Program Unggulan Kami"}`;
      hook = `💥 PENAWARAN SPESIAL: ${input.promoProductOffer || "Daftar Hari Ini untuk Bonus Terbatas!"}`;
      body = `Berikut adalah rahasia mengapa ${input.promoProductName || "layanan kami"} dinobatkan sebagai solusi No. 1 untuk target audiens ${input.audienceAge || "semua kalangan"}. Mengatasi masalah utama Anda seperti: ${input.audiencePainPoints || "kemacetan ide atau keterbatasan waktu"}.`;
      cta = `Amankan sekarang juga melalui link: ${input.promoProductLink || "bio kita"}`;
    }

    const displayBrand = input.brandName || "Konten Kreator";
    const hashtag = `#${displayBrand.toLowerCase().replace(/[^a-z0-9]/g, "")} #${(input.primaryNiche || "niche").toLowerCase().replace(/[^a-z0-9]/g, "")} #contentplan #marketing #kontenkreator #socialmedia30hari`;

    const isVideo = ["Reels", "TikTok", "YouTube Shorts"].includes(platform) || format === "Reels";

    days.push({
      day: i,
      date: dateString,
      platform,
      format,
      pilar,
      theme: `${input.monthlyTheme || "Tema Utama"} - Minggu ${Math.ceil(i/7)}`,
      title,
      hook,
      body,
      caption: `[${pilar.toUpperCase()} | DAY ${i}] \n\n${hook}\n\n${body}\n\n👉 *${cta}*\n\n${hashtag}`,
      cta,
      hashtag,
      visualReference: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80 (Ilustrasi aktivitas terarah, profesional, warna hangat)",
      designIdea: pilar === "Promosi" 
        ? `Desain dengan paduan kombinasi warna visual utama ${input.visualStyle || "Modern"}. Letakkan foto mockup ${input.promoProductName || "Produk"} besar di samping, beri label harga miring '${input.promoProductPrice || "Harga Spesial"}' dan ikon diskon kontras.`
        : `Style visual ${input.visualStyle || "Clean"}. Latar belakang pastel bersih, typography modern menggunakan jenis huruf sans-serif tebal untuk kalimat hook di slide awal carousel, sisa slide menjelaskan 3 poin ringkas.`,
      videoIdea: isVideo 
        ? `0-3 Detik: Rekam ekspresi wajah kebingungan / kesal sesuai problem utama audiens. Tampilkan teks hook raksasa.\n3-12 Detik: Tunjukkan transisi estetik, berikan 2 langkah solusi praktis dari brand ${input.brandName}.\n12-15 Detik: Ajakan bertindak secara verbal yang mengarahkan ke link bio.`
        : "N/A",
      videoDuration: isVideo ? "15-30 detik" : "N/A",
      assetsNeeded: isVideo 
        ? ["Video rekam mandiri smartphone", "Efek suara transisi (whoosh)", "Background music trend Tiktok / Reels", "Watermark Logo PNG"]
        : ["Template visual branding", "Grafis pendukung", "Logo PNG transparan"],
      goal: pilar === "Engagement" ? "Mendorong audiens melakukan share dan mengisi kolom komentar." : "Mendukung kenaikan leads pendaftar program.",
      priority: pilar === "Promosi" ? "Tinggi" : i % 2 === 0 ? "Sedang" : "Rendah",
      status: i === 1 ? "Siap Upload" : i <= 3 ? "Proses Desain" : "Ide",
      script: isVideo ? `[Visual: Menatap bingung ke kamera, memegang kepala]
Voice Over: "Pernah merasa lelah karena hal ini? ${input.audiencePainPoints || "Tidak punya waktu membuat konten..."}"
[Visual: Transisi ceria, menunjuk solusi digital]
Voice Over: "Tenang saja! Berikut solusi jitu dari ${input.brandName}. Yuk dicoba hari ini dan rasakan perubahannya."
[Visual: Tampilan tulisan CTA dan link bio]
Voice Over: "Info lengkap klik link bio kami ya!"` : undefined,
      imgAiPrompt: `A beautiful high-quality professional studio photography portrait of a cheerful Indonesian product user reflecting brand vibe of ${input.brandName || "Content Brand"}, high contrast, minimalist background, warm lighting --ar 4:5`,
      videoAiPrompt: `Cinematic footage of a person working and using their computer in a modern workspace, close up shot on positive facial features, warm atmosphere, 4k --ar 9:16`,
      designBrief: `Menerapkan gaya visual ${input.visualStyle || "Modern"} dengan nada komunikasi ${input.communicationTone || "Friendly"}. Gunakan hierarki huruf tebal untuk kalimat hook, beri ruang sela yang lapang (generous negative space), dan pastikan penempatan logo brand presisi di setiap postingan.`,
      productionChecklist: isVideo 
        ? ["Tulis skrip & rekam audio", "Cari background music berlisensi bebas", "Gabungkan klip video di editor", "Tambahkan subtitle teks hook", "Ekspor video definisi tinggi (1080p)"]
        : ["Pilih template kanva sesuai style", "Isi konten utama", "Tambahkan CTA di halaman akhir", "Pasang logo brand", "Unduh berkas PNG/JPEG resolusi tinggi"]
    });
  }

  return days;
}

// Helper: Parse Gemini API error into a friendly Bahasa Indonesia message
function getFriendlyErrorMessage(err: any): string {
  const errMsg = err?.message || "";
  
  try {
    const trimmed = errMsg.trim();
    if (trimmed.startsWith("{") || trimmed.includes('"error"')) {
      // Extract structure if it's nested inside parent text or block
      const startIdx = trimmed.indexOf("{");
      const endIdx = trimmed.lastIndexOf("}");
      if (startIdx !== -1 && endIdx !== -1) {
        const jsonStr = trimmed.substring(startIdx, endIdx + 1);
        const parsed = JSON.parse(jsonStr);
        if (parsed.error) {
          const code = parsed.error.code;
          const msg = parsed.error.message || "";
          
          if (code === 429 || msg.includes("quota") || msg.includes("exhausted") || msg.includes("limit")) {
            return "Batas kuota API (Rate Limit) telah tercapai pada kuota server bersama. Agar konten ter-generate secara live tanpa hambatan limit, silakan buat & masukkan Kunci API Anda sendiri dengan menambahkan variabel 'GEMINI_API_KEY' di menu Settings / Pengaturan AI Studio Anda!";
          }
          if (code === 400 || code === 403) {
            return `Akses Kunci API ditolak (Kode ${code}). Kami mengalihkan pengerjaan rencana secara otomatis ke kecerdasan generator lokal.`;
          }
          return msg;
        }
      }
    }
  } catch (e) {
    // Failover to text matching
  }

  const lowerMsg = errMsg.toLowerCase();
  if (lowerMsg.includes("429") || lowerMsg.includes("quota") || lowerMsg.includes("limit") || lowerMsg.includes("exhausted")) {
    return "Batas kuota API (Rate Limit) telah terlampaui untuk sementara waktu. Agar bisa melakukan pembuatan secara live & tak terbatas, silakan tambahkan kunci API personal Anda lewat variabel 'GEMINI_API_KEY' pada konfigurasi Settings / Pengaturan di menu atas AI Studio!";
  }
  if (lowerMsg.includes("api key") || lowerMsg.includes("key not found") || lowerMsg.includes("invalid")) {
    return "Kunci API tidak valid atau habis masa berlakunya. Kami mengalihkan pengerjaan rencana secara otomatis ke kecerdasan generator lokal.";
  }

  return errMsg || "Timeout atau gangguan koneksi sesaat.";
}

// POST /api/generate-content-plan - Utama: menghasilkan rencana konten lewat API / AI
app.post("/api/generate-content-plan", async (req, res) => {
  const input = req.body;
  if (!input || !input.accountName || !input.primaryNiche) {
    return res.status(400).json({ error: "Kolom Nama Akun dan Niche Utama wajib diisi!" });
  }

  // Tentukan apakah GEMINI_API_KEY diset
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    console.log("GEMINI_API_KEY tidak diset atau bawaan default. Menggunakan Generator Algoritma Lokal yang tangguh.");
    const plan = generateBackupContentPlan(input);
    const trends = generateBackupTrendSummary(input);
    return res.json({
      modelUsed: "Rule-Based Core Engine (Offline Mode)",
      days: plan,
      trendSummary: trends
    });
  }

  try {
    console.log("Menginisialisasi klien Gemini server-side dengan kunci yang tersedia...");
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });

    const promptMessage = `
    Bertindaklah sebagai Content Strategist professional, UI/UX Designer, dan Creative Director yang andal.
    Tugasmu adalah menghasilkan 'Content Plan 1 Bulan' (30 Hari) penuh yang berorientasi hasil, kreatif, taktis, dan disesuaikan secara mendalam dengan data masukan pengguna berikut.

    GOOGEL SEARCH INTELLIGENCE MANDATE:
    Gunakan alat penelusuran Google Search yang tersedia untuk Anda untuk mencari tren terkini, diskusi hangat, konten viral terbaru, atau hashtag trending di Indonesia yang relevan dengan Niche Utama: '${input.primaryNiche}'.
    Tenun secara kreatif solusi rill atau ide viral yang Anda dapatkan dari pencarian web ke dalam beberapa rencana konten harian agar kalender sosial media ini benar-benar terpercaya, modern, up-to-date, dan terintegrasi dengan tren nyata saat ini!

    AKUN & BRAND:
    - Nama Akun: ${input.accountName}
    - Nama Brand: ${input.brandName}
    - Deskripsi Singkat: ${input.brandDescription}
    - Gaya Visual: ${input.visualStyle} (Gunakan gaya ini untuk menginstruksikan rancangan visual!)
    - Tone Komunikasi: ${input.communicationTone}
    - CTA Utama: ${input.mainCTA}

    STRATEGI KONTEN:
    - Niche Utama: ${input.primaryNiche} (${input.subNiche1}, ${input.subNiche2}, ${input.subNiche3})
    - Tujuan Utama: ${input.goals?.join(", ")}
    - Target Audiens: Usia ${input.audienceAge}, Gender ${input.audienceGender}, Lokasi ${input.audienceLocation}, Profesi ${input.audienceProfession}.
    - Masalah Utama Audiens: ${input.audiencePainPoints}
    - Keinginan Utama Audiens: ${input.audienceDesires}
    - Bahasa verbal audiens: ${input.audienceLanguage}
    - Frekuensi Upload: ${input.uploadsPerWeek} kali per minggu, dilakukan pada Hari ${input.uploadDays} jam ${input.uploadHours}.
    - Platform Terpilih: ${input.platforms?.join(", ")}
    - Format yang diizinkan: ${input.contentFormats?.join(", ")}

    PRODUK/PROGRAM YANG INGIN DIPROMOSIKAN:
    - Nama Produk/Program: ${input.promoProductName}
    - Deskripsi Produk: ${input.promoProductDescription}
    - Benefit Utama: ${input.promoProductBenefits}
    - Harga: ${input.promoProductPrice}
    - Penawaran Spesial: ${input.promoProductOffer}
    - Tautan Beli: ${input.promoProductLink}
    - Keunggulan Utama (USP): ${input.promoProductUSP}
    - Testimoni: ${input.promoProductTestimonial}

    TEMA BULAN INI:
    - Tema Besar: ${input.monthlyTheme}
    - Subtema M1: ${input.week1SubTheme}
    - Subtema M2: ${input.week2SubTheme}
    - Subtema M3: ${input.week3SubTheme}
    - Subtema M4: ${input.week4SubTheme}
    - Momen Penting / Hari Besar: ${input.importantMoments}, ${input.nationalHolidays}

    INFORMASI TAMBAHAN AKUN SAAT INI:
    - Followers: ${input.currentFollowers}, Likes Rata-rata: ${input.avgLikes}, Engagement Rate: ${input.engagementRate}
    - Masalah Akun: ${input.currentAccountIssues}
    - Target Pertumbuhan: ${input.growthTarget}

    ATURAN & STRUKTUR LUARAN:
    Format respon mutlak wajib dalam valid JSON Object dengan dua properti utama: "trendSummary" dan "days". Jangan menyisipkan markdown luar apa pun, kembalikan hanya JSON murni sesuai schema.

    - "trendSummary" harus menganalisis tren terhangat, perbincangan viral, pencarian populer, atau hashtag trending di Indonesia selama 3 HARI TERAKHIR (Gunakan real-time Google Search!) berfokus pada Niche: '${input.primaryNiche}'.
    - "days" harus berisi tepat 30 buah rencana konten harian (Masing-masing hari diwakili satu objek di dalam array JSON).
    
    Pastikan pilar konten bervariasi harmonis antara:
    - Edukasi (pemberian solusi, tips belajar praktis)
    - Engagement (kuis, tanya jawab, curhat interaktif, meme cerdas)
    - Promosi (penjualan produk/program dengan copy persuasif, benefit, diskon)
    - Branding (kejujuran institusi, sejarah, di balik layar tim pendiri)

    Setiap hari harus memiliki data logis, komplit, dan ditulis dalam Bahasa Indonesia yang segar, profesional, dan kaya copywriting aktif.
    
    Format respon mutlak wajib mengikuti struktur JSON Object berikut:
    {
      "trendSummary": {
        "title": "Tren Hangat Terkini: [Nama Niche]",
        "description": "Ringkasan pergerakan tren viral atau topik hangat dalam 3 hari terakhir...",
        "hotTags": ["#tag1", "#tag2", "#tag3"],
        "trendsList": [
          {
            "topic": "Judul tren / topik hangat",
            "explanation": "Penjelasan detail mengapa topik ini mencuat",
            "viralityReason": "Penyebab reaksi viral dari audiens",
            "suggestedAngle": "Saran implementasi angle buat brand Anda"
          }
        ]
      },
      "days": [
        {
          "day": 1,
          "date": "Hari ke-1",
          "platform": "Masukkan satu platform sesuai masukan platforms",
          "format": "Masukkan satu format sesuai format yang diizinkan",
          "pilar": "Edukasi atau Promosi atau Engagement atau Branding",
          "theme": "Sebutkan tema besar harian",
          "title": "Judul konten yang sangat catchy",
          "hook": "Kalimat hook pembuka 1-3 detik pertama atau slide 1 yang memikat",
          "body": "Penjelasan inti konsep / isi postingan secara ringkas teratur",
          "caption": "Draft caption lengkap Bahasa Indonesia yang persuasif, rapi dengan spasial space enter yang memadai, menyertakan CTA dan Hashtag bertarget",
          "cta": "Kalimat call to action spesifik",
          "hashtag": "Kumpulan tagar bertarget dipisahkan spasi",
          "visualReference": "Deskripsi atau URL unsplash visual b-roll/foto yang disarankan",
          "designIdea": "Deskripsi tata letak desainer gambar / carousel lengkap dengan saran warna",
          "videoIdea": "Storyboarding timeline video detil jika Reels/TikTok/Short (atau 'N/A' jika gambar biasa)",
          "videoDuration": "Durasi video (contoh: '15-30 detik', atau 'N/A' jika statis)",
          "assetsNeeded": ["daftar aset gambar", "video", "atau klip audio"],
          "goal": "Tujuan spesifik dari postingan hari ini",
          "priority": "Tinggi atau Sedang atau Rendah",
          "status": "Ide",
          "script": "Script dialog voiceover penuh jika formatnya video (atau deskripsi narasi)",
          "imgAiPrompt": "Prompt teks AI mendalam dalam Bahasa Inggris untuk generator gambar GPT image 2 sesuai tema ini",
          "videoAiPrompt": "Prompt teks AI mendalam dalam Bahasa Inggris untuk generator video AI (Nano Banana 2) sesuai tema ini",
          "designBrief": "Brief formal untuk tim desain grafis internal",
          "productionChecklist": ["Daftar checklist langkah pengerjaan pasca produksi harian"]
        }
      ]
    }
    `;

    console.log("Memanggil model gemini-3.5-flash...");
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptMessage,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.9,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            trendSummary: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                hotTags: { type: Type.ARRAY, items: { type: Type.STRING } },
                trendsList: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      topic: { type: Type.STRING },
                      explanation: { type: Type.STRING },
                      viralityReason: { type: Type.STRING },
                      suggestedAngle: { type: Type.STRING }
                    },
                    required: ["topic", "explanation", "viralityReason", "suggestedAngle"]
                  }
                }
              },
              required: ["title", "description", "trendsList"]
            },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  date: { type: Type.STRING },
                  platform: { type: Type.STRING },
                  format: { type: Type.STRING },
                  pilar: { type: Type.STRING },
                  theme: { type: Type.STRING },
                  title: { type: Type.STRING },
                  hook: { type: Type.STRING },
                  body: { type: Type.STRING },
                  caption: { type: Type.STRING },
                  cta: { type: Type.STRING },
                  hashtag: { type: Type.STRING },
                  visualReference: { type: Type.STRING },
                  designIdea: { type: Type.STRING },
                  videoIdea: { type: Type.STRING },
                  videoDuration: { type: Type.STRING },
                  assetsNeeded: { type: Type.ARRAY, items: { type: Type.STRING } },
                  goal: { type: Type.STRING },
                  priority: { type: Type.STRING },
                  status: { type: Type.STRING },
                  script: { type: Type.STRING },
                  imgAiPrompt: { type: Type.STRING },
                  videoAiPrompt: { type: Type.STRING },
                  designBrief: { type: Type.STRING },
                  productionChecklist: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["day", "platform", "pilar", "title", "hook", "caption", "cta"]
              }
            }
          },
          required: ["trendSummary", "days"]
        }
      }
    });

    const text = response.text || "{}";
    const parsedData = JSON.parse(text);
    const parsedDays = parsedData.days || [];
    const trendSummary = parsedData.trendSummary || generateBackupTrendSummary(input);
    
    // Extract Google Search grounding chunks for transparency
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const groundingSources = groundingChunks?.map((chunk: any) => {
      if (chunk.web) {
        return {
          title: chunk.web.title || chunk.web.uri || "Referensi Web Terkait",
          uri: chunk.web.uri
        };
      }
      return null;
    }).filter((s: any) => s !== null && s.uri) || [];

    // Safety check: Pastikan terkumpul 30 hari. Jika kurang, kita bantu lengkapi atau return yang digenerate
    console.log(`Berhasil menghasilkan ${parsedDays.length} hari dari Gemini dengan Google Search Grounding.`);
    
    if (parsedDays && parsedDays.length > 0) {
      const today = new Date();
      // Masukkan default status 'Ide' pada setiap hari jika belum diset
      const completedDays = parsedDays.map((item: any, idx: number) => {
        const itemDay = item.day || (idx + 1);
        
        // Buat objek tanggal dinamis ke depan
        const targetDate = new Date();
        targetDate.setDate(today.getDate() + itemDay);
        const dateString = targetDate.toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        });

        return {
          ...item,
          day: itemDay,
          date: item.date || dateString,
          status: item.status || (itemDay === 1 ? "Siap Upload" : itemDay <= 3 ? "Proses Desain" : "Ide"),
          priority: item.priority || (item.pilar === "Promosi" ? "Tinggi" : "Sedang"),
          videoDuration: item.videoDuration || (["Reels", "TikTok", "YouTube Shorts"].includes(item.platform) ? "15-30 detik" : "N/A"),
          assetsNeeded: item.assetsNeeded || ["Template postingan", "Grafis pendukung"],
          productionChecklist: item.productionChecklist || ["Buat visual", "Review copywriting", "Siapkan upload"]
        };
      });

      // Jika kurang dari 30 hari karena terpotong, sambung sisa harinya dengan generator fallback yang aman
      if (completedDays.length < 30) {
        console.log(`Layanan Gemini melampirkan hasil parsial (${completedDays.length} hari). Melengkapi sisa hari agar genap 30 hari...`);
        const fallbackFull = generateBackupContentPlan(input);
        for (let i = completedDays.length; i < 30; i++) {
          const fallbackItem = fallbackFull[i];
          fallbackItem.day = i + 1;
          completedDays.push(fallbackItem);
        }
      }

      return res.json({
        modelUsed: "gemini-3.5-flash with Google Search Grounding",
        days: completedDays.slice(0, 30), // Garansi tepat 30 hari
        groundingSources,
        trendSummary
      });
    }

    throw new Error("Respon kosong atau tidak valid dari model.");
  } catch (err: any) {
    console.error("Gagal menggunakan Gemini API. Beralih ke Generator Cadangan:", err.message);
    const plan = generateBackupContentPlan(input);
    const trends = generateBackupTrendSummary(input);
    const friendlyError = getFriendlyErrorMessage(err);
    return res.json({
      modelUsed: "Rule-Based Core Engine (API Fallback)",
      days: plan,
      groundingSources: [],
      trendSummary: trends,
      warning: `Notifikasi AI: ${friendlyError}`
    });
  }
});

// App Engine Serving & Vite Setup ======================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Memulai server dalam mode PENGEMBANGAN (Development)...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Memulai server dalam mode PRODUKSI (Production)...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[OK] Server berjalan mulus pada http://localhost:${PORT}`);
  });
}

startServer();
