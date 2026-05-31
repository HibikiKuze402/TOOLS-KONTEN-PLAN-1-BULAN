import { useState } from "react";
import { ContentDayItem } from "../types";
import { 
  Download, 
  Copy, 
  Check, 
  Printer, 
  FileSpreadsheet, 
  Info, 
  BookOpen,
  ChevronRight
} from "lucide-react";

interface ExportPanelProps {
  days: ContentDayItem[];
  brandName?: string;
  accountName?: string;
}

export default function ExportPanel({ days, brandName, accountName }: ExportPanelProps) {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedTSV, setCopiedTSV] = useState(false);

  // Helper downloading CSV files
  const handleDownloadCSV = () => {
    if (days.length === 0) return;

    // Set up headers
    const headers = [
      "Hari",
      "Tanggal",
      "Platform",
      "Format",
      "Pilar Konten",
      "Judul Konten",
      "Hook",
      "Caption",
      "CTA",
      "Hashtag",
      "Status"
    ];

    // Escape cell values to handle quotes / commas correctly
    const escapeCSV = (val: string) => {
      const stringified = (val || "").replace(/"/g, '""');
      return `"${stringified}"`;
    };

    const rows = days.map(d => [
      d.day,
      d.date,
      d.platform,
      d.format,
      d.pilar,
      d.title,
      d.hook,
      d.caption,
      d.cta,
      d.hashtag,
      d.status
    ].map(escapeCSV).join(","));

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: "text/csv;charset=utf-8;" }); // UTF-8 BOM
    const url = URL.createObjectURL(blob);
    
    // Virtual trigger click download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Content_Plan_${brandName || "Brand"}_30_Hari.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper formatting for perfect Google Sheet copy-paste (Tab Separated)
  const handleCopyTSVForSheets = () => {
    if (days.length === 0) return;

    const headers = ["Hari", "Platform", "Format", "Pilar", "Judul", "Hook", "Caption", "CTA", "Hashtag"];
    const rows = days.map(d => [
      `Hari ${d.day}`,
      d.platform,
      d.format,
      d.pilar,
      d.title,
      d.hook,
      d.caption.replace(/\n\r?/g, " "), // Replace line breaks inside cell to avoid breaking spreadsheet grid
      d.cta,
      d.hashtag
    ].join("\t"));

    const tsvContent = [headers.join("\t"), ...rows].join("\n");
    navigator.clipboard.writeText(tsvContent);
    setCopiedTSV(true);
    setTimeout(() => setCopiedTSV(false), 2000);
  };

  // Helper copying full text block
  const handleCopyAllText = () => {
    if (days.length === 0) return;

    const formattedBlock = days.map(d => {
      return `
=============================================
HARI KE-${d.day} (${d.platform}) - [${d.pilar.toUpperCase()}]
=============================================
Judul: ${d.title}
Hook: "${d.hook}"
Format: ${d.format}
Status: ${d.status}

CAPTION DRAFT MODUL:
${d.caption}

CTA: ${d.cta}
Hashtag: ${d.hashtag}
---------------------------------------------
Arahan Desain: ${d.designIdea}
AI Image Generator Prompt: ${d.imgAiPrompt || "N/A"}
`;
    }).join("\n");

    navigator.clipboard.writeText(formattedBlock);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in no-print">
      
      {/* Title */}
      <div>
        <h3 className="font-display font-bold text-slate-800 text-lg flex items-center gap-2">
          <Download className="w-5 h-5 text-emerald-600" />
          Export & Cetak Kalender Konten
        </h3>
        <p className="text-xs text-slate-400 mt-1">Ekstrak hasil rencana konten 30 hari dalam berbagai model format dokumen komersial.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Copy-paste/Download actions */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
          <h4 className="font-display font-semibold text-slate-800 text-sm flex items-center gap-2">
            📥 Format Dokumen & Teks
          </h4>
          
          <div className="space-y-3">
            
            {/* Action 1: Download CSV */}
            <button
              onClick={handleDownloadCSV}
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-emerald-50 hover:border-emerald-250 hover:text-emerald-900 font-medium text-xs text-left text-slate-700 flex items-center justify-between transition-all group active:scale-99"
            >
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 text-emerald-800 p-2.5 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold">Download Berkas CSV</p>
                  <p className="text-[10px] text-slate-400 font-normal">Kompatibel penuh dengan Microsoft Excel, Apple Numbers, atau LibreOffice.</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Action 2: Copy All Text Block */}
            <button
              onClick={handleCopyAllText}
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-emerald-50 hover:border-emerald-250 hover:text-emerald-900 font-medium text-xs text-left text-slate-700 flex items-center justify-between transition-all group active:scale-99"
            >
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 text-emerald-800 p-2.5 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition">
                  {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </div>
                <div>
                  <p className="font-bold">Salin Semua Draft Teks</p>
                  <p className="text-[10px] text-slate-400 font-normal">Menggabungkan teks caption, hook, judul, hashtag 30 hari ke clipboard.</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-bold">
                {copiedAll ? "Tersalin!" : "Salin"}
              </span>
            </button>

            {/* Action 3: Copy TSV for google sheets */}
            <button
              onClick={handleCopyTSVForSheets}
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-emerald-50 hover:border-emerald-250 hover:text-emerald-900 font-medium text-xs text-left text-slate-700 flex items-center justify-between transition-all group active:scale-99"
            >
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 text-emerald-800 p-2.5 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold">Export Khusus Google Sheet Format</p>
                  <p className="text-[10px] text-slate-400 font-normal">Format tab-separated khusus agar langsung muat rapi saat di-paste di Sheet.</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-bold">
                {copiedTSV ? "Copied!" : "Salin TSV"}
              </span>
            </button>

          </div>
        </div>

        {/* Card 2: Print & PDF actions */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
          <h4 className="font-display font-semibold text-slate-800 text-sm flex items-center gap-2">
            🖨️ Cetak & Simpan PDF fisik
          </h4>

          <div className="p-4 bg-slate-50 border border-slate-100/60 rounded-xl space-y-3 text-xs leading-relaxed">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-700">Panduan Cetak / Print PDF:</p>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Klik tombol cetak di bawah untuk membuka dialog print bawaan browser. Agar hasil lembar naskah terlihat maksimal dan rapi:
                </p>
              </div>
            </div>

            <ul className="list-decimal pl-5 space-y-1 text-[11px] text-slate-500 list-inside">
              <li>Pilih opsi <span className="font-semibold text-slate-700">"Save as PDF"</span> sebagai printer tujuan jika ingin menyimpan file PDF.</li>
              <li>Saran layout: pilih mode <span className="font-semibold text-slate-700">Landscape</span> (Samping) agar tabel tercetak luas.</li>
              <li>Aktifkan pilihan checkbox <span className="font-semibold text-slate-700">"Background graphics"</span> agar warna tag pilar tersorot.</li>
            </ul>
          </div>

          <button
            onClick={handlePrint}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Cetak Kalender Konten / Simpan PDF
          </button>
        </div>

      </div>

      {/* Guide Banner */}
      <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-4">
        <BookOpen className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
        <div className="text-xs space-y-1 text-emerald-900 leading-relaxed">
          <p className="font-bold">Langkah Selanjutnya Selepas Ekspor:</p>
          <p className="font-light text-emerald-800/90">
            Unggah berkas CSV ke dalam aplikasi penjadwalan otomatis (seperti Meta Creator Studio, Buffer, Hootsuite, atau Later) untuk memublikasikan konten secara berkala sesuai hari jam upload yang telah diatur oleh sistem generator kecerdasan.
          </p>
        </div>
      </div>

    </div>
  );
}
