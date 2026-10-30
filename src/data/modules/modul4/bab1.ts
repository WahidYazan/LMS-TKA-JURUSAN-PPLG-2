import { ModuleSection } from '../../../types';

export const bab1: ModuleSection = {
  id: "bab1",
  numberPrefix: "1.",
  title: "Dekomposisi Masalah dan Representasi Algoritma",
  paragraphs: [
    "Algoritma adalah urutan langkah yang jelas dan berhingga untuk mengolah masukan menjadi keluaran. Algoritma yang baik sesuai tujuan, memiliki aturan yang dapat diikuti, menangani kasus yang mungkin muncul, dan berhenti setelah memperoleh hasil.",
    "Sebelum menulis kode, uraikan persoalan: pahami tujuan, tentukan data masukan dan keluaran, pisahkan menjadi bagian lebih kecil, cari pola, lalu pilih langkah penyelesaian. Representasi dapat berupa kalimat terstruktur, pseudocode, atau flowchart; semuanya membantu tim mendiskusikan logika sebelum memilih bahasa pemrograman.",
    "Pada flowchart, terminator menandai awal atau akhir, persegi panjang menunjukkan proses, jajar genjang menunjukkan input atau output, dan belah ketupat menunjukkan keputusan bercabang. Panah menunjukkan arah alur. Setiap cabang keputusan perlu memiliki kondisi dan arah yang dapat ditelusuri."
  ],
  bulletPoints: [
    {
      label: "Masukan dan keluaran",
      description: "Nyatakan informasi yang diterima dan hasil yang harus diberikan, termasuk satuan atau format bila diperlukan."
    },
    {
      label: "Dekomposisi",
      description: "Bagi masalah besar menjadi langkah atau submasalah yang lebih kecil dan dapat diperiksa."
    },
    {
      label: "Pola dan aturan",
      description: "Temukan aturan yang berulang, tentukan urutan operasi, dan tulis keputusan secara eksplisit."
    },
    {
      label: "Uji dengan contoh",
      description: "Telusuri algoritma memakai masukan sederhana, batas minimum atau maksimum, dan satu kasus yang tidak biasa."
    }
  ],
  codeSnippet: {
    language: "text",
    code: "MULAI\nBaca nilai\nJika nilai >= 75, tampilkan Lulus\nJika tidak, tampilkan Remedial\nSELESAI",
    explanation: "Pseudocode memusatkan perhatian pada logika, tanpa bergantung pada sintaks bahasa tertentu."
  }
};
