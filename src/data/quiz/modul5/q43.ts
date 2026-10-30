import { HOTSQuestion } from '../../../types';

export const q43: HOTSQuestion = {
  id: 43,
  moduleNum: 5,
  caseText: "Kasus: Class `KarakterPahlawan` mewarisi seluruh atribut dari class `MakhlukHidup` menggunakan kata kunci `extends`. Hubungan ini mewakili pilar...",
  options: [
    "Pewarisan (Inheritance)",
    "Abstraksi Murni",
    "Encapsulation Gate",
    "Multithreading"
  ],
  correctIndex: 0,
  explanation: `📌 Kunci Jawaban: Pewarisan (Inheritance).

🔍 Konsep Dasar Pilar Pewarisan (Inheritance) & Relasi "IS-A":
Pewarisan (Inheritance) adalah mekanisme fundamental dalam OOP di mana suatu class turunan (*Subclass / Child Class*) dapat mewarisi (menyerap) sifat-sifat berupa atribut dan method dari class induknya (*Superclass / Parent Class*).
Karakteristik Inheritance:
1. Hubungan "Adalah Bagian Dari" (*IS-A Relationship*): Contohnya \`KarakterPahlawan\` adalah makhluk hidup (\`KarakterPahlawan IS-A MakhlukHidup\`).
2. Kata Kunci Penghubung: Dalam bahasa Java, TypeScript, C++, dan PHP menggunakan kata kunci \`extends\` (atau \`class KarakterPahlawan(MakhlukHidup):\` pada Python).
3. Kode Dapat Digunakan Kembali (*Code Reusability*): Programmer tidak perlu menulis ulang logika bernapas, berjalan, atau atribut darah/HP pada setiap jenis pahlawan, karena semuanya otomatis diwarisi langsung dari class induk \`MakhlukHidup\`.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Pewarisan / Inheritance): Tepat dan Benar. Menghubungkan class induk dengan class anak melalui kata kunci \`extends\` adalah definisi inti Inheritance.
• Pilihan B (Abstraksi Murni): Keliru. Abstraksi berfokus pada perancangan antarmuka abstrak tanpa memikirkan detail teknis.
• Pilihan C (Encapsulation Gate): Keliru. Enkapsulasi berfokus pada pembatasan hak akses data via private/public.
• Pilihan D (Multithreading): Keliru. Multithreading adalah teknik eksekusi thread konkuren pada prosesor.

💡 Tips Ujian:
Kapan pun ada kata kunci **extends**, **mewarisi atribut/method induk**, atau **relasi Superclass-Subclass**, jawabannya selalu pilar **Pewarisan (Inheritance)**.`
};
