import { HOTSQuestion } from '../../../types';

export const q28: HOTSQuestion = {
  id: 28,
  moduleNum: 3,
  caseText: "Kasus: Alamat IP loopback spesial yang merujuk pada komputer lokal kita sendiri saat sedang mengembangkan aplikasi web adalah...",
  options: [
    "192.168.1.1",
    "127.0.0.1 (Localhost)",
    "8.8.8.8",
    "255.255.255.255"
  ],
  correctIndex: 1,
  explanation: "127.0.0.1 adalah alamat loopback standar IPv4 untuk merujuk pada interface host lokal (localhost)."
};
