import { HOTSQuestion } from '../../../types';

export const q30: HOTSQuestion = {
  id: 30,
  moduleNum: 3,
  caseText: "Kasus: Gim multiplayer online membutuhkan komunikasi dua arah secara langsung (real-time streaming) tanpa perlu terus-menerus melakukan HTTP polling. Protokol yang paling tepat adalah...",
  options: [
    "FTP (File Transfer Protocol)",
    "WebSocket Protocol",
    "SMTP Email Protocol",
    "Telnet 23"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: WebSocket Protocol.

🔍 Konsep Dasar Protokol Komunikasi Real-Time (HTTP vs WebSocket):
1. Keterbatasan HTTP Tradisional: Protokol HTTP bersifat *Request-Response unidireksional* dan *stateless*. Klien harus berulang kali meminta data ke server (*short polling / long polling*), yang memicu beban overhead header HTTP yang sangat besar dan latensi tinggi yang tidak dapat ditoleransi dalam gim aksi multiplayer.
2. Keunggulan WebSocket (RFC 6455):
   - Koneksi Persisten Tunggal (Single Persistent Connection): Berawal dari HTTP Handshake upgrade, lalu membentuk satu terowongan TCP persisten yang tetap terbuka selama sesi berlangsung.
   - Komunikasi Dua Arah Penuh (Full-Duplex): Klien dan server dapat saling mengirimkan data kapan saja secara simultan tanpa menunggu permintaan terlebih dahulu.
   - Latensi Ultra Rendah (Low Latency): Frame data WebSocket hanya memiliki overhead 2–10 byte (jauh lebih kecil dibandingkan ribuan byte header HTTP), sehingga ideal untuk game multiplayer real-time, live chat, dan financial trading.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (FTP): Keliru. FTP dirancang untuk transfer file biner/dokumen antar komputer, bukan untuk streaming data pergerakan pemain gim.
• Pilihan B (WebSocket Protocol): Tepat dan Benar. Menyediakan saluran dua arah real-time full-duplex berkecepatan tinggi.
• Pilihan C (SMTP Email Protocol): Keliru. SMTP digunakan untuk pengiriman surat elektronik (email).
• Pilihan D (Telnet 23): Keliru. Telnet adalah protokol remote terminal jadul tanpa enkripsi.

💡 Tips Ujian:
Kebutuhan "game multiplayer real-time", "live streaming dua arah", atau "chat instan tanpa polling" selalu merujuk pada protokol **WebSocket**.`
};
