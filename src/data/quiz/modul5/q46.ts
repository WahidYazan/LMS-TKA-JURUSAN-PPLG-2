import { HOTSQuestion } from '../../../types';

export const q46: HOTSQuestion = {
  id: 46,
  moduleNum: 5,
  caseText: "Kasus: Class Email mewarisi class Notifikasi lalu mendefinisikan ulang method kirim dengan nama dan parameter yang sesuai, tetapi dengan perilaku khusus untuk email. Tindakan pada subclass tersebut disebut...",
  options: [
    "Method overriding",
    "Constructor overloading",
    "Instansiasi",
    "Deklarasi atribut"
  ],
  correctIndex: 0,
  explanation: `📌 Kunci Jawaban: Method overriding.

🔍 Konsep Dasar Perbedaan Method Overriding vs Method Overloading:
1. Method Overriding (Penimpaan Implementasi):
   - Terjadi pada hubungan DUA CLASS yang memiliki relasi pewarisan (Superclass dan Subclass).
   - Subclass mendefinisikan ulang method yang diwarisinya dari Superclass dengan NAMA DAN PARAMETER (Signature) YANG PERSIS SAMA.
   - Tujuannya adalah memberikan implementasi perilaku yang lebih spesifik bagi subclass tersebut (misalnya, method \`kirim()\` umum di class \`Notifikasi\` ditimpa perilakunya oleh class \`Email\` untuk mengirim protokol SMTP).
   - Bersifat *Runtime Polymorphism (Dynamic Binding)*.
2. Method Overloading (Kelebihan Beban):
   - Terjadi di dalam SATU CLASS YANG SAMA.
   - Beberapa method memiliki NAMA YANG SAMA, tetapi TIPE ATAU JUMLAH PARAMETERNYA BERBEDA (misal: \`hitungLuas(int sisi)\` vs \`hitungLuas(int p, int l)\`).
   - Bersifat *Compile-Time Polymorphism (Static Binding)*.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Method overriding): Tepat dan Benar. Menulis ulang method milik superclass pada subclass dengan parameter yang sama adalah hakikat overriding.
• Pilihan B (Constructor overloading): Keliru. Overloading terjadi dalam satu class dengan variasi parameter yang berbeda, bukan penimpaan pada class anak.
• Pilihan C (Instansiasi): Keliru. Instansiasi adalah proses penciptaan objek dari class menggunakan kata kunci \`new\`.
• Pilihan D (Deklarasi atribut): Keliru. Deklarasi atribut adalah pendefinisian variabel anggota class.

💡 Tips Ujian:
- Beda class (induk & anak), nama dan parameter SAMA -> **Overriding** (Menimpa)
- Satu class sama, nama sama tapi parameter BEDA -> **Overloading** (Banyak ragam parameter)`
};
