import React from 'react';
import { Activity, ShieldCheck, Database, Award, ArrowRight, HeartPulse, Sparkles, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="urgensi-sdgs" className="relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-20 bg-slate-900 text-white">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-rose-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative & SDGs 3.4 Focus */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed metadata line with typographic separator */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-teal-400 font-semibold tracking-wide">SDGs 3.4 TARGET</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>KAGGLE 918 DATASET</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>ENSEMBLE RANDOM FOREST</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-rose-400 font-semibold">RECALL 92.31%</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
              Deteksi Dini Risiko Kardiovaskular Berbasis Machine Learning Presisi
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Penyakit kardiovaskular merupakan <strong className="text-white font-semibold">penyebab kematian nomor 1 di dunia</strong> dengan 17,9 juta korban setiap tahunnya. Sebagian besar keterlambatan penanganan terjadi karena kurangnya kesadaran terhadap gejala awal (seperti <em className="text-teal-300 not-italic font-medium">silent ischemia</em>) serta terbatasnya akses pemeriksaan rutin.
            </p>

            {/* SDGs 3.4 Focus Panel */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <span className="text-sm font-bold text-white tracking-wide">
                  Kontribusi Nyata Terhadap SDGs 3: Good Health and Well-Being
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Project ini secara khusus menjawab <strong className="text-teal-300 font-semibold">Target SDGs 3.4</strong>, yaitu <span className="underline decoration-teal-500/50 underline-offset-4">mengurangi angka kematian dini akibat Penyakit Tidak Menular (PTM)</span> melalui pencegahan primer, skrining risiko berbasis parameter klinis terstandar, dan intervensi cepat sebelum terjadinya komplikasi fatal gagal jantung.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300 border-t border-slate-700/60">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Skrining Cepat & Murah</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Sensitivitas Medis Tinggi</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Edukasi Pasien Preventif</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#kalkulator-risiko"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 rounded-lg shadow-lg shadow-rose-900/40 transition-all group"
              >
                <Activity className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Mulai Skrining Mandiri</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#komparasi-model"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
              >
                <span>Lihat Hasil 6 Algoritma</span>
              </a>
            </div>

            {/* Quantitative Claim Proofs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">
                  918
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Pasien 5 Multi-Center</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-400 tabular-nums">
                  88.59%
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Akurasi Random Forest</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-400 tabular-nums">
                  92.31%
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Recall (Sensitivitas)</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 tabular-nums">
                  &lt; 20ms
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Latensi Inferensi ML</p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Medical Hero Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shadow-2xl shadow-black/60 group">
              {/* Fallback container with image */}
              <div className="aspect-[16/10] sm:aspect-[4/3] w-full relative bg-slate-850 overflow-hidden">
                <img
                  src="../images/cardio_ai_hero_1790457988290.jpg"
                  alt="Laboratorium Kardiologi AI dan Monitor Telemetri Pasien"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={(e) => {
                    // Resilient fallback styling
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.classList.add('bg-gradient-to-br', 'from-slate-900', 'via-slate-800', 'to-slate-900');
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Live EKG Pulse Line Effect */}
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs text-teal-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                  <span>REAL-TIME SCORING</span>
                </div>
              </div>

              {/* Lower HUD Overlay */}
              <div className="p-5 bg-slate-900/95 border-t border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-200">
                    <HeartPulse className="w-4 h-4 text-rose-500 animate-pulse" />
                    Ensemble Stacking Engine
                  </span>
                  <span className="text-teal-400">MODEL .PKL READY</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                    <p className="text-slate-400">Fokus Evaluasi</p>
                    <p className="font-semibold text-white mt-0.5">Minimalkan False Negative</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                    <p className="text-slate-400">Transformasi Data</p>
                    <p className="font-semibold text-white mt-0.5">StandardScaler &amp; One-Hot</p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-normal">
                  Sistem menggabungkan 11 parameter fisiologis utama (umur, tekanan darah, tipe nyeri dada, depresi ST, hingga kolesterol terimputasi) untuk menghasilkan taksiran risiko terpercaya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
