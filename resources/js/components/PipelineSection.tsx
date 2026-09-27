import React, { useState } from 'react';
import { ArrowDown, CheckCircle2, ChevronRight, Workflow, Sparkles, Filter, Sliders, Split, Gauge, Download, RefreshCw } from 'lucide-react';
import { END_TO_END_STEPS } from '../data/edaData';

export const PipelineSection: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(3); // default step 3 (Data Understanding & Cleaning)

  const stepDetails = [
    {
      step: 1,
      name: 'Problem Definition & SDGs 3.4 Alignment',
      category: 'Inisiasi & Konteks Klinis',
      inputs: 'Data mortalitas WHO (17.9 jt jiwa), target global PBB SDGs 3.4.',
      process: 'Mendefinisikan rumusan masalah: membandingkan 6 algoritma klasifikasi (Logistic Regression, Decision Tree, Random Forest, KNN, SVM, Naive Bayes) untuk mendeteksi risiko kardiovaskular secara dini dan presisi.',
      output: 'Objektif metrik terstandar: Mengutamakan nilai Recall (sensitivitas) untuk menekan False Negative seminimal mungkin.',
      keyHighlight: 'Target SDGs 3.4: Menurunkan sepertiga kematian dini akibat penyakit tidak menular melalui pencegahan dan deteksi klinis cepat.'
    },
    {
      step: 2,
      name: 'Data Collection (Kaggle 918 Records)',
      category: 'Akuisisi Data',
      inputs: 'Heart Failure Prediction Dataset dari platform Kaggle (918 baris data pasien, 12 atribut klinis).',
      process: 'Konsolidasi 5 dataset kardiovaskular historis: Cleveland (303), Hungarian (294), Switzerland (123), Long Beach VA (200), dan Statlog (270 baris gabungan).',
      output: 'Dataset tabular terstruktur mentah dalam format .csv siap validasi.',
      keyHighlight: 'Keberagaman multi-sumber menjamin model tidak bias terhadap satu populasi rumah sakit tertentu.'
    },
    {
      step: 3,
      name: 'Data Understanding & Anomaly Cleaning',
      category: 'Data Wrangling',
      inputs: '918 baris data mentah dengan 11 fitur input + 1 target HeartDisease.',
      process: '1. Pemindaian df.duplicated() menghasilkan 0 baris duplikat.\n2. Pemeriksaan missing value (df.isna().sum()) secara teknis bernilai 0.\n3. Ditemukan 172 data pada kolom Cholesterol yang bernilai 0 mg/dl (anomali fisiologis).\n4. Dilakukan imputasi nilai 0 menggunakan nilai median positif (237 mg/dl).',
      output: 'Dataset bersih tanpa nilai biologis mustahil, mempertahankan 100% sampel 918 pasien.',
      keyHighlight: 'Memilih imputasi median alih-alih menghapus baris berhasil menyelamatkan ~170 data pasien berharga dari kehilangan informasi.'
    },
    {
      step: 4,
      name: 'Exploratory Data Analysis (EDA)',
      category: 'Analisis Statistik Klinis',
      inputs: 'Dataset terimputasi 918 baris.',
      process: 'Visualisasi univariat dan bivariat: Analisis piramida usia pasien, proporsi jenis kelamin (pria 63.2% vs wanita 25.9%), korelasi tipe nyeri dada (ASY mencapai 79.0% risiko!), serta dampak ST_Slope dan Oldpeak.',
      output: 'Matriks korelasi Pearson & Spearman serta identifikasi fitur klinis paling diskriminatif.',
      keyHighlight: 'Menemukan paradoks Asymptomatic (ASY): pasien tanpa keluhan nyeri khas justru memiliki tingkat risiko penyakit koroner tertinggi.'
    },
    {
      step: 5,
      name: 'Preprocessing & Feature Engineering',
      category: 'Transformasi Fitur Numerik',
      inputs: '11 fitur klinis (campuran teks kategorikal dan numerik kontinu).',
      process: '1. One-Hot Encoding pada fitur teks (Sex, ChestPainType, RestingECG, ExerciseAngina, ST_Slope) menggunakan pd.get_dummies(drop_first=True) menjadi 15 kolom numerik biner.\n2. StandardScaler pada fitur kontinu (Age, RestingBP, Cholesterol, MaxHR, Oldpeak) agar memiliki rata-rata μ = 0 dan varians σ² = 1.',
      output: 'Array matriks berdimensi (918, 15) siap inferensi matematis.',
      keyHighlight: 'StandardScaler mutlak diperlukan agar fitur bertaraf ratusan (Kolesterol) tidak mendominasi fitur bertaraf satuan (Oldpeak).'
    },
    {
      step: 6,
      name: 'Stratified Train/Test Split (80:20)',
      category: 'Partisi Data Validasi',
      inputs: 'Matriks fitur X (918, 15) dan vektor target y (918,).',
      process: 'Membagi data menjadi 80% Data Latih (734 baris) dan 20% Data Uji (184 baris). Menggunakan parameter `stratify=y` dan `random_state=42`.',
      output: 'X_train (734, 15), y_train (734,), X_test (184, 15), y_test (184,).',
      keyHighlight: 'Stratifikasi menjamin proporsi kelas target (55.3% sakit vs 44.7% sehat) tetap identik pada data latih dan data uji.'
    },
    {
      step: 7,
      name: 'Training 6 Algoritma Machine Learning',
      category: 'Model Development',
      inputs: 'X_train dan y_train.',
      process: 'Melatih 6 paradigma algoritma: Logistic Regression, Decision Tree (CART), Random Forest (100 Estimators), K-Nearest Neighbors (k=5 Euclidean), Support Vector Machine (Kernel RBF), dan Gaussian Naive Bayes.',
      output: '6 objek model terkompilasi siap diuji pada data holdout 184 baris.',
      keyHighlight: 'Random Forest mengimplementasikan prinsip Ensemble/Bagging yang secara drastis meredam varians dan overfitting.'
    },
    {
      step: 8,
      name: 'Evaluasi Komparatif & Export Model (.pkl)',
      category: 'Evaluasi & Serialisasi',
      inputs: 'Prediksi pada 184 sampel data uji holdout.',
      process: 'Menghitung metrik Accuracy, Precision, Recall, F1-Score, dan Confusion Matrix. Random Forest keluar sebagai model terbaik dengan Akurasi 88.59% dan Recall 92.31%.',
      output: 'heart_disease_model.pkl, scaler.pkl, dan feature_columns.pkl diekspor menggunakan Joblib.',
      keyHighlight: 'Recall 92.31% memastikan bahwa dari 104 pasien yang sakit pada data uji, 96 berhasil terdeteksi dengan tepat (hanya 8 False Negative).'
    },
    {
      step: 9,
      name: 'Deployment & Monitoring Plan',
      category: 'Operasionalisasi Web & Drift',
      inputs: 'File artifact model terkompresi .pkl.',
      process: 'Deployment terintegrasi pada arsitektur web modern (Laravel Frontend Presentation + FastAPI Python Backend). Perancangan strategi retrain 6-12 bulan dan mitigasi Data Drift.',
      output: 'Aplikasi web interaktif dengan kalkulasi probabilitas inferensi instan.',
      keyHighlight: 'Logging terenkripsi dari parameter input untuk audit kualitas diagnostik jangka panjang.'
    }
  ];

  const current = stepDetails[selectedStep - 1];

  return (
    <section id="alur-pipeline" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
            <span>03. PIPELINE END-TO-END</span>
            <span aria-hidden="true">·</span>
            <span>ALUR KERJA PEMROSESAN DATA</span>
            <span aria-hidden="true">·</span>
            <span>9 TAHAPAN RIGOROUS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            Alur Kerja &amp; Pipeline Rekayasa Machine Learning End-to-End
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            Mulai dari perumusan target SDGs 3.4, pembersihan anomali medis, standardisasi fitur z-score, hingga deployment model ensemble Random Forest.
          </p>
        </div>

        {/* Step Progression Bar / Stepper */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mb-8">
          {END_TO_END_STEPS.map((step) => {
            const isCurrent = selectedStep === step.step;
            const isCompleted = selectedStep > step.step;
            return (
              <button
                key={step.step}
                onClick={() => setSelectedStep(step.step)}
                className={`flex flex-col items-center text-center p-2.5 rounded-xl border text-xs transition-all ${
                  isCurrent
                    ? 'border-slate-900 bg-slate-900 text-white shadow-sm ring-2 ring-slate-900/20'
                    : isCompleted
                    ? 'border-slate-300 bg-white text-slate-800 hover:border-slate-400'
                    : 'border-slate-200 bg-white/70 text-slate-500 hover:bg-white'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold mb-1.5 ${
                  isCurrent
                    ? 'bg-teal-400 text-slate-950'
                    : isCompleted
                    ? 'bg-slate-200 text-slate-700'
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  {step.step}
                </span>
                <span className="font-semibold text-[11px] line-clamp-2 leading-tight">
                  {step.shortTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Step Deep-Dive Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-rose-600 uppercase tracking-wider">
                  Tahap {current.step} dari 9
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-xs text-slate-500 font-medium">
                  {current.category}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {current.name}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedStep(prev => Math.max(1, prev - 1))}
                disabled={selectedStep === 1}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                ← Sebelumnya
              </button>
              <button
                onClick={() => setSelectedStep(prev => Math.min(9, prev + 1))}
                disabled={selectedStep === 9}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Berikutnya →
              </button>
            </div>
          </div>

          {/* Step Content 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                [ INPUT DATA ]
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-mono">
                {current.inputs}
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                [ PEMROSESAN &amp; LOGIKA ]
              </span>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {current.process}
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                [ ARTIFACT OUTPUT ]
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-mono">
                {current.output}
              </p>
            </div>
          </div>

          {/* Key Highlight Banner */}
          <div className="mt-6 p-4 rounded-xl bg-teal-50 border border-teal-200 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-teal-900 uppercase tracking-wider font-mono">
                Poin Kunci Ilmiah / Clinical Insight
              </span>
              <p className="text-xs text-teal-950 mt-0.5 leading-relaxed font-medium">
                {current.keyHighlight}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
