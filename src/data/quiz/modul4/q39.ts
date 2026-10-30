import { HOTSQuestion } from '../../../types';

export const q39: HOTSQuestion = {
  id: 39,
  moduleNum: 4,
  caseText: "Kasus: Konsep pemrograman memecah program raksasa menjadi sub-rutin kecil mandiri (fungsi) agar dapat digunakan berulang kali dikenal sebagai...",
  options: [
    "Modularisasi (Modular Programming)",
    "Monolithic Dumping",
    "Hardcoding Spaghetti",
    "Data Redundancy"
  ],
  correctIndex: 0,
  explanation: `📌 Kunci Jawaban: Modularisasi (Modular Programming).

🔍 Konsep Dasar Pemrograman Modular (Modular Decomposition):
Modularisasi adalah teknik perancangan perangkat lunak yang membagi sistem monolitik besar menjadi modul-modul atau fungsi-fungsi kecil terpisah yang memiliki tanggung jawab spesifik (*Single Responsibility Principle*).
Keuntungan Utama Modularisasi:
1. Reusability (Dapat Digunakan Ulang): Sebuah fungsi logika (misal: validasi email atau perhitungan diskon) cukup ditulis satu kali dan dapat dipanggil berulang-ulang di berbagai tempat tanpa duplikasi kode (*Don't Repeat Yourself / DRY*).
2. Maintainability (Kemudahan Perawatan): Jika ditemukan bug, developer cukup memperbaiki fungsi modular tersebut tanpa perlu membongkar seluruh sistem.
3. Keterbacaan & Kolaborasi Tim: Kode lebih rapi, terstruktur, dan anggota tim yang berbeda dapat mengembangkan modul terpisah secara bersamaan (*parallel development*).
4. Abstraksi: Pengguna fungsi hanya perlu mengetahui input parameter dan return outputnya tanpa harus memikirkan kerumitan implementasi di dalamnya.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Modularisasi / Modular Programming): Tepat dan Benar. Memecah program menjadi sub-rutin/fungsi independen adalah definisi murni modularisasi.
• Pilihan B (Monolithic Dumping): Keliru. Istilah buatan yang menggambarkan kebiasaan buruk menumpuk semua kode dalam satu tempat raksasa.
• Pilihan C (Hardcoding Spaghetti): Keliru. *Spaghetti code* adalah anti-pattern pemrograman tidak terstruktur yang alurnya berbelit-belit dan sulit dilacak.
• Pilihan D (Data Redundancy): Keliru. Redundansi data adalah duplikasi penyimpanan data yang sama di beberapa tempat pada sistem database.

💡 Tips Ujian:
Memecah program besar menjadi bagian-bagian fungsi/prosedur yang dapat digunakan berulang kali disebut **Modularisasi (Modularitas)**.`
};
