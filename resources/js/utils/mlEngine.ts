import { PatientInput, PredictionResult } from '../types/cardio';

const API_BASE_URL = 'https://cardiocare-ai-skmh.vercel.app';

export async function fetchHeartDiseasePrediction(patient: PatientInput): Promise<PredictionResult> {
  const startTime = performance.now();

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patient),
  });

  if (!response.ok) {
    throw new Error(`Gagal mengambil data dari server: ${response.statusText}`);
  }

  const data = await response.json();
  const endTime = performance.now();
  const inferenceTimeMs = Math.round(endTime - startTime);

  // Sesuaikan response API FastAPI dengan struktur PredictionResult UI Anda
  return {
    prediction: data.prediction,
    label: data.label,
    probability: data.probability,
    riskCategory: data.probability >= 70 ? 'Tinggi' : data.probability >= 40 ? 'Sedang' : 'Rendah',
    inferenceTimeMs: inferenceTimeMs,
    evaluatedAt: new Date().toLocaleString('id-ID'),
    // Anda bisa menyesuaikan generator fitur & rekomendasi lokal jika API belum menyediakannya secara detail
    topContributors: getTopContributors(patient),
    clinicalRecommendations: getClinicalRecommendations(data.prediction, patient),
  };
}

// Helper pendukung untuk bagian laporan UI
function getTopContributors(patient: PatientInput) {
  const contributors = [];
  if (patient.stSlope === 'Flat' || patient.stSlope === 'Down') {
    contributors.push({
      feature: 'ST Slope',
      valueDisplay: patient.stSlope,
      impact: 'risk_increasing',
      clinicalRationale: 'Kemiringan segmen ST datar/menurun menunjukkan adanya indikasi iskemia miokard.',
    });
  }
  if (patient.chestPainType === 'ASY') {
    contributors.push({
      feature: 'Chest Pain Type',
      valueDisplay: 'ASY (Asymptomatic)',
      impact: 'risk_increasing',
      clinicalRationale: 'Nyeri dada asimtomatik sering terasosiasi dengan PJK tersembunyi.',
    });
  }
  if (patient.oldpeak > 1.5) {
    contributors.push({
      feature: 'Oldpeak',
      valueDisplay: `${patient.oldpeak} mm`,
      impact: 'risk_increasing',
      clinicalRationale: 'Depresi segmen ST signifikan saat uji latih beban.',
    });
  }
  return contributors.length > 0 ? contributors : [
    {
      feature: 'Parameter Normal',
      valueDisplay: 'Stabil',
      impact: 'risk_decreasing',
      clinicalRationale: 'Sebagian besar indikator fisiologis dalam batas aman.',
    }
  ];
}

function getClinicalRecommendations(prediction: number, patient: PatientInput): string[] {
  if (prediction === 1) {
    return [
      'Segera jadwalkan konsultasi dengan Dokter Spesialis Jantung (Sp.JP).',
      'Lakukan pemeriksaan penunjang seperti Elektrokardiogram (EKG) 12-lead dan Echocardiography.',
      'Jaga pola makan rendah lemak jenuh dan pantau tekanan darah harian.'
    ];
  }
  return [
    'Pertahankan gaya hidup sehat dan aktivitas fisik teratur 150 menit/minggu.',
    'Lakukan pemeriksaan profil lipid dan gula darah berkala secara rutin.',
    'Jaga pola makan seimbang (rendah garam dan gula tambahan).'
  ];
}