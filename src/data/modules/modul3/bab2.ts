import { ModuleSection } from '../../../types';

export const bab2: ModuleSection = {
  id: "bab2",
  numberPrefix: "2.",
  title: "Infrastruktur, Alamat IP, Subnet, dan Perangkat Jaringan",
  paragraphs: [
    "Jaringan komputer menghubungkan perangkat agar dapat bertukar data. Dalam proyek PPLG, perangkat yang berkomunikasi dapat berupa komputer pengembang, server aplikasi, server basis data, penyimpanan berkas, router, dan switch. Router menghubungkan jaringan yang berbeda; switch menghubungkan perangkat dalam jaringan lokal.",
    "Alamat IPv4 terdiri atas empat oktet dan dipakai bersama prefix atau subnet mask untuk menentukan bagian jaringan dan bagian host. Pada jaringan 192.168.10.0/24, alamat 192.168.10.1 dan 192.168.10.100 berada pada subnet yang sama, sedangkan alamat host harus unik dan tidak boleh memakai alamat jaringan atau broadcast.",
    "Konfigurasi dasar biasanya meliputi alamat IP, prefix, gateway, dan DNS. DHCP dapat membagikan konfigurasi secara otomatis, sedangkan alamat statis berguna untuk perangkat layanan yang perlu ditemukan dengan alamat tetap. Pastikan alamat yang dipilih sesuai rancangan jaringan dan tidak bentrok."
  ],
  bulletPoints: [
    {
      label: "Alamat IP dan prefix",
      description: "Identifikasi perangkat sekaligus menunjukkan subnet; perangkat pada subnet yang sama dapat berkomunikasi langsung jika konfigurasi dan jalurnya benar."
    },
    {
      label: "Gateway",
      description: "Jalur keluar menuju jaringan lain. Gateway harus dapat dijangkau melalui konfigurasi jaringan lokal."
    },
    {
      label: "DNS",
      description: "Menerjemahkan nama host menjadi alamat yang digunakan untuk menghubungi layanan."
    },
    {
      label: "Router dan switch",
      description: "Router meneruskan paket antarjaringan; switch menghubungkan perangkat di jaringan lokal."
    },
    {
      label: "Konektivitas layanan",
      description: "Alamat, subnet, gateway, DNS, status perangkat, dan aturan firewall perlu cocok agar klien mencapai layanan."
    }
  ]
};
