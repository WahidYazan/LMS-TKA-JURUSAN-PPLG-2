import { ModuleSection } from '../../../types';

export const bab5: ModuleSection = {
  id: "bab5",
  numberPrefix: "5.",
  title: "Fungsi, Prosedur, dan Modularisasi Program",
  paragraphs: [
    "Fungsi dan prosedur mengelompokkan langkah yang memiliki tugas tertentu agar dapat dipanggil dari bagian program lain. Fungsi mengembalikan hasil, sedangkan prosedur dapat menjalankan aksi tanpa mengembalikan nilai bermakna; istilah dan aturan pastinya bergantung pada bahasa.",
    "Parameter membawa masukan ke subprogram, dan nilai kembali membawa hasil ke pemanggil. Nama yang jelas, tanggung jawab yang sempit, serta batas masukan dan keluaran yang terdefinisi membuat bagian program lebih mudah dipahami dan diuji.",
    "Modularisasi memecah penyelesaian menjadi bagian yang saling bekerja sama. Hindari menyalin logika yang sama berkali-kali, kurangi ketergantungan yang tidak perlu, dan pastikan setiap fungsi menjalankan satu pekerjaan yang dapat dijelaskan. Uji fungsi dengan contoh normal, nilai batas, dan masukan tidak valid."
  ],
  bulletPoints: [
    {
      label: "Fungsi",
      description: "Menerima parameter, melakukan satu pekerjaan, dan mengembalikan hasil untuk digunakan pemanggil."
    },
    {
      label: "Prosedur",
      description: "Menjalankan urutan aksi; pada sejumlah bahasa prosedur tidak mengembalikan nilai."
    },
    {
      label: "Parameter dan lingkup",
      description: "Parameter membuat masukan eksplisit; variabel lokal sebaiknya tidak diubah dari bagian program yang tidak berkaitan."
    },
    {
      label: "Modularisasi",
      description: "Pisahkan tanggung jawab, beri nama yang bermakna, dan hubungkan modul melalui antarmuka yang sederhana."
    }
  ],
  codeSnippet: {
    language: "python",
    code: "def hitung_total(harga, jumlah):\n    return harga * jumlah\n\ntotal = hitung_total(12000, 3)\nprint(total)",
    explanation: "Fungsi menerima dua parameter dan mengembalikan hasil; pemanggil menyimpan hasil sesuai kebutuhan."
  }
};
