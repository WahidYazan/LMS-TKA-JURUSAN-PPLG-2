import { HOTSQuestion } from '../../../types';

export const q07: HOTSQuestion = {
  id: 7,
  moduleNum: 1,
  caseText: "Kasus: Saat pengerjaan proyek berlangsung, pemilik produk mengusulkan fitur baru yang belum tercantum dalam rencana. Agar mutu dan target proyek tetap terjaga, langkah tim yang paling tepat adalah...",
  options: [
    "Langsung menambahkan fitur tanpa mengubah rencana karena permintaan berasal dari pemilik produk",
    "Membahas dampak kebutuhan, waktu, dan sumber daya bersama pemilik produk, lalu memperbarui prioritas serta rencana",
    "Menolak semua perubahan agar tidak ada pekerjaan yang berubah",
    "Menghapus fitur lain secara sepihak tanpa memberitahu anggota tim"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: Membahas dampak kebutuhan, waktu, dan sumber daya bersama pemilik produk, lalu memperbarui prioritas serta rencana.

🔍 Konsep Dasar & Manajemen Ruang Lingkup Proyek (Scope Management):
Dalam rekayasa perangkat lunak, penambahan fitur di tengah jalan tanpa pengendalian yang baik dinamakan *Scope Creep* (pembengkakan ruang lingkup). Fenomena ini dapat menyebabkan proyek tertunda (overdue), biaya membengkak (overbudget), dan kualitas kode menurun akibat tekanan waktu.
Manajemen proyek profesional menerapkan mekanisme *Change Management*:
1. Analisis Dampak (Impact Analysis): Setiap usulan perubahan harus dinilai dampaknya terhadap tiga pilar segitiga manajemen proyek (*Triple Constraints*): Ruang Lingkup (Scope), Waktu (Time), dan Biaya/Sumber Daya (Cost).
2. Negosiasi & Re-prioritisasi Backlog: Bersama Product Owner, tim mendiskusikan apakah fitur baru tersebut lebih penting dari fitur lama. Jika fitur baru dimasukkan, fitur lain yang berprioritas lebih rendah mungkin perlu digeser ke rilis berikutnya atau timeline diperpanjang.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Langsung menambahkan fitur tanpa mengubah rencana...): Keliru. Ini memicu *scope creep*, burnout anggota tim, dan potensi keterlambatan rilis proyek secara drastis.
• Pilihan B (Membahas dampak kebutuhan, waktu, dan sumber daya...): Tepat dan Benar. Menjaga transparansi, melakukan penilaian dampak profesional, dan menyepakati ulang prioritas adalah praktik terbaik industri.
• Pilihan C (Menolak semua perubahan...): Keliru. Bersikap kaku bertentangan dengan prinsip kelincahan software (*Responding to change over following a plan*), karena kebutuhan bisnis klien memang dapat berkembang.
• Pilihan D (Menghapus fitur lain secara sepihak...): Keliru. Menghapus fitur tanpa musyawarah merusak integritas kontrak kerja dan merugikan kesepakatan produk.

💡 Tips Ujian:
Setiap kali ada permintaan penambahan fitur baru di tengah proyek, tindakan yang benar adalah "menganalisis dampak, membicarakannya dengan stakeholder/klien, lalu memperbarui rencana dan prioritas secara transparan."`
};
