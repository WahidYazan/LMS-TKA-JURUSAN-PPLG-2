import { HOTSQuestion } from '../../../types';

export const q26: HOTSQuestion = {
  id: 26,
  moduleNum: 3,
  caseText: "Kasus: Perbedaan utama antara protokol HTTP dan HTTPS terletak pada...",
  options: [
    "HTTPS menggunakan kabel tembaga lebih tebal",
    "HTTPS mengenkripsi seluruh paket komunikasi data menggunakan sertifikat SSL/TLS di Port 443",
    "HTTP hanya bisa dibuka di malam hari",
    "HTTPS tidak memerlukan server"
  ],
  correctIndex: 1,
  explanation: "HTTPS menambahkan lapisan keamanan enkripsi TLS sehingga data sensitif (password, nomor kartu) tidak bisa disadap di tengah jalan."
};
