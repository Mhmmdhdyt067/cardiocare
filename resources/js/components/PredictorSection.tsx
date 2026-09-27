import React, { useState, useEffect } from 'react';
import {
  Activity,
  Heart,
  AlertTriangle,
  CheckCircle,
  Copy,
  Check,
  RefreshCw,
  Info,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Sliders,
  FileText,
  Loader2
} from 'lucide-react';
import { PatientInput, PredictionResult } from '../types/cardio';
import { PATIENT_PRESETS } from '../data/edaData';
import { fetchHeartDiseasePrediction } from '../utils/mlEngine';

export const PredictorSection: React.FC = () => {
  const [patient, setPatient] = useState<PatientInput>(PATIENT_PRESETS[1].data);
  const [copied, setCopied] = useState<boolean>(false);

  // State untuk menyimpan hasil dari API FastAPI Vercel
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Trigger pemanggilan API setiap kali state `patient` berubah
  useEffect(() => {
    let isMounted = true;
    const getPrediction = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchHeartDiseasePrediction(patient);
        if (isMounted) {
          setResult(res);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Terjadi kesalahan saat menghubungkan ke API');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Debounce sederhana (300ms) agar tidak memboroskan hit API saat slider digeser cepat
    const timeoutId = setTimeout(() => {
      getPrediction();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [patient]);

  const handleApplyPreset = (presetData: PatientInput) => {
    setPatient({ ...presetData });
  };

  const handleCopySummary = () => {
    if (!result) return;

    const text = `LAPORAN SKRINING RISIKO JANTUNG (CardioCare ML - SDGs 3.4)
Tanggal Evaluasi: ${result.evaluatedAt}
Diagnosa Prediksi: ${result.label}
Tingkat Probabilitas: ${result.probability}% (${result.riskCategory})
Latensi Inferensi: ${result.inferenceTimeMs} ms

PARAMETER PASIEN:
- Usia: ${patient.age} tahun
- Jenis Kelamin: ${patient.sex === 'M' ? 'Pria' : 'Wanita'}
- Tipe Nyeri Dada: ${patient.chestPainType}
- Tekanan Darah: ${patient.restingBP} mm Hg
- Kolesterol: ${patient.cholesterol <= 0 ? '0 (Terimputasi Median 237)' : patient.cholesterol + ' mg/dl'}
- Gula Darah Puasa > 120: ${patient.fastingBS === 1 ? 'Ya' : 'Tidak'}
- EKG Istirahat: ${patient.restingECG}
- Max HR: ${patient.maxHR} bpm
- Angina Olahraga: ${patient.exerciseAngina === 'Y' ? 'Ya' : 'Tidak'}
- Oldpeak (Depresi ST): ${patient.oldpeak} mm
- ST Slope: ${patient.stSlope}

FAKTOR RISIKO UTAMA:
${result.topContributors.map(c => `- ${c.feature}: ${c.valueDisplay} (${c.clinicalRationale})`).join('\n')}

REKOMENDASI KLINIS:
${result.clinicalRecommendations.map(r => `• ${r}`).join('\n')}

Disclaimer: Skrining awal akademis Machine Learning, bukan pengganti diagnosa medis resmi dokter spesialis jantung.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="kalkulator-risiko" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
            <span>06. SIMULATOR PREDIKSI REAL-TIME</span>
            <span aria-hidden="true">·</span>
            <span>INFERENSI FASTAPI VERCEL</span>
            <span aria-hidden="true">·</span>
            <span>11 PARAMETER KLINIS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            Kalkulator Skrining Risiko Penyakit Jantung Mandiri
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            Masukkan parameter fisiologis pasien di bawah ini. Algoritma Random Forest yang berjalan di FastAPI backend akan melakukan standardisasi nilai z-score dan menghitung probabilitas risiko kardiovaskular secara instan.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="mb-8 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="text-xs font-bold font-mono text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              Pilih Profil Pasien Siap Pakai (Preset Demonstrasi):
            </span>
            <span className="text-xs text-slate-500">
              Klik salah satu preset untuk menguji akurasi model
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PATIENT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset.data)}
                className="p-3.5 text-left rounded-xl border border-slate-200 bg-white hover:border-slate-400 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    {preset.title}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${preset.badgeColor === 'emerald'
                      ? 'bg-emerald-100 text-emerald-800'
                      : preset.badgeColor === 'rose'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                    {preset.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {preset.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                Formulir 11 Parameter Medis Pasien
              </h3>
              <span className="text-xs font-mono text-slate-500">StandardScaler Enabled</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Age */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 flex justify-between">
                  <span>Usia Pasien (Age)</span>
                  <span className="font-mono text-rose-600 font-bold">{patient.age} thn</span>
                </label>
                <input
                  type="range"
                  min="28"
                  max="77"
                  value={patient.age}
                  onChange={(e) => setPatient({ ...patient, age: Number(e.target.value) })}
                  className="w-full accent-rose-600"
                />
              </div>

              {/* Sex */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 block">
                  Jenis Kelamin (Sex)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPatient({ ...patient, sex: 'M' })}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${patient.sex === 'M'
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    Pria (Male)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPatient({ ...patient, sex: 'F' })}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${patient.sex === 'F'
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    Wanita (Female)
                  </button>
                </div>
              </div>

              {/* Chest Pain Type */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-800 block">
                  Tipe Nyeri Dada (ChestPainType)
                </label>
                <select
                  value={patient.chestPainType}
                  onChange={(e) => setPatient({ ...patient, chestPainType: e.target.value })}
                  className="w-full text-xs font-medium bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="ASY">ASY - Asymptomatic (Tanpa Gejala Khas, Prevalensi Sakit 79%)</option>
                  <option value="NAP">NAP - Non-Anginal Pain (Bukan Nyeri Jantung Spesifik)</option>
                  <option value="ATA">ATA - Atypical Angina (Angina Tidak Khas, Risiko Terendah 13.9%)</option>
                  <option value="TA">TA - Typical Angina (Angina Pektoris Khas Penyakit Jantung)</option>
                </select>
              </div>

              {/* Resting BP */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 flex justify-between">
                  <span>Tekanan Darah (RestingBP)</span>
                  <span className="font-mono text-slate-900 font-bold">{patient.restingBP} mm Hg</span>
                </label>
                <input
                  type="number"
                  min="80"
                  max="200"
                  value={patient.restingBP}
                  onChange={(e) => setPatient({ ...patient, restingBP: Number(e.target.value) })}
                  className="w-full text-xs font-mono bg-white border border-slate-300 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Cholesterol */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 flex justify-between">
                  <span>Kolesterol Serum</span>
                  <span className="font-mono text-slate-900 font-bold">
                    {patient.cholesterol <= 0 ? '0 (Auto Median 237)' : `${patient.cholesterol} mg/dl`}
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="600"
                  value={patient.cholesterol}
                  onChange={(e) => setPatient({ ...patient, cholesterol: Number(e.target.value) })}
                  className="w-full text-xs font-mono bg-white border border-slate-300 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Fasting BS */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 block">
                  Gula Darah Puasa &gt; 120 mg/dl (FastingBS)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPatient({ ...patient, fastingBS: 1 })}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${patient.fastingBS === 1
                        ? 'border-rose-600 bg-rose-600 text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    Ya (1 - Diabetik)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPatient({ ...patient, fastingBS: 0 })}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${patient.fastingBS === 0
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    Tidak (0 - Normal)
                  </button>
                </div>
              </div>

              {/* Resting ECG */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 block">
                  Hasil EKG Istirahat (RestingECG)
                </label>
                <select
                  value={patient.restingECG}
                  onChange={(e) => setPatient({ ...patient, restingECG: e.target.value })}
                  className="w-full text-xs font-medium bg-white border border-slate-300 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="Normal">Normal</option>
                  <option value="ST">ST - Gelombang ST-T Abnormal</option>
                  <option value="LVH">LVH - Left Ventricular Hypertrophy</option>
                </select>
              </div>

              {/* Max HR */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 flex justify-between">
                  <span>Detak Jantung Maksimal (MaxHR)</span>
                  <span className="font-mono text-slate-900 font-bold">{patient.maxHR} bpm</span>
                </label>
                <input
                  type="range"
                  min="60"
                  max="202"
                  value={patient.maxHR}
                  onChange={(e) => setPatient({ ...patient, maxHR: Number(e.target.value) })}
                  className="w-full accent-rose-600"
                />
              </div>

              {/* Exercise Angina */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 block">
                  Nyeri Saat Olahraga (ExerciseAngina)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPatient({ ...patient, exerciseAngina: 'Y' })}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${patient.exerciseAngina === 'Y'
                        ? 'border-rose-600 bg-rose-600 text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    Ya (Yes)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPatient({ ...patient, exerciseAngina: 'N' })}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${patient.exerciseAngina === 'N'
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    Tidak (No)
                  </button>
                </div>
              </div>

              {/* Oldpeak */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 flex justify-between">
                  <span>Depresi ST Latihan (Oldpeak)</span>
                  <span className="font-mono text-rose-600 font-bold">{patient.oldpeak.toFixed(1)} mm</span>
                </label>
                <input
                  type="range"
                  min="0.0"
                  max="6.0"
                  step="0.1"
                  value={patient.oldpeak}
                  onChange={(e) => setPatient({ ...patient, oldpeak: Number(e.target.value) })}
                  className="w-full accent-rose-600"
                />
              </div>

              {/* ST Slope */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 block">
                  Kemiringan Segmen ST (ST_Slope)
                </label>
                <select
                  value={patient.stSlope}
                  onChange={(e) => setPatient({ ...patient, stSlope: e.target.value })}
                  className="w-full text-xs font-medium bg-white border border-slate-300 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="Up">Up (Menaik - Indikasi Normal Sehat 19.7% Sakit)</option>
                  <option value="Flat">Flat (Datar - Indikasi Iskemia Berat 82.8% Sakit)</option>
                  <option value="Down">Down (Menurun - Indikasi Penyakit Koroner 77.8% Sakit)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Dashboard Result */}
          <div className="lg:col-span-5 space-y-4">
            {loading && !result ? (
              <div className="p-12 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-500 space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
                <span className="text-xs font-mono font-medium">Menghubungkan ke API Vercel...</span>
              </div>
            ) : error ? (
              <div className="p-6 rounded-2xl border border-rose-300 bg-rose-50 text-rose-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  Gagal Memproses Prediksi
                </div>
                <p className="text-xs text-rose-700">{error}</p>
              </div>
            ) : result && (
              <div className={`p-6 rounded-2xl border shadow-md transition-all ${result.prediction === 1
                  ? 'border-rose-300 bg-rose-50/70'
                  : 'border-emerald-300 bg-emerald-50/70'
                }`}>
                {/* Header result */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                    Hasil Diagnosa API
                    {loading && <Loader2 className="w-3 h-3 animate-spin text-slate-500" />}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    Waktu Inferensi: {result.inferenceTimeMs} ms
                  </span>
                </div>

                {/* Main Badge Result */}
                <div className="py-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${result.prediction === 1
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                        : 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                      }`}>
                      {result.prediction === 1 ? (
                        <ShieldAlert className="w-6 h-6" />
                      ) : (
                        <CheckCircle className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h4 className={`text-xl font-extrabold ${result.prediction === 1 ? 'text-rose-950' : 'text-emerald-950'
                        }`}>
                        {result.label}
                      </h4>
                      <p className="text-xs font-mono font-semibold text-slate-600">
                        Tingkat Risiko: <span className="uppercase text-slate-900">{result.riskCategory}</span>
                      </p>
                    </div>
                  </div>

                  {/* Probability Gauge Bar */}
                  <div className="space-y-1 pt-3">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-600">Probabilitas Kardiovaskular:</span>
                      <span className="font-extrabold text-slate-900 tabular-nums">
                        {result.probability.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${result.probability}%` }}
                        className={`h-full transition-all duration-300 ${result.probability >= 50 ? 'bg-rose-600' : 'bg-emerald-600'
                          }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Top Risk Contributors */}
                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <span className="text-xs font-bold font-mono text-slate-700 uppercase tracking-wider block">
                    Fitur Medis Penentu Keputusan (Feature Drivers):
                  </span>
                  <div className="space-y-1.5">
                    {result.topContributors.map((c, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs space-y-0.5"
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span className="text-slate-900">{c.feature}</span>
                          <span className={`font-mono text-[11px] ${c.impact === 'risk_increasing' ? 'text-rose-600 font-bold' : 'text-emerald-700 font-bold'
                            }`}>
                            {c.valueDisplay} ({c.impact === 'risk_increasing' ? '+Risiko' : '-Protektif'})
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-tight">
                          {c.clinicalRationale}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clinical Recommendations */}
                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <span className="text-xs font-bold font-mono text-slate-700 uppercase tracking-wider block">
                    Rekomendasi Medis &amp; SDGs 3.4 Action Plan:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
                    {result.clinicalRecommendations.map((rec, i) => (
                      <li key={i} className="leading-relaxed font-medium">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Copy Report Button */}
                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={handleCopySummary}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-sm transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Tersalin ke Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-600" />
                        <span>Salin Ringkasan Skrining untuk Konsultasi Dokter</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Disclaimer box */}
            <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500 leading-normal">
              <strong>Catatan Integritas Medis:</strong> Hasil prediksi ini dihitung menggunakan FastAPI backend di Vercel untuk tujuan screening awal dan edukasi pencegahan dini. Tidak boleh digunakan sebagai diagnosa pengganti dokter spesialis kardiologi.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};