import { HOTSQuestion } from '../../../types';

export const q09: HOTSQuestion = {
  id: 9,
  moduleNum: 1,
  caseText: "Kasus: Tim QA menemukan bahwa fitur pembayaran gagal memproses transaksi ketika pengguna menggunakan mata uang selain Rupiah. Tahap SDLC di mana bug ini harus diperbaiki oleh programmer adalah...",
  options: [
    "Tahap Deployment Akhir",
    "Tahap Implementation / Bug Fixing",
    "Tahap Feasibility Study",
    "Tahap Penandatanganan Kontrak"
  ],
  correctIndex: 1,
  explanation: "Temuan bug pada fase pengujian dialirkan kembali ke developer pada fase implementasi untuk diperbaiki sebelum rilis produksi."
};
