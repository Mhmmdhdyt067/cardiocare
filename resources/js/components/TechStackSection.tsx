import React, { useState } from 'react';
import { Layers, Server, Cpu, Database, Code2, Zap, ArrowRight, CheckCircle2, Box } from 'lucide-react';
import { DATASET_STATS } from '../data/edaData';

export const TechStackSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const architectureNodes = [
    {
      id: 'laravel',
      title: '1. Laravel 11 Gateway',
      role: 'Web Interface & Presentation',
      badge: 'PHP / Blade / Laravel',
      badgeColor: 'border-red-200 text-red-700 bg-red-50',
      description: 'Menangani form input pasien, validasi keamanan CSRF, sanitasi parameter medis klinis, dan rendering antarmuka pengguna yang ramah dan responsif.',
      technicalDetails: [
        'Form Request Validation (validasi batasan fisiologis umur 1-120 thn, tensi 50-250 mm Hg)',
        'GuzzleHttp / Http::post client untuk mengonsumsi REST API FastAPI microservice',
        'Blade templating dengan komponen Tailwind CSS ramah mobile & desktop',
        'Penyimpanan riwayat log skrining anonim untuk evaluasi Data Drift berkala'
      ],
      payloadExample: `{
  "age": 58,
  "sex": "M",
  "chest_pain_type": "ASY",
  "resting_bp": 155,
  "cholesterol": 285,
  "fasting_bs": 1,
  "resting_ecg": "ST",
  "max_hr": 115,
  "exercise_angina": "Y",
  "oldpeak": 2.8,
  "st_slope": "Flat"
}`
    },
    {
      id: 'fastapi',
      title: '2. FastAPI Python Microservice',
      role: 'High-Performance Async ML Service',
      badge: 'Python 3.11 / FastAPI / Uvicorn',
      badgeColor: 'border-emerald-200 text-emerald-700 bg-emerald-50',
      description: 'Menyediakan endpoint RESTful `/api/v1/predict` asinkronus berkecepatan tinggi dengan validasi schema Pydantic otomatis dan dokumentasi OpenAPI interaktif.',
      technicalDetails: [
        'Model Loader otomatis menggunakan Joblib saat service bootup (Zero Cold Start)',
        'Asynchronous event loop berbasis ASGI Uvicorn untuk throughput tinggi',
        'Validasi tipe data otomatis melalui Pydantic BaseModel (mencegah payload rusak)',
        'Respon inferensi rata-rata sub-20 milidetik per permintaan'
      ],
      payloadExample: `@app.post("/api/v1/predict", response_model=PredictionOutput)
async def predict_heart_disease(patient: PatientSchema):
    features_df = preprocess_pipeline(patient)
    risk_prob = model.predict_proba(features_df)[0][1]
    return {
        "status": "success",
        "has_heart_disease": int(risk_prob >= 0.5),
        "risk_percentage": round(risk_prob * 100, 2),
        "risk_category": get_risk_tier(risk_prob)
    }`
    },
    {
      id: 'ml_core',
      title: '3. Pipeline Scikit-Learn & Joblib',
      role: 'Preprocessing & Ensemble Inference',
      badge: 'scikit-learn / joblib / pandas',
      badgeColor: 'border-blue-200 text-blue-700 bg-blue-50',
      description: 'Memproses data melalui tahapan Feature Imputation (Median 237 mg/dl), One-Hot Encoding (15 fitur), StandardScaler, dan ensemble voting dari 100 Decision Trees.',
      technicalDetails: [
        'scaler.pkl: Membawa nilai parameter mean μ dan standard deviasi σ asli dari dataset Kaggle',
        'heart_disease_model.pkl: Model Random Forest terpilih dengan Akurasi 88.59% dan Recall 92.31%',
        'One-Hot Encoding pd.get_dummies(drop_first=True) untuk mencegah Dummy Variable Trap',
        'Ekstraksi Feature Importance untuk menjelaskan faktor medis utama pasien'
      ],
      payloadExample: `# Response JSON yang dikembalikan ke Laravel:
{
  "prediction": 1,
  "diagnosis": "Berisiko Penyakit Jantung",
  "probability": 94.6,
  "confidence_interval": [91.2, 97.4],
  "dominant_drivers": [
    "ST_Slope_Flat (+1.62 log-odds)",
    "ChestPainType_ASY (+1.45 log-odds)",
    "ExerciseAngina_Y (+1.28 log-odds)"
  ],
  "latency_ms": 14.8
}`
    }
  ];

  const pythonLibraries = [
    { name: 'scikit-learn', purpose: 'Pelatihan 6 model (Random Forest, SVM, LogReg, Naive Bayes, KNN, Tree), kalkulasi StandardScaler, metrik evaluasi & Confusion Matrix.' },
    { name: 'pandas & numpy', purpose: 'Manipulasi dataframe 918 baris, inspeksi duplikat, kalkulasi median kolesterol, dan manipulasi array matriks numerik.' },
    { name: 'joblib', purpose: 'Serialisasi efisien model machine learning terpilih (heart_disease_model.pkl) dan scaler (scaler.pkl) untuk deployment produksi.' },
    { name: 'FastAPI & Uvicorn', purpose: 'Framework web asynchronous microservice yang menyajikan endpoint prediksi ML dengan latensi ultra rendah.' },
    { name: 'seaborn & matplotlib', purpose: 'Generasi visualisasi grafik EDA distribusi usia, korelasi fitur bivariat, dan peta panas matriks korelasi.' }
  ];

  return (
    <section id="arsitektur-teknologi" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
            <span>02. ARSITEKTUR SISTEM</span>
            <span aria-hidden="true">·</span>
            <span>INTEGRASI LARAVEL + FASTAPI</span>
            <span aria-hidden="true">·</span>
            <span>DATASET KAGGLE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            Arsitektur Dual-Stack: Laravel Gateway &amp; FastAPI ML Microservice
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            Aplikasi memisahkan layer presentasi web dengan layer komputasi machine learning secara bersih. <strong>Laravel</strong> berfungsi sebagai portal interaksi pengguna yang aman, sementara <strong>FastAPI (Python)</strong> menjalankan pipeline pemrosesan data medis berkecepatan tinggi.
          </p>
        </div>

        {/* 3 Architecture Components Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Left: 3 Node Clickable List */}
          <div className="lg:col-span-5 space-y-3">
            {architectureNodes.map((node, index) => {
              const isSelected = activeStep === index;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100/80 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold">{node.title}</span>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                      isSelected ? 'border-slate-700 bg-slate-800 text-teal-300' : node.badgeColor
                    }`}>
                      {node.badge}
                    </span>
                  </div>
                  <p className={`text-xs ${isSelected ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                    {node.role}
                  </p>
                </button>
              );
            })}

            {/* Kaggle Dataset Callout Card */}
            <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/60 text-slate-900 space-y-2 mt-4">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-teal-700 shrink-0" />
                <span className="text-xs font-bold text-teal-950 uppercase tracking-wider font-mono">
                  Sumber Dataset: Kaggle Heart Failure
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Dataset berukuran <strong>918 baris data pasien</strong> dengan <strong>12 kolom utama</strong>, merupakan konsolidasi dari 5 pusat riset kardiovaskular terkemuka dunia:
              </p>
              <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside font-medium">
                {DATASET_STATS.dataSources.map((source, i) => (
                  <li key={i}>{source}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Technical Inspector & Code Flow */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-300 bg-slate-950 text-slate-200 overflow-hidden shadow-lg">
              {/* Code window top bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    {architectureNodes[activeStep].title} — Spek Teknis
                  </span>
                </div>
                <span className="text-[11px] font-mono text-teal-400">
                  HTTP REST PIPELINE
                </span>
              </div>

              {/* Node Body */}
              <div className="p-5 space-y-4">
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    {architectureNodes[activeStep].title}: {architectureNodes[activeStep].role}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {architectureNodes[activeStep].description}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Implementasi Kunci:
                  </p>
                  <ul className="space-y-1">
                    {architectureNodes[activeStep].technicalDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code / Payload Snippet */}
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    Payload / Code Signature:
                  </p>
                  <pre className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                    <code>{architectureNodes[activeStep].payloadExample}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Python Libraries Used */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              Eksplorasi Library Python yang Digunakan untuk Pemodelan
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pythonLibraries.map((lib, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <span className="text-xs font-bold font-mono text-slate-900 block">
                  {lib.name}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lib.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
