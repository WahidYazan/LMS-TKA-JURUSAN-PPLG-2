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
  explanation: `📌 Kunci Jawaban: Menyuplai daya baterai sementara agar server sempat melakukan graceful shutdown dan mencegah korupsi data.

🔍 Konsep Dasar UPS (Uninterruptible Power Supply) & Integritas Basis Data:
Sistem database (seperti MySQL, PostgreSQL, Oracle) bekerja dengan mekanisme caching dan log transaksi di memori RAM sebelum data ditulis permanen ke media penyimpanan fisik (disk storage).
Dampak Pemadaman Listrik Mendadak Tanpa UPS:
1. Korupsi Data (*Data Corruption*): Pemutusan daya seketika di tengah-tengah penulisan blok data (*in-flight write*) menyebabkan file tabel basis data rusak, indeks tidak sinkron, dan transaksi terputus separuh jalan.
2. Kerusakan Fisik Storage: Kepala baca-tulis harddisk mekanik (HDD) atau pengontrol memori flash SSD dapat mengalami malfungsi karena lonjakan atau drop tegangan mendadak (*power surge/brownout*).
3. Peran UPS: UPS menyediakan cadangan listrik instan dari baterai internal dalam hitungan milidetik tanpa interupsi. Selain menstabilkan voltase (*AVR / Automatic Voltage Regulation*), UPS memberikan waktu jeda yang cukup (biasanya 10–30 menit) agar daemon server dapat menjalankan proses pematian teratur (*graceful shutdown*)—yaitu menyelesaikan transaksi yang tertunda, menulis dirty buffer ke disk, dan menutup koneksi secara aman.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Mendinginkan suhu ruangan lab): Keliru. Pendinginan ruangan dilakukan oleh unit Air Conditioner (AC), sedangkan UPS justru menghasilkan sedikit panas saat beroperasi.
• Pilihan B (Menyuplai daya baterai sementara agar server sempat graceful shutdown dan mencegah korupsi data): Tepat dan Benar. Ini adalah fungsi fundamental UPS dalam infrastruktur data center dan server database.
• Pilihan C (Meningkatkan kecepatan unduh internet): Keliru. Kecepatan internet ditentukan oleh bandwidth ISP dan router, bukan UPS.
• Pilihan D (Menghapus virus komputer secara otomatis): Keliru. Penghapusan virus adalah tugas program antivirus / EDR, bukan alat kelistrikan.

💡 Tips Ujian:
Fungsi utama UPS pada server adalah **cadangan daya darurat baterai**, **stabilisator voltase**, dan memberi kesempatan **graceful shutdown** demi mencegah **kerusakan file/data korup**.`
};
