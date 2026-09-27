import { ModelMetric, PatientPreset } from '../types/cardio';

export const DATASET_STATS = {
  totalRows: 918,
  totalFeatures: 12,
  trainRows: 734,
  testRows: 184,
  healthyCount: 410,
  diseasedCount: 508,
  healthyPct: 44.7,
  diseasedPct: 55.3,
  cholesterolZeros: 172,
  cholesterolMedianImputed: 237,
  dataSources: [
    'Cleveland Clinic Foundation',
    'Hungarian Institute of Cardiology (Budapest)',
    'University Hospital Zurich & Basel (Switzerland)',
    'V.A. Medical Center (Long Beach, California)',
    'Statlog Heart Dataset'
  ]
};

export const AGE_DISTRIBUTION = [
  { group: '< 40 thn', total: 82, diseased: 23, healthy: 59, diseaseRate: 28.0 },
  { group: '40 - 49 thn', total: 208, diseased: 77, healthy: 131, diseaseRate: 37.0 },
  { group: '50 - 59 thn', total: 390, diseased: 234, healthy: 156, diseaseRate: 60.0 },
  { group: '60 - 69 thn', total: 208, diseased: 150, healthy: 58, diseaseRate: 72.1 },
  { group: '>= 70 thn', total: 30, diseased: 22, healthy: 8, diseaseRate: 73.3 },
];

export const CHEST_PAIN_DISTRIBUTION = [
  {
    code: 'ASY',
    name: 'Asymptomatic (Tanpa Gejala Khas)',
    total: 496,
    diseased: 392,
    healthy: 104,
    rate: 79.0,
    insight: 'Paradoks klinis: Pasien tanpa nyeri dada khas sering kali mengalami iskemia tersembunyi dengan risiko tertinggi (79.0%).'
  },
  {
    code: 'NAP',
    name: 'Non-Anginal Pain',
    total: 203,
    diseased: 72,
    healthy: 131,
    rate: 35.5,
    insight: 'Nyeri dada non-spesifik (misal muskuloskeletal atau refluks lambung) dengan tingkat risiko moderat.'
  },
  {
    code: 'ATA',
    name: 'Atypical Angina',
    total: 173,
    diseased: 24,
    healthy: 149,
    rate: 13.9,
    insight: 'Angina atipikal menunjukkan prevalensi terendah (13.9%) pada dataset ini.'
  },
  {
    code: 'TA',
    name: 'Typical Angina',
    total: 46,
    diseased: 20,
    healthy: 26,
    rate: 43.5,
    insight: 'Nyeri dada khas angina pektoris akibat spasme atau penyempitan pembuluh koroner.'
  }
];

export const GENDER_DISTRIBUTION = [
  { sex: 'Pria (Male)', code: 'M', total: 725, diseased: 458, healthy: 267, diseaseRate: 63.2 },
  { sex: 'Wanita (Female)', code: 'F', total: 193, diseased: 50, healthy: 143, diseaseRate: 25.9 }
];

export const ST_SLOPE_DISTRIBUTION = [
  { slope: 'Up (Menaik)', total: 395, diseased: 78, healthy: 317, diseaseRate: 19.7, riskColor: 'emerald' },
  { slope: 'Flat (Datar)', total: 460, diseased: 381, healthy: 79, diseaseRate: 82.8, riskColor: 'rose' },
  { slope: 'Down (Menurun)', total: 63, diseased: 49, healthy: 14, diseaseRate: 77.8, riskColor: 'red' }
];

