import React, { useState } from 'react';
import { Award, CheckCircle2, AlertCircle, BarChart3, HelpCircle, ShieldAlert, Cpu } from 'lucide-react';
import { MODEL_METRICS } from '../data/edaData';
import { ModelMetric } from '../types/cardio';

export const ModelComparisonSection: React.FC = () => {
  const [selectedModelId, setSelectedModelId] = useState<string>('rf');

  const selectedModel = MODEL_METRICS.find(m => m.id === selectedModelId) || MODEL_METRICS[0];
  const { tp, tn, fp, fn } = selectedModel.confusionMatrix;
  const totalActualPositive = tp + fn; // 104
  const totalActualNegative = tn + fp; // 80
  const totalTest = tp + tn + fp + fn; // 184

  return (
    <section id="komparasi-model" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
            <span>05. EVALUASI MODEL</span>
            <span aria-hidden="true">·</span>
            <span>BENCHMARK 6 ALGORITMA KLASIFIKASI</span>
            <span aria-hidden="true">·</span>
            <span>HOLD-OUT TEST 184 PASIEN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            Komparasi 6 Model Machine Learning &amp; Urgensi Klinis Metrik Recall
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            Evaluasi menyeluruh pada 184 sampel data uji terstratifikasi membuktikan <strong>Random Forest Classifier</strong> berhasil mencetak akurasi tertinggi (88.59%) dan nilai Recall paling krusial (92.31%).
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm mb-12">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 font-bold">Algoritma Machine Learning</th>
                <th className="py-3.5 px-3 text-right font-bold">Accuracy</th>
                <th className="py-3.5 px-3 text-right font-bold">Precision</th>
                <th className="py-3.5 px-3 text-right font-bold text-rose-700">Recall (Krusial)</th>
                <th className="py-3.5 px-3 text-right font-bold">F1-Score</th>
                <th className="py-3.5 px-4 text-center font-bold">Status Evaluasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {MODEL_METRICS.map((model) => {
                const isSelected = selectedModelId === model.id;
                return (
                  <tr
                    key={model.id}
                    onClick={() => setSelectedModelId(model.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-rose-50/70 font-semibold'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {model.isBest && (
                          <Award className="w-4 h-4 text-amber-500 shrink-0" />
                        )}
                        <div>
                          <span className="font-bold text-slate-900 block">{model.name}</span>
                          <span className="text-[11px] font-normal text-slate-500 font-mono">{model.algorithmType}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono tabular-nums text-slate-900">
                      {model.accuracy.toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono tabular-nums text-slate-700">
                      {model.precision.toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono tabular-nums text-rose-700 font-bold">
                      {model.recall.toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono tabular-nums text-slate-700">
                      {model.f1Score.toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {model.isBest ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          Model Terpilih
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-mono">
                          Benchmark
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Interactive Confusion Matrix Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 2x2 Matrix */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                    Confusion Matrix Interaktif
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    {selectedModel.name}
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  Total Uji: {totalTest} Pasien
                </span>
              </div>

              {/* 2x2 Grid Representation */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-3 text-center">
                  {/* TP */}
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase block">
                      True Positive (TP)
                    </span>
                    <p className="text-3xl font-mono font-extrabold text-emerald-900 tabular-nums">
                      {tp}
                    </p>
                    <p className="text-[11px] text-emerald-700">
                      Pasien sakit diprediksi sakit (Berhasil dideteksi)
                    </p>
                  </div>

                  {/* FP */}
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                    <span className="text-[11px] font-mono font-bold text-amber-800 uppercase block">
                      False Positive (FP)
                    </span>
                    <p className="text-3xl font-mono font-extrabold text-amber-900 tabular-nums">
                      {fp}
                    </p>
                    <p className="text-[11px] text-amber-700">
                      Pasien sehat diprediksi sakit (False Alarm)
                    </p>
                  </div>

                  {/* FN (Krusial Medis) */}
                  <div className="p-4 rounded-xl bg-rose-50 border-2 border-rose-300 space-y-1 ring-2 ring-rose-200/50">
                    <span className="text-[11px] font-mono font-bold text-rose-800 uppercase block flex items-center justify-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                      False Negative (FN)
                    </span>
                    <p className="text-3xl font-mono font-extrabold text-rose-900 tabular-nums">
                      {fn}
                    </p>
                    <p className="text-[11px] text-rose-800 font-medium">
                      Pasien sakit diprediksi sehat (BAHAYA KLINIS FATAL)
                    </p>
                  </div>

                  {/* TN */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] font-mono font-bold text-slate-700 uppercase block">
                      True Negative (TN)
                    </span>
                    <p className="text-3xl font-mono font-extrabold text-slate-900 tabular-nums">
                      {tn}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Pasien sehat diprediksi normal
                    </p>
                  </div>
                </div>
              </div>

              {/* Mathematical breakdown */}
              <div className="pt-3 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-center">
                <div className="p-2 rounded bg-slate-50">
                  <p className="text-slate-500 text-[10px]">Akurasi</p>
                  <p className="font-bold text-slate-900">{selectedModel.accuracy}%</p>
                </div>
                <div className="p-2 rounded bg-slate-50">
                  <p className="text-slate-500 text-[10px]">Precision</p>
                  <p className="font-bold text-slate-900">{selectedModel.precision}%</p>
                </div>
                <div className="p-2 rounded bg-rose-50 border border-rose-200">
                  <p className="text-rose-700 text-[10px] font-bold">Recall</p>
                  <p className="font-bold text-rose-900">{selectedModel.recall}%</p>
                </div>
                <div className="p-2 rounded bg-slate-50">
                  <p className="text-slate-500 text-[10px]">F1-Score</p>
                  <p className="font-bold text-slate-900">{selectedModel.f1Score}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Why Recall is Gold Standard */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl border border-rose-200 bg-rose-50/70 space-y-4">
              <div className="flex items-center gap-2 text-rose-900">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                  Mengapa Recall (Sensitivitas) Adalah Metrik Paling Krusial?
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <p>
                  Dalam domain kecerdasan buatan medis, <strong>biaya kesalahan (Cost of Error) memiliki bobot asimetris</strong> yang ekstrem:
                </p>

                <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-1">
                  <strong className="text-rose-900 font-semibold block">
                    1. Bahaya False Negative (Pasien Sakit → Dibilang Sehat):
                  </strong>
                  <p className="text-xs text-slate-700">
                    Pasien penderita aterosklerosis koroner yang salah didiagnosa sehat oleh AI akan merasa tenang, tidak menjalani pemeriksaan dokter spesialis jantung, dan berisiko tinggi mengalami <em>serangan jantung mendadak (acute coronary syndrome)</em> atau kematian yang semestinya bisa dicegah.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 font-semibold block">
                    2. Dampak False Positive (Pasien Sehat → Diduga Sakit):
                  </strong>
                  <p className="text-xs text-slate-700">
                    Hanya menimbulkan kecemasan sementara dan biaya pemeriksaan penunjang lanjutan (misal rekam treadmill ulang), namun <em>tidak mengancam keselamatan nyawa pasien</em>.
                  </p>
                </div>

                <p className="text-xs text-rose-950 font-medium">
                  Dengan nilai <strong>Recall 92.31%</strong>, model Random Forest berhasil mendeteksi 96 dari 104 pasien penderita sakit jantung pada data uji, hanya menyisakan 8 kasus False Negative.
                </p>
              </div>
            </div>

            {/* Why Ensemble RF Outperforms Decision Tree */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Keunggulan Ensemble Random Forest vs Single Decision Tree
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                Decision Tree tunggal hanya meraih akurasi <strong>79.89%</strong> dan rentan <em>overfitting</em> (menghafal noise data latih). Sebaliknya, Random Forest menggabungkan <strong>100 pohon keputusan independen (Bagging/Bootstrap Aggregating)</strong> dengan pemilihan fitur acak, meredam varians secara drastis sehingga akurasi melonjak hingga <strong>88.59%</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
