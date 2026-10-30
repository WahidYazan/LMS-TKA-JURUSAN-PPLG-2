import { HOTSQuestion } from '../../../types';

export const q44: HOTSQuestion = {
  id: 44,
  moduleNum: 5,
  caseText: "Kasus: Subclass `Kucing` dan `Anjing` sama-sama memiliki method `bersuara()`, namun `Kucing` menghasilkan \"Meong\" sedangkan `Anjing` menghasilkan \"Guk\". Konsep ini dinamakan...",
  options: [
    "Polimorfisme (Polymorphism) via Method Overriding",
    "Data Binding",
    "Enkapsulasi Statis",
    "Constructor Chaining"
  ],
  correctIndex: 0,
  explanation: `📌 Kunci Jawaban: Polimorfisme (Polymorphism) via Method Overriding.

🔍 Konsep Dasar Pilar Polimorfisme & Method Overriding:
Polimorfisme secara etimologi berasal dari bahasa Yunani yang berarti "banyak bentuk" (*poly* = banyak, *morph* = bentuk):
1. Prinsip Satu Antarmuka, Banyak Perilaku: Kucing dan Anjing sama-sama merupakan turunan dari class \`Hewan\`. Keduanya memiliki method dengan tanda tangan (*signature*) yang sama, yaitu \`bersuara()\`.
2. Method Overriding: Subclass \`Kucing\` menimpa (*override*) implementasi method induknya untuk mencetak "Meong", sedangkan subclass \`Anjing\` menimpa method yang sama untuk mencetak "Guk".
3. Dynamic Polymorphism: Ketika program memanggil \`hewan.bersuara()\`, sistem runtime secara otomatis mengeksekusi perilaku yang tepat sesuai jenis objek aktualnya tanpa perlu menulis banyak struktur percabangan \`if-else\`.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Polimorfisme via Method Overriding): Tepat dan Benar. Menghadirkan banyak implementasi berbeda dari satu pemanggilan method yang seragam adalah hakikat utama polimorfisme.
• Pilihan B (Data Binding): Keliru. Data binding adalah teknik menghubungkan elemen tampilan antarmuka (UI) dengan variabel data pada framework seperti Angular atau React.
• Pilihan C (Enkapsulasi Statis): Keliru. Enkapsulasi mengatur penyembunyian hak akses data, bukan perbedaan perilaku method turunan.
• Pilihan D (Constructor Chaining): Keliru. Constructor chaining adalah pemanggilan berantai antar constructor menggunakan \`super()\` atau \`this()\`.

💡 Tips Ujian:
Satu nama method yang sama tetapi memiliki banyak bentuk keluaran suara/aksi yang berbeda pada subclass yang berbeda selalu mengindikasikan **Polimorfisme (Polymorphism)**.`
};
