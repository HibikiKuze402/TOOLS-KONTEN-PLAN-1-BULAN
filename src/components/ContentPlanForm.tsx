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

  // Helper autofilling with preset `@parenting.islami` data
  const handleLoadSampleData = () => {
    setFormData(JSON.parse(JSON.stringify(SAMPLE_INPUT)));
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
          Simulasi Isi Data Contoh (Parenting Islami)
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
