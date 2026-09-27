import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, AlertTriangle, Users, HeartPulse, Activity } from 'lucide-react';
import {
  AGE_DISTRIBUTION,
  CHEST_PAIN_DISTRIBUTION,
  GENDER_DISTRIBUTION,
  ST_SLOPE_DISTRIBUTION,
  DATASET_STATS
} from '../data/edaData';

export const EdaSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'age' | 'chestPain' | 'gender' | 'cholesterol' | 'stSlope'>('chestPain');

  return (
    <section id="visualisasi-eda" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
            <span>04. EXPLORATORY DATA ANALYSIS</span>
            <span aria-hidden="true">·</span>
            <span>POLA KLINIS &amp; STATISTIK KAGGLE</span>
            <span aria-hidden="true">·</span>
            <span>918 PASIEN MULTI-CENTER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            Visualisasi Data Interaktif &amp; Pola Fitur Medis Penyakit Jantung
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            Eksplorasi mendalam terhadap 918 catatan pasien mengungkap korelasi kuat antara jenis nyeri dada, usia di atas 50 tahun, jenis kelamin, serta anomali fisiologis pada rekaman kolesterol.
          </p>
        </div>

        {/* Tab Controls (Functional Buttons) */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-xl mb-8 max-w-3xl">
          <button
            onClick={() => setActiveTab('chestPain')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'chestPain'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tipe Nyeri Dada (ChestPainType)
          </button>
          <button
            onClick={() => setActiveTab('age')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'age'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Distribusi Usia (Age)
          </button>
          <button
            onClick={() => setActiveTab('gender')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'gender'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Korelasi Gender (Sex)
          </button>
          <button
            onClick={() => setActiveTab('cholesterol')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'cholesterol'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Imputasi Kolesterol = 0
          </button>
          <button
            onClick={() => setActiveTab('stSlope')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'stSlope'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kemiringan ST (ST_Slope)
          </button>
        </div>

        {/* Tab 1: Chest Pain Type */}
        {activeTab === 'chestPain' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Bar visualization */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                      Rasio Risiko Penyakit Berdasarkan Tipe Nyeri Dada
                    </span>
                    <span className="text-xs font-mono text-slate-500">n = 918 Pasien</span>
                  </div>

                  <div className="space-y-4">
                    {CHEST_PAIN_DISTRIBUTION.map((cp) => (
                      <div key={cp.code} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">
                            {cp.code} · <span className="font-medium text-slate-600">{cp.name}</span>
                          </span>
                          <span className="font-mono font-bold text-slate-900 tabular-nums">
                            {cp.rate.toFixed(1)}% Sakit ({cp.diseased} dari {cp.total})
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
                          <div
                            style={{ width: `${cp.rate}%` }}
                            className={`h-full ${
                              cp.rate > 60 ? 'bg-rose-500' : cp.rate > 30 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                          />
                          <div
                            style={{ width: `${100 - cp.rate}%` }}
                            className="h-full bg-slate-300/80"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 pt-3 text-xs text-slate-600 border-t border-slate-200 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-rose-500" />
                      <span>Berisiko Penyakit Jantung</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-slate-300" />
                      <span>Normal / Sehat</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clinical Paradox Callout */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-2xl border border-rose-200 bg-rose-50/60 space-y-3">
                  <div className="flex items-center gap-2 text-rose-900">
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                    <h4 className="text-sm font-bold uppercase tracking-wider font-mono">
                      Temuan Kunci: Paradoks Asimtomatik (ASY)
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    Sebanyak <strong className="font-semibold text-rose-900">496 pasien (54% dari seluruh dataset)</strong> tidak melaporkan rasa nyeri dada khas angina saat istirahat (tipe ASY). Namun, kelompok ini justru memiliki <strong className="font-semibold text-rose-900">tingkat kejadian penyakit jantung tertinggi yaitu 79.0% (392 orang)</strong>.
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Hal ini membuktikan fenomena <em>silent ischemia</em>, di mana penyempitan arteri koroner berlangsung tanpa keluhan fisik yang disadari pasien sampai timbul kerusakan miokardium. Skrining prediktif Machine Learning menjadi instrumen penyelamat vital bagi kelompok asimtomatik ini.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Age Distribution */}
        {activeTab === 'age' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                    Distribusi Prevalensi Risiko Berdasarkan Rentang Usia
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Lonjakan risiko tajam terlihat saat memasuki dekade 50-an ke atas.
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-500">Rentang: 28 – 77 Tahun</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {AGE_DISTRIBUTION.map((item) => (
                  <div key={item.group} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <p className="text-xs font-bold text-slate-900">{item.group}</p>
                    <p className="text-2xl font-mono font-extrabold text-slate-900 tabular-nums">
                      {item.diseaseRate.toFixed(1)}%
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {item.diseased} dari {item.total} pasien
                    </p>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${item.diseaseRate}%` }}
                        className={`h-full ${
                          item.diseaseRate >= 60 ? 'bg-rose-500' : 'bg-amber-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <strong>Catatan Klinis:</strong> Usia rata-rata pasien pada dataset adalah <span className="font-mono font-semibold">53.5 ± 9.4 tahun</span>. Di atas usia 50 tahun, penurunan elastisitas pembuluh darah dan akumulasi plak ateroma menyebabkan lebih dari 60% subjek terdiagnosa memiliki risiko penyakit jantung.
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Gender Correlation */}
        {activeTab === 'gender' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GENDER_DISTRIBUTION.map((g) => (
              <div key={g.code} className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Users className="w-5 h-5 text-slate-700" />
                    <h4 className="text-base font-bold text-slate-900">{g.sex}</h4>
                  </div>
                  <span className="text-xs font-mono text-slate-500">n = {g.total} pasien</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-mono font-extrabold text-slate-900 tabular-nums">
                    {g.diseaseRate.toFixed(1)}%
                  </span>
                  <span className="text-xs text-slate-500">Tingkat Prevalensi Risiko</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Kasus Sakit:</span>
                    <strong className="font-mono text-slate-900">{g.diseased} orang</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Kasus Normal:</span>
                    <strong className="font-mono text-slate-900">{g.healthy} orang</strong>
                  </div>
                </div>

                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                  <div style={{ width: `${g.diseaseRate}%` }} className={g.code === 'M' ? 'bg-rose-500' : 'bg-teal-500'} />
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                  {g.code === 'M'
                    ? 'Populasi pria mendominasi dataset (78.9%) dengan rasio risiko 63.2%, mencerminkan faktor risiko gaya hidup seperti merokok dan stres kerja.'
                    : 'Wanita memiliki tingkat prevalensi 25.9%, didukung faktor proteksi kardiovaskular hormonal alami pada usia pra-menopause.'}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Cholesterol Imputation */}
        {activeTab === 'cholesterol' && (
          <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Data Wrangling: Penanganan Anomali Cholesterol = 0 mg/dl
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Pada dataset Kaggle asli ditemukan sebanyak <strong>172 baris (18.7%)</strong> yang memiliki nilai kolesterol sebesar 0. Secara fisiologis medis manusia, kadar kolesterol 0 mg/dl adalah <em>mustahil</em> dan merupakan indikasi kegagalan pencatatan laboratorium pada rumah sakit tertentu (terutama cabang Hungarian dan Switzerland).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Opsi Dihapus vs Diimputasi */}
              <div className="p-5 rounded-xl border border-rose-200 bg-white space-y-2">
                <span className="text-xs font-bold text-rose-700 uppercase font-mono tracking-wider">
                  ❌ Jika Baris Dihapus (Row Deletion)
                </span>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  <li>Kehilangan 172 sampel berharga (18.7% total data hilang sia-sia).</li>
                  <li>Sampel berkurang dari 918 menjadi 746 pasien saja.</li>
                  <li>Menghilangkan informasi penting dari 10 fitur medis lainnya (tekanan darah, usia, tipe nyeri dada yang valid).</li>
                </ul>
              </div>

              <div className="p-5 rounded-xl border border-teal-200 bg-white space-y-2">
                <span className="text-xs font-bold text-teal-800 uppercase font-mono tracking-wider">
                  ✅ Solusi Terpilih: Imputasi Nilai Median (237 mg/dl)
                </span>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  <li>Nilai 0 diganti dengan median kelompok data positif (&gt; 0) yaitu <strong>237 mg/dl</strong>.</li>
                  <li>Median dipilih alih-alih Mean (rata-rata) karena median kebal terhadap nilai ekstrem (outlier).</li>
                  <li>Mempertahankan integritas dan keragaman populasi 918 pasien secara utuh.</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-950 font-medium leading-relaxed">
              <strong>Simulasi di Website Ini:</strong> Form kalkulator risiko di bawah ini juga dilengkapi auto-imputasi cerdas. Jika pengguna memasukkan nilai kolesterol 0 atau tidak diketahui, sistem secara otomatis mengaktifkan nilai median acuan 237 mg/dl sesuai standar preprocessing skripsi/project ini.
            </div>
          </div>
        )}

        {/* Tab 5: ST Slope */}
        {activeTab === 'stSlope' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ST_SLOPE_DISTRIBUTION.map((slope) => (
              <div key={slope.slope} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                  Segmen ST: {slope.slope}
                </span>
                <p className="text-2xl font-mono font-extrabold text-slate-900 tabular-nums">
                  {slope.diseaseRate.toFixed(1)}% Sakit
                </p>
                <p className="text-xs text-slate-600">
                  {slope.diseased} dari {slope.total} pasien
                </p>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${slope.diseaseRate}%` }}
                    className={`h-full ${slope.diseaseRate > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                  />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                  {slope.slope.includes('Flat')
                    ? 'Kemiringan datar saat stress test merupakan prediktor iskemia miokardial nomor satu.'
                    : slope.slope.includes('Down')
                    ? 'Kemiringan menurun mencerminkan insufisiensi perfusi pembuluh darah koroner berat.'
                    : 'Kemiringan ke atas (Up) menandakan respon elektrofisiologis jantung yang sehat & normal.'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
