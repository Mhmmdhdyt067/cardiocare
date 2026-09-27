import React from 'react';
import { Heart, GitBranch, ExternalLink, ShieldCheck, Mail, Globe, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 sm:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & SDGs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <span className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white" />
              </span>
              <span className="text-lg font-bold tracking-tight text-white">
                CardioCare<span className="text-rose-500 font-extrabold">.ML</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Sistem skrining dini penyakit kardiovaskular berbasis Ensemble Machine Learning (Random Forest) untuk mendukung pencapaian target PBB SDGs 3.4 dalam menurunkan mortalitas penyakit tidak menular secara global.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Komitmen SDGs 3.4: Good Health and Well-Being</span>
            </div>
          </div>

          {/* Col 2: Creator Information */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">
              Informasi Pembuat Proyek
            </h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="font-semibold text-white text-sm">Muhammad Hidayat</p>
              <p className="text-slate-400">Mahasiswa Ilmu Komputer Universitas Halu Oleo &amp; Full-Stack Web Engineer</p>
              <p className="text-slate-400 font-mono">Kontak: muhhidayat050607@gmail.com</p>
              <p className="text-slate-400">Fokus Riset: Rekayasa Perangkat Lunak &amp; Machine Learning</p>
            </div>
          </div>

          {/* Col 3: Links & GitHub */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">
              Dokumentasi &amp; Repositori
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="https://github.com/Mhmmdhdyt067/cardiocare-ai.git"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 transition-colors"
              >
                <GitBranch className="w-4 h-4" />
                <span>GitHub Repository Proyek</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href="https://www.kaggle.com/datasets/fedesoriano/heart-failure-prediction"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-teal-400 transition-colors pt-1"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Dataset Kaggle Heart Failure (918 Baris)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} CardioCare ML Project. Dikembangkan untuk keperluan riset ilmiah &amp; skrining dini preventif.</p>
          <p className="text-center sm:text-right text-slate-500 max-w-md">
            Peringatan: Website ini merupakan prototipe teknologi machine learning akademis dan bukan instrumen pengganti rekam medis resmi dokter spesialis jantung.
          </p>
        </div>
      </div>
    </footer>
  );
};
