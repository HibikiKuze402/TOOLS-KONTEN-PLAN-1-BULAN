import { useState, useEffect } from "react";
import { ContentDayItem, ContentPlanStatus } from "../types";
import { 
  X, 
  Copy, 
  Check, 
  Video, 
  Image as ImageIcon, 
  FileText, 
  Palette, 
  ListTodo, 
  Sparkles,
  RefreshCw,
  Pencil
} from "lucide-react";

interface DetailModalProps {
  item: ContentDayItem;
  onClose: () => void;
  onUpdateStatus: (dayNum: number, currentStatus: ContentPlanStatus) => void;
  onUpdateItem?: (updatedItem: ContentDayItem) => void;
}

export default function DetailModal({ item, onClose, onUpdateStatus, onUpdateItem }: DetailModalProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  
  // Manage Checklist items locally inside state
  const [checklist, setChecklist] = useState<string[]>([]);

  // Editing state toggles and fields
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedPilar, setEditedPilar] = useState<"Edukasi" | "Promosi" | "Engagement" | "Branding">("Edukasi");
  const [editedPlatform, setEditedPlatform] = useState<string>("");
  const [editedFormat, setEditedFormat] = useState<string>("");
  const [editedVideoDuration, setEditedVideoDuration] = useState<string>("");
  const [editedScript, setEditedScript] = useState<string>("");
  const [editedCaption, setEditedCaption] = useState<string>("");
  const [editedDesignIdea, setEditedDesignIdea] = useState<string>("");
  const [editedVideoIdea, setEditedVideoIdea] = useState<string>("");
  const [editedImgAiPrompt, setEditedImgAiPrompt] = useState<string>("");
  const [editedVideoAiPrompt, setEditedVideoAiPrompt] = useState<string>("");

  const startEditing = () => {
    setEditedTitle(item.title);
    setEditedPilar(item.pilar);
    setEditedPlatform(item.platform);
    setEditedFormat(item.format);
    setEditedVideoDuration(item.videoDuration || "N/A");
    setEditedScript(item.script || "");
    setEditedCaption(item.caption);
    setEditedDesignIdea(item.designIdea);
    setEditedVideoIdea(item.videoIdea || "N/A");
    setEditedImgAiPrompt(item.imgAiPrompt || "");
    setEditedVideoAiPrompt(item.videoAiPrompt || "");
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (!editedTitle.trim()) {
      alert("Judul konten tidak boleh kosong!");
      return;
    }
    
    const updated: ContentDayItem = {
      ...item,
      title: editedTitle,
      pilar: editedPilar,
      platform: editedPlatform,
      format: editedFormat,
      videoDuration: editedVideoDuration,
      script: editedScript,
      caption: editedCaption,
      designIdea: editedDesignIdea,
      videoIdea: editedVideoIdea,
      imgAiPrompt: editedImgAiPrompt,
      videoAiPrompt: editedVideoAiPrompt,
      productionChecklist: checklist, // Persist checklist items in state sync
    };
    
    if (onUpdateItem) {
      onUpdateItem(updated);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    if (item.productionChecklist) {
      setChecklist(item.productionChecklist);
    } else {
      setChecklist(["Rancang visual di Canva", "Tulis & sesuaikan caption", "Finalisasi CTA & Hashtag", "Jadwal upload di Creator Studio"]);
    }
  }, [item]);

  const handleToggleCheck = (index: number) => {
    const updated = [...checklist];
    // We can prepend a standard symbol or do some toggle representation
    if (updated[index].startsWith("[✓] ")) {
      updated[index] = updated[index].replace("[✓] ", "");
    } else {
      updated[index] = "[✓] " + updated[index];
    }
    setChecklist(updated);
  };

  const handleCopyText = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const kanbanStatuses: ContentPlanStatus[] = [
    "Ide",
    "Siap Produksi",
    "Proses Desain",
    "Proses Editing",
    "Siap Upload",
    "Terupload",
    "Evaluasi"
  ];

  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto no-print">
        
        {/* Absolute overlay backing to exit */}
        <div className="absolute inset-0" onClick={() => setIsEditing(false)} />

        {/* Main Dialog Modal */}
        <div className="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
          
          {/* Top Header */}
          <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-amber-100 text-amber-850 px-2 py-0.5 rounded">
                  Mode Edit
                </span>
                <span className="text-xs text-slate-400 font-mono">Hari Ke-{item.day} ({item.date})</span>
              </div>
              <h3 className="font-display font-bold text-slate-800 text-lg leading-tight">
                Mengedit Ide Konten
              </h3>
            </div>

            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Form Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            
            {/* Title & Pillar Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold font-mono tracking-wide uppercase text-slate-500">Judul Konten</label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-semibold text-slate-800"
                  placeholder="Contoh: Adab Tidur Sesuai Tuntunan Rasulullah SAW"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold font-mono tracking-wide uppercase text-slate-500">Pilar Utama</label>
                <select
                  value={editedPilar}
                  onChange={(e) => setEditedPilar(e.target.value as any)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-semibold text-slate-800 bg-white"
                >
                  <option value="Edukasi">Edukasi</option>
                  <option value="Promosi">Promosi</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Branding">Branding</option>
                </select>
              </div>
            </div>

            {/* Platform, Format, Duration Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold font-mono tracking-wide uppercase text-slate-500">Platform</label>
                <input
                  type="text"
                  value={editedPlatform}
                  onChange={(e) => setEditedPlatform(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs text-slate-700"
                  placeholder="Contoh: Instagram Feed, TikTok"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold font-mono tracking-wide uppercase text-slate-500">Format Konten</label>
                <input
                  type="text"
                  value={editedFormat}
                  onChange={(e) => setEditedFormat(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs text-slate-700"
                  placeholder="Contoh: Carousel, Reels Video"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold font-mono tracking-wide uppercase text-slate-500">Target Durasi / Penjadwalan</label>
                <input
                  type="text"
                  value={editedVideoDuration}
                  onChange={(e) => setEditedVideoDuration(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs text-slate-700"
                  placeholder="Contoh: 15-30 detik atau N/A"
                />
              </div>
            </div>

            {/* Split layout for scripts & caption copywriting */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-bold font-mono tracking-wide uppercase text-slate-500 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-emerald-600" />
                  Visual & Voiceover Script (Skrip VO)
                </label>
                <textarea
                  rows={6}
                  value={editedScript}
                  onChange={(e) => setEditedScript(e.target.value)}
                  className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs font-mono leading-relaxed"
                  placeholder="Tulis dialog voiceover atau narasi visual di sini..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold font-mono tracking-wide uppercase text-slate-500 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Draft Caption Lengkap
                </label>
                <textarea
                  rows={6}
                  value={editedCaption}
                  onChange={(e) => setEditedCaption(e.target.value)}
                  className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs leading-relaxed"
                  placeholder="Tulis draft caption, call to action, dan hashtag di sini..."
                />
              </div>

            </div>

            {/* Visual briefs, layouts, prompts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-bold font-mono tracking-wide uppercase text-slate-500 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-emerald-600" />
                  Arahan Brief Visual / Desain Layout
                </label>
                <textarea
                  rows={3}
                  value={editedDesignIdea}
                  onChange={(e) => setEditedDesignIdea(e.target.value)}
                  className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs text-slate-700"
                  placeholder="Contoh: Desain visual bersih menggunakan warna pastel..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold font-mono tracking-wide uppercase text-slate-500 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-emerald-600" />
                  Timeline / Alur Video
                </label>
                <textarea
                  rows={3}
                  value={editedVideoIdea}
                  onChange={(e) => setEditedVideoIdea(e.target.value)}
                  className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs text-slate-700"
                  placeholder="Rincian alur transisi video harian..."
                />
              </div>

            </div>

            {/* AI Prompt generators */}
            <div className="space-y-4 p-5 bg-slate-900 rounded-2xl">
              <h4 className="text-[11px] font-bold font-mono uppercase tracking-wide text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                AI Prompts (GPT image 2/Nano Banana 2)
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">IMAGE PROMPT (GPT image 2)</label>
                  <textarea
                    rows={3}
                    value={editedImgAiPrompt}
                    onChange={(e) => setEditedImgAiPrompt(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded text-slate-100 font-mono text-[11px] focus:outline-none focus:border-emerald-500 resize-none leading-normal"
                    placeholder="Masukkan prompt gambar Bahasa Inggris..."
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">VIDEO PROMPT (Nano Banana 2)</label>
                  <textarea
                    rows={3}
                    value={editedVideoAiPrompt}
                    onChange={(e) => setEditedVideoAiPrompt(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded text-slate-100 font-mono text-[11px] focus:outline-none focus:border-emerald-500 resize-none leading-normal"
                    placeholder="Masukkan prompt video Bahasa Inggris..."
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Action Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 no-print">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 transition"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSaveChanges}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto no-print">
      
      {/* Absolute overlay backing to exit */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Dialog Modal */}
      <div className="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                Hari Ke-{item.day}
              </span>
              <span className="text-xs text-slate-400 font-mono">({item.date})</span>
            </div>
            <h3 className="font-display font-bold text-slate-800 text-lg leading-tight">
              {item.title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Edit Button */}
            <button
              onClick={startEditing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-850 border border-emerald-200 rounded-xl text-xs font-semibold shadow-xs transition h-8"
              title="Edit Rincian Ide Konten ini"
            >
              <Pencil className="w-3.5 h-3.5 text-emerald-700" />
              <span>Edit Konten</span>
            </button>

            {/* Status quick switcher drop */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-xs font-mono text-xs">
              <span className="text-slate-400 text-[10px] font-bold uppercase mr-1">Status:</span>
              <select
                value={item.status}
                onChange={(e) => onUpdateStatus(item.day, e.target.value as ContentPlanStatus)}
                className="bg-transparent text-emerald-800 font-bold focus:outline-none cursor-pointer"
              >
                {kanbanStatuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* Main info Overview grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100/50 text-xs">
            <div>
              <p className="text-slate-400 font-mono uppercase tracking-wider text-[10px]">Pilar Utama</p>
              <p className="font-bold text-emerald-900 mt-1 uppercase tracking-wide">{item.pilar}</p>
            </div>
            <div>
              <p className="text-slate-400 font-mono uppercase tracking-wider text-[10px]">Platform & Format</p>
              <p className="font-bold text-emerald-950 mt-1">{item.platform} ({item.format})</p>
            </div>
            <div>
              <p className="text-slate-400 font-mono uppercase tracking-wider text-[10px]">Target Durasi / Penjadwalan</p>
              <p className="font-bold text-emerald-950 mt-1">{item.videoDuration !== "N/A" ? item.videoDuration : "Konten Gambar Statis"}</p>
            </div>
          </div>

          {/* Double Column Row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Left Column (3/5 width): Script and Captions Copywriting */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Voice over script or Narration outline */}
              {item.script && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wide text-slate-500 flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-emerald-600" />
                      Visual & voiceover script
                    </h4>
                    <button
                      onClick={() => handleCopyText(item.script || "", "script")}
                      className="text-[10px] text-emerald-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      {copiedSection === "script" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      Salin Skrip
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-900 text-slate-100 text-[11px] rounded-xl whitespace-pre-wrap font-mono leading-relaxed max-h-[220px] overflow-y-auto border border-slate-800">
                    {item.script}
                  </pre>
                </div>
              )}

              {/* Complete Captions and Call to action */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wide text-slate-500 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Draft Caption Lengkap
                  </h4>
                  <button
                    onClick={() => handleCopyText(item.caption, "caption")}
                    className="text-[10px] text-emerald-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    {copiedSection === "caption" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    Salin Caption
                  </button>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl max-h-[300px] overflow-y-auto text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {item.caption}
                </div>
              </div>

            </div>

            {/* Right Column (2/5 width): Design directives & AI Prompts */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Designer design layout Brief */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wide text-slate-500 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-emerald-600" />
                  Arahan Brief Visual / Desain
                </h4>
                <div className="p-4 bg-emerald-50/20 border border-emerald-50 text-xs text-slate-600 rounded-xl leading-relaxed">
                  <p className="font-semibold text-slate-700">Rekomendasi Layout:</p>
                  <p className="mt-1">{item.designIdea}</p>
                  
                  {item.videoIdea && item.videoIdea !== "N/A" && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="font-semibold text-slate-700">Timeline / Alur Video:</p>
                      <p className="mt-1 whitespace-pre-wrap text-[11px] font-light">{item.videoIdea}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Text Prompts for visual generators */}
              {(item.imgAiPrompt || item.videoAiPrompt) && (
                <div className="space-y-2 p-4 bg-slate-900 rounded-2xl text-slate-300">
                  <h4 className="text-[10px] font-bold font-mono uppercase tracking-wide text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Prompts (GPT image 2/Nano Banana 2)
                  </h4>
                  <p className="text-[10px] text-slate-500 font-light">Gunakan prompt di bawah pada bot generator AI pilihan Anda:</p>
                  
                  {item.imgAiPrompt && (
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                        <span>IMAGE PROMPT (4:5)</span>
                        <button onClick={() => handleCopyText(item.imgAiPrompt || "", "imgPrompt")} className="hover:text-emerald-300">
                          {copiedSection === "imgPrompt" ? "Tersalin" : "Salin"}
                        </button>
                      </div>
                      <p className="p-2 bg-slate-950 text-slate-100 font-mono text-[10px] rounded border border-slate-800 break-words leading-tight select-all">
                        {item.imgAiPrompt}
                      </p>
                    </div>
                  )}

                  {item.videoAiPrompt && (
                    <div className="space-y-1 pt-2">
                      <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                        <span>VIDEO PROMPT (9:16)</span>
                        <button onClick={() => handleCopyText(item.videoAiPrompt || "", "vidPrompt")} className="hover:text-emerald-300">
                          {copiedSection === "vidPrompt" ? "Tersalin" : "Salin"}
                        </button>
                      </div>
                      <p className="p-2 bg-slate-950 text-slate-100 font-mono text-[10px] rounded border border-slate-800 break-words leading-tight select-all">
                        {item.videoAiPrompt}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Interactive production checklist task sheet */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wide text-slate-500 flex items-center gap-1.5">
                  <ListTodo className="w-4 h-4 text-emerald-600" />
                  Checklist Langkah Produksi
                </h4>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
                  {checklist.map((task, index) => {
                    const isChecked = task.startsWith("[✓] ");
                    const cleanedTask = task.replace("[✓] ", "");
                    
                    return (
                      <button
                        type="button"
                        key={index}
                        onClick={() => handleToggleCheck(index)}
                        className="w-full flex items-center gap-2.5 text-left text-xs p-1.5 hover:bg-slate-100 rounded transition"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Swapped via button click trigger
                          className="accent-emerald-600 pointer-events-none shrink-0"
                        />
                        <span className={`${isChecked ? "line-through text-slate-400" : "text-slate-600 font-medium"}`}>
                          {cleanedTask}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom footer button sheet */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 no-print">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600"
          >
            Selesai Meninjau
          </button>
        </div>

      </div>

    </div>
  );
}
