import React, { useState } from "react";
import { ContentDayItem, ContentPlanStatus } from "../types";
import { 
  Table2, 
  Calendar, 
  LayoutGrid, 
  KanbanSquare, 
  Search, 
  Filter, 
  Copy, 
  Check, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  SlidersHorizontal,
  BookmarkPlus
} from "lucide-react";

interface PlanPreviewProps {
  days: ContentDayItem[];
  onSelectDay: (item: ContentDayItem) => void;
  onUpdateStatus: (dayNum: number, currentStatus: ContentPlanStatus) => void;
}

type ViewType = "table" | "calendar" | "card" | "kanban";

export default function PlanPreview({ days, onSelectDay, onUpdateStatus }: PlanPreviewProps) {
  const [viewType, setViewType] = useState<ViewType>("calendar");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPillarFilter, setSelectedPillarFilter] = useState("Semua");
  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState("Semua");
  const [copiedDay, setCopiedDay] = useState<number | null>(null);

  // Pillar styles mappings
  const pilarColors: Record<string, { bg: string, text: string, dot: string }> = {
    "Edukasi": { bg: "bg-blue-50/70 border-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
    "Promosi": { bg: "bg-amber-50/70 border-amber-100", text: "text-amber-800", dot: "bg-amber-600" },
    "Engagement": { bg: "bg-rose-50/70 border-rose-100", text: "text-rose-700", dot: "bg-rose-500" },
    "Branding": { bg: "bg-purple-50/70 border-purple-100", text: "text-purple-700", dot: "bg-purple-500" }
  };

  // Status lists for Kanban Lanes
  const kanbanLanes: ContentPlanStatus[] = [
    "Ide",
    "Siap Produksi",
    "Proses Desain",
    "Proses Editing",
    "Siap Upload",
    "Terupload",
    "Evaluasi"
  ];

  const laneColors: Record<ContentPlanStatus, string> = {
    "Ide": "border-t-slate-400 bg-slate-50/50",
    "Siap Produksi": "border-t-indigo-400 bg-indigo-50/20",
    "Proses Desain": "border-t-orange-400 bg-orange-50/20",
    "Proses Editing": "border-t-amber-400 bg-amber-50/20",
    "Siap Upload": "border-t-teal-400 bg-teal-50/20",
    "Terupload": "border-t-emerald-600 bg-emerald-50/20",
    "Evaluasi": "border-t-pink-500 bg-pink-50/20"
  };

  // Extract platforms for filtering
  const platformsList = Array.from(new Set(days.map(d => d.platform)));

  // Filter items based on user search triggers
  const filteredDays = days.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.hook.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPillar = selectedPillarFilter === "Semua" || d.pilar === selectedPillarFilter;
    const matchesPlatform = selectedPlatformFilter === "Semua" || d.platform === selectedPlatformFilter;

    return matchesSearch && matchesPillar && matchesPlatform;
  });

  const handleCopyCaption = (item: ContentDayItem, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering open modal
    navigator.clipboard.writeText(`${item.title}\n\n${item.caption}`);
    setCopiedDay(item.day);
    setTimeout(() => setCopiedDay(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Layout View switcher tools */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 no-print">
        
        {/* Fitur Search & Filter dropdown */}
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
          <div className="relative flex-1 max-w-md min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kata kunci, judul, caption..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs p-2.5 pl-9 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedPillarFilter}
              onChange={(e) => setSelectedPillarFilter(e.target.value)}
              className="text-xs p-2.5 border border-slate-200 rounded-xl bg-white font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="Semua">Semua Pilar</option>
              <option value="Edukasi">Pilar Edukasi</option>
              <option value="Promosi">Pilar Promosi</option>
              <option value="Engagement">Pilar Engagement</option>
              <option value="Branding">Pilar Branding</option>
            </select>

            <select
              value={selectedPlatformFilter}
              onChange={(e) => setSelectedPlatformFilter(e.target.value)}
              className="text-xs p-2.5 border border-slate-200 rounded-xl bg-white font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="Semua">Semua Platform</option>
              {platformsList.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {/* Layout Mode button selectors */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-end md:self-auto gap-1">
          {[
            { id: "calendar", label: "Calendar", icon: Calendar },
            { id: "table", label: "Table", icon: Table2 },
            { id: "card", label: "Cards", icon: LayoutGrid },
            { id: "kanban", label: "Kanban", icon: KanbanSquare }
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = viewType === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setViewType(item.id as ViewType)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isSelected 
                    ? "bg-white text-emerald-950 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
                title={`${item.label} View`}
              >
                <Icon className="w-4 h-4 shrink-0 text-emerald-700" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* FILTER COMPROMISE WARNING IN CASE GRID IS EMPTY */}
      {filteredDays.length === 0 && (
        <div className="p-12 text-center rounded-3xl border border-slate-100 bg-white shadow-sm space-y-3">
          <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="font-display font-semibold text-slate-700">Rencana Konten Tidak Ditemukan</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Tidak ada konten yang cocok dengan saringan filter Anda. Coba bersihkan pencarian kata kunci atau setel ulang dropdown kategori.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedPillarFilter("Semua");
              setSelectedPlatformFilter("Semua");
            }}
            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-xl text-xs transition-all"
          >
            Reset Semua Filter
          </button>
        </div>
      )}

      {filteredDays.length > 0 && (
        <div className="transition-all duration-300">
          
          {/* VIEW TYPE A: CALENDAR VIEW */}
          {viewType === "calendar" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredDays.map((item) => {
                const styles = pilarColors[item.pilar] || pilarColors["Edukasi"];
                
                return (
                  <div
                    key={item.day}
                    onClick={() => onSelectDay(item)}
                    className="group bg-white rounded-2xl border border-slate-200 p-5 space-y-4 hover:shadow-md cursor-pointer transition-all duration-200 border-t-4 border-t-emerald-600 relative overflow-hidden flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Hari {item.day}
                        </span>
                        
                        {/* Static Platform Pill */}
                        <span className="text-[10px] font-semibold text-slate-500 font-mono">
                          {item.platform}
                        </span>
                      </div>

                      {/* Display title with hook hint */}
                      <div className="space-y-1.5">
                        <h4 className="font-display font-bold text-slate-800 text-[13px] leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-slate-400 text-[11px] font-medium leading-relaxed font-mono line-clamp-2 italic">
                          "{item.hook}"
                        </p>
                      </div>
                    </div>

                    {/* Bottom Indicator row */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-1">
                      {/* Pillar Pill tag */}
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-semibold uppercase border ${styles.bg} ${styles.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                        {item.pilar}
                      </span>

                      {/* Status indicator button */}
                      <span className="text-[9px] font-bold text-slate-400 font-mono">
                        {item.status}
                      </span>
                    </div>

                    {/* Quick overlay shadow */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity no-print">
                      <ChevronRight className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VIEW TYPE B: DETAILED TABLE VIEW */}
          {viewType === "table" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden no-print">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[11px] uppercase font-mono tracking-wider text-slate-500">
                      <th className="py-4 px-5 font-bold">Hari</th>
                      <th className="py-4 px-4 font-bold">Pilar & Platform</th>
                      <th className="py-4 px-4 font-bold">Judul Konten</th>
                      <th className="py-4 px-4 font-bold">Kalimat Pembuka (Hook)</th>
                      <th className="py-4 px-4 font-bold">Format</th>
                      <th className="py-4 px-4 font-bold">Status</th>
                      <th className="py-4 px-4 text-center font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                    {filteredDays.map((item) => {
                      const styles = pilarColors[item.pilar] || pilarColors["Edukasi"];
                      return (
                        <tr 
                          key={item.day}
                          onClick={() => onSelectDay(item)}
                          className="hover:bg-slate-50/50 cursor-pointer group transition-colors"
                        >
                          <td className="py-4 px-5">
                            <span className="font-mono font-bold text-slate-700 bg-emerald-50 text-emerald-800 px-2 py-1 rounded">
                              H{item.day}
                            </span>
                          </td>
                          <td className="py-4 px-4 space-y-1">
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border ${styles.bg} ${styles.text}`}>
                              {item.pilar}
                            </span>
                            <p className="text-[10px] text-slate-400 font-mono truncate max-w-[120px]">{item.platform}</p>
                          </td>
                          <td className="py-4 px-4 font-medium text-slate-800 max-w-[150px] truncate">
                            {item.title}
                          </td>
                          <td className="py-4 px-4 text-slate-400 italic max-w-[170px] truncate">
                            "{item.hook}"
                          </td>
                          <td className="py-4 px-4 font-mono text-[10px]">
                            {item.format}
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={item.status}
                              onClick={(e) => e.stopPropagation()} // Stop modal from opening
                              onChange={(e) => onUpdateStatus(item.day, e.target.value as ContentPlanStatus)}
                              className="text-[10px] bg-slate-50 border border-slate-200 rounded p-1 font-mono hover:border-emerald-500"
                            >
                              {kanbanLanes.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={(e) => handleCopyCaption(item, e)}
                              className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all"
                              title="Copy Copywriting & Judul"
                            >
                              {copiedDay === item.day ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW TYPE C: BENTO CARDS DETAIL VIEW */}
          {viewType === "card" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDays.map((item) => {
                const styles = pilarColors[item.pilar] || pilarColors["Edukasi"];
                return (
                  <div
                    key={item.day}
                    onClick={() => onSelectDay(item)}
                    className="group bg-white rounded-2xl border border-slate-200 p-6 space-y-4 hover:shadow-md cursor-pointer transition-all relative overflow-hidden"
                  >
                    {/* Top Row Title / Tag */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                          Hari {item.day}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono font-medium">({item.date})</span>
                      </div>

                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase border ${styles.bg} ${styles.text}`}>
                        {item.pilar}
                      </span>
                    </div>

                    {/* Core Heading */}
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-slate-800 text-lg group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-semibold font-mono tracking-wide">{item.platform} • {item.format}</p>
                    </div>

                    {/* Body content excerpt */}
                    <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 text-xs text-slate-500 leading-relaxed font-light space-y-1.5">
                      <p className="font-semibold text-slate-600">Hook Pembuka:</p>
                      <p className="italic font-mono text-[11px] text-emerald-800">"{item.hook}"</p>
                      <p className="font-semibold text-slate-600 pt-1.5">Konsep Dasar:</p>
                      <p className="line-clamp-2">{item.body}</p>
                    </div>

                    {/* Bottom Status / Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 no-print">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Status:</span>
                        <span className="text-[10px] font-bold text-emerald-700 font-mono">{item.status}</span>
                      </div>

                      <button
                        onClick={(e) => handleCopyCaption(item, e)}
                        className="px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 border border-slate-200 rounded-lg text-[10px] font-medium transition-all flex items-center gap-1.5"
                      >
                        {copiedDay === item.day ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            Tersalin
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Salin Caption
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VIEW TYPE D: KANBAN PRODUCTION BOARD */}
          {viewType === "kanban" && (
            <div className="overflow-x-auto pb-4 no-print">
              <div className="flex gap-4 min-w-[1200px]">
                {kanbanLanes.map((lane) => {
                  const laneItems = filteredDays.filter(d => d.status === lane);
                  
                  return (
                    <div
                      key={lane}
                      className="w-72 shrink-0 bg-slate-100 p-4 rounded-2xl min-h-[500px] flex flex-col space-y-3 shadow-inner"
                    >
                      {/* Lane Header */}
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs font-bold text-slate-700">{lane}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-600 font-mono font-bold">
                          {laneItems.length}
                        </span>
                      </div>

                      {/* Corridor Cards list */}
                      <div className="flex-1 overflow-y-auto space-y-3 max-h-[550px] pr-1">
                        {laneItems.length === 0 ? (
                          <div className="text-center p-6 border border-dashed border-slate-200 rounded-xl text-[10px] text-slate-400 font-mono">
                            Belum ada konten
                          </div>
                        ) : (
                          laneItems.map((item) => {
                            const styles = pilarColors[item.pilar] || pilarColors["Edukasi"];
                            return (
                              <div
                                key={item.day}
                                onClick={() => onSelectDay(item)}
                                className={`p-4 rounded-xl border bg-white shadow-xs hover:shadow transition-all cursor-pointer border-t-4 ${laneColors[lane]}`}
                              >
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-[9px] font-bold text-slate-400">
                                    <span className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-mono">
                                      H{item.day}
                                    </span>
                                    <span>{item.platform}</span>
                                  </div>

                                  <h5 className="font-display font-medium text-[12px] text-slate-800 leading-snug line-clamp-2">
                                    {item.title}
                                  </h5>

                                  <div className="flex items-center justify-between pt-2">
                                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border ${styles.bg} ${styles.text}`}>
                                      {item.pilar}
                                    </span>

                                    {/* Action button to slide to next lane */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const currentIdx = kanbanLanes.indexOf(lane);
                                        const nextStatus = kanbanLanes[(currentIdx + 1) % kanbanLanes.length];
                                        onUpdateStatus(item.day, nextStatus);
                                      }}
                                      className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-emerald-700 transition"
                                      title="Kemajuan ke Status Selanjutnya"
                                    >
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
