import { ModuleSection } from '../../../types';

export const bab3: ModuleSection = {
  id: "bab3",
  numberPrefix: "3.",
  title: "Lapisan TCP/IP dan Mekanisme Komunikasi",
  paragraphs: [
    "Model TCP/IP membantu menjelaskan perjalanan data dari aplikasi ke jaringan. Ketika browser meminta halaman, data aplikasi dibungkus menjadi segmen transport, paket IP, lalu frame untuk dikirim melalui media jaringan. Saat diterima, setiap lapisan menggunakan informasi yang sesuai untuk meneruskan data ke tujuan.",
    "TCP menyediakan aliran data yang terurut dan mekanisme untuk mendeteksi kehilangan sehingga cocok untuk banyak komunikasi web dan basis data. UDP mengirim datagram tanpa jaminan urutan atau pengiriman ulang bawaan; latensi dan kesederhanaannya berguna untuk kebutuhan tertentu seperti komunikasi real-time.",
    "Port membedakan layanan yang berjalan pada satu alamat perangkat. Contoh umum adalah 80 untuk HTTP, 443 untuk HTTPS, 53 untuk DNS, serta 3306 untuk MySQL. Nomor port aktual dapat diubah oleh konfigurasi; port yang terbuka pun belum tentu berarti aplikasinya berjalan dengan benar."
  ],
  bulletPoints: [
    {
      label: "Link",
      description: "Mengirim frame pada jaringan lokal melalui teknologi seperti Ethernet atau Wi-Fi; alamat perangkat lokal membantu pengiriman pada segmen tersebut."
    },
    {
      label: "Internet",
      description: "IP memberi alamat logis dan membantu paket melewati satu atau lebih jaringan menuju alamat tujuan."
    },
    {
      label: "Transport",
      description: "TCP atau UDP mengatur komunikasi antaraplikasi; nomor port mengarahkan data ke layanan yang sesuai."
    },
    {
      label: "Aplikasi",
      description: "HTTP/HTTPS, DNS, dan protokol lain mendukung pertukaran informasi yang dipahami aplikasi."
    }
  ]
};