export const MODEL_METRICS: ModelMetric[] = [
  {
    id: 'rf',
    name: 'Random Forest Classifier',
    algorithmType: 'Ensemble Learning (Bagging 100 Trees)',
    accuracy: 88.59,
    precision: 87.27,
    recall: 92.31,
    f1Score: 89.72,
    latencyMs: 18,
    isBest: true,
    notes: 'Model Terpilih: Memiliki Recall tertinggi (92.31%) dan F1-Score optimal, sangat tangguh meminimalkan False Negative pada deteksi dini.',
    confusionMatrix: {
      tp: 96,
      tn: 67,
      fp: 14,
      fn: 8
    }
  },
  {
    id: 'lr',
    name: 'Logistic Regression',
    algorithmType: 'Generalized Linear Model (L2 Regularized)',
    accuracy: 85.87,
    precision: 85.19,
    recall: 89.42,
    f1Score: 87.25,
    latencyMs: 4,
    isBest: false,
    notes: 'Cepat & mudah diinterpretasi dengan koefisien log-odds, performa kompetitif namun kurang menangkap interaksi non-linear kompleks.',
    confusionMatrix: {
      tp: 93,
      tn: 65,
      fp: 15,
      fn: 11
    }
  },
  {
    id: 'svm',
    name: 'Support Vector Machine (SVM)',
    algorithmType: 'Kernel RBF Hyperplane Optimization',
    accuracy: 85.87,
    precision: 84.55,
    recall: 90.38,
    f1Score: 87.37,
    latencyMs: 12,
    isBest: false,
    notes: 'Menemukan margin pemisah optimal di ruang berdimensi tinggi, sangat sensitif terhadap scaling StandardScaler.',
    confusionMatrix: {
      tp: 94,
      tn: 64,
      fp: 16,
      fn: 10
    }
  },
  {
    id: 'nb',
    name: 'Gaussian Naive Bayes',
    algorithmType: 'Probabilistic Classifier (Bayes Theorem)',
    accuracy: 84.78,
    precision: 84.26,
    recall: 88.46,
    f1Score: 86.31,
    latencyMs: 3,
    isBest: false,
    notes: 'Sangat cepat namun mengasumsikan independensi penuh antar fitur klinis yang sebenarnya saling berkorelasi secara fisiologis.',
    confusionMatrix: {
      tp: 92,
      tn: 64,
      fp: 16,
      fn: 12
    }
  },
  {
    id: 'knn',
    name: 'K-Nearest Neighbors (KNN)',
    algorithmType: 'Instance-Based Distance Metric (k=5)',
    accuracy: 83.15,
    precision: 82.57,
    recall: 87.50,
    f1Score: 84.96,
    latencyMs: 24,
    isBest: false,
    notes: 'Mengklasifikasikan berdasarkan jarak Euclidean 5 tetangga terdekat, rentan terhadap noise pada dataset sparse.',
    confusionMatrix: {
      tp: 91,
      tn: 62,
      fp: 18,
      fn: 13
    }
  },
  {
    id: 'dt',
    name: 'Decision Tree (CART)',
    algorithmType: 'Single Tree Recursive Splitting',
    accuracy: 79.89,
    precision: 81.37,
    recall: 82.69,
    f1Score: 82.02,
    latencyMs: 5,
    isBest: false,
    notes: 'Mudah dipahami sebagai pohon keputusan if-then, namun rentan overfitting dengan akurasi dan recall paling rendah di antara ke-6 algoritma.',
    confusionMatrix: {
      tp: 86,
      tn: 61,
      fp: 19,
      fn: 18
    }
  }
];

