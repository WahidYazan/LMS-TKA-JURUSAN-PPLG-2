import { HOTSQuestion } from '../../../types';

export const q47: HOTSQuestion = {
  id: 47,
  moduleNum: 5,
  caseText: "Kasus: Variabel bertipe Pembayaran dapat merujuk object Kartu atau Tunai. Program memanggil method proses() melalui variabel tersebut, dan implementasi yang dijalankan mengikuti class object yang sedang dirujuk. Mekanisme ini menunjukkan...",
  options: [
    "Polymorphism melalui pemilihan method saat program berjalan",
    "Pengubahan class object menjadi variabel global",
    "Enkapsulasi yang mengharuskan semua object memiliki atribut sama",
    "Penghapusan relasi inheritance"
  ],
  correctIndex: 0,
  explanation: `📌 Kunci Jawaban: Polymorphism melalui pemilihan method saat program berjalan.

🔍 Konsep Dasar Polimorfisme Dinamis (Dynamic Binding / Polymorphic References):
Soal ini menguji pemahaman mendalam tentang prinsip kerja polimorfisme pada OOP:
1. Referensi Superclass: Variabel \`p\` dideklarasikan bertipe class dasar atau interface: \`Pembayaran p\`.
2. Menunjuk ke Berbagai Objek Turunan: Variabel \`p\` fleksibel menampung referensi objek subclass apa pun yang merupakan turunan dari Pembayaran:
   - \`p = new Kartu()\` atau \`p = new Tunai()\`.
3. Dynamic Method Dispatch / Late Binding: Ketika baris kode \`p.proses()\` dieksekusi, pemanggil tidak perlu memeriksa tipe objek dengan serangkaian \`if-else\`. Lingkungan runtime bahasa (JVM / Python engine) secara dinamis mengenali class objek aktual yang sedang dirujuk di memori, lalu mengeksekusi method \`proses()\` milik class tersebut:
   - Jika \`p\` merujuk objek \`Kartu\`, maka diproses secara debet/kredit.
   - Jika \`p\` merujuk objek \`Tunai\`, maka diproses penghitungan uang fisik kembalian.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Polymorphism melalui pemilihan method saat program berjalan): Tepat dan Benar. Menjalankan implementasi subclass yang sesuai dengan objek yang sedang dirujuk saat runtime adalah mekanisme formal polimorfisme dinamis.
• Pilihan B (Pengubahan class object menjadi variabel global): Keliru. Tidak ada konversi menjadi variabel global.
• Pilihan C (Enkapsulasi yang mengharuskan semua object memiliki atribut sama): Keliru. Objek subclass Kartu dan Tunai justru sangat lumrah memiliki atribut yang berbeda (misal Kartu punya nomor kartu dan CVV, Tunai tidak punya).
• Pilihan D (Penghapusan relasi inheritance): Keliru. Polimorfisme justru mensyaratkan dan bergantung penuh pada adanya relasi inheritance atau implementasi interface.

💡 Tips Ujian:
Ciri khas polimorfisme dinamis: "Tipe referensi superclass yang sama dapat memanggil method pada objek-objek subclass yang berbeda, dan aksinya ditentukan saat program berjalan (*runtime*)."`
};
