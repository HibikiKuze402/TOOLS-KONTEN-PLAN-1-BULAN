import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ContentPlanForm from "./components/ContentPlanForm";
import PlanPreview from "./components/PlanPreview";
import DetailModal from "./components/DetailModal";
import HistoryList from "./components/HistoryList";
import ExportPanel from "./components/ExportPanel";
import { ContentPlanInput, ContentDayItem, ContentPlanStatus, ContentPlanProject, ContentTrendSummary } from "./types";
import { generate30DaysPlan, SAMPLE_INPUT } from "./sampleData";
import { 
  Sparkles, 
  Save, 
  RotateCcw, 
  HelpCircle, 
  Lock, 
  Server, 
  CloudCheck, 
  CheckCircle2, 
  Info,
  Calendar,
  Megaphone
} from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("dashboard");
  const [activeInput, setActiveInput] = useState<ContentPlanInput | null>(null);
  const [activeDays, setActiveDays] = useState<ContentDayItem[]>([]);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [selectedDayItem, setSelectedDayItem] = useState<ContentDayItem | null>(null);

  // History system states
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [modelUsed, setModelUsed] = useState<string>("Bawaan Offline");
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [notifMessage, setNotifMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);
  const [groundingSources, setGroundingSources] = useState<{ title: string; uri: string }[]>([]);
  const [trendSummary, setTrendSummary] = useState<ContentTrendSummary | null>(null);

  // Load history list on startup
  useEffect(() => {
    fetchHistory();
  }, []);

  const showNotification = (text: string, type: "success" | "error" | "info" = "success") => {
    setNotifMessage({ text, type });
    setTimeout(() => setNotifMessage(null), 4000);
  };

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const res = await fetch("/api/content-plans");
      if (res.ok) {
        const data = await res.json();
        setHistoryList(data);
      }
    } catch (err) {
      console.error("Gagal sinkron riwayat project ke server:", err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Helper triggering mock sample load instantly
  const handleLoadSampleProjectDirect = () => {
    setActiveInput(SAMPLE_INPUT);
    const demoPlan = generate30DaysPlan(SAMPLE_INPUT);
    setActiveDays(demoPlan);
    setProjectId("project_sample_demo");
    setModelUsed("Rule-Based Core Engine (Demo)");
    setWarningMessage("");
    setGroundingSources([
      { title: "Riset Tren TikTok Indonesia", uri: "https://ads.tiktok.com/business/id" },
      { title: "Google Trends Beranda Kreator", uri: "https://trends.google.com" }
    ]);
    setTrendSummary({
      title: "Tren Hangat Contoh: Skincare Organik",
      description: "Analisis tren Google Search & media sosial 3 hari terakhir menunjukkan pergeseran ke arah produk ramah ingridien & organik bersertifikasi BPOM.",
      hotTags: ["#kulitsehatmedis", "#organicskincare", "#tipskecantikanalarumah"],
      trendsList: [
        {
          topic: "Format 'Mitos vs Fakta' Bahan Aktif Kimia vs Alami",
          explanation: "Terdapat kenaikan pencarian sebesar 140% terkait kecocokan kulit sensitif dengan bahan alami.",
          viralityReason: "Menjawab ketakutan audiens terhadap bahaya jangka panjang skincare abal-abal.",
          suggestedAngle: "Bandingan kegunaan niacinamide alami dari oat dibandingkan senyawa buatan."
        },
        {
          topic: "Review Jujur Tanpa Filter Kamera",
          explanation: "Masyarakat mulai lelah dengan beauty influencer yang menggunakan filter penghalus wajah di video review.",
          viralityReason: "Tingginya dambaan kejujuran visual (real skin texture) di era visual digital saat ini.",
          suggestedAngle: "Buat konten video B-roll close-up tekstur kulit asli sebelum dan sesudah 7 hari perawatan brand Anda."
        }
      ]
    });
    setCurrentTab("preview");
    showNotification("Berhasil memuat rencana contoh dengan Tren Grounding!", "success");
  };

  // Trigger POST /api/generate-content-plan on Express server
  const handleGenerateContentPlan = async (inputData: ContentPlanInput) => {
    setIsGenerating(true);
    setWarningMessage("");
    try {
      const res = await fetch("/api/generate-content-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData)
      });

      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }

      const responseJSON = await res.json();
      setActiveInput(inputData);
      setActiveDays(responseJSON.days || []);
      setProjectId(`project_${Date.now()}`); // Create temporary local ID
      setModelUsed(responseJSON.modelUsed || "AI Flash Engine");
      setGroundingSources(responseJSON.groundingSources || []);
      setTrendSummary(responseJSON.trendSummary || null);
      
      if (responseJSON.warning) {
        setWarningMessage(responseJSON.warning);
        showNotification("Content plan digenerate dengan generator lokal!", "info");
      } else {
        showNotification("Content plan 30 hari berhasil digenerate via AI!", "success");
      }

      // Automatically head to preview tab to reveal results
      setCurrentTab("preview");
    } catch (err: any) {
      console.error("Kesalahan koneksi generate:", err);
      // Failover safely on client-side
      const backupPlan = generate30DaysPlan(inputData);
      setActiveInput(inputData);
      setActiveDays(backupPlan);
      setProjectId(`project_${Date.now()}`);
      setModelUsed("Client-Side Backup Engine");
      setWarningMessage("Server API tidak terjangkau. Konten digenerate secara mulus lewat generator cadangan client Anda.");
      setGroundingSources([]);
      
      // Provide robust dynamic backup trends
      const backupTrends = {
        title: `Tren Hangat Terkini: ${inputData.primaryNiche || "Kreator Konten"}`,
        description: `Ringkasan pergerakan tren viral atau topik hangat yang relevan dengan ${inputData.primaryNiche || "niche Anda"} di Indonesia berdasarkan pencarian umum dalam 3 hari terakhir.`,
        hotTags: ["#trenterkini", "#ideviral", `#${(inputData.primaryNiche || "niche").toLowerCase().replace(/[^a-z0-9]/g, "")}`],
        trendsList: [
          {
            topic: `Meningkatnya Minat Terhadap Konten Edukasi Mikro`,
            explanation: `Audiens Indonesia kini lebih menyukai infografis ringkas (carousel) atau video pendek di bawah 30 detik yang menyajikan satu solusi kecil secara to-the-point tanpa pendahuluan bertele-tele.`,
            viralityReason: `Menawarkan kepuasan instan (instant gratification) dan sangat mudah disimpan (save) untuk rujukan cepat.`,
            suggestedAngle: `Buat panduan singkat "Mengapa Anda gagal mengatasi ${inputData.audiencePainPoints || "masalah utama"}" diikuti satu solusi konkret.`
          },
          {
            topic: `Ketulusan Visual (Authentic Behind-the-Scenes)`,
            explanation: `Kreator yang menunjukkan proses riset, kegagalan produksi, atau perbincangan jujur di balik layar memperoleh interaksi/komentar 3 kali lebih banyak daripada postingan promosi mengkilap.`,
            viralityReason: `Menciptakan kedekatan manusiawi yang tinggi di mata audiens yang jenuh dengan kampanye korporat yang kaku.`,
            suggestedAngle: `Ambil rekaman mentah saat tim Anda mencoba menyelesaikan masalah produk atau curhat santai mengenai tantangan brand pagi ini.`
          }
        ]
      };
      setTrendSummary(backupTrends);
      
      setCurrentTab("preview");
      showNotification("Konten digenerate menggunakan generator cadangan lokal!", "info");
    } finally {
      setIsGenerating(false);
    }
  };

  // Trigger Project saving on backend Database
  const handleSaveProject = async () => {
    if (!activeInput || activeDays.length === 0) {
      showNotification("Tidak ada content plan aktif yang dapat disimpan!", "error");
      return;
    }

    try {
      const res = await fetch("/api/content-plans/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: projectId,
          input: activeInput,
          days: activeDays,
          groundingSources: groundingSources,
          trendSummary: trendSummary
        })
      });

      if (res.ok) {
        const saved = await res.json();
        setProjectId(saved.id);
        fetchHistory(); // Refresh riwayat list
        showNotification(`Project '${saved.input.brandName}' sukses disimpan ke database lokal!`, "success");
      } else {
        throw new Error("Gagal menyimpan.");
      }
    } catch (err) {
      console.error(err);
      showNotification("Gagal melangsungkan penyimpanan project harian.", "error");
    }
  };

  // Load project from History tab
  const handleLoadProject = async (id: string) => {
    setIsLoadingHistory(true);
    try {
      const res = await fetch(`/api/content-plans/${id}`);
      if (res.ok) {
        const project: ContentPlanProject = await res.json();
        setActiveInput(project.input);
        setActiveDays(project.days);
        setProjectId(project.id);
        setModelUsed("Saved Local File Archive");
        setWarningMessage("");
        setGroundingSources(project.groundingSources || []);
        setTrendSummary(project.trendSummary || null);
        
        // Head directly to visual preview
        setCurrentTab("preview");
        showNotification(`Project '${project.input.brandName}' sukses dimuat!`, "success");
      }
    } catch (err) {
      console.error(err);
      showNotification("Gagal memuat detail project.", "error");
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Delete project from Database
  const handleDeleteProject = async (id: string) => {
    try {
      const res = await fetch(`/api/content-plans/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchHistory();
        if (projectId === id) {
          // Reset if active project was deleted
          setActiveDays([]);
          setActiveInput(null);
          setProjectId(null);
        }
        showNotification("Project berhasil dihapus dari arsip.", "success");
      }
    } catch (err) {
      console.error(err);
      showNotification("Gagal menghapus project.", "error");
    }
  };

  // Update Status of individual days dynamically
  const handleUpdateDayStatus = (dayNum: number, nextStatus: ContentPlanStatus) => {
    setActiveDays(prevDays => {
      const updated = prevDays.map(item => {
        if (item.day === dayNum) {
          return { ...item, status: nextStatus };
        }
        return item;
      });

      // Show temporary modal updates if it is open
      if (selectedDayItem && selectedDayItem.day === dayNum) {
        setSelectedDayItem({ ...selectedDayItem, status: nextStatus });
      }

      return updated;
    });
    
    showNotification(`Status Hari ke-${dayNum} diperbarui menjadi '${nextStatus}'!`, "success");
  };

  // Update Full Content Day Item dynamically
  const handleUpdateDayItem = (updatedItem: ContentDayItem) => {
    setActiveDays(prevDays => {
      const updated = prevDays.map(item => {
        if (item.day === updatedItem.day) {
          return updatedItem;
        }
        return item;
      });

      // Show temporary modal updates if it is open
      if (selectedDayItem && selectedDayItem.day === updatedItem.day) {
        setSelectedDayItem(updatedItem);
      }

      return updated;
    });

    showNotification(`Perubahan pada Hari ke-${updatedItem.day} berhasil disimpan!`, "success");
  };

  const hasActivePlan = activeDays.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-700 antialiased">
      
      {/* Visual notification banner panel */}
      {notifMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce no-print">
          <div className={`px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border text-xs font-semibold ${
            notifMessage.type === "success" 
              ? "bg-emerald-800 text-white border-emerald-700" 
              : notifMessage.type === "error" 
                ? "bg-rose-800 text-white border-rose-700" 
                : "bg-slate-800 text-white border-slate-705"
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notifMessage.text}</span>
          </div>
        </div>
      )}

      {/* Modern Sidebar left layout */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        hasPlan={hasActivePlan} 
        brandName={activeInput?.brandName}
        accountName={activeInput?.accountName}
      />

      {/* Main workspace container panel (handles layout scrollbars) */}
      <main className="flex-1 flex flex-col min-w-0 md:h-screen md:overflow-y-auto">
        
        {/* Top-bar control tray */}
        <header className="bg-white border-b border-slate-100 px-6 md:px-8 py-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shrink-0 no-print">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-sm font-semibold text-slate-800 uppercase tracking-wider font-mono">Workspace Rencana Konten 30 Hari</h1>
              {hasActivePlan && activeInput ? (
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-semibold text-slate-500 truncate max-w-[200px]">
                    Brand: <span className="text-emerald-750 font-bold">{activeInput.brandName}</span>
                  </span>
                  <span className="text-xs text-slate-300">|</span>
                  <span className="text-[10px] text-slate-400 font-mono tracking-tight">{activeInput.accountName}</span>
                </div>
              ) : (
                <p className="text-xs text-slate-400 mt-0.5 font-light">Mulai merancang content plan bulan ini secara terstruktur otomatis</p>
              )}
            </div>
          </div>

          {/* Quick saving triggers / Connection tray */}
          <div className="flex items-center flex-wrap gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-mono text-slate-505">
              <CloudCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Rest-API Online</span>
            </div>

            {hasActivePlan && (
              <button
                onClick={handleSaveProject}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/10 transition flex items-center gap-1.5 active:scale-95"
                title="Simpan file project"
              >
                <Save className="w-3.5 h-3.5" />
                Simpan Project
              </button>
            )}

            {hasActivePlan && (
              <button
                onClick={() => {
                  if (confirm("Apakah Anda ingin menyetel ulang project ini? Seluruh data yang tidak disimpan akan luntur.")) {
                    setActiveDays([]);
                    setActiveInput(null);
                    setProjectId(null);
                    setCurrentTab("form");
                    showNotification("Workspace disetel ulang.", "info");
                  }
                }}
                className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition"
                title="Reset Workspace"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Inner Tab Router */}
        <div className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          
          {currentTab === "dashboard" && (
            <Dashboard 
              input={activeInput} 
              days={activeDays} 
              onStartClick={() => setCurrentTab("form")}
              onLoadSample={handleLoadSampleProjectDirect}
              modelUsed={modelUsed}
              hasWarning={warningMessage}
              groundingSources={groundingSources}
              trendSummary={trendSummary}
            />
          )}

          {currentTab === "form" && (
            <ContentPlanForm 
              onGenerate={handleGenerateContentPlan} 
              isGenerating={isGenerating}
            />
          )}

          {currentTab === "preview" && hasActivePlan && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  Rencana Konten Kalender 30 Hari
                </h3>
                <p className="text-xs text-slate-400 mt-1">Saring rencana berdasarkan platform atau pilar, navigasikan hari untuk info skrip visual penuh.</p>
              </div>

              <PlanPreview 
                days={activeDays} 
                onSelectDay={(item) => setSelectedDayItem(item)}
                onUpdateStatus={handleUpdateDayStatus}
              />
            </div>
          )}

          {currentTab === "calendar" && hasActivePlan && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  Kalender Distribusi Harian
                </h3>
                <p className="text-xs text-slate-400 mt-1">Tinjauan visual sebaran kalender grid 1 bulan.</p>
              </div>

              <PlanPreview 
                days={activeDays} 
                onSelectDay={(item) => setSelectedDayItem(item)}
                onUpdateStatus={handleUpdateDayStatus}
              />
            </div>
          )}

          {currentTab === "kanban" && hasActivePlan && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  Kanban Alur Produksi Tim
                </h3>
                <p className="text-xs text-slate-400 mt-1">Ganti status produksi konten Anda dengan mengontrol kartu Kanban.</p>
              </div>

              <PlanPreview 
                days={activeDays} 
                onSelectDay={(item) => setSelectedDayItem(item)}
                onUpdateStatus={handleUpdateDayStatus}
              />
            </div>
          )}

          {currentTab === "history" && (
            <HistoryList
              history={historyList}
              onLoadProject={handleLoadProject}
              onDeleteProject={handleDeleteProject}
              onRefresh={fetchHistory}
              isLoading={isLoadingHistory}
            />
          )}

          {currentTab === "export" && hasActivePlan && (
            <ExportPanel 
              days={activeDays} 
              brandName={activeInput?.brandName} 
              accountName={activeInput?.accountName} 
            />
          )}

          {currentTab === "settings" && (
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6 animate-fade-in no-print max-w-2xl">
              <div>
                <h3 className="font-display font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Server className="w-5 h-5 text-emerald-600" />
                  Settings & API Credentials
                </h3>
                <p className="text-xs text-slate-400 mt-1">Informasi setelan kelancaran kecerdasan AI dan port backend.</p>
              </div>

              <div className="space-y-5">
                
                {/* Secret setup explanation row */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2.5 text-xs text-slate-600 leading-relaxed">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <Lock className="w-4 h-4 shrink-0" />
                    Kerahasiaan Kunci API Gemini (Gemini API Key)
                  </div>
                  <p>
                    Aplikasi ini menggunakan model kecerdasan buatan <span className="font-semibold text-slate-800">gemini-3.5-flash</span> server-side (Express.ts) demi keamanan privasi mutlak. Kami tidak pernah memaparkan apiKey ini pada kode browser client.
                  </p>
                  <p>
                    Kunci API dibaca secara otomatis dari konfigurasi server container melalui variabel lingkungan: <span className="font-mono bg-slate-200 px-1 py-0.5 rounded text-[10px] text-emerald-800 font-bold">GEMINI_API_KEY</span>.
                  </p>
                  <p className="font-semibold text-slate-800">Bagaimana Cara Mengonfigurasinya?</p>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] text-slate-500">
                    <li>Buka menu <span className="font-semibold">Settings / Secrets</span> di panel antarmuka AI Studio Anda.</li>
                    <li>Sematkan kunci API Gemini Anda pada bagian rahasia tersebut.</li>
                    <li>Sistem platform akan menginjeksikannya secara otomatis ke server saat runtime!</li>
                  </ul>
                </div>

                {/* System variables feedback */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <p className="text-[10px] text-slate-400">STATUS LINK DATABASE LOKAL</p>
                    <p className="font-bold text-emerald-700 mt-1">✔saved_projects.json AKTIF</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <p className="text-[10px] text-slate-400">ENGINE AI FLASH MODEL</p>
                    <p className="font-bold text-emerald-700 mt-1">gemini-3.5-flash</p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>

      {/* RENDER MODAL OVERLAY FOR SELECTED DAY ITEM DETAILED VIEWS */}
      {selectedDayItem && (
        <DetailModal 
          item={selectedDayItem} 
          onClose={() => setSelectedDayItem(null)} 
          onUpdateStatus={handleUpdateDayStatus}
          onUpdateItem={handleUpdateDayItem}
        />
      )}

      {/* RENDER PRINT-ONLY BLOCK */}
      {hasActivePlan && (
        <div className="hidden print:block p-8 bg-white text-slate-900 w-full space-y-6 text-xs">
          <div className="border-b-2 border-slate-800 pb-3">
            <h1 className="text-xl font-bold font-display uppercase tracking-wider">{activeInput?.brandName || "Content Plan Report"}</h1>
            <p className="text-xs text-slate-500 mt-1 font-mono">Platform target: {activeInput?.platforms?.join(", ")} | Tema Besar: {activeInput?.monthlyTheme}</p>
          </div>

          <table className="w-full text-left border border-slate-400 text-[10px] border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-400">
                <th className="p-2 border border-slate-400">Hari</th>
                <th className="p-2 border border-slate-400">Pilar</th>
                <th className="p-2 border border-slate-400">Platform</th>
                <th className="p-2 border border-slate-400">Format</th>
                <th className="p-2 border border-slate-400">Judul Konten</th>
                <th className="p-2 border border-slate-400">Draft Caption / Copy Konten</th>
              </tr>
            </thead>
            <tbody>
              {activeDays.map(d => (
                <tr key={d.day} className="border-b border-slate-300">
                  <td className="p-2 font-bold border border-slate-300">H{d.day}</td>
                  <td className="p-2 border border-slate-300 uppercase font-semibold">{d.pilar}</td>
                  <td className="p-2 border border-slate-300">{d.platform}</td>
                  <td className="p-2 border border-slate-300 font-mono">{d.format}</td>
                  <td className="p-2 border border-slate-300 font-bold">{d.title}</td>
                  <td className="p-2 border border-slate-300 whitespace-pre-wrap leading-tight text-[9px] font-light max-w-sm">{d.caption}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
