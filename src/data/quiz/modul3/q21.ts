import { HOTSQuestion } from '../../../types';

export const q21: HOTSQuestion = {
  id: 21,
  moduleNum: 3,
  caseText: "Kasus: Aplikasi mobile siswa mengirim data pengajuan izin ke endpoint server. Data berhasil disimpan di tabel database dan server ingin memberitahu bahwa entitas baru berhasil dibuat. HTTP status code yang wajib dikirim adalah...",
  options: [
    "200 OK",
    "201 Created",
    "204 No Content",
    "404 Not Found"
  ],
  correctIndex: 1,
  explanation: "Status 201 Created secara spesifik menandakan bahwa permintaan POST berhasil dan menghasilkan resource baru di server."
};
