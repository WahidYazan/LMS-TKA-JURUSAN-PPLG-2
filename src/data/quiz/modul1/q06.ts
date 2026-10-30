import { HOTSQuestion } from '../../../types';

export const q06: HOTSQuestion = {
  id: 6,
  moduleNum: 1,
  caseText: "Kasus: Sebuah tim startup ingin meluncurkan MVP aplikasi web tanpa perlu repot mengurus instalasi update keamanan Linux server atau konfigurasi Nginx manual. Mereka cukup mengunggah kode sumber JavaScript ke server penyedia. Model layanan awan ini adalah...",
  options: [
    "IaaS (Infrastructure as a Service)",
    "PaaS (Platform as a Service)",
    "SaaS (Software as a Service)",
    "DaaS (Desktop as a Service)"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: PaaS (Platform as a Service).

🔍 Konsep Dasar Model Layanan Komputasi Awan (Cloud Computing):
Penyedia layanan awan membagi model layanannya berdasarkan tingkat tanggung jawab pengelolaan:
1. IaaS (Infrastructure as a Service): Penyedia hanya menyewakan perangkat keras virtual mentah (CPU, RAM, Storage, Jaringan). Pengguna harus menginstal OS sendiri, mengatur keamanan Linux, mengonfigurasi web server (Nginx/Apache), dan runtime runtime. Contoh: AWS EC2, Google Compute Engine, DigitalOcean Droplet.
2. PaaS (Platform as a Service): Penyedia sudah menyiapkan sistem operasi, server web, runtime bahasa pemrograman (seperti Node.js, Python, PHP), dan otomatisasi scaling. Pengembang CUKUP mengunggah kode aplikasi atau menghubungkan repositori Git. Contoh: Vercel, Heroku, Netlify, Google App Engine, AWS Elastic Beanstalk.
3. SaaS (Software as a Service): Aplikasi perangkat lunak yang sudah jadi seutuhnya dan langsung dipakai oleh pengguna akhir tanpa memprogram sama sekali. Contoh: Google Docs, Gmail, Microsoft 365, Trello.
4. DaaS (Desktop as a Service): Penyewaan virtual desktop interface untuk pengguna kantor.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (IaaS): Keliru. Pada IaaS, pengguna masih wajib mengonfigurasi sistem operasi Linux dan web server manual.
• Pilihan B (PaaS): Tepat dan Benar. PaaS menghilangkan beban pengelolaan infrastruktur dan OS sehingga developer hanya fokus pada kode aplikasi (JavaScript/Node.js).
• Pilihan C (SaaS): Keliru. SaaS adalah software siap pakai untuk end-user, bukan platform untuk mengunggah dan mengeksekusi kode buatan programmer.
• Pilihan D (DaaS): Keliru. DaaS menyediakan lingkungan komputer desktop virtual (VDI), bukan lingkungan hosting aplikasi web.

💡 Tips Ujian:
- Sewa mesin kosong & atur OS sendiri -> **IaaS**
- Langsung unggah kode/script program -> **PaaS**
- Langsung pakai aplikasi lewat browser -> **SaaS**`
};
