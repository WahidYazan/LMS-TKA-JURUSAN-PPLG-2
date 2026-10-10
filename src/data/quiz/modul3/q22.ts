import { HOTSQuestion } from '../../../types';

export const q22: HOTSQuestion = {
  id: 22,
  moduleNum: 3,
  caseText: "Kasus: Frontend React diakses pada domain `portal.sekolah.id` mencoba memanggil API backend di `api.sekolah.id`, namun browser memblokir permintaan dengan pesan error CORS. Penyebab utamanya adalah...",
  options: [
    "Komputer klien tidak terhubung kabel LAN",
    "Header Access-Control-Allow-Origin belum diizinkan oleh server backend",
    "Versi JavaScript browser terlalu baru",
    "Kabel fiber optik putus"
  ],
  correctIndex: 1,
  explanation: "CORS adalah mekanisme keamanan browser yang membatasi request lintas domain kecuali server mengizinkannya via HTTP headers."
};
