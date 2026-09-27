import React from 'react';
import { Activity, Heart, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark with icon */}
          <a href="#" className="flex items-center gap-2.5 text-slate-900 group">
            <span className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-sm shadow-rose-200 transition-transform group-hover:scale-105">
              <Heart className="w-4 h-4 fill-white" />
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              CardioCare<span className="text-rose-600 font-extrabold">.ML</span>
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#urgensi-sdgs" className="hover:text-slate-950 transition-colors">
              Urgensi & SDGs 3.4
            </a>
            <a href="#arsitektur-teknologi" className="hover:text-slate-950 transition-colors">
              Arsitektur Sistem
            </a>
            <a href="#alur-pipeline" className="hover:text-slate-950 transition-colors">
              Alur Pipeline
            </a>
            <a href="#visualisasi-eda" className="hover:text-slate-950 transition-colors">
              Visualisasi Data
            </a>
            <a href="#komparasi-model" className="hover:text-slate-950 transition-colors">
              Evaluasi 6 Model
            </a>
            <a href="#faq-presentasi" className="hover:text-slate-950 transition-colors">
              Tanya Jawab Penguji
            </a>
          </nav>

          {/* Zone 3: Primary action button */}
          <div className="flex items-center gap-3">
            <a
              href="#kalkulator-risiko"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-lg shadow-sm shadow-rose-200 transition-all whitespace-nowrap"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Coba Skrining Pasien</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
