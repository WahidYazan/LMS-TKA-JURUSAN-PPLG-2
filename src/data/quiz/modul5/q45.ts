import { HOTSQuestion } from '../../../types';

export const q45: HOTSQuestion = {
  id: 45,
  moduleNum: 5,
  caseText: "Kasus: Dalam bahasa yang menyediakan modifier public, private, dan protected, sebuah method ingin dapat digunakan oleh class itu sendiri dan class turunannya, tetapi tidak menjadi bagian akses umum untuk semua pemanggil. Modifier yang paling sesuai adalah...",
  options: [
    "public",
    "private",
    "protected",
    "static"
  ],
  correctIndex: 2,
  explanation: `📌 Kunci Jawaban: protected.

🔍 Konsep Dasar Penentu Hak Akses (Access Modifiers) dalam OOP:
Access Modifier mengatur tingkat keterlihatan (*visibility*) dan hak akses member class (atribut dan method):
1. \`public\`: Dapat diakses dari mana saja tanpa batasan (baik dari dalam class itu sendiri, class turunan, maupun objek pemanggil luar).
2. \`protected\`: HANYA DAPAT DIAKSES oleh class yang mendefinisikannya serta SEMUA CLASS TURUNANNYA (*Subclass / Derived Classes*), tetapi DILARANG DIAKSES oleh sembarang objek dari luar. Ini sangat ideal jika kita ingin mewariskan fungsi internal yang aman kepada anak-anak class tanpa mengeksposnya ke publik umum.
3. \`private\`: Paling ketat. HANYA DAPAT DIAKSES OLEH CLASS ITU SENDIRI. Bahkan class turunan sekalipun TIDAK BISA mengakses member private class induk secara langsung.
4. \`static\`: Bukan penentu akses, melainkan penanda bahwa member tersebut milik class itu sendiri secara global, bukan milik instansiasi objek tertentu.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (public): Keliru. Public dapat diakses oleh semua pihak luar secara bebas.
• Pilihan B (private): Keliru. Private melarang class turunan untuk mengaksesnya.
• Pilihan C (protected): Tepat dan Benar. Sesuai tepat dengan deskripsi soal: diizinkan untuk class itu sendiri dan class turunannya, tetapi tertutup dari pemanggil umum.
• Pilihan D (static): Keliru. Static mengatur kepemilikan memori bersama, bukan modifier hak visibilitas akses.

💡 Tips Ujian:
- Terbuka untuk siapa saja -> **public**
- Terbuka hanya untuk keluarga induk & anak kandung (*subclass*) -> **protected**
- Rahasia tertutup untuk diri sendiri saja -> **private**`
};