export const PATIENT_PRESETS: PatientPreset[] = [
  {
    id: 'preset-healthy',
    title: 'Pasien A: Profil Sehat / Rendah Risiko',
    subtitle: 'Wanita 34 tahun, denyut normal, tanpa keluhan angina',
    badge: 'Normal / Sehat',
    badgeColor: 'emerald',
    data: {
      age: 34,
      sex: 'F',
      chestPainType: 'ATA',
      restingBP: 118,
      cholesterol: 195,
      fastingBS: 0,
      restingECG: 'Normal',
      maxHR: 174,
      exerciseAngina: 'N',
      oldpeak: 0.0,
      stSlope: 'Up'
    }
  },
  {
    id: 'preset-critical',
    title: 'Pasien B: Profil Kritis / Indikasi Kuat',
    subtitle: 'Pria 58 tahun, riwayat asimtomatik, ST Flat, iskemia latihan',
    badge: 'Risiko Tinggi',
    badgeColor: 'rose',
    data: {
      age: 58,
      sex: 'M',
      chestPainType: 'ASY',
      restingBP: 155,
      cholesterol: 285,
      fastingBS: 1,
      restingECG: 'ST',
      maxHR: 115,
      exerciseAngina: 'Y',
      oldpeak: 2.8,
      stSlope: 'Flat'
    }
  },
  {
    id: 'preset-borderline',
    title: 'Pasien C: Profil Borderline / Waspada',
    subtitle: 'Pria 51 tahun, kolesterol tinggi batas atas, nyeri non-anginal',
    badge: 'Risiko Sedang',
    badgeColor: 'amber',
    data: {
      age: 51,
      sex: 'M',
      chestPainType: 'NAP',
      restingBP: 135,
      cholesterol: 250,
      fastingBS: 0,
      restingECG: 'LVH',
      maxHR: 142,
      exerciseAngina: 'N',
      oldpeak: 1.2,
      stSlope: 'Flat'
    }
  }
];

export const END_TO_END_STEPS = [
  {
    step: 1,
    title: 'Problem Definition & SDGs 3.4',
    shortTitle: 'Definisi Masalah',
    desc: 'Menetapkan urgensi deteksi dini penyakit kardiovaskular untuk menekan angka mortalitas global sesuai target PBB SDGs 3.4.'
  },
  {
    step: 2,
    title: 'Data Collection (Kaggle Multi-Center)',
    shortTitle: 'Pengumpulan Data',
    desc: 'Mengumpulkan 918 rekam medis pasien terintegrasi dari 5 institusi: Cleveland, Hungarian, Swiss, Long Beach, dan Statlog.'
  },
  {
    step: 3,
    title: 'Data Understanding & Cleaning',
    shortTitle: 'Pembersihan Data',
    desc: 'Memvalidasi data: 0 duplikat, dan mengimputasi 172 anomali nilai Cholesterol bernilai 0 dengan nilai median positif (237 mg/dl).'
  },
  {
    step: 4,
    title: 'Exploratory Data Analysis (EDA)',
    shortTitle: 'Analisis EDA',
    desc: 'Menganalisis korelasi klinis mendalam (distribusi umur, gender ratio, korelasi asimtomatik 79% terhadap penyakit jantung).'
  },
  {
    step: 5,
    title: 'Preprocessing & Feature Engineering',
    shortTitle: 'Preprocessing',
    desc: 'One-Hot Encoding pd.get_dummies(drop_first=True) menjadi 15 kolom numerik + StandardScaler normalisasi z-score.'
  },
  {
    step: 6,
    title: 'Stratified Train/Test Split (80:20)',
    shortTitle: 'Split Data Latih/Uji',
    desc: 'Membagi 734 data latih (80%) dan 184 data uji (20%) dengan parameter stratify=y demi menjaga keseimbangan proporsi kelas target.'
  },
  {
    step: 7,
    title: 'Pelatihan 6 Algoritma Klasifikasi',
    shortTitle: 'Training 6 Model',
    desc: 'Melatih Logistic Regression, Decision Tree, Random Forest, KNN, SVM, dan Gaussian Naive Bayes secara paralel.'
  },
  {
    step: 8,
    title: 'Evaluasi & Export Model (.pkl)',
    shortTitle: 'Evaluasi & Export',
    desc: 'Random Forest juara dengan Akurasi 88.59% & Recall 92.31%. Diekspor ke heart_disease_model.pkl & scaler.pkl via Joblib.'
  },
  {
    step: 9,
    title: 'Deployment & Monitoring Plan',
    shortTitle: 'Deployment Web',
    desc: 'Deploy ke arsitektur web modern (Laravel Presentation + FastAPI ML Service) dengan strategi mitigasi Data Drift periodik.'
  }
];
