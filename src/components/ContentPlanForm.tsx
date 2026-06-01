import React, { useState } from "react";
import { ContentPlanInput } from "../types";
import { SAMPLE_INPUT } from "../sampleData";
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  AlertCircle,
  HelpCircle,
  User,
  Heart,
  BarChart,
  Calendar,
  Layers,
  Flame
} from "lucide-react";

interface ContentPlanFormProps {
  onGenerate: (data: ContentPlanInput) => void;
  isGenerating: boolean;
}

export default function ContentPlanForm({ onGenerate, isGenerating }: ContentPlanFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [validationError, setValidationError] = useState("");

  const [formData, setFormData] = useState<ContentPlanInput>({
    accountName: "",
    brandName: "",
    brandDescription: "",
    competitors: ["", "", ""],
    competitorLinks: "",
    visualStyle: "Modern",
    communicationTone: "Friendly",
    mainCTA: "Daftar sekarang melalui link di bio",
    upcomingEvent: "",
    mainCampaign: "",
    
    goals: ["Meningkatkan awareness", "Edukasi audiens"],
    platforms: ["Instagram Feed", "Instagram Reels"],
    
    primaryNiche: "",
    subNiche1: "",
    subNiche2: "",
    subNiche3: "",
    
    audienceAge: "25-35 tahun",
    audienceGender: "Semua",
    audienceLocation: "Indonesia",
    audienceProfession: "Mahasiswa & Profesional",
    audiencePainPoints: "",
    audienceDesires: "",
    audienceHabits: "",
    audienceLanguage: "Casual & Friendly",
    audienceKnowledgeLevel: "Menengah",
    
    uploadsPerWeek: 5,
    uploadDays: "Senin, Rabu, Jumat, Sabtu",
    uploadHours: "19:00 WIB",
    reelsPerWeek: 2,
    feedsPerWeek: 2,
    storiesPerWeek: 7,
    carouselsPerWeek: 1,
    promoPerWeek: 1,
    educationalPerWeek: 3,
    
    contentFormats: ["Carousel", "Reels", "Story"],
    
    promoProductName: "",
    promoProductDescription: "",
    promoProductBenefits: "",
    promoProductPrice: "",
    promoProductOffer: "",
    promoProductLink: "",
    promoProductUSP: "",
    promoProductTestimonial: "",
    
    resources: ["Foto produk", "Desainer", "Copywriter"],
    
    monthlyTheme: "",
    week1SubTheme: "",
    week2SubTheme: "",
    week3SubTheme: "",
    week4SubTheme: "",
    importantMoments: "",
    nationalHolidays: "",
    specialCampaign: "",
    
    currentFollowers: "",
    avgLikes: "",
    avgComments: "",
    avgShares: "",
    avgSaves: "",
    avgReach: "",
    engagementRate: "",
    bestPerformingContent: "",
    worstPerformingContent: "",
    currentAccountIssues: "",
    growthTarget: ""
  });

  // Checklist arrays based on prompt requirements
  const goalOptions = [
    "Meningkatkan awareness",
    "Meningkatkan engagement",
    "Meningkatkan follower",
    "Meningkatkan penjualan",
    "Meningkatkan pendaftaran",
    "Meningkatkan donasi",
    "Edukasi audiens",
    "Branding lembaga",
    "Promosi program",
    "Dokumentasi kegiatan"
  ];

  const platformOptions = [
    "Instagram Feed",
    "Instagram Reels",
    "Instagram Story",
    "TikTok",
    "YouTube Shorts",
    "YouTube Long Video",
    "Facebook",
    "LinkedIn",
    "Blog/Website"
  ];

  const formatOptions = [
    "Single image",
    "Carousel",
    "Reels",
    "Story",
    "Live",
    "Video edukasi",
    "Video testimoni",
    "Behind the scene",
    "Infografis",
    "Quote",
    "Meme edukatif",
    "Studi kasus",
    "Tutorial",
    "Dokumentasi acara"
  ];

  const resourceOptions = [
    "Foto produk",
    "Video dokumentasi",
    "Testimoni",
    "Desainer",
    "Videografer",
    "Copywriter",
    "Admin media sosial",
    "Budget iklan",
    "Website",
    "Landing page",
    "Data pelanggan",
    "Logo brand",
    "Brand guideline"
  ];

  const visualStyles = [
    "Minimalis", "Modern", "Islami", "Elegan", "Fun", "Youthful", "Premium", "Corporate", "Cinematic", "Edukatif"
  ];

  const tones = [
    "Formal", "Friendly", "Santai", "Profesional", "Emosional", "Inspiratif", "Lucu", "Islami", "Storytelling"
  ];

  // Helper handling checkbox changes
  const handleCheckboxChange = (field: keyof ContentPlanInput, value: string) => {
    setFormData(prev => {
      const currentArr = prev[field] as string[];
      if (currentArr.includes(value)) {
        return { ...prev, [field]: currentArr.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...currentArr, value] };
      }
    });
  };

  // Helper autofilling with randomly generated niche profiles
  const handleLoadSampleData = () => {
    const presets: ContentPlanInput[] = [
      {
        accountName: "@kodingpintar",
        brandName: "KodingPintar Academy",
        brandDescription: "Sekolah pemrograman online interaktif yang fokus mencetak lulusan IT handal siap kerja melalui bootcamp terjangkau dengan kurikulum React, TypeScript, dan Node.js.",
        competitors: ["Dicoding Indonesia", "Hacktiv8", "BuildWithAngga"],
        competitorLinks: "dicoding.com, hacktiv8.com",
        visualStyle: "Modern",
        communicationTone: "Storytelling",
        mainCTA: "Daftar Bootcamp IT di link bio kami",
        upcomingEvent: "Webinar Live 'Rahasia Sukses Tembus Kerja Perusahaan Tech Global' (Akhir bulan ini)",
        mainCampaign: "Pendaftaran Full-stack Web Developer Batch 15",
        goals: ["Meningkatkan awareness", "Edukasi audiens", "Meningkatkan penjualan"],
        platforms: ["Instagram Feed", "Instagram Reels", "TikTok", "LinkedIn"],
        primaryNiche: "Programming & Web Development",
        subNiche1: "React & TypeScript",
        subNiche2: "Tips Karir Industri IT",
        subNiche3: "Kerja Remote / Freelance",
        audienceAge: "18 - 30 Tahun",
        audienceGender: "Mayoritas Laki-laki (75%) dan Perempuan (25%)",
        audienceLocation: "Seluruh Indonesia, berfokus di Jabodetabek & Kota Pendidikan",
        audienceProfession: "Mahasiswa IT, Fresh Graduate, Career Switcher, Junior Web Dev",
        audiencePainPoints: "Gaji stagnan di UMR, kesulitan memahami dokumentasi koding yang rumit, dan tidak tahu cara membangun portofolio yang dilirik oleh recruiter tech.",
        audienceDesires: "Menguasai skill pemrograman modern, bisa career switch dengan gaji tinggi, atau bisa bekerja remote dari rumah secara fleksibel.",
        audienceHabits: "Sangat aktif online di malam hari (jam 20:00 - 23:00) saat selesai jam kuliah atau kantor, hobi scrolling LinkedIn dan Twitter Tech.",
        audienceLanguage: "Casual, santai, bumbu istilah tech ('deploy', 'bug', 'syntax', 'gaji dua digit') namun tetap mendidik dan mudah dipahami pemula.",
        audienceKnowledgeLevel: "Pemula (dari nol basis non-IT) hingga Menengah.",
        uploadsPerWeek: 5,
        uploadDays: "Senin, Selasa, Rabu, Kamis, Jumat",
        uploadHours: "18:30 WIB",
        reelsPerWeek: 3,
        feedsPerWeek: 2,
        storiesPerWeek: 7,
        carouselsPerWeek: 2,
        promoPerWeek: 1,
        educationalPerWeek: 4,
        contentFormats: ["Carousel", "Reels", "Story", "Behind the scene", "Tutorial"],
        promoProductName: "Bootcamp React & TypeScript: Zero to Job-Ready",
        promoProductDescription: "Program bimbingan koding intensif selama 12 minggu untuk menguasai stack modern demi portofolio spektakuler yang lolos screening HRD.",
        promoProductBenefits: "Review portofolio 1-on-1, bimbingan CV bumbu ATS, mock interview, referral kerja ke partner company, akses rekaman bootcamp selamanya.",
        promoProductPrice: "Rp 1.490.000",
        promoProductOffer: "Diskon Rp 500.000 untuk 50 pendaftar pertama + Bonus course 'Desain DB & API Node.js'.",
        promoProductLink: "kodingpintar.com/react-ready",
        promoProductUSP: "Bootcamp dengan jaminan review koding harian langsung oleh Head of Engineering di startup ternama Indonesia.",
        promoProductTestimonial: "Aris (23, Career Switcher): 'Dulu saya admin gudang, setelah ikut bootcamp KodingPintar sekarang sudah landing job pertama sebagai React Developer di Jakarta!'",
        resources: ["Video dokumentasi", "Desainer", "Copywriter", "Website"],
        monthlyTheme: "Membangun Fondasi Karir Developer Tangguh",
        week1SubTheme: "Mengapa TypeScript Menjadi Standar Berbayar Mahal",
        week2SubTheme: "3 Trik Membuat Portofolio Dilirik HRD Global",
        week3SubTheme: "Rahasia Belajar Koding Tanpa Stress & Burnout",
        week4SubTheme: "Simulasi Tech Interview yang Sering Gagalkan Kandidat",
        importantMoments: "Kelulusan Universitas Q2 / Job Fair Nasional",
        nationalHolidays: "Hari Pendidikan Nasional",
        specialCampaign: "Campaign 'Tantangan 7 Hari Rajin Koding Tanpa Absen'",
        currentFollowers: "22.400",
        avgLikes: "850",
        avgComments: "42",
        avgShares: "180",
        avgSaves: "540",
        avgReach: "11.000",
        engagementRate: "4.5%",
        bestPerformingContent: "Carousel: 'Roadmap Belajar Web Dev dari Nol di 2026' (5k saves)",
        worstPerformingContent: "Single Feed: 'Kenapa HTML itu Bukan Bahasa Pemrograman' (Kurang jalan karena terlalu teoritis)",
        currentAccountIssues: "Kurang konsisten posting reels baru, visual color-palette sering berubah-ubah.",
        growthTarget: "Mencapai 30k followers, menaikkan closing conversion rate pendaftaran bootcamp ke 5%."
      },
      {
        accountName: "@geprekgembira.id",
        brandName: "Ayam Geprek Gembira",
        brandDescription: "Kemitraan kuliner ayam geprek dengan sambal korek melimpah ulek dadakan dan mozarela leleh gurih. Porsi super puas untuk perkantoran & mahasiswa.",
        competitors: ["Ayam Keprabon", "Geprek Bensu", "Ayam Blenger PSP"],
        competitorLinks: "geprekbensu.com",
        visualStyle: "Fun",
        communicationTone: "Santai",
        mainCTA: "Pesan via GoFood/GrabFood atau kunjungi outlet terdekat",
        upcomingEvent: "Promo Liburan Akhir Pekan 'Beli 2 Geprek Mozarela Gratis 2 Es Teh Manis Jumbo'",
        mainCampaign: "Pesta Sambal Korek Super Pedas Hemat 30%",
        goals: ["Meningkatkan awareness", "Meningkatkan penjualan", "Meningkatkan engagement"],
        platforms: ["Instagram Feed", "Instagram Reels", "TikTok"],
        primaryNiche: "Kuliner & Restoran Cepat Saji",
        subNiche1: "Menu Geprek Keju Sambal Korek",
        subNiche2: "Video ASMR Mukbang Super Pedas",
        subNiche3: "Promo Paket Hemat Mahasiswa",
        audienceAge: "16 - 32 Tahun",
        audienceGender: "Semua Gender (Laki-laki & Perempuan imbang)",
        audienceLocation: "Dekat area kampus & pusat perkantoran di kota-kota besar",
        audienceProfession: "Mahasiswa, Pelajar, Karyawan Kantoran, Keluarga Muda",
        audiencePainPoints: "Lapar mendadak tapi dompet menipis di akhir bulan, bosan makan siang yang monoton, butuh asupan pedas untuk mood booster.",
        audienceDesires: "Makan kenyang porsi jumbo, rasa ayamnya gurih meresap dengan sambal ulek pedas fresh, harga bersahabat di kantong.",
        audienceHabits: "Sangat aktif scroll HP saat jam makan siang (11:30 - 13:00) dan setelah pulang aktivitas sore hari (16:30 - 19:00).",
        audienceLanguage: "Sangat kasual, asyik, gaul khas Gen Z, penuh candaan/humor, meme makanan, memanggil audiens dengan julukan 'Sobat Gembira'.",
        audienceKnowledgeLevel: "Menengah (paham ragam jenis geprek tapi peka harga promo hebat).",
        uploadsPerWeek: 6,
        uploadDays: "Senin, Selasa, Kamis, Jumat, Sabtu, Minggu",
        uploadHours: "11:00 WIB, 17:00 WIB",
        reelsPerWeek: 4,
        feedsPerWeek: 2,
        storiesPerWeek: 14,
        carouselsPerWeek: 1,
        promoPerWeek: 2,
        educationalPerWeek: 2,
        contentFormats: ["Reels", "Story", "Single image", "Video testimoni", "Behind the scene"],
        promoProductName: "Paket Gembira Puas Mozarela",
        promoProductDescription: "Ayam geprek crispy renyah tanpa tulang, ditaburi keju mozarela tebal yang dibakar langsung dengan torch, lengkap nasi pulen panas.",
        promoProductBenefits: "Porsi kenyang garansi, ekstra sambal korek fresh ulek tangan, gratis request level pedas 1-10.",
        promoProductPrice: "Rp 24.000",
        promoProductOffer: "Dapatkan Voucher Diskon Ongkir untuk pemesanan minimal 3 paket di GoFood.",
        promoProductLink: "bit.ly/pesangeprekgembira",
        promoProductUSP: "Mozarela premium meleleh tebal dengan racikan bumbu khas bawang putih purwodadi yang sangat harum gurih.",
        promoProductTestimonial: "Vina (21, Mahasiswi): 'Asli ngga pelit mozarela-nya! Ayamnya garing, sambel level 5 beneran bikin dahi keringatan tapi nagih parah.'",
        resources: ["Foto produk", "Video dokumentasi", "Videografer"],
        monthlyTheme: "Pesta Pedas Bahagia Sobat Gembira",
        week1SubTheme: "Mengapa Sambal Bawang Harus Selalu Ulek Dadakan",
        week2SubTheme: "Kreasi Menu Seru: Mukbang Level 10 Mozarela Burn",
        week3SubTheme: "Siasat Makan Enak & Puas Saat Magang Dompet Kritis",
        week4SubTheme: "Behind the Scenes: Proses Kebersihan Dapur Khas Gembira",
        importantMoments: "Ujian Akhir Semester Kampus / Gajian Tanggal Muda",
        nationalHolidays: "Hari Pangan Sedunia",
        specialCampaign: "Campaign 'Tebak Berapa Sendok Sambal Korek'",
        currentFollowers: "15,800",
        avgLikes: "620",
        avgComments: "110",
        avgShares: "220",
        avgSaves: "130",
        avgReach: "8.900",
        engagementRate: "5.1%",
        bestPerformingContent: "Reels ASMR: Keju Mozarela Meleleh Torch-Burn (120k views)",
        worstPerformingContent: "Single Poster: Informasi Alamat Outlet Baru (Kurang diminati karena sekedar teks static)",
        currentAccountIssues: "Waktu upload kurang konsisten, butuh lebih banyak interaksi direct lewat stiker story.",
        growthTarget: "Menaikkan penjualan outlet lewat delivery partner sebesar 25%, mencapai 18k followers."
      },
      {
        accountName: "@fitstep.coach",
        brandName: "FitStep Health Coaching",
        brandDescription: "Layanan edukasi & bimbingan diet online yang praktis dan ramah pemula. Fokus pada fat loss tanpa kelaparan esktrem, tanpa obat aneh, berbasis sains.",
        competitors: ["Fit Academy", "Dunia Ade Rai", "DietSantuy"],
        competitorLinks: "dietsantuy.com",
        visualStyle: "Minimalis",
        communicationTone: "Friendly",
        mainCTA: "Daftar konseling nutrisi privat 1-on-1",
        upcomingEvent: "Webinar Gratis '3 Langkah Menurunkan Berat Badan Tanpa Stop Makan Nasi Goreng'",
        mainCampaign: "Pendaftaran Online Fat Loss Coaching Coach 1-on-1 Batch Juli",
        goals: ["Meningkatkan engagement", "Edukasi audiens", "Meningkatkan penjualan"],
        platforms: ["Instagram Feed", "Instagram Reels", "YouTube Shorts"],
        primaryNiche: "Kesehatan, Olahraga, & Diet Praktis",
        subNiche1: "Defisit Kalori Santai",
        subNiche2: "Rekomendasi Menu Makanan Supermarket",
        subNiche3: "Olahraga 15 Menit di Kamar",
        audienceAge: "24 - 45 Tahun",
        audienceGender: "Perempuan (60%) & Laki-laki (40%)",
        audienceLocation: "Karyawan perkantoran, ibu rumah tangga kota urban Indonesia",
        audienceProfession: "Pekerja Kantoran, Ibu Rumah Tangga, Pengusaha Sibuk",
        audiencePainPoints: "Takut makan karbo, metabolisme melambat di umur 30-an, tidak punya waktu olahraga 2 jam di gym mewah, berat badan gampang yoyo kembali naik.",
        audienceDesires: "Turun berat badan konstan, stamina bugar sepanjang hari, baju lama muat kembali tanpa harus menderita tidak makan malam.",
        audienceHabits: "Aktif online jam 07:00 pagi (sebelum kerja) dan malam hari jam 20:00 (menjelang istirahat tidur).",
        audienceLanguage: "Inspiratif, logis, menyemangati, mematahkan mitos diet kaku dengan data ilmiah ramah orang awam.",
        audienceKnowledgeLevel: "Pemula (masih mengira diet = tidak makan nasi).",
        uploadsPerWeek: 5,
        uploadDays: "Senin, Selasa, Kamis, Jumat, Minggu",
        uploadHours: "07:30 WIB, 19:00 WIB",
        reelsPerWeek: 3,
        feedsPerWeek: 2,
        storiesPerWeek: 7,
        carouselsPerWeek: 2,
        promoPerWeek: 1,
        educationalPerWeek: 4,
        contentFormats: ["Carousel", "Reels", "Story", "Tutorial", "Video testimoni"],
        promoProductName: "FitStep 30-Day Slim & Fit Blueprint",
        promoProductDescription: "Panduan defisit kalori personal lengkap dengan database kalori kuliner lokal + group pendampingan harian dipantau Certified Nutrition Coach.",
        promoProductBenefits: "Menu makan harian custom, e-book resep makanan diet lezat khas Indonesia, evaluasi berat badan mingguan, akses video workout rumah.",
        promoProductPrice: "Rp 299.000",
        promoProductOffer: "Dapatkan diskon 30% pendaftaran hari ini + Free shaker eksklusif FitStep.",
        promoProductLink: "fitstep.coach/slim-blueprint",
        promoProductUSP: "Satu-satunya program yang menjamin piring makan Anda tetap boleh berisi nasi hangat dan lauk pauk lokal.",
        promoProductTestimonial: "Ratih (32, Pekerja): 'Dalam 4 minggu turun 4.5kg! Padahal masih makan lauk padang porsi diatur, lingkar pinggang berkurang drastis.'",
        resources: ["Video penjelas", "Desainer", "Testimoni", "Brand guideline"],
        monthlyTheme: "Membentuk Habit Diet Berkelanjutan Bebas Stress",
        week1SubTheme: "Mengapa Nasi Bukan Musuh Utama Fat Loss",
        week2SubTheme: "Contoh Menu Diet Rp 25.000 Berprotein Tinggi di Minimarket",
        week3SubTheme: "Analisis Gerakan Olahraga Rumah yang Bakar Kalori Maksimal",
        week4SubTheme: "Penyebab Berat Badan Stuck Meskipun Sedikit Makan",
        importantMoments: "Resolusi Menjelang Pertengahan Tahun",
        nationalHolidays: "Hari Olahraga Nasional",
        specialCampaign: "Campaign 'Tantangan 10.000 Langkah Sehari Selama Seminggu'",
        currentFollowers: "32,100",
        avgLikes: "1,150",
        avgComments: "68",
        avgShares: "490",
        avgSaves: "920",
        avgReach: "24,000",
        engagementRate: "4.7%",
        bestPerformingContent: "Carousel: 'Panduan Makanan Pembakar Lemak di Minimarket' (12k saves)",
        worstPerformingContent: "Single Feed: 'Anatomi Otot Latissimus Dorsi' (Terlalu rumit untuk pemula diet)",
        currentAccountIssues: "Audiens antusias bertanya di DM tapi ragu closing daftar bimbingan berbayar.",
        growthTarget: "Mendapat 120 peserta baru untuk batch privat berikutnya, naikin followers ke 35k."
      },
      {
        accountName: "@modalpintar.id",
        brandName: "Modal Pintar Finansial",
        brandDescription: "Media edukasi manajemen keuangan pribadi, investasi saham/reksadana pemula, dan tips berhemat cerdas demi meraih finansial mandiri.",
        competitors: ["Ternak Uang", "Finansialku", "ZAP Finance"],
        competitorLinks: "ternakuang.id",
        visualStyle: "Premium",
        communicationTone: "Profesional",
        mainCTA: "Daftar Workshop Perencanaan Keuangan Mandiri",
        upcomingEvent: "Workshop Online 'Zero to Financial Freedom di Tengah Gempuran PayLater'",
        mainCampaign: "Pesta Pelatihan Mengatur Gaji UMR Menjadi Portofolio Investasi Mantap",
        goals: ["Meningkatkan awareness", "Edukasi audiens", "Meningkatkan follower"],
        platforms: ["Instagram Feed", "Instagram Reels", "LinkedIn"],
        primaryNiche: "Keuangan Pribadi & Investasi Pemula",
        subNiche1: "Bebas Utang & Pinjol",
        subNiche2: "Tips Alokasi Gaji UMR",
        subNiche3: "Analisis Saham Sektor Konsumer",
        audienceAge: "21 - 35 Tahun",
        audienceGender: "Semua Gender (Laki-laki 55%, Perempuan 45%)",
        audienceLocation: "Karyawan muda metropolitan, pekerja WFH, pasangan baru menikah",
        audienceProfession: "Karyawan Swasta, Freelancer, Pemilik Toko, Fresh Graduate",
        audiencePainPoints: "Gaji lewat begitu saja di tanggal 5, terjerat utang konsumtif/paylater, merasa investasi saham terlalu menyeramkan, bingung cara menghitung dana darurat.",
        audienceDesires: "Punya keuangan sehat terkontrol, bebas dari mimpi buruk utang, punya dana darurat mapan, tabungan terinvestasi aman bernilai tumbuh.",
        audienceHabits: "Aktif membaca artikel finansial saat pagi hari jam kerja (08:00 - 09:00) dan malam selepas penat kerja (19:30 - 21:30).",
        audienceLanguage: "Profesional, mudah dimengerti tanpa istilah bursa yang melangit, menggunakan analogi kehidupan harian (kopi susu, makan bioskop).",
        audienceKnowledgeLevel: "Pemula (belum paham beda reksadana pasar uang dan saham).",
        uploadsPerWeek: 5,
        uploadDays: "Senin, Selasa, Rabu, Jumat, Sabtu",
        uploadHours: "08:00 WIB, 19:00 WIB",
        reelsPerWeek: 2,
        feedsPerWeek: 3,
        storiesPerWeek: 7,
        carouselsPerWeek: 3,
        promoPerWeek: 1,
        educationalPerWeek: 4,
        contentFormats: ["Carousel", "Reels", "Story", "Infografis", "Studi kasus"],
        promoProductName: "Masterclass Perencana Keuangan Bersertifikat (FPSB)",
        promoProductDescription: "Kelas intensif 4 sesi via Zoom mengajarkan metode alokasi 50/30/20, simulasi melunasi utang secepat kilat, dan memilih instrumen reksadana otomatis.",
        promoProductBenefits: "Akses Excel Sheet Financial Tracker otomatis, materi pdf interaktif, feedback portofolio keuangan pribadi dari mentor ahli, grup tanya jawab.",
        promoProductPrice: "Rp 195.000",
        promoProductOffer: "Beli 1 gratis 1 tiket ajak pasangan/teman dekat.",
        promoProductLink: "modalpintar.id/masterclass",
        promoProductUSP: "Satu-satunya kelas keuangan yang memberikan template excel otomatis siap kustomisasi.",
        promoProductTestimonial: "Hendra (26, Karyawan): 'Excel Tracker-nya penyelamat hidup! Baru tahu bocor alus saya di jajanan kopi sampai 800rb sebulan. Sekarang tabungan mulai aman!'",
        resources: ["Foto produk", "Desainer", "Copywriter", "Website"],
        monthlyTheme: "Merdeka Finansial Bebas Cemas Pinjol",
        week1SubTheme: "Langkah Darurat Lepas dari Jeratan Pinjol & Paylater",
        week2SubTheme: "Simulasi Atur Gaji Rp 4 Juta di Jakarta (Aman, Nabung, Jajan)",
        week3SubTheme: "3 Reksadana Terbaik Untuk Amankan Dana Darurat Pemula",
        week4SubTheme: "Gaya Hidup FOMO vs Finansial Sehat Jangka Panjang",
        importantMoments: "Hari Gajian Serentak Akhir Bulan",
        nationalHolidays: "Hari Pahlawan / Hari Buruh Nasional",
        specialCampaign: "Campaign 'Tantangan 3 Hari No-Spend Day'",
        currentFollowers: "41,200",
        avgLikes: "1,450",
        avgComments: "92",
        avgShares: "720",
        avgSaves: "1,100",
        avgReach: "28,500",
        engagementRate: "4.9%",
        bestPerformingContent: "Carousel: 'Format Excel Atur Gaji UMR Cuma-cuma' (18k saves)",
        worstPerformingContent: "Single Feed: 'Pengertian Compound Interest Secara Rumus Matematika' (Kurang digemari karena terlalu teoritis akademis)",
        currentAccountIssues: "Postingan Reels kurang interaktif, konten visual butuh disederhanakan agar tidak terlalu padat tulisan.",
        growthTarget: "Menggaet 300 pendaftar workshop baru, naik followers ke 50k dalam rentang 1 bulan."
      },
      {
        accountName: "@glowup_organic",
        brandName: "Glowup Organic Cosmetic",
        brandDescription: "Lembaga pembuat skincare alami berbahan teh hijau organik dan air murni bunga mawar. Membantu mengatasi bruntusan dan jerawat tanpa merkuri.",
        competitors: ["Somethethic", "Avoskin", "Skintifik"],
        competitorLinks: "avoskinbeauty.com",
        visualStyle: "Elegan",
        communicationTone: "Friendly",
        mainCTA: "Dapatkan paket bundle glowing di Shopee/Tokopedia",
        upcomingEvent: "Flash Sale Shopee 7.7 Glowing Day Hemat Sampai 50%",
        mainCampaign: "Pemberantasan Bruntusan Kulit Sensitif Alami 14 Hari",
        goals: ["Meningkatkan penjualan", "Meningkatkan engagement", "Branding lembaga"],
        platforms: ["Instagram Feed", "Instagram Reels", "TikTok", "Instagram Story"],
        primaryNiche: "Kecantikan, Skincare, & Lifestyle Sehat",
        subNiche1: "Solusi Jerawat & Bruntusan",
        subNiche2: "Tips Skin Barrier Sehat",
        subNiche3: "Analisis Kandungan Berbahaya Skincare",
        audienceAge: "17 - 28 Tahun",
        audienceGender: "Perempuan (90%) dan Laki-laki (10%)",
        audienceLocation: "Seluruh kota besar Indonesia, remaja aktif, mahasiswi, pekerja muda",
        audienceProfession: "Mahasiswi, Remaja Sekolah, Karyawan Muda, Beauty Enthusiast",
        audiencePainPoints: "Kulit kusam berminyak, bruntusan kemerahan parah, minder bergaul di kampus, dan takut menjadi korban krim abal-abal bermerkuri.",
        audienceDesires: "Kulit bersih sehat alami glowing merata, bebas bruntusan gatal, skin barrier kuat, percaya diri saat berpose foto dekat.",
        audienceHabits: "Sangat aktif scrolling TikTok dan Reels di sore hari menjelang skincare malam (jam 17:00 - 22:00) di kamar tidur.",
        audienceLanguage: "Friendly, akrab memanggil 'Sis', 'Bestie', atau 'Glowies', penuh antusias kecantikan alami, banyak memakai visual estetik pastel.",
        audienceKnowledgeLevel: "Menengah (paham dasar serum, pelembab, sunscreen tapi bingung mencocokkan bahan aktif).",
        uploadsPerWeek: 5,
        uploadDays: "Senin, Rabu, Kamis, Jumat, Minggu",
        uploadHours: "16:00 WIB, 20:00 WIB",
        reelsPerWeek: 3,
        feedsPerWeek: 2,
        storiesPerWeek: 14,
        carouselsPerWeek: 2,
        promoPerWeek: 2,
        educationalPerWeek: 3,
        contentFormats: ["Carousel", "Reels", "Story", "Video testimoni", "Behind the scene"],
        promoProductName: "Glowup Green Tea Calming Serum",
        promoProductDescription: "Serum harian hypoallergenic berbahan ekstrak matcha segar organik yang menenangkan jerawat meradang dan mengecilkan bruntusan dalam 7 hari.",
        promoProductBenefits: "Bebas alkohol, ramah fungal-acne, cruelty-free, aman untuk ibu hamil dan menyusui.",
        promoProductPrice: "Rp 115.000",
        promoProductOffer: "Beli serum gratis mask sheet green tea + mini pouch multifungsi hari ini.",
        promoProductLink: "shopee.co.id/glowup_organic",
        promoProductUSP: "Satu-satunya serum madu matcha lokal dengan sertifikasi uji lab independen anti-iritasi 100%.",
        promoProductTestimonial: "Amel (19, Mahasiswi): 'Dalam seminggu bruntusan di dahiku yang tadinya kasar parah langsung rata! Kulitku jadi super plumpy dan kemerahan hilang.'",
        resources: ["Foto produk", "Video dokumentasi", "Testimoni", "Admin media sosial"],
        monthlyTheme: "Kulit Glowing Alami Bebas Bruntusan",
        week1SubTheme: "Detoksifikasi: Mengapa Skin Barrier yang Baik Menolak Jerawat",
        week2SubTheme: "Trik Layering Serum yang Benar Tanpa Iritasi",
        week3SubTheme: "Kebiasaan Buruk Sebelum Tidur yang Menyuburkan Jerawat",
        week4SubTheme: "Review Jujur: Tes pH Balance Sabun Cuci Muka Alami",
        importantMoments: "Flash Sale Belanja Berkembar Bulanan 7.7",
        nationalHolidays: "Hari Perempuan Sedunia",
        specialCampaign: "Campaign 'Tantangan 7 Hari Rajin Bersihin Muka Sebelum Tidur'",
        currentFollowers: "28,600",
        avgLikes: "940",
        avgComments: "75",
        avgShares: "310",
        avgSaves: "610",
        avgReach: "16,000",
        engagementRate: "4.2%",
        bestPerformingContent: "Reels: 'Eksperimen Timun Es Menghilangkan Jerawat' (200k views)",
        worstPerformingContent: "Single Feed: 'Sejarah Pertama Kali Kosmetik Diciptakan' (Kurang relevan dengan masalah kulit harian)",
        currentAccountIssues: "Interaksi beralih pesat ke TikTok, kunjungan profile instagram butuh dikuatkan kembali.",
        growthTarget: "Mencapai closing Shopee 500 botol per bulan, naikin instagram followers ke 35k."
      },
      {
        accountName: "@parenting.islami",
        brandName: "Parenting Islami Academy",
        brandDescription: "Lembaga edukasi online & komunitas orang tua yang fokus mengajarkan adab anak, mendidik anak sesuai sunnah, dan mengatasi kecanduan gadget secara praktis.",
        competitors: ["Generasi Al-Fatih", "Parenting Nabawiyah", "Rumah Main Anak"],
        competitorLinks: "instagram.com/parenting_nabawi",
        visualStyle: "Modern",
        communicationTone: "Friendly",
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
        promoProductPrice: "Rp 349.000",
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
      }
    ];

    // Pick a random index
    const randomIndex = Math.floor(Math.random() * presets.length);
    const chosen = presets[randomIndex];

    // Intelligently randomize analytics statistics on every load to generate fresh outputs
    const followersFactor = Math.floor(Math.random() * 80) + 10; // 10k - 90k
    const likesFactor = Math.floor(followersFactor * (Math.random() * 0.06 + 0.02) * 100);
    const commentsFactor = Math.floor(likesFactor * (Math.random() * 0.08 + 0.03));
    const sharesFactor = Math.floor(likesFactor * (Math.random() * 0.25 + 0.1));
    const savesFactor = Math.floor(likesFactor * (Math.random() * 0.5 + 0.3));
    const reachFactor = followersFactor * 600 + Math.floor(Math.random() * 5000);
    const er = (likesFactor + commentsFactor + sharesFactor + savesFactor) / reachFactor * 100;

    const randomizedInput: ContentPlanInput = {
      ...chosen,
      currentFollowers: `${followersFactor.toLocaleString("id-ID")}`,
      avgLikes: `${likesFactor.toLocaleString("id-ID")}`,
      avgComments: `${commentsFactor.toLocaleString("id-ID")}`,
      avgShares: `${sharesFactor.toLocaleString("id-ID")}`,
      avgSaves: `${savesFactor.toLocaleString("id-ID")}`,
      avgReach: `${reachFactor.toLocaleString("id-ID")}`,
      engagementRate: `${er.toFixed(1)}%`
    };

    setFormData(randomizedInput);
    setValidationError("");
  };

  // Validators for specific steps & final sub
  const validateForm = (): boolean => {
    if (!formData.accountName.trim()) {
      setValidationError("Nama Akun wajib diisi!");
      return false;
    }
    if (!formData.primaryNiche.trim()) {
      setValidationError("Niche Utama wajib diisi!");
      return false;
    }
    if (formData.platforms.length === 0) {
      setValidationError("Pilih minimal 1 Platform target pengunggahan!");
      return false;
    }
    if (!formData.audienceAge.trim() || !formData.audiencePainPoints.trim()) {
      setValidationError("Informasi Target Audiens (Usia & Masalah Utama) wajib diisi!");
      return false;
    }
    if (formData.uploadsPerWeek <= 0) {
      setValidationError("Frekuensi Upload per minggu harus minimal 1 kali!");
      return false;
    }
    if (!formData.monthlyTheme.trim()) {
      setValidationError("Tema Besar Bulan Ini wajib ditulis!");
      return false;
    }
    
    setValidationError("");
    return true;
  };

  const handleNext = () => {
    setValidationError("");
    if (currentStep === 1) {
      if (!formData.accountName.trim()) {
        setValidationError("Nama Akun wajib diisi (Langkah 1)!");
        return;
      }
      if (!formData.primaryNiche.trim()) {
        setValidationError("Niche Utama wajib diisi (Langkah 1)!");
        return;
      }
    }
    if (currentStep === 2) {
      if (formData.platforms.length === 0) {
        setValidationError("Pilih minimal satu Platform sosial media (Langkah 2)!");
        return;
      }
    }
    if (currentStep === 3) {
      if (!formData.audienceAge.trim() || !formData.audiencePainPoints.trim()) {
        setValidationError("Informasi Target Audiens (Usia & Masalah Utama) wajib diisi (Langkah 3)!");
        return;
      }
    }
    if (currentStep === 4) {
      if (!formData.monthlyTheme.trim()) {
        setValidationError("Tema Bulanan Utama wajib diisi (Langkah 4)!");
        return;
      }
    }

    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onGenerate(formData);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
      
      {/* Form Header with sample data shortcut */}
      <div className="p-6 md:p-8 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-lg text-slate-800">Peta Input Strategi Konten</h2>
          <p className="text-xs text-slate-400 mt-1">Lengkapi data di bawah untuk merancang kalender 1 bulan Anda</p>
        </div>
        
        <button
          type="button"
          onClick={handleLoadSampleData}
          className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-250 text-emerald-700 text-xs rounded-lg font-medium flex items-center gap-1.5 active:scale-95 transition-all w-full sm:w-auto justify-center"
        >
          <Flame className="w-4 h-4 text-emerald-600 animate-pulse" />
          Isi Data Contoh Acak (6 Niche Kreatif)
        </button>
      </div>

      {/* Embedded Progress Navigation Stepper */}
      <div className="px-6 md:px-8 py-4 border-b border-slate-200 bg-slate-50 flex flex-nowrap overflow-x-auto gap-4 scrollbar-none items-center justify-between">
        {[
          { step: 1, label: "Profil & Niche", icon: User },
          { step: 2, label: "Platform & Pilar", icon: Layers },
          { step: 3, label: "Target Audiens", icon: Heart },
          { step: 4, label: "Tema & Jadwal", icon: Calendar },
          { step: 5, label: "Produk & Aset", icon: BarChart }
        ].map((item) => {
          const Icon = item.icon;
          const isDone = item.step < currentStep;
          const isCurrent = item.step === currentStep;
          
          return (
            <button
              type="button"
              key={item.step}
              onClick={() => item.step <= currentStep ? setCurrentStep(item.step) : null}
              className={`flex items-center gap-2 text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                isCurrent 
                  ? "text-emerald-700 font-bold" 
                  : isDone 
                    ? "text-slate-500 hover:text-emerald-600" 
                    : "text-slate-300 cursor-not-allowed"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border transition-all ${
                isCurrent 
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-sm ring-4 ring-emerald-50" 
                  : isDone 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                    : "bg-white border-slate-200 text-slate-300"
              }`}>
                {isDone ? "✓" : item.step}
              </div>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Validation alert banner */}
      {validationError && (
        <div className="mx-6 md:mx-8 mt-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 text-xs font-medium flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Multi-step form panels */}
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        
        {/* STEP 1: PROFIL BRAND & KOMPETITOR */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-display font-semibold text-slate-700 text-base">Langkah 1: Profil Brand, Niche, & Kompetitor</h3>
              <p className="text-xs text-slate-400 mt-1">Definisikan jati diri akun sosial media dan ekosistem industri Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">
                  Nama Akun / Username <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: @parenting.islami"
                  value={formData.accountName}
                  onChange={(e) => setFormData(prev => ({ ...prev, accountName: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Nama Brand / Institusi / UMKM</label>
                <input
                  type="text"
                  placeholder="Contoh: Parenting Islami Academy"
                  value={formData.brandName}
                  onChange={(e) => setFormData(prev => ({ ...prev, brandName: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Deskripsi Singkat Akun / Brand</label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan mengenai apa akun / usaha Anda ini, agar AI memahami filosofi produk Anda..."
                  value={formData.brandDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, brandDescription: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              {/* Niche Inputs */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">
                  Niche Utama <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Parenting Islami, Fashion Muslim, Kuliner"
                  value={formData.primaryNiche}
                  onChange={(e) => setFormData(prev => ({ ...prev, primaryNiche: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Sub-Niche Pendukung (1, 2, 3)</label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Adab"
                    value={formData.subNiche1}
                    onChange={(e) => setFormData(prev => ({ ...prev, subNiche1: e.target.value }))}
                    className="text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                  <input
                    type="text"
                    placeholder="Screen-Time"
                    value={formData.subNiche2}
                    onChange={(e) => setFormData(prev => ({ ...prev, subNiche2: e.target.value }))}
                    className="text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                  <input
                    type="text"
                    placeholder="Tantrum"
                    value={formData.subNiche3}
                    onChange={(e) => setFormData(prev => ({ ...prev, subNiche3: e.target.value }))}
                    className="text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Styles */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Gaya Visual (Style)</label>
                <select
                  value={formData.visualStyle}
                  onChange={(e) => setFormData(prev => ({ ...prev, visualStyle: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  {visualStyles.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Tone Komunikasi Terhadap Audiens</label>
                <select
                  value={formData.communicationTone}
                  onChange={(e) => setFormData(prev => ({ ...prev, communicationTone: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  {tones.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Competitors */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Pesaing / Kompetitor Utama</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Kompetitor 1"
                    value={formData.competitors[0] || ""}
                    onChange={(e) => {
                      const newComp = [...formData.competitors];
                      newComp[0] = e.target.value;
                      setFormData(prev => ({ ...prev, competitors: newComp }));
                    }}
                    className="text-sm p-3 border border-slate-200 rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Kompetitor 2"
                    value={formData.competitors[1] || ""}
                    onChange={(e) => {
                      const newComp = [...formData.competitors];
                      newComp[1] = e.target.value;
                      setFormData(prev => ({ ...prev, competitors: newComp }));
                    }}
                    className="text-sm p-3 border border-slate-200 rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Kompetitor 3"
                    value={formData.competitors[2] || ""}
                    onChange={(e) => {
                      const newComp = [...formData.competitors];
                      newComp[2] = e.target.value;
                      setFormData(prev => ({ ...prev, competitors: newComp }));
                    }}
                    className="text-sm p-3 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Link Akun Kompetitor (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: instagram.com/kompetitor"
                  value={formData.competitorLinks}
                  onChange={(e) => setFormData(prev => ({ ...prev, competitorLinks: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Call to Action (CTA) Utama Bulan ini</label>
                <input
                  type="text"
                  placeholder="Contoh: Klik tautan pendaftaran di bio sekarang"
                  value={formData.mainCTA}
                  onChange={(e) => setFormData(prev => ({ ...prev, mainCTA: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl"
                />
              </div>

            </div>
          </div>
        )}

        {/* STEP 2: STRATEGI & PLATFORM */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-display font-semibold text-slate-700 text-base">Langkah 2: Tujuan & Platform Penayangan</h3>
              <p className="text-xs text-slate-400 mt-1">Pilih apa saja goal dan wadah platform sosial media Anda.</p>
            </div>

            <div className="space-y-4">
              {/* Goals Checkbox */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">Tujuan Pembuatan Konten (Pilih Beberapa)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {goalOptions.map(g => {
                    const isSelected = formData.goals.includes(g);
                    return (
                      <button
                        type="button"
                        key={g}
                        onClick={() => handleCheckboxChange("goals", g)}
                        className={`p-3 rounded-xl border text-xs text-left font-medium transition-all ${
                          isSelected 
                            ? "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm" 
                            : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked={isSelected} readOnly className="accent-emerald-600" />
                          <span className="truncate">{g}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Platforms Checkbox */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Target Platform Distribusi Konten <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {platformOptions.map(p => {
                    const isSelected = formData.platforms.includes(p);
                    return (
                      <button
                        type="button"
                        key={p}
                        onClick={() => handleCheckboxChange("platforms", p)}
                        className={`p-3 rounded-xl border text-xs text-left font-medium transition-all ${
                          isSelected 
                            ? "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm" 
                            : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked={isSelected} readOnly className="accent-emerald-600" />
                          <span>{p}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content Formats Checkbox */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">Format Video / Desain yang Dapat Dikerjakan</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {formatOptions.map(f => {
                    const isSelected = formData.contentFormats.includes(f);
                    return (
                      <button
                        type="button"
                        key={f}
                        onClick={() => handleCheckboxChange("contentFormats", f)}
                        className={`p-3 rounded-xl border text-xs text-left font-medium transition-all ${
                          isSelected 
                            ? "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm" 
                            : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked={isSelected} readOnly className="accent-emerald-600" />
                          <span className="truncate">{f}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: TARGET AUDIENS & DATA KONTEN */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-display font-semibold text-slate-700 text-base">Langkah 3: Target Audiens & Status Sosmed Saat Ini</h3>
              <p className="text-xs text-slate-400 mt-1">Sesuaikan konten dengan kondisi psikologis audiens Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">
                  Usia Target Audiens <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 25 - 40 Tahun"
                  value={formData.audienceAge}
                  onChange={(e) => setFormData(prev => ({ ...prev, audienceAge: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Gender Target Audiens</label>
                <input
                  type="text"
                  placeholder="Contoh: Ibu Rumah Tangga (Mayoritas perempuan)"
                  value={formData.audienceGender}
                  onChange={(e) => setFormData(prev => ({ ...prev, audienceGender: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Domisili / Lokasi Audiens</label>
                <input
                  type="text"
                  placeholder="Contoh: Kota Besar se-Indonesia"
                  value={formData.audienceLocation}
                  onChange={(e) => setFormData(prev => ({ ...prev, audienceLocation: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Profesi Audiens</label>
                <input
                  type="text"
                  placeholder="Contoh: Ibu Rumah Tangga, Guru, Wiraswasta"
                  value={formData.audienceProfession}
                  onChange={(e) => setFormData(prev => ({ ...prev, audienceProfession: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">
                  Masalah Utama Audiens (Pain Points) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Anak kecanduan HP, sering tantrum mengamuk..."
                  value={formData.audiencePainPoints}
                  onChange={(e) => setFormData(prev => ({ ...prev, audiencePainPoints: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Keinginan Audiens (Desires)</label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Ingin anak patuh secara sunnah tanpa kekerasan..."
                  value={formData.audienceDesires}
                  onChange={(e) => setFormData(prev => ({ ...prev, audienceDesires: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Kebiasaan Menjelajah Medsos (Habits)</label>
                <input
                  type="text"
                  placeholder="Contoh: Sering online ba'da Subuh dan jam istirahat malam"
                  value={formData.audienceHabits}
                  onChange={(e) => setFormData(prev => ({ ...prev, audienceHabits: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Bahasa & Level Pengetahuan</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Bahasa: Friendly & Sopan"
                    value={formData.audienceLanguage}
                    onChange={(e) => setFormData(prev => ({ ...prev, audienceLanguage: e.target.value }))}
                    className="text-xs p-3 border border-slate-200 rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Level: Pemula / Menengah"
                    value={formData.audienceKnowledgeLevel}
                    onChange={(e) => setFormData(prev => ({ ...prev, audienceKnowledgeLevel: e.target.value }))}
                    className="text-xs p-3 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Data Akun Saat Ini */}
              <div className="md:col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <h4 className="text-xs font-bold text-slate-700 uppercase font-mono">Data Statistik Metrik Akun Terkini (Opsional)</h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 font-mono block">Followers</label>
                    <input
                      type="text"
                      placeholder="e.g. 45,200"
                      value={formData.currentFollowers}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentFollowers: e.target.value }))}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-mono block">Rata-rata Likes</label>
                    <input
                      type="text"
                      placeholder="e.g. 1,200"
                      value={formData.avgLikes}
                      onChange={(e) => setFormData(prev => ({ ...prev, avgLikes: e.target.value }))}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-mono block">Rata-rata Komen</label>
                    <input
                      type="text"
                      placeholder="e.g. 75"
                      value={formData.avgComments}
                      onChange={(e) => setFormData(prev => ({ ...prev, avgComments: e.target.value }))}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-mono block">Engagement Rate</label>
                    <input
                      type="text"
                      placeholder="e.g. 4.8%"
                      value={formData.engagementRate}
                      onChange={(e) => setFormData(prev => ({ ...prev, engagementRate: e.target.value }))}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-slate-600 block">Masalah Akun / Hambatan Saat ini</label>
                    <input
                      type="text"
                      placeholder="e.g. Terkena shadow ban, interaksi komentar sepi..."
                      value={formData.currentAccountIssues}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentAccountIssues: e.target.value }))}
                      className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block">Target Pertumbuhan Bulan Ini</label>
                    <input
                      type="text"
                      placeholder="e.g. Followers naik jadi 55k, ER jadi 6%"
                      value={formData.growthTarget}
                      onChange={(e) => setFormData(prev => ({ ...prev, growthTarget: e.target.value }))}
                      className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 4: TEMA BULANAN & FREKUENSI */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-display font-semibold text-slate-700 text-base">Langkah 4: Tema Bulanan & Pengaturan Jadwal Upload</h3>
              <p className="text-xs text-slate-400 mt-1">Tentukan kerangka besar dan frekuensi upload mingguan.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-slate-600 block">
                  Tema Besar Bulan ini <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Membentuk Akhlak Mulia & Komunikasi Positif Keluarga"
                  value={formData.monthlyTheme}
                  onChange={(e) => setFormData(prev => ({ ...prev, monthlyTheme: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl font-bold"
                  required
                />
              </div>

              {/* Sub-themes for 4 weeks */}
              <div className="md:col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 font-mono">Pilar Sub-Tema 4 Minggu Berturut-turut</h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block font-semibold">Subtema Minggu 1</label>
                    <input
                      type="text"
                      value={formData.week1SubTheme}
                      onChange={(e) => setFormData(prev => ({ ...prev, week1SubTheme: e.target.value }))}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                      placeholder="Minggu 1"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block font-semibold">Subtema Minggu 2</label>
                    <input
                      type="text"
                      value={formData.week2SubTheme}
                      onChange={(e) => setFormData(prev => ({ ...prev, week2SubTheme: e.target.value }))}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                      placeholder="Minggu 2"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block font-semibold">Subtema Minggu 3</label>
                    <input
                      type="text"
                      value={formData.week3SubTheme}
                      onChange={(e) => setFormData(prev => ({ ...prev, week3SubTheme: e.target.value }))}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                      placeholder="Minggu 3"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block font-semibold">Subtema Minggu 4</label>
                    <input
                      type="text"
                      value={formData.week4SubTheme}
                      onChange={(e) => setFormData(prev => ({ ...prev, week4SubTheme: e.target.value }))}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                      placeholder="Minggu 4"
                    />
                  </div>
                </div>
              </div>

              {/* Upload settings */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Jadwal Hari Unggah / Upload</label>
                <input
                  type="text"
                  placeholder="Contoh: Senin, Selasa, Kamis, Jumat, Sabtu"
                  value={formData.uploadDays}
                  onChange={(e) => setFormData(prev => ({ ...prev, uploadDays: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Jam Unggah Konten</label>
                <input
                  type="text"
                  placeholder="Contoh: 06:00, 12:00, 19:30 WIB"
                  value={formData.uploadHours}
                  onChange={(e) => setFormData(prev => ({ ...prev, uploadHours: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Target Upload Per Minggu</label>
                <input
                  type="number"
                  placeholder="Contoh: 5"
                  value={formData.uploadsPerWeek}
                  onChange={(e) => setFormData(prev => ({ ...prev, uploadsPerWeek: parseInt(e.target.value) || 0 }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl"
                  min={1}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Momen / Hari Besar Bulan Depan</label>
                <input
                  type="text"
                  placeholder="Contoh: Persiapan Liburan Sekolah Anak, Hari Ibu"
                  value={formData.importantMoments}
                  onChange={(e) => setFormData(prev => ({ ...prev, importantMoments: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl"
                />
              </div>

            </div>
          </div>
        )}

        {/* STEP 5: PROMO PRODUK & SUMBER DAYA */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-display font-semibold text-slate-700 text-base">Langkah 5: Penjualan Produk & Sumber Daya Produksi</h3>
              <p className="text-xs text-slate-400 mt-1">Sertakan detail program promosi agar pilar jualan dapat terbuat presisi.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Nama Produk / Program yang Dipromosikan</label>
                <input
                  type="text"
                  placeholder="Contoh: E-Course Parenting Nabawiyah Bebas Tantrum"
                  value={formData.promoProductName}
                  onChange={(e) => setFormData(prev => ({ ...prev, promoProductName: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Harga Jual / Nilai Investasi</label>
                <input
                  type="text"
                  placeholder="Contoh: Rp 349.000"
                  value={formData.promoProductPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, promoProductPrice: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl font-mono text-emerald-800 font-bold"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Deskripsi Singkat / Isi Produk</label>
                <textarea
                  rows={2}
                  placeholder="Sebutkan apa saja yang dipelajari pembeli dalam produk atau program webinar ini..."
                  value={formData.promoProductDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, promoProductDescription: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Keunggulan Utama / USP Produk</label>
                <input
                  type="text"
                  placeholder="Apa bedanya dibanding kompetitor? e.g. Satu-satunya panduan psikologi sunnah..."
                  value={formData.promoProductUSP}
                  onChange={(e) => setFormData(prev => ({ ...prev, promoProductUSP: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Tautan Pendaftaran / Squeeze Page</label>
                <input
                  type="text"
                  placeholder="Contoh: parentingislami.academy/bebas-tantrum"
                  value={formData.promoProductLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, promoProductLink: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl font-mono text-slate-600"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-slate-600 block">Penawaran Spesial Bulan ini (Promo / Bonus)</label>
                <input
                  type="text"
                  placeholder="e.g. Diskon 50% untuk 100 pendaftar pertama + Bonus E-Book"
                  value={formData.promoProductOffer}
                  onChange={(e) => setFormData(prev => ({ ...prev, promoProductOffer: e.target.value }))}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl"
                />
              </div>

              {/* Resources Checklist */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">Sumber Daya yang Dimiliki Tim (Pilih Beberapa)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {resourceOptions.map(r => {
                    const isSelected = formData.resources.includes(r);
                    return (
                      <button
                        type="button"
                        key={r}
                        onClick={() => handleCheckboxChange("resources", r)}
                        className={`p-3 rounded-xl border text-xs text-left font-medium transition-all ${
                          isSelected 
                            ? "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm" 
                            : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <input type="checkbox" checked={isSelected} readOnly className="accent-emerald-600" />
                          <span className="truncate">{r}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* BOTTOM STEPPING CONTROLS */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between no-print">
          
          <button
            type="button"
            disabled={currentStep === 1 || isGenerating}
            onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
            className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 active:scale-95 disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4" />
            Sebelumnya
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 border border-slate-800 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2 active:scale-95"
            >
              Selanjutnya
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isGenerating}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 border border-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2 disabled:bg-emerald-400 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Mengekstrak Ide AI (Sekitar 30 Detik)...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Content Plan 30 Hari
                </>
              )}
            </button>
          )}

        </div>

      </form>

    </div>
  );
}
