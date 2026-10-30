import { HOTSQuestion } from '../../../types';

export const q05: HOTSQuestion = {
  id: 5,
  moduleNum: 1,
  caseText: "Kasus: Pengembang merilis aplikasi kalender dan membagikan kode sumbernya di GitHub dengan lisensi yang memperbolehkan orang lain memodifikasi, menjual, dan menutup kode turunannya secara komersial. Lisensi yang digunakan adalah...",
  options: [
    "GNU General Public License (GPLv3)",
    "MIT License",
    "Creative Commons Attribution-NonCommercial",
    "Proprietary EULA"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: MIT License.

🔍 Konsep Dasar & Perbedaan Jenis Lisensi Perangkat Lunak:
Dalam dunia sumber terbuka (Open-Source), terdapat dua spektrum utama lisensi:
1. Lisensi Permisif (Permissive License): Contohnya adalah Lisensi MIT, Apache 2.0, dan BSD. Lisensi ini sangat longgar; siapa pun bebas menggunakan, menyalin, memodifikasi, menggabungkan, mempublikasikan, mendistribusikan, menyewakan, bahkan menjual perangkat lunak secara komersial tanpa kewajiban merilis ulang kode sumber turunannya (boleh diubah menjadi *closed-source* / proprietary), asalkan tetap menyertakan pemberitahuan hak cipta asli penciptanya.
2. Lisensi Copyleft / Timbal Balik: Contohnya adalah GNU General Public License (GPLv3). Lisensi ini mewajibkan siapa pun yang memodifikasi atau memperluas kode tersebut untuk turut membagikan seluruh kode sumber turunannya secara terbuka di bawah lisensi GPL yang sama (tidak boleh ditutup secara komersial).

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (GNU General Public License / GPLv3): Keliru. GPL bersifat *strong copyleft*, mewajibkan semua karya turunan tetap open source (tidak mengizinkan penutupan source code turunan secara komersial tanpa menyertakan kode aslinya).
• Pilihan B (MIT License): Tepat dan Benar. Lisensi MIT adalah lisensi permisif terpopuler di GitHub yang secara eksplisit mengizinkan pemanfaatan komersial dan penutupan kode sumber turunan.
• Pilihan C (Creative Commons Attribution-NonCommercial): Keliru. Lisensi CC-BY-NC secara tegas melarang (NonCommercial) pemanfaatan untuk tujuan bisnis atau komersial, dan lisensi Creative Commons utamanya dirancang untuk karya seni/media, bukan kode perangkat lunak.
• Pilihan D (Proprietary EULA): Keliru. EULA (End User License Agreement) adalah perjanjian lisensi tertutup (komersial proprietary) di mana kode sumber tidak dibagikan secara bebas di GitHub.

💡 Tips Ujian:
- Ingin bebas dipakai apa saja termasuk komersial dan boleh ditutup kodenya -> Pilih **MIT License** / Apache.
- Mewajibkan kode turunan tetap terbuka dan dilarang ditutup -> Pilih **GNU GPL** (Copyleft).`
};
