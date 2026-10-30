import { ModuleSection } from '../../../types';

export const bab2: ModuleSection = {
  id: "bab2",
  numberPrefix: "2.",
  title: "Tipe Data dan Struktur Data",
  paragraphs: [
    "Tipe data menjelaskan jenis nilai yang disimpan dan operasi yang masuk akal terhadap nilai itu. Contoh umum adalah integer untuk bilangan bulat, float untuk bilangan pecahan, string untuk teks, dan boolean untuk benar atau salah. Bahasa berbeda dapat memiliki nama, batas, atau aturan konversi yang berbeda.",
    "Struktur data mengatur sekumpulan nilai agar dapat diakses atau diolah sesuai kebutuhan. List atau array cocok untuk urutan, sedangkan dictionary atau map menghubungkan kunci dengan nilai. Pilih struktur berdasarkan operasi yang sering dilakukan, urutan yang dibutuhkan, dan bentuk hubungan data.",
    "Stack memakai prinsip terakhir masuk, pertama keluar; queue memakai prinsip pertama masuk, pertama keluar. Pemahaman struktur ini membantu memodelkan tumpukan navigasi, antrean tugas, daftar nilai, inventaris, atau keadaan objek pada proyek perangkat lunak dan gim."
  ],
  bulletPoints: [
    {
      label: "Nilai tunggal",
      description: "Integer, float, string, boolean, dan tipe sejenis dipilih sesuai arti data; jangan menyimpan angka sebagai teks bila perlu dihitung tanpa alasan."
    },
    {
      label: "List atau array",
      description: "Menyimpan urutan elemen dan memungkinkan akses berdasarkan posisi; perhatikan indeks awal serta batas panjang."
    },
    {
      label: "Dictionary atau map",
      description: "Menyimpan pasangan kunci-nilai agar data dapat ditemukan melalui kunci yang bermakna."
    },
    {
      label: "Stack dan queue",
      description: "Stack mengolah elemen terakhir lebih dahulu; queue mengolah elemen yang paling lama menunggu."
    }
  ],
  codeSnippet: {
    language: "python",
    code: "nilai = [70, 85, 60, 90]\nlulus = [n for n in nilai if n >= 75]\nprint(len(lulus))",
    explanation: "List menyimpan beberapa nilai; proses memilih nilai yang memenuhi kondisi sebelum menghitung jumlahnya."
  }
};
