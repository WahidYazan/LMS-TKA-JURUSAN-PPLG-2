import { HOTSQuestion } from '../../../types';

export const q14: HOTSQuestion = {
  id: 14,
  moduleNum: 2,
  caseText: "Kasus: Dalam budaya 5R industri perangkat lunak, tindakan memilah dan menghapus branch git yang sudah usang serta membersihkan folder sampah build sementara (dist/tmp) merupakan cerminan dari...",
  options: [
    "Seiri (Ringkas)",
    "Seiton (Rapi)",
    "Seiso (Resik)",
    "Shitsuke (Rajin)"
  ],
  correctIndex: 0,
  explanation: `📌 Kunci Jawaban: Seiri (Ringkas).

🔍 Konsep Dasar Budaya Kerja Industri 5S / 5R pada Dunia Digital:
Prinsip 5R (Ringkas, Rapi, Resik, Rawat, Rajin) diadopsi dari filosofi manufaktur Jepang (5S) dan diterapkan pada manajemen repositori serta lingkungan kerja digital:
1. Seiri (Ringkas / Sort): Memisahkan antara aset/file yang benar-benar masih diperlukan dengan yang sudah tidak berguna, lalu membuang/menghapus file usang tersebut (seperti menghapus git branch yang sudah dimerge, log usang, node_modules/cache sementara, dan file backup sementara).
2. Seiton (Rapi / Set in order): Menata tata letak folder dan file secara terstruktur agar mudah dan cepat ditemukan kembali (misal: standarisasi penamaan folder src/components, src/utils).
3. Seiso (Resik / Shine): Membersihkan perangkat keras fisik dan lingkungan koding dari kotoran atau sisa-sisa debug code (linting/format code).
4. Seiketsu (Rawat / Standardize): Menjaga standar kebersihan dan keteraturan secara konsisten (membuat CI/CD linting check otomatis).
5. Shitsuke (Rajin / Sustain): Membangun disiplin diri seluruh tim untuk mematuhi SOP tanpa harus diawasi terus-menerus.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Seiri / Ringkas): Tepat dan Benar. Tindakan "memilah mana yang penting dan membuang yang tidak terpakai" adalah definisi harfiah dari Seiri (Sort).
• Pilihan B (Seiton / Rapi): Keliru. Seiton berfokus pada penataan posisi dan pengelompokan yang sistematis, bukan tindakan membuang sampah.
• Pilihan C (Seiso / Resik): Keliru. Seiso berfokus pada pembersihan fisik peralatan dan kebersihan lingkungan.
• Pilihan D (Shitsuke / Rajin): Keliru. Shitsuke berfokus pada pembiasaan sikap disiplin jangka panjang.

💡 Tips Ujian:
- Memilah & membuang barang/file yang tidak berguna -> **Seiri (Ringkas / Sort)**.
- Menata pada tempatnya dengan rapi -> **Seiton (Rapi / Set in order)**.`
};
