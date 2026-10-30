import { HOTSQuestion } from '../../../types';

export const q13: HOTSQuestion = {
  id: 13,
  moduleNum: 2,
  caseText: "Kasus: Ruang server sekolah mengalami korsleting dan percikan api pada panel listrik utama. Jenis Alat Pemadam Api Ringan (APAR) yang aman digunakan untuk kebakaran peralatan elektronik adalah...",
  options: [
    "APAR Berisi Air Bertekanan",
    "APAR Karbon Dioksida (CO2) atau Gas Clean Agent",
    "Menyiramkan air dari ember lab",
    "Menaburkan serbuk gergaji kayu"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: APAR Karbon Dioksida (CO2) atau Gas Clean Agent.

🔍 Konsep Dasar Klasifikasi Kebakaran K3 & Pemilihan APAR:
Kebakaran diklasifikasikan ke dalam beberapa kelas (NFPA):
1. Kelas A: Benda padat mudah terbakar (kayu, kertas, kain).
2. Kelas B: Cairan dan gas mudah terbakar (bensin, solar, tiner).
3. Kelas C: Peralatan listrik bertegangan / instalasi elektronik (komputer, server, panel MCB).
4. Kelas D: Logam mudah terbakar.

Pada kebakaran peralatan elektronik di ruang server (Kelas C):
- Media pemadam TIDAK BOLEH menghantarkan listrik (non-konduktif) agar operator tidak tersengat listrik (electrocution).
- Media pemadam TIDAK BOLEH meninggalkan residu korosif atau basah yang dapat merusak sirkuit mikro motherboard server.
- APAR Karbon Dioksida (CO2) dan Gas Bersih (Clean Agent / FM-200 / Halotron) bekerja dengan cara mendinginkan dan menggeser oksigen (smothering) tanpa meninggalkan cairan, busa, atau residu bubuk sama sekali.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A & C (APAR Berisi Air / Menyiramkan air dari ember): Sangat Berbahaya dan Fatal! Air adalah konduktor listrik yang baik; menyiramkan air ke instalasi listrik bertegangan akan menyebabkan korsleting semakin luas dan menyengat pemadam secara mematikan.
• Pilihan B (APAR Karbon Dioksida / CO2 atau Gas Clean Agent): Tepat dan Benar. CO2 memadamkan api kelas C secara aman, tidak menghantarkan arus listrik, dan tidak meninggalkan kotoran pada komponen server.
• Pilihan D (Menaburkan serbuk gergaji kayu): Keliru dan konyol. Serbuk gergaji adalah bahan organik padat yang justru menjadi bahan bakar tambahan bagi kobaran api.

💡 Tips Ujian:
Untuk kebakaran perangkat elektronik aktif, lab komputer, dan server data center, selalu gunakan **APAR CO2** atau **Clean Agent Gas**.`
};
