import { HOTSQuestion } from '../../../types';

export const q23: HOTSQuestion = {
  id: 23,
  moduleNum: 3,
  caseText: "Kasus: Programmer web ingin menjalankan server database MySQL lokal di laptopnya. Port standar default yang digunakan oleh layanan MySQL adalah...",
  options: [
    "Port 80",
    "Port 443",
    "Port 3306",
    "Port 21"
  ],
  correctIndex: 2,
  explanation: `📌 Kunci Jawaban: Port 3306.

🔍 Konsep Dasar Nomor Port Jaringan Standar (IANA Ports) pada Arsitektur Web:
Nomor port TCP/UDP adalah titik akhir logis komunikasi jaringan agar sistem operasi tahu ke aplikasi/layanan mana paket data harus diteruskan:
- Port 3306 (TCP): Port default resmi yang dialokasikan oleh IANA untuk Server Basis Data **MySQL** dan MariaDB.
- Port 80 (TCP): Port standar untuk layanan **HTTP** (web server tidak terenkripsi).
- Port 443 (TCP): Port standar untuk layanan **HTTPS** (web server dengan enkripsi TLS/SSL).
- Port 21 (TCP): Port standar untuk protokol transfer file **FTP**.
- Port 22 (TCP): Port standar untuk **SSH** (Secure Shell) remote login.
- Port 5432 (TCP): Port standar untuk basis data **PostgreSQL**.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Port 80): Keliru. Port 80 digunakan oleh web server (Apache/Nginx) untuk lalu lintas web HTTP biasa.
• Pilihan B (Port 443): Keliru. Port 443 digunakan untuk lalu lintas aman web HTTPS.
• Pilihan C (Port 3306): Tepat dan Benar. 3306 adalah port bawaan standar untuk mesin database MySQL/MariaDB.
• Pilihan D (Port 21): Keliru. Port 21 digunakan oleh layanan File Transfer Protocol (FTP).

💡 Tips Ujian:
Hafalkan 4 port paling sering diujikan pada TKA PPLG:
1. HTTP = **80**
2. HTTPS = **443**
3. MySQL = **3306**
4. SSH = **22**`
};
