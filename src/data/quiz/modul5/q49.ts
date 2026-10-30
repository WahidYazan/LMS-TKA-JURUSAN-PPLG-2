import { HOTSQuestion } from '../../../types';

export const q49: HOTSQuestion = {
  id: 49,
  moduleNum: 5,
  caseText: "Kasus: Class Akun menyimpan saldo sebagai atribut private. Perubahan saldo hanya dilakukan melalui method setor yang menolak jumlah nol atau negatif, sedangkan saldo dibaca melalui method yang disediakan. Prinsip yang diterapkan adalah...",
  options: [
    "Pewarisan",
    "Enkapsulasi dan pengendalian akses",
    "Polymorphism",
    "Perulangan"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: Enkapsulasi dan pengendalian akses.

🔍 Konsep Dasar Validasi Integritas Data Melalui Enkapsulasi:
Tujuan terbesar diterapkannya pilar Enkapsulasi bukan sekadar "menyembunyikan" kode, melainkan MENJAMIN INTEGRITAS DATA (*Data Integrity & Invariant Preservation*):
1. Mengunci Atribut Sensitif: Variabel \`saldo\` diberi modifier \`private\` agar entitas dari luar class tidak bisa sembarangan mengisi angka negatif atau mengubah nilai secara langsung tanpa aturan.
2. Pengendalian Akses Bersyarat: Method \`setor(jumlah)\` bertindak sebagai penjaga gerbang (*gatekeeper*). Di dalam method tersebut, dibuat logika validasi:
   \`\`\`
   if (jumlah <= 0) {
       throw new Error("Jumlah setoran harus bernilai positif!");
   }
   saldo += jumlah;
   \`\`\`
3. Dengan enkapsulasi, objek menjamin bahwa keadaan internalnya (*internal state*) selalu konsisten, sah secara aturan perbankan, dan terlindungi dari manipulasi koding yang salah di luar class.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Pewarisan): Keliru. Tidak ada hubungan superclass dan subclass yang disebutkan pada kasus ini.
• Pilihan B (Enkapsulasi dan pengendalian akses): Tepat dan Benar. Menjaga saldo tetap privat dan memvalidasi perubahannya melalui method terkontrol adalah perwujudan sejati enkapsulasi.
• Pilihan C (Polymorphism): Keliru. Tidak melibatkan banyak bentuk implementasi method turunan.
• Pilihan D (Perulangan): Keliru. Perulangan adalah struktur kontrol iterasi (loop), bukan pilar OOP.

💡 Tips Ujian:
Atribut diset privat + perubahan hanya boleh lewat method dengan validasi aturan = **Enkapsulasi & Pengendalian Akses**.`
};
