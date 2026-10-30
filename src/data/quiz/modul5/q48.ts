import { HOTSQuestion } from '../../../types';

export const q48: HOTSQuestion = {
  id: 48,
  moduleNum: 5,
  caseText: "Kasus: Method khusus dalam class yang otomatis dipanggil saat sebuah objek pertama kali dibuat dengan kata kunci `new` adalah...",
  options: [
    "Destructor",
    "Constructor",
    "Finalizer",
    "Getter"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: Constructor.

🔍 Konsep Dasar Constructor dalam Siklus Hidup Objek (Object Lifecycle):
Constructor adalah method khusus yang didefinisikan di dalam class dengan karakteristik unik:
1. Otomatis Dieksekusi: Dipanggil secara implisit oleh sistem ketika objek baru diinstansiasi ke memori menggunakan kata kunci \`new\` (misal: \`User u = new User("Budi", "budi@email.com")\`). Pada Python, constructor menggunakan nama method khusus \`__init__(self)\`.
2. Tugas Utama: Menginisialisasi keadaan awal (*initial state*) dari atribut-atribut objek, mengalokasikan sumber daya, atau memeriksa parameter wajib sebelum objek siap digunakan.
3. Ciri Sintaksis (pada Java/C++/C#): Memiliki nama yang persis sama dengan nama class-nya dan TIDAK MEMILIKI TIPE DATA KEMBALIAN (tidak ada void, int, string, dsb).

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A & C (Destructor / Finalizer): Keliru. Destructor adalah method yang dipanggil ketika objek dihancurkan atau dibersihkan dari memori (oleh Garbage Collector) di akhir masa pakainya.
• Pilihan B (Constructor): Tepat dan Benar. Constructor bertugas menginisialisasi atribut saat objek pertama kali diciptakan.
• Pilihan D (Getter): Keliru. Getter adalah method publik biasa yang dipanggil manual kapan saja untuk membaca nilai atribut privat.

💡 Tips Ujian:
Method khusus yang otomatis aktif saat kata kunci **new** dipanggil untuk pertama kali menginisialisasi atribut selalu bernama **Constructor**.`
};
