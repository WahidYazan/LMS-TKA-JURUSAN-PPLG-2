import { ModuleSection } from '../../../types';

export const bab5: ModuleSection = {
  id: "bab5",
  numberPrefix: "5.",
  title: "Analisis Kendala Konektivitas dan Troubleshooting Jaringan",
  paragraphs: [
    "Analisis konektivitas sebaiknya dilakukan berurutan dari perangkat hingga aplikasi. Periksa apakah antarmuka jaringan aktif dan konfigurasi alamat benar, apakah tujuan berada pada subnet yang sesuai, apakah gateway dan DNS dapat dijangkau, apakah layanan berjalan pada port yang diharapkan, dan apakah permintaan aplikasi memperoleh respons.",
    "Gunakan satu gejala untuk menyusun dugaan yang dapat diperiksa. Jika alamat IP dapat dijangkau tetapi nama domain gagal, periksa DNS. Jika server merespons pada komputer yang sama tetapi tidak dari perangkat lain, periksa binding alamat, firewall, subnet, dan jalur jaringan. Catat perintah, hasil, waktu, dan perubahan konfigurasi agar penyebab dapat ditelusuri.",
    "CORS adalah aturan browser yang mengatur permintaan lintas origin, bukan bukti bahwa kabel atau koneksi IP terputus. Bedakan masalah DNS, port, TLS, autentikasi, izin, format API, dan CORS sebelum memilih perbaikan."
  ],
  bulletPoints: [
    {
      label: "Periksa konfigurasi",
      description: "Periksa alamat, prefix, gateway, DNS, serta status koneksi dengan alat sistem operasi yang tersedia."
    },
    {
      label: "Uji nama dan jalur",
      description: "Gunakan ping bila diizinkan, nslookup untuk DNS, dan traceroute/tracert untuk melihat jalur yang dilalui paket."
    },
    {
      label: "Uji layanan",
      description: "Periksa apakah proses server berjalan, port mendengarkan, aturan firewall sesuai, dan permintaan HTTP memperoleh status atau pesan galat."
    },
    {
      label: "Nilai dampak",
      description: "Bandingkan hasil dari lebih dari satu client, catat latensi atau kehilangan paket bila relevan, lalu perbaiki satu dugaan pada satu waktu."
    }
  ],
  codeSnippet: {
    language: "text",
    code: "ipconfig /all\nnslookup api.sekolah.id\nping 192.168.10.1\ncurl -i https://api.sekolah.id",
    explanation: "Contoh urutan pemeriksaan; perintah yang tersedia berbeda antar sistem operasi dan lingkungan."
  }
};
