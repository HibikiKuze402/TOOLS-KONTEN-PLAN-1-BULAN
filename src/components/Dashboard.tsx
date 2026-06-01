import { 
  FileCheck2, 
  Smartphone, 
  CalendarDays, 
  BookOpen, 
  BadgePercent, 
  Heart, 
  Star,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  AlertCircle
} from "lucide-react";
import { ContentDayItem, ContentPlanInput, ContentTrendSummary } from "../types";

interface DashboardProps {
  input: ContentPlanInput | null;
  days: ContentDayItem[];
  onStartClick: () => void;
  onLoadSample: () => void;
  modelUsed?: string;
  hasWarning?: string;
  groundingSources?: { title: string; uri: string }[];
  trendSummary?: ContentTrendSummary | null;
}

export default function Dashboard({ 
  input, 
  days, 
  onStartClick, 
  onLoadSample,
  modelUsed,
  hasWarning,
  groundingSources = [],
  trendSummary = null
}: DashboardProps) {
  const hasPlan = days.length > 0;

  // Calculators
  const totalContent = days.length;
  const uniquePlatforms = hasPlan ? Array.from(new Set(days.map(d => d.platform))) : [];
  const totalPlatforms = uniquePlatforms.length || (input?.platforms?.length || 0);
  
  const frequencyText = input 
    ? `${input.uploadsPerWeek}x seminggu (${input.uploadDays})` 
    : "Belum diatur";

  const monthlyTheme = input?.monthlyTheme || "Pondasi Utama & Branding";

  const pillarCounts = days.reduce(
    (acc, item) => {
      if (item.pilar === "Edukasi") acc.edukasi++;
      else if (item.pilar === "Promosi") acc.promosi++;
      else if (item.pilar === "Engagement") acc.engagement++;
      else if (item.pilar === "Branding") acc.branding++;
      return acc;
    },
    { edukasi: 0, promosi: 0, engagement: 0, branding: 0 }
  );

  const getPercentage = (count: number) => {
    if (totalContent === 0) return 0;
    return Math.round((count / totalContent) * 100);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-radial from-emerald-800 to-emerald-950 p-8 md:p-12 text-white shadow-xl border border-emerald-700/50">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Social Media Vibe
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-white leading-tight">
            Tools Pembuatan Content Plan 1 Bulan
          </h2>
          <p className="text-emerald-200/90 text-sm md:text-base leading-relaxed font-light">
            Generate rencana konten 30 hari secara otomatis, terstruktur, dan siap eksekusi untuk Instagram, TikTok, YouTube, Facebook, dan platform lainnya.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-4 no-print">
            <button
              onClick={onStartClick}
              className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 rounded-xl font-semibold shadow-lg shadow-emerald-400/20 active:scale-95 transition-all text-sm flex items-center gap-2"
            >
              Mulai Buat Content Plan
              <ArrowRight className="w-4 h-4" />
            </button>
            
            {!hasPlan && (
              <button
                onClick={onLoadSample}
                className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl font-medium border border-white/20 active:scale-95 transition-all text-sm"
              >
                Lihat Contoh Output
              </button>
            )}
          </div>
        </div>
      </div>

      {hasWarning && (
        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-orange-600 mt-0.5" />
          <div>
            <span className="font-bold">Informasi:</span> {hasWarning}
          </div>
        </div>
      )}

      {/* Main Stats Panel */}
      <section className="space-y-4">
        <h3 className="font-display font-semibold text-lg text-slate-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          Dashboard Rencana Konten Harian (Bento Grid)
        </h3>

        {/* 4 Bento-style KPI Cells */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Content */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Total Konten</p>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-3xl font-bold text-emerald-600">
                {totalContent || "30"}
              </span>
              <span className="text-xs text-slate-400 font-medium">Hari Terencana</span>
            </div>
          </div>

          {/* Card 2: Platforms Grid */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Platform Aktif</p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {input?.platforms && input.platforms.length > 0 ? (
                input.platforms.map((p, i) => {
                  let abbrev = "IG";
                  if (p.toLowerCase().includes("instagram")) abbrev = "IG";
                  else if (p.toLowerCase().includes("tiktok")) abbrev = "TT";
                  else if (p.toLowerCase().includes("youtube")) abbrev = "YT";
                  else if (p.toLowerCase().includes("facebook")) abbrev = "FB";
                  else if (p.toLowerCase().includes("linkedin")) abbrev = "LN";
                  else if (p.toLowerCase().includes("blog") || p.toLowerCase().includes("website")) abbrev = "WS";
                  else abbrev = p.substring(0, 2).toUpperCase();

                  return (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded bg-slate-100 border border-slate-200/60 flex items-center justify-center text-[11px] font-bold text-slate-700"
                      title={p}
                    >
                      {abbrev}
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="w-8 h-8 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">IG</div>
                  <div className="w-8 h-8 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">TT</div>
                  <div className="w-8 h-8 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">YT</div>
                </>
              )}
            </div>
          </div>

          {/* Card 3: Frekuensi Upload */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Frekuensi Upload</p>
            <div className="mt-4">
              <span className="text-xl font-bold text-slate-800">
                {input ? `${input.uploadsPerWeek}x / Minggu` : "Belum diatur"}
              </span>
              <p className="text-[10px] text-slate-505 truncate mt-1">
                {input?.uploadHours ? `Jam: ${input.uploadHours}` : "Waktu upload"}
              </p>
            </div>
          </div>

          {/* Card 4: Monthly Theme popping in Amber Yellow! */}
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-tighter">Tema Bulan Ini</p>
            <div className="mt-4">
              <span className="text-sm font-bold text-amber-900 line-clamp-2" title={monthlyTheme}>
                "{monthlyTheme}"
              </span>
              <p className="text-[10px] text-amber-600 font-medium font-mono mt-1">
                {hasPlan ? "AI Plan Aktif" : "Edukasi & Engagement"}
              </p>
            </div>
          </div>

        </div>

        {/* Content Pillars Distribution Meters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="font-display font-medium text-slate-800 text-base">Distribusi Pilar Konten (Content Pillars)</h4>
              <p className="text-xs text-slate-400 mt-0.5">Proporsi pembagian kualitatif konten harian Anda</p>
            </div>
            {modelUsed && (
              <div className="self-start md:self-auto px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs rounded-lg font-mono">
                Generator: <span className="font-bold">{modelUsed}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pilar 1: Edukasi */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800 font-medium text-sm">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600"><BookOpen className="w-4 h-4" /></div>
                  Edukatif (Edukasi)
                </div>
                <span className="text-xs font-mono font-bold text-slate-500">{pillarCounts.edukasi} Konten</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${hasPlan ? getPercentage(pillarCounts.edukasi) : 40}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Rasio Target</span>
                <span>{hasPlan ? getPercentage(pillarCounts.edukasi) : 40}%</span>
              </div>
            </div>

            {/* Pilar 2: Promosi */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800 font-medium text-sm">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600"><BadgePercent className="w-4 h-4" /></div>
                  Promosional (Promosi)
                </div>
                <span className="text-xs font-mono font-bold text-slate-500">{pillarCounts.promosi} Konten</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${hasPlan ? getPercentage(pillarCounts.promosi) : 20}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Rasio Target</span>
                <span>{hasPlan ? getPercentage(pillarCounts.promosi) : 20}%</span>
              </div>
            </div>

            {/* Pilar 3: Engagement */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800 font-medium text-sm">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600"><Heart className="w-4 h-4" /></div>
                  Engagement (Interaksi)
                </div>
                <span className="text-xs font-mono font-bold text-slate-500">{pillarCounts.engagement} Konten</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${hasPlan ? getPercentage(pillarCounts.engagement) : 30}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Rasio Target</span>
                <span>{hasPlan ? getPercentage(pillarCounts.engagement) : 30}%</span>
              </div>
            </div>

            {/* Pilar 4: Branding */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800 font-medium text-sm">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600"><Star className="w-4 h-4" /></div>
                  Branding (Identitas)
                </div>
                <span className="text-xs font-mono font-bold text-slate-500">{pillarCounts.branding} Konten</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${hasPlan ? getPercentage(pillarCounts.branding) : 10}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Rasio Target</span>
                <span>{hasPlan ? getPercentage(pillarCounts.branding) : 10}%</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3-Day Content Trend Summary via Google Search Grounding */}
      {trendSummary && trendSummary.trendsList && trendSummary.trendsList.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl border border-indigo-850 p-6 md:p-8 shadow-xl space-y-6 relative overflow-hidden animate-fade-in no-print">
          {/* Ambient lighting effect */}
          <div className="absolute left-1/3 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mt-32" />
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mb-20" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/20 font-mono text-[9px] uppercase tracking-wider font-bold">
                  Grounding Tren 3 Hari Terakhir
                </span>
              </div>
              <h4 className="font-display font-extrabold text-white text-lg md:text-xl flex items-center gap-2.5">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                {trendSummary.title || "Ringkasan Tren Konten Indonesia"}
              </h4>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {trendSummary.description || "Analisis kueri penelusuran populer dan interaksi sosial media teratas yang berhasil disintesis secara langsung oleh AI."}
              </p>
            </div>
            
            {/* Tag pills list */}
            {trendSummary.hotTags && trendSummary.hotTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 max-w-sm">
                {trendSummary.hotTags.map((tag, tIdx) => (
                  <span key={tIdx} className="px-2.5 py-1 text-[10px] font-mono leading-none bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:bg-indigo-900/40 hover:text-indigo-200 transition">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Trends list section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {trendSummary.trendsList.map((trend, index) => (
              <div key={index} className="flex flex-col bg-white/5 border border-white/10 hover:border-indigo-500/30 rounded-2xl p-5 shadow-inner transition duration-300 group">
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="p-2.5 rounded-xl bg-indigo-900/40 border border-indigo-500/20 text-indigo-400 font-mono text-xs font-black shrink-0 w-8 h-8 flex items-center justify-center">
                    0{index + 1}
                  </div>
                  <h5 className="font-display font-bold text-slate-100 group-hover:text-white transition-colors text-sm leading-snug">
                    {trend.topic}
                  </h5>
                </div>
                
                <p className="text-xs text-slate-300/90 leading-relaxed mb-4 flex-1">
                  {trend.explanation}
                </p>

                {/* Virality Reason */}
                <div className="mb-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-[11px] text-amber-200/95 space-y-1">
                  <span className="font-semibold text-amber-300 flex items-center gap-1 font-mono uppercase tracking-wider text-[9px]">
                    <Award className="w-3.5 h-3.5 shrink-0 text-amber-400 inline" />
                    Mengapa Viral?
                  </span>
                  <p className="leading-relaxed font-sans mt-0.5">{trend.viralityReason}</p>
                </div>

                {/* Suggested Angle */}
                <div className="bg-indigo-950/60 border border-indigo-850 rounded-xl p-3 text-[11px] text-indigo-200 space-y-1">
                  <span className="font-semibold text-indigo-300 flex items-center gap-1 font-mono uppercase tracking-wider text-[9px]">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-indigo-400 animate-pulse inline" />
                    Saran Angle Konten
                  </span>
                  <p className="leading-relaxed italic mt-0.5">"{trend.suggestedAngle}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Google Search Grounding & Real-time AI Intelligence Sources */}
      {groundingSources && groundingSources.length > 0 && (
        <div className="bg-emerald-950 text-white rounded-3xl border border-emerald-800 p-6 md:p-8 shadow-xl space-y-4 relative overflow-hidden animate-fade-in no-print">
          {/* Subtle decoration gradient */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/60 pb-4">
            <div className="space-y-1">
              <h4 className="font-display font-bold text-emerald-300 text-base md:text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                Google Search Grounding & AI Intelligence
              </h4>
              <p className="text-xs text-emerald-200/70">
                Data divalidasi dan disintesis secara real-time berdasarkan tren penelusuran terkini di Google Search.
              </p>
            </div>
            <div className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-[10px] uppercase tracking-wider self-start sm:self-auto">
              Live Grounded Sync
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-xs text-emerald-100/80 font-medium">
              Topik hangat, riset kueri penelusuran, & rujukan tren web yang ditemukan Google Search untuk menyusun strategi konten harian Anda:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {groundingSources.map((source, index) => (
                <a 
                  key={index}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all group text-left"
                >
                  <div className="p-2 rounded-lg bg-emerald-900/40 text-emerald-400 group-hover:text-emerald-300 transition-colors shrink-0 font-mono text-xs font-bold w-7 h-7 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-emerald-100 group-hover:text-white transition-colors truncate">
                      {source.title}
                    </p>
                    <p className="text-[10px] text-emerald-400/85 truncate font-mono mt-0.5">
                      {source.uri}
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 transform duration-200" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Overview Platform / Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Info panel 1 */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h4 className="font-display font-semibold text-slate-800 text-sm flex items-center gap-2">
            💡 Mengapa Content Plan 30 Hari Sangat Penting?
          </h4>
          <ul className="text-xs text-slate-500 space-y-2.5 list-disc list-inside leading-relaxed pl-1">
            <li><span className="font-semibold text-slate-700">Konsistensi Mutlak:</span> Membantu mengeliminasi kepanikan "hari ini bikin postingan apa ya?" yang sering dialami kreator.</li>
            <li><span className="font-semibold text-slate-700">Pillar Seimbang:</span> Menjamin akun tidak melulu jualan (promosi keras) yang bisa membuat followers jenuh, tapi diisi edukasi yang bermanfaat.</li>
            <li><span className="font-semibold text-slate-700">Masa Persiapan Aset:</span> Tim desainer dan videografer memiliki jatah waktu matang untuk mengeksekusi visual, b-roll footage, dan menyinkronkan aset audio.</li>
          </ul>
        </div>

        {/* Info panel 2 */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h4 className="font-display font-semibold text-slate-800 text-sm flex items-center gap-2">
            📈 Tips Monetisasi & Optimalisasi Konten
          </h4>
          <ul className="text-xs text-slate-500 space-y-2.5 list-disc list-inside leading-relaxed pl-1">
            <li><span className="font-semibold text-slate-700">Aktifkan CTA link Bio:</span> Selalu arahkan audiens ke tautan aktif yang mengarah ke form checkout, pendaftaran, atau kontak admin WhatsApp.</li>
            <li><span className="font-semibold text-slate-700">Gunakan Hook Kuat:</span> 3 detik pertama sangat vital di Reels atau Tiktok. Gunakan teks tebal kontras di video dengan font Sans.</li>
            <li><span className="font-semibold text-slate-700">Evaluasi ER Berkala:</span> Amati konten yang memiliki rasio saves & shares paling banyak, gandakan tema serupa untuk minggu berikutnya.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
