import { FolderHeart, Trash2, CalendarDays, ExternalLink, RefreshCw } from "lucide-react";
import { useState } from "react";

interface HistoryItem {
  id: string;
  createdAt: string;
  brandName: string;
  accountName: string;
  primaryNiche: string;
  monthlyTheme: string;
  totalDays: number;
  goals: string[];
  platforms: string[];
}

interface HistoryListProps {
  history: HistoryItem[];
  onLoadProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export default function HistoryList({ history, onLoadProject, onDeleteProject, onRefresh, isLoading }: HistoryListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const formattedDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-slate-800 text-lg flex items-center gap-2">
            <FolderHeart className="w-5 h-5 text-emerald-600 animate-bounce" />
            Riwayat Project Rencana Konten
          </h3>
          <p className="text-xs text-slate-400 mt-1">Cari dan muat kembali content plan 30 hari yang sudah pernah Anda simpan di disk local.</p>
        </div>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Segarkan Data (Refresh)
        </button>
      </div>

      {isLoading && (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 flex flex-col justify-center items-center space-y-3">
          <div className="w-8 h-8 rounded-full border-3 border-emerald-100 border-t-emerald-600 animate-spin" />
          <p className="text-xs text-slate-400 font-mono">Mengambil data arsip lokal...</p>
        </div>
      )}

      {!isLoading && history.length === 0 && (
        <div className="p-12 text-center rounded-3xl border border-slate-200 bg-white shadow-sm space-y-3">
          <FolderHeart className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="font-display font-semibold text-slate-700">Belum Ada Riwayat Tersimpan</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Anda belum pernah men-generate atau menyimpan rencana konten. Isi formulir pembuatan untuk menyimpan project pertama Anda!
          </p>
        </div>
      )}

      {!isLoading && history.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {history.map((project) => {
            const isDeleting = deletingId === project.id;
            
            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
              >
                {/* Branding row */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-slate-800 text-base">
                        {project.brandName || "Tanpa Nama Brand"}
                      </h4>
                      <p className="text-xs text-emerald-700 font-mono">{project.accountName || "@username"}</p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm("Apakah Anda yakin ingin menghapus project riwayat ini? Tindakan ini tidak dapat dibatalkan.")) {
                          onDeleteProject(project.id);
                        }
                      }}
                      className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Hapus riwayat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-50 rounded-xl space-y-1.5">
                    <p className="text-[10px] text-slate-400 font-mono font-bold uppercase">Tema Besar Bulan Ini</p>
                    <p className="text-xs text-slate-600 font-semibold truncate" title={project.monthlyTheme}>
                      {project.monthlyTheme || "No Theme Chosen"}
                    </p>
                  </div>
                </div>

                {/* Info Metadata */}
                <div className="space-y-3 pt-3 border-t border-slate-50 text-[11px] text-slate-400">
                  <div className="flex flex-wrap items-center gap-1">
                    {project.platforms?.map((p, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded text-[9px]">
                        {p}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="flex items-center gap-1 font-bold text-slate-500">
                      <CalendarDays className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      {project.totalDays} Hari Konten
                    </span>

                    <span>{formattedDate(project.createdAt)}</span>
                  </div>
                </div>

                {/* Interaction Footer */}
                <div className="pt-4 border-t border-slate-50">
                  <button
                    onClick={() => onLoadProject(project.id)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95 shadow-lg shadow-emerald-600/15"
                  >
                    Gunakan Project Ini
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
