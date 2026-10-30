import { HOTSQuestion } from '../../../types';

export const q18: HOTSQuestion = {
  id: 18,
  moduleNum: 2,
  caseText: "Kasus: Kabel daya di laboratorium software berserakan di lorong lantai tempat siswa berjalan. Bahaya K3 yang paling berpotensi terjadi adalah...",
  options: [
    "Koneksi internet menjadi lebih lambat",
    "Bahaya tersandung (tripping hazard) dan kabel terkelupas memicu sengatan listrik",
    "Suhu ruangan menjadi terlalu dingin",
    "Resolusi layar monitor menurun drastis"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: Bahaya tersandung (tripping hazard) dan kabel terkelupas memicu sengatan listrik.

🔍 Konsep Dasar Keselamatan Lingkungan Kerja (Housekeeping & Electrical Safety):
Dalam manajemen K3 perkantoran dan laboratorium komputer:
1. Bahaya Fisik Jalur Lalu Lalang (*Tripping Hazard*): Kabel listrik atau kabel LAN yang malang-melintang tanpa pelindung di lantai tempat orang berlalu-lalang merupakan pelanggaran berat standar K3. Orang dapat tersandung, terjatuh, dan mengalami cedera fisik (fraktur/luka).
2. Bahaya Listrik (*Electrical Hazard*): Kabel yang sering terinjak atau terlindas roda kursi kantor akan cepat aus, isolatornya terkelupas, dan tembaga bertegangan tinggi di dalamnya dapat terekspos. Hal ini memicu risiko sengatan listrik fatal (electrocution) bagi orang yang melintas serta risiko korsleting (short-circuit) yang dapat memicu kebakaran gedung.
3. Solusi SOP K3: Pengkabelan wajib dimasukkan ke dalam baki kabel (*cable duct/tray*), pelindung lantai (*floor cord protector*), atau ditata di bawah lantai panggung (*raised floor*).

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A & D (Koneksi lambat / Resolusi layar menurun): Keliru. Kabel daya AC 220V tidak mempengaruhi resolusi grafis monitor atau kecepatan paket data internet secara langsung.
• Pilihan B (Bahaya tersandung dan kabel terkelupas memicu sengatan listrik): Tepat dan Benar. Ini adalah dua ancaman bahaya keselamatan jiwa dan fisik paling nyata dari kabel yang berserakan di lorong.
• Pilihan C (Suhu ruangan menjadi dingin): Keliru. Suhu ruangan dikendalikan oleh sistem AC/HVAC, bukan kabel yang berserakan.

💡 Tips Ujian:
Identifikasi bahaya kabel di lantai: selalu berkaitan dengan **tersandung (tripping hazard)** dan **bahaya sengatan listrik (electrical hazard)**.`
};
