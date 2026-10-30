import { HOTSQuestion } from '../../../types';

export const q15: HOTSQuestion = {
  id: 15,
  moduleNum: 2,
  caseText: "Kasus: Studio gim menerapkan aturan backup 3-2-1. Jika mereka memiliki 1 salinan master di PC utama dan 1 salinan di server NAS kantor, maka salinan ketiga harus disimpan di...",
  options: [
    "Harddisk eksternal di meja yang sama",
    "Lokasi terpisah / Off-site Cloud Storage",
    "Flashdisk di saku celana programmer",
    "Dihapus karena sudah ada 2 salinan"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: Lokasi terpisah / Off-site Cloud Storage.

🔍 Konsep Dasar Strategi Backup Data 3-2-1:
Aturan 3-2-1 adalah standar baku industri keamanan informasi dan manajemen aset digital (Disaster Recovery Plan):
- 3: Simpan minimal **3 Salinan Data** (1 data utama/master yang sedang dikerjakan + 2 salinan cadangan).
- 2: Simpan pada minimal **2 Media Penyimpanan yang Berbeda** (misalnya 1 di SSD internal komputer dan 1 di server Network Attached Storage / NAS atau harddisk eksternal). Tujuannya agar jika salah satu jenis perangkat rusak teknis, data tetap ada di media lain.
- 1: Simpan minimal **1 Salinan di Lokasi Fisik Terpisah (Off-site / Cloud Storage)**. 
Tujuan krusial salinan off-site: Jika kantor studio mengalami musibah fisik tak terduga (seperti kebakaran gedung, kebanjiran, gempa bumi, atau pencurian fisik), seluruh perangkat yang berada di dalam ruangan tersebut dapat hancur bersamaan. Dengan adanya 1 salinan di Cloud Storage (AWS S3, Google Cloud, atau server di kota lain), kelangsungan bisnis (business continuity) dan data proyek gim tetap 100% aman dan dapat dipulihkan.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A & C (Harddisk di meja yang sama / Flashdisk di saku): Keliru. Masih berada di lokasi fisik yang sama (on-site). Jika terjadi kebakaran kantor atau banjir, media ini tetap akan ikut musnah atau hilang.
• Pilihan B (Lokasi terpisah / Off-site Cloud Storage): Tepat dan Benar. Memenuhi kriteria angka "1" dari strategi 3-2-1 secara sempurna.
• Pilihan D (Dihapus karena sudah ada 2 salinan): Keliru. Menghapus data cadangan melanggar prinsip redundansi keamanan.

💡 Tips Ujian:
Rumus 3-2-1: 3 Salinan Total -> 2 Media Berbeda -> 1 Disimpan di Luar Lokasi Fisik (Off-site / Cloud).`
};
