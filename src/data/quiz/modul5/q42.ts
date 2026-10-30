import { HOTSQuestion } from '../../../types';

export const q42: HOTSQuestion = {
  id: 42,
  moduleNum: 5,
  caseText: "Kasus: Seorang programmer menyembunyikan variabel saldo rekening dengan kata kunci `private` dan hanya menyediakan method `getSaldo()` dan `setor()`. Pilar OOP yang diterapkan adalah...",
  options: [
    "Polimorfisme",
    "Enkapsulasi (Encapsulation)",
    "Inheritance",
    "Overriding"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: Enkapsulasi (Encapsulation).

🔍 Konsep Dasar Pilar Enkapsulasi & Information Hiding:
Enkapsulasi adalah pilar OOP yang membungkus data atribut internal bersama dengan method yang memanipulasinya dalam satu kesatuan unit (class), serta menyembunyikan detail implementasi data tersebut dari akses langsung luar (*information hiding*).
Mekanisme Enkapsulasi:
1. Menandai atribut data sensitif dengan akses terbatas (\`private saldo\`). Hal ini mencegah pihak luar memodifikasi saldo secara ilegal atau tidak sengaja (misal: \`rekening.saldo = -1000000\`).
2. Menyediakan pintu gerbang terkontrol melalui method publik (*Getter dan Setter / Mutator & Accessor*).
   - Method \`getSaldo()\` (Getter): Membaca nilai saldo secara aman.
   - Method \`setor()\` (Setter): Memvalidasi aturan bisnis sebelum saldo diubah (misalnya memastikan jumlah setoran harus lebih besar dari 0).

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Polimorfisme): Keliru. Polimorfisme berfokus pada satu antarmuka yang menghasilkan banyak bentuk perilaku pada berbagai class turunan.
• Pilihan B (Enkapsulasi / Encapsulation): Tepat dan Benar. Melindungi data dengan \`private\` dan menyediakannya via getter/setter adalah definisi mutlak enkapsulasi.
• Pilihan C (Inheritance): Keliru. Inheritance adalah pewarisan sifat dari superclass ke subclass via \`extends\`.
• Pilihan D (Overriding): Keliru. Overriding adalah penulisan ulang method turunan.

💡 Tips Ujian:
Kombinasi kata kunci "menyembunyikan data internal", "modifier private", dan "method getter/setter" selalu merujuk pada pilar **Enkapsulasi (Encapsulation)**.`
};
