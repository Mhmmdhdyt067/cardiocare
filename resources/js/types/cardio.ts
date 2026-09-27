export type Sex = 'M' | 'F';
export type ChestPainType = 'TA' | 'ATA' | 'NAP' | 'ASY';
export type RestingECG = 'Normal' | 'ST' | 'LVH';
export type ExerciseAngina = 'Y' | 'N';
export type STSlope = 'Up' | 'Flat' | 'Down';

export interface PatientInput {
  age: number;
  sex: Sex;
  chestPainType: ChestPainType;
  restingBP: number;
  cholesterol: number;
  fastingBS: 0 | 1;
  restingECG: RestingECG;
  maxHR: number;
  exerciseAngina: ExerciseAngina;
  oldpeak: number;
  stSlope: STSlope;
}

export interface RiskContributor {
  feature: string;
  valueDisplay: string;
  impact: 'risk_increasing' | 'risk_reducing' | 'neutral';
  scoreImpact: number; // positive increases risk, negative decreases risk
  clinicalRationale: string;
}

export interface PredictionResult {
  prediction: 0 | 1; // 0 = Sehat/Normal, 1 = Berisiko Jantung
  label: 'Normal / Rendah Risiko' | 'Berisiko Penyakit Jantung';
  probability: number; // 0 - 100
  riskCategory: 'Rendah' | 'Moderat' | 'Tinggi' | 'Kritis';
  topContributors: RiskContributor[];
  clinicalRecommendations: string[];
  sdgImpactNote: string;
  evaluatedAt: string;
  inferenceTimeMs: number;
}

export interface ModelMetric {
  name: string;
  id: string;
  algorithmType: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  latencyMs: number;
  isBest: boolean;
  notes: string;
  confusionMatrix: {
    tp: number;
    tn: number;
    fp: number;
    fn: number;
  };
}

export interface PatientPreset {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  data: PatientInput;
}
