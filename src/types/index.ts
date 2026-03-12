export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface Condition {
  name: string;
  probability: 'High' | 'Moderate' | 'Low';
  severity: 'Critical' | 'Serious' | 'Moderate' | 'Mild';
  description: string;
  recommendations: string[];
  symptoms: string[];
}

export interface HealthRecord {
  id: string;
  date: string;
  symptoms: string;
  conditions: Condition[];
  timestamp: number;
}

export interface Clinic {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'urgent_care' | 'pharmacy';
  lat: number;
  lng: number;
  address: string;
  phone: string;
  rating: number;
  distance: string;
  openNow: boolean;
  hours: string;
}
