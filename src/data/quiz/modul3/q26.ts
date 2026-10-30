import { HOTSQuestion } from '../../../types';

export const q26: HOTSQuestion = {
  id: 26,
  moduleNum: 3,
  caseText: "Kasus: Perbedaan utama antara protokol HTTP dan HTTPS terletak pada...",
  options: [
    "HTTPS menggunakan kabel tembaga lebih tebal",
    "HTTPS mengenkripsi seluruh paket komunikasi data menggunakan sertifikat SSL/TLS di Port 443",
    "HTTP hanya bisa dibuka di malam hari",
    "HTTPS tidak memerlukan server"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: HTTPS mengenkripsi seluruh paket komunikasi data menggunakan sertifikat SSL/TLS di Port 443.

🔍 Konsep Dasar Protokol HTTP vs HTTPS (Hypertext Transfer Protocol Secure):
1. HTTP (Port 80): Beroperasi mengirimkan data dalam bentuk teks polos (*plaintext / unencrypted*). Jika pengguna mengirimkan password, username, atau data kartu kredit melalui HTTP di jaringan publik (seperti Wi-Fi kafe), pihak ketiga dapat dengan mudah menyadap data tersebut menggunakan teknik *packet sniffing* (misalnya Wireshark) atau *Man-in-the-Middle (MitM) attack*.
2. HTTPS (Port 443): Menambahkan lapisan keamanan kriptografi transport (*Transport Layer Security / TLS* atau pendahulunya *SSL*).
   - Kerahasiaan (Confidentiality): Seluruh lalu lintas data dienkripsi dengan algoritma kriptografi simetris dan asimetris (RSA/ECC + AES), sehingga hanya browser dan server yang memegang kunci untuk membacanya.
   - Integritas Data (Integrity): Memastikan paket data tidak dapat dimodifikasi atau disisipi skrip berbahaya di tengah jalan.
   - Autentikasi Server (Authentication): Sertifikat digital yang diterbitkan oleh Certificate Authority (CA) memvalidasi keaslian domain situs web yang sedang dikunjungi.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Kabel tembaga lebih tebal): Keliru. Enkripsi adalah protokol perangkat lunak pada lapisan aplikasi/transport (Layer 7 & 4 OSI), tidak ada kaitannya dengan ketebalan fisik tembaga kabel.
• Pilihan B (HTTPS mengenkripsi paket data menggunakan SSL/TLS di Port 443): Tepat dan Benar. Ini adalah landasan teknis perbedaan fundamental antara HTTP dan HTTPS.
• Pilihan C & D (Hanya dibuka malam hari / Tidak memerlukan server): Keliru dan tidak masuk akal. Semua protokol web bekerja 24 jam dan mutlak membutuhkan server.

💡 Tips Ujian:
Huruf "S" pada HTTPS berarti **Secure**, yang menandakan adanya enkripsi **SSL/TLS** dan berjalan default di **Port 443** (berbeda dengan HTTP biasa di Port 80).`
};
