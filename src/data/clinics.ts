import { Clinic } from '../types';

export function generateNearbyClinics(lat: number, lng: number): Clinic[] {
  const facilities: Omit<Clinic, 'lat' | 'lng' | 'distance'>[] = [
    { id: '1', name: 'City General Hospital', type: 'hospital', address: '100 Medical Center Dr', phone: '(555) 100-2000', rating: 4.5, openNow: true, hours: 'Open 24 hours' },
    { id: '2', name: 'QuickCare Urgent Center', type: 'urgent_care', address: '245 Health Blvd, Suite 101', phone: '(555) 245-3000', rating: 4.2, openNow: true, hours: '8:00 AM - 10:00 PM' },
    { id: '3', name: 'Sunrise Family Clinic', type: 'clinic', address: '782 Wellness Ave', phone: '(555) 782-4000', rating: 4.7, openNow: true, hours: '9:00 AM - 6:00 PM' },
    { id: '4', name: 'MedExpress Walk-In', type: 'urgent_care', address: '1550 Oak Street', phone: '(555) 155-5000', rating: 4.0, openNow: false, hours: '8:00 AM - 8:00 PM' },
    { id: '5', name: 'Community Health Center', type: 'clinic', address: '430 Elm Road', phone: '(555) 430-6000', rating: 4.4, openNow: true, hours: '7:30 AM - 5:30 PM' },
    { id: '6', name: 'St. Mary\'s Medical Center', type: 'hospital', address: '2100 Hospital Way', phone: '(555) 210-7000', rating: 4.6, openNow: true, hours: 'Open 24 hours' },
    { id: '7', name: 'CarePlus Pharmacy', type: 'pharmacy', address: '890 Main Street', phone: '(555) 890-8000', rating: 4.1, openNow: true, hours: '8:00 AM - 9:00 PM' },
    { id: '8', name: 'HealthFirst Clinic', type: 'clinic', address: '1200 Park Ave', phone: '(555) 120-9000', rating: 4.3, openNow: false, hours: '8:00 AM - 5:00 PM' },
    { id: '9', name: 'Wellness Pharmacy & Care', type: 'pharmacy', address: '567 Broadway', phone: '(555) 567-1000', rating: 4.0, openNow: true, hours: '7:00 AM - 10:00 PM' },
    { id: '10', name: 'Regional Medical Center', type: 'hospital', address: '3000 University Blvd', phone: '(555) 300-2000', rating: 4.8, openNow: true, hours: 'Open 24 hours' },
  ];

  return facilities.map((f, i) => {
    const angle = (i / facilities.length) * 2 * Math.PI;
    const dist = 0.005 + Math.random() * 0.025;
    const offsetLat = lat + Math.cos(angle) * dist;
    const offsetLng = lng + Math.sin(angle) * dist;
    const distKm = (dist * 111).toFixed(1);

    return {
      ...f,
      lat: offsetLat,
      lng: offsetLng,
      distance: `${distKm} km`,
    };
  });
}
