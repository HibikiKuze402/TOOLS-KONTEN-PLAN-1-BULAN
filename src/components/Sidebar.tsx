import { 
  LayoutDashboard, 
  Sparkles, 
  Calendar, 
  Kanban, 
  FolderHeart, 
  Download, 
  Settings, 
  Menu, 
  X,
  FileCheck2
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  hasPlan: boolean;
  brandName?: string;
  accountName?: string;
}

export default function Sidebar({ currentTab, setCurrentTab, hasPlan, brandName, accountName }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, requiresPlan: false },
    { id: "form", label: "Buat Content Plan", icon: Sparkles, requiresPlan: false },
    { id: "preview", label: "Hasil Generate", icon: FileCheck2, requiresPlan: true },
    { id: "calendar", label: "Kalender Konten", icon: Calendar, requiresPlan: true },
    { id: "kanban", label: "Kanban Produksi", icon: Kanban, requiresPlan: true },
    { id: "history", label: "Riwayat Project", icon: FolderHeart, requiresPlan: false },
    { id: "export", label: "Export & Cetak", icon: Download, requiresPlan: true },
    { id: "settings", label: "Settings & API", icon: Settings, requiresPlan: false },
  ];

  const handleTabClick = (id: string, requiresPlan: boolean) => {
    if (requiresPlan && !hasPlan) return;
    setCurrentTab(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-emerald-950 text-white shadow-md z-30 relative no-print">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
          <span className="font-display font-medium tracking-tight text-white">ContentPlan.AI</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-emerald-300 hover:text-white rounded-md hover:bg-emerald-900 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
        />
      )}

      {/* Main Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-20 w-64 bg-emerald-900 text-white flex flex-col justify-between border-r border-emerald-850 shadow-xl transition-transform duration-300 transform no-print
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:h-screen
      `}>
        <div className="flex-1 overflow-y-auto scrollbar-none">
          {/* Header */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center text-emerald-900 font-bold font-display shadow-sm">
              CP
            </div>
            <div>
              <h1 className="font-display font-bold text-white text-sm uppercase tracking-wider leading-none">ContentPlan.ai</h1>
              <p className="text-[10px] text-emerald-300 font-mono tracking-wider mt-1 uppercase">30 Days Generator</p>
            </div>
          </div>

          {/* Active Account Info if available */}
          {brandName && (
            <div className="mx-4 my-2 p-3 rounded-xl bg-emerald-800/40 border border-emerald-700/30">
              <p className="text-xs text-emerald-100 font-medium truncate">{brandName}</p>
              <p className="text-[10px] text-emerald-300 font-mono truncate mt-0.5">{accountName || "@username"}</p>
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              const disabled = item.requiresPlan && !hasPlan;

              return (
                <button
                  key={item.id}
                  disabled={disabled}
                  onClick={() => handleTabClick(item.id, item.requiresPlan)}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all duration-200 group text-left relative
                    ${isActive 
                      ? "bg-emerald-800 text-emerald-50 font-semibold" 
                      : disabled 
                        ? "text-emerald-700/60 cursor-not-allowed opacity-40 hover:bg-transparent" 
                        : "hover:bg-emerald-800/50 hover:text-white"
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isActive ? "scale-105 text-amber-400 opacity-100" : "opacity-70 group-hover:scale-105 group-hover:opacity-100"}`} />
                  <span className="truncate">{item.label}</span>

                  {disabled && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] px-1.5 py-0.5 rounded border border-emerald-800 text-emerald-600 bg-emerald-950/20 font-mono">
                      Kunci
                    </span>
                  )}
                  
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-amber-400 rounded-r-md" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dynamic Project Progress widget matching design HTML */}
        <div className="p-4 mt-auto">
          <div className="bg-emerald-800/50 p-4 rounded-xl border border-emerald-700/50">
            <p className="text-xs text-emerald-250 mb-2 truncate">
              Project: <span className="text-white font-bold">{brandName || "Ramadhan 2024"}</span>
            </p>
            <div className="w-full bg-emerald-950 rounded-full h-1.5">
              <div 
                className="bg-amber-400 h-1.5 rounded-full transition-all duration-500" 
                style={{ width: hasPlan ? "100%" : "0%" }}
              ></div>
            </div>
            <p className="text-[10px] mt-2 text-emerald-300 font-mono">
              {hasPlan ? "30 dari 30" : "0 dari 30"} hari terbuat
            </p>
          </div>
        </div>

        {/* Footer info branding */}
        <div className="p-4 border-t border-emerald-800/40 bg-emerald-900/60 flex items-center justify-between text-[10px] font-mono text-emerald-300">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Status: Ready</span>
          </div>
          <span>v1.2</span>
        </div>
      </aside>
    </>
  );
}
