import { ModuleSection } from '../../../types';

export const bab1: ModuleSection = {
  id: "bab1",
  numberPrefix: "1.",
  title: "Class, Object dan Constructor",
  paragraphs: [
    "Class adalah rancangan yang mendefinisikan data dan perilaku sejenis; object adalah satu instansiasi yang memiliki keadaan sendiri. Pada aplikasi, class dapat menggambarkan peserta, produk, transaksi, karakter gim, atau objek lain yang memiliki atribut dan tindakan.",
    "Atribut menyimpan keadaan objek, misalnya nama atau skor. Method menjelaskan tindakan yang dapat dilakukan objek, misalnya memperbarui skor atau menghitung total. Constructor menyiapkan keadaan awal ketika object dibuat, sehingga object tidak harus dimulai dengan data yang belum valid.",
    "Pilih class berdasarkan konsep yang memang dibutuhkan program. Tidak semua kata benda perlu menjadi class; class bermanfaat ketika data dan perilaku perlu dikelompokkan, digunakan kembali, atau dijaga konsistensinya."
  ],
  bulletPoints: [
    {
      label: "Class",
      description: "Rancangan bersama yang mendefinisikan atribut, method, dan aturan object sejenis."
    },
    {
      label: "Object",
      description: "Instansiasi class dengan nilai atribut tertentu; dua object dari class yang sama dapat memiliki keadaan berbeda."
    },
    {
      label: "Constructor",
      description: "Menyiapkan keadaan awal object dan memastikan data wajib tersedia saat dibuat."
    },
    {
      label: "Method",
      description: "Perilaku yang terkait dengan object dan dapat membaca atau mengubah keadaan melalui aturan class."
    }
  ],
  codeSnippet: {
    language: "python",
    code: "class Produk:\n    def __init__(self, nama, harga):\n        self.nama = nama\n        self.harga = harga\n\nproduk_a = Produk(\"Buku\", 15000)\nprint(produk_a.nama)",
    explanation: "Produk adalah class; produk_a adalah object dengan nilai atribut nama dan harga."
  }
};
