import { HOTSQuestion } from '../../../types';

export const q20: HOTSQuestion = {
  id: 20,
  moduleNum: 2,
  caseText: "Kasus: Perangkat UPS (Uninterruptible Power Supply) dipasang pada server database sekolah. Fungsi vital alat ini saat terjadi pemadaman listrik mendadak adalah...",
  options: [
    "Mendinginkan suhu ruangan lab",
    "Menyuplai daya baterai sementara agar server sempat melakukan graceful shutdown dan mencegah korupsi data",
    "Meningkatkan kecepatan unduh internet",
    "Menghapus virus komputer secara otomatis"
  ],
  correctIndex: 1,
  explanation: "UPS memberikan jeda waktu cadangan listrik agar sistem database sempat menyimpan transaksi ke disk tanpa terjadi corrupt file."
};
