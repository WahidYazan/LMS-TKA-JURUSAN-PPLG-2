import { HOTSQuestion } from '../../../types';

export const q25: HOTSQuestion = {
  id: 25,
  moduleNum: 3,
  caseText: "Kasus: Seorang pengguna mencoba membuka halaman profil teman tanpa login terlebih dahulu. Server backend menolak dengan kode status...",
  options: [
    "401 Unauthorized",
    "200 OK",
    "502 Bad Gateway",
    "301 Moved Permanently"
  ],
  correctIndex: 0,
  explanation: "HTTP 401 Unauthorized mengindikasikan bahwa request membutuhkan kredensial autentikasi pengguna."
};
