import { HOTSQuestion } from '../../../types';

export const q50: HOTSQuestion = {
  id: 50,
  moduleNum: 5,
  caseText: "Kasus: Sebuah aplikasi mengirim beberapa object Email dan SMS dalam satu daftar bertipe Notifikasi. Pemanggil cukup menjalankan method kirim() pada setiap object dan tidak perlu memeriksa jenis class satu per satu. Manfaat utama rancangan tersebut adalah...",
  options: [
    "Semua jenis notifikasi harus menghasilkan isi pesan yang sama",
    "Setiap subclass wajib memiliki atribut dengan nilai identik",
    "Pemanggil menggunakan antarmuka yang sama dan tiap object menjalankan perilakunya sendiri",
    "Penambahan subclass selalu mengharuskan penulisan ulang seluruh pemanggil"
  ],
  correctIndex: 2,
  explanation: `📌 Kunci Jawaban: Pemanggil menggunakan antarmuka yang sama dan tiap object menjalankan perilakunya sendiri.

🔍 Konsep Dasar Manfaat Polimorfisme & Prinsip Open-Closed (SOLID Principles):
Rancangan pada kasus ini adalah penerapan nyata dari *Polymorphism* dan *Open-Closed Principle* (terbuka untuk perluasan, tertutup untuk modifikasi):
1. Antarmuka Pemanggil yang Berseragam (*Unified Interface*):
   Pemanggil kode cukup berinteraksi dengan tipe umum \`Notifikasi\` dan memanggil method tunggal \`kirim()\`.
   \`\`\`
   for (Notifikasi n : daftarNotifikasi) {
       n.kirim();
   }
   \`\`\`
2. Menghilangkan Rantai Percabangan yang Rapuh:
   Pemanggil tidak perlu menulis kode kotor seperti \`if (n instanceof Email) ... else if (n instanceof SMS) ...\`.
3. Fleksibilitas Penambahan Fitur Baru (*Extensibility & Loose Coupling*):
   Jika besok lusa studio ingin menambahkan jenis notifikasi baru (misalnya \`WhatsAppNotifikasi\` atau \`TelegramNotifikasi\`), programmer CUKUP membuat class baru turunan dari \`Notifikasi\` tanpa perlu mengubah atau mengutak-atik baris kode loop pemanggil yang sudah ada sebelumnya.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A & B (Isi pesan harus sama / Atribut wajib bernilai identik): Keliru. Setiap notifikasi justru bebas memiliki isi pesan berbeda dan atribut yang berbeda (SMS butuh nomor telepon, Email butuh alamat email).
• Pilihan C (Pemanggil menggunakan antarmuka yang sama dan tiap object menjalankan perilakunya sendiri): Tepat dan Benar. Ini adalah keuntungan terbesar dari perancangan berorientasi objek yang polimorfik.
• Pilihan D (Penambahan subclass mengharuskan penulisan ulang pemanggil): Keliru. Polimorfisme justru membebaskan pemanggil agar tidak perlu ditulis ulang saat ada subclass baru.

💡 Tips Ujian:
Manfaat terbesar polimorfisme: **Satu antarmuka panggilan yang sama**, **bebas dari percabangan if-else tipe class**, dan **mudah menambah class baru tanpa merusak kode lama**.`
};
