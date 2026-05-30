export interface EHRField {
  id: string;
  label: string;
  value: string;
  confidence: number; // 0 to 100
  evidence: string;
  isCustom?: boolean;
}

export interface ProgressStep {
  id: string;
  label: string;
  description: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
}

export interface SampleCase {
  id: string;
  name: string;
  description: string;
  transcription: string;
  blankFormName: string;
  formType: string;
  expectedFields: EHRField[];
}
