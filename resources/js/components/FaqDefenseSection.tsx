import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, RefreshCw, AlertCircle, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

export const FaqDefenseSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first item open by default

  const faqs = [
    {
      q: 'Q1: Mengapa nilai Recall lebih penting dibandingkan Accuracy dalam project ini?',
      a: 'Dalam domain medis klinis, kesalahan False Negative (pasien yang sebenarnya sakit jantung tetapi diprediksi sehat/normal oleh sistem AI) jauh lebih fatal dan membahayakan keselamatan jiwa karena pasien kehilangan waktu krusial (golden period) untuk mendapatkan intervensi medis tepat waktu. Sebaliknya, False Positive hanya menyebabkan pasien menjalani pemeriksaan konfirmasi lanjutan tanpa risiko kematian. Oleh karena itu, metrik Recall (Sensitivitas) diutamakan untuk memastikan sebanyak mungkin pasien berisiko berhasil terdeteksi oleh sistem.'
    },
    {
      q: 'Q2: Mengapa nilai Cholesterol = 0 diubah menjadi median, bukan dihapus saja barisnya?',
      a: 'Menghapus seluruh baris data yang memiliki nilai Kolesterol 0 akan mengurangi sekitar 172 baris sampel latihan kita (hampir 19% dari total 918 dataset). Penghapusan ini membuang informasi berharga dari 10 parameter klinis lainnya yang valid (seperti tekanan darah, usia, tipe nyeri dada, dan depresi ST). Imputasi dengan nilai median (237 mg/dl) mempertahankan ukuran sampel secara utuh, dan nilai median dipilih karena lebih tahan (robust) terhadap nilai-nilai ekstrem dibandingkan nilai rata-rata (mean).'
    },
    {
      q: 'Q3: Kenapa Random Forest umumnya mengungguli Single Decision Tree?',
      a: 'Single Decision Tree rentan mengalami overfitting (menghafal derau/noise pada data latih secara kaku sehingga buruk saat memprediksi data baru). Random Forest menerapkan prinsip Ensemble Learning berbasis Bagging (Bootstrap Aggregating) dengan membangun 100 pohon keputusan secara paralel dari subsampel acak dan subset fitur acak. Keputusan akhir diambil melalui mekanisme mayoritas (majority voting), yang secara matematis meredam varians dan menghasilkan model yang jauh lebih stabil serta tergeneralisasi dengan baik (Akurasi 88.59% vs 79.89%).'
    },
    {
      q: 'Q4: Mengapa dilakukan scaling data, dan apakah semua algoritma membutuhkan Scaling?',
      a: 'Scaling (StandardScaler) dilakukan agar variabel bertipe angka dengan rentang nilai besar (seperti Kolesterol 100-600 atau Detak Jantung 60-202) tidak mendominasi variabel dengan rentang kecil (seperti Oldpeak 0-6 atau FastingBS 0-1). Algoritma berbasis jarak Euclidean (seperti KNN), optimasi hyperplane (seperti SVM), dan model linear (Logistic Regression) SANGAT SENSITIF terhadap skala data. Namun, algoritma berbasis pohon pemisah seperti Decision Tree dan Random Forest sebenarnya tidak wajib menggunakan scaling karena percabangan diputuskan berdasarkan ambang batas partisi tunggal per fitur (scale-invariant).'
    }
  ];

  return (
    <section id="faq-presentasi" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
            <span>07. PERSIAPAN SIDANG &amp; PRESENTASI</span>
            <span aria-hidden="true">·</span>
            <span>BEDAH TEORITIS &amp; METODOLOGI</span>
            <span aria-hidden="true">·</span>
            <span>PERTANYAAN KRUSIAL DOSEN PENGUJI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            Bank Tanya Jawab Ujian Sidang &amp; Rencana Pemeliharaan Model
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            Kompilasi argumentasi ilmiah yang sering diuji oleh dosen pembimbing dan penguji terkait justifikasi metrik, imputasi medis, dan stabilitas algoritma.
          </p>
        </div>

        {/* 2 Column Layout: Accordion FAQs (Left) vs Drift Monitoring Plan (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FAQs Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {faq.q}
                    </span>
                    <span className="p-1 rounded-md bg-slate-100 text-slate-600 shrink-0 mt-0.5">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Model Monitoring & Data Drift Plan */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900">
                <RefreshCw className="w-5 h-5 text-teal-600 shrink-0" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                  Strategi Monitoring &amp; Mitigasi Drift Berkelanjutan
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Model machine learning yang telah di-deploy ke lingkungan produksi tidak bersifat statis, melainkan rentan terhadap fenomena degradasi performa:
              </p>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-900 font-mono block">
                    1. Data Drift &amp; Concept Drift
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Seiring berjalannya waktu, karakteristik pola hidup masyarakat, pola makan, atau prevalensi komorbid dapat bergeser sehingga relasi antara fitur dan diagnosa berubah.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-900 font-mono block">
                    2. Audit Log &amp; Pengawasan Periodik
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mencatat parameter input anonim dan hasil skrining untuk dilakukan audit kualitas inferensi secara berkala oleh tim medis ahli kardiologi.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-900 font-mono block">
                    3. Jadwal Retraining Otomatis (6 - 12 Bulan)
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Menjadwalkan pelatihan ulang model secara terjadwal dengan menginkorporasikan data klinis baru terverifikasi, serta memicu peringatan otomatis jika Recall turun di bawah ambang batas 90%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
