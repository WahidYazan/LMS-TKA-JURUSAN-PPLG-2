import { ModuleSection } from '../../../types';

export const bab4: ModuleSection = {
  id: "bab4",
  numberPrefix: "4.",
  title: "Teknologi Komputasi Awan (Cloud Computing Terkini)",
  paragraphs: [
    "Modern software engineering sangat bergantung pada arsitektur komputasi awan. Layanan komputasi awan terbagi menjadi tiga tingkatan model layanan utama:"
  ],
  bulletPoints: [
    {
      label: "IaaS (Infrastructure as a Service)",
      description: "Menyewa perangkat keras mentah (RAM, vCPU, Harddisk) di awan. Developer memiliki kebebasan penuh menginstal OS dan web server sendiri (Contoh: AWS EC2, Google Compute Engine)."
    },
    {
      label: "PaaS (Platform as a Service)",
      description: "Lingkungan siap pakai untuk para programmer. Anda hanya perlu mengunggah kode aplikasi tanpa pusing mengurus konfigurasi OS server dasar (Contoh: Google Cloud Run, Vercel, Firebase App Hosting)."
    },
    {
      label: "SaaS (Software as a Service)",
      description: "Aplikasi siap pakai yang langsung dinikmati oleh pengguna akhir melalui peramban web (Contoh: Google Workspace, Microsoft Office 365, Figma, Canva)."
    }
  ]
};
