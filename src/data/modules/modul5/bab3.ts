import { ModuleSection } from '../../../types';

export const bab3: ModuleSection = {
  id: "bab3",
  numberPrefix: "3.",
  title: "Pewarisan (Inheritance)",
  paragraphs: [
    "Inheritance atau pewarisan membentuk relasi antara superclass dan subclass. Subclass dapat memakai perilaku yang diwariskan lalu menambahkan atau menyesuaikan perilaku yang sesuai. Gunakan relasi ini ketika konsep turunan benar-benar merupakan jenis dari konsep dasar, bukan sekadar untuk menghindari beberapa baris kode.",
    "Contohnya, Siswa dapat menjadi jenis Pengguna karena siswa memiliki identitas dan perilaku umum pengguna, lalu menambahkan kelas atau kegiatan belajar. Subclass bergantung pada aturan superclass; perubahan pada induk dapat memengaruhi semua turunannya.",
    "Batasi kedalaman dan jumlah relasi pewarisan agar struktur tetap dapat dipahami. Jika satu objek hanya memiliki atau memakai objek lain, relasi komposisi sering lebih tepat daripada inheritance."
  ],
  bulletPoints: [
    {
      label: "Superclass",
      description: "Class dasar yang menyediakan data atau perilaku umum bagi class turunan."
    },
    {
      label: "Subclass",
      description: "Class yang mewarisi bagian yang dapat digunakan dari superclass dan menambahkan perilaku khusus."
    },
    {
      label: "Relasi is-a",
      description: "Pewarisan masuk akal ketika pernyataan bahwa object turunan adalah jenis object dasar tetap benar dalam konteks program."
    },
    {
      label: "Dampak perubahan",
      description: "Perubahan pada superclass perlu ditinjau karena dapat mengubah perilaku atau kebutuhan seluruh subclass."
    }
  ],
  codeSnippet: {
    language: "python",
    code: "class Pengguna:\n    def __init__(self, nama):\n        self.nama = nama\n\nclass Siswa(Pengguna):\n    def ikut_kelas(self):\n        return f\"{self.nama} mengikuti kelas\"",
    explanation: "Siswa mewarisi atribut nama dari Pengguna dan menambahkan perilaku khusus."
  }
};
