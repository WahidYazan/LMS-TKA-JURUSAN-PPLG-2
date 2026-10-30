import { HOTSQuestion } from '../../../types';

export const q16: HOTSQuestion = {
  id: 16,
  moduleNum: 2,
  caseText: "Kasus: Saat merakit PC server lab, teknisi memasang gelang statis (anti-static wrist strap) yang terhubung ke ground. Tujuan utama SOP ini adalah...",
  options: [
    "Menghangatkan tangan teknisi",
    "Membuang muatan listrik statis tubuh agar tidak merusak chip semikonduktor sensitif",
    "Mencegah tangan kotor terkena debu",
    "Mempercepat proses instalasi Windows"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: Membuang muatan listrik statis tubuh agar tidak merusak chip semikonduktor sensitif.

🔍 Konsep Dasar Bahaya Electrostatic Discharge (ESD) pada Perangkat Keras:
Tubuh manusia dapat mengumpulkan muatan listrik statis akibat gesekan pakaian atau alas kaki dengan lantai karpet, dengan potensi tegangan mencapai ribuan volt (walaupun arusnya sangat kecil dan tidak membahayakan nyawa manusia).
Namun, bagi komponen mikroelektronika komputer:
1. Kerentanan Semikonduktor: Chip prosesor (CPU), modul RAM, SSD, dan chipset motherboard memiliki jalur sirkuit nanometer yang sangat rapuh. Tegangan statis sekecil beberapa puluh volt saja sudah cukup melubangi lapisan silikon dielektrik (gate oxide breakdown).
2. Kerusakan Tersembunyi (Latent Defect): Kerusakan akibat ESD sering kali tidak menyebabkan komponen langsung mati total saat dirakit, melainkan memicu error misterius di masa depan, seperti data korup, crash berkala (*Blue Screen*), atau masa pakai chip menurun drastis.
3. Fungsi Anti-Static Wrist Strap: Gelang statis yang dihubungkan ke tanah (*earth ground*) atau sasis logam server berfungsi mengalirkan muatan listrik statis dari tubuh manusia secara bertahap dan aman, sehingga tubuh dan komponen berada pada potensial listrik yang sama (ekuipotensial).

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A & C (Menghangatkan tangan / Mencegah debu): Keliru. Gelang statis bukan sarung tangan termal atau sarung tangan pembersih debu.
• Pilihan B (Membuang muatan listrik statis tubuh agar tidak merusak chip semikonduktor): Tepat dan Benar. Ini adalah SOP baku perakitan perangkat keras untuk melindungi komponen dari bahaya ESD.
• Pilihan D (Mempercepat instalasi Windows): Keliru. Kecepatan instalasi OS bergantung pada kecepatan baca-tulis SSD dan prosesor, bukan gelang teknisi.

💡 Tips Ujian:
Kaitan kata kunci: "gelang statis (*anti-static wrist strap*)", "matras konduktif", atau "kantung antistatik" selalu bertujuan mencegah bahaya pelepasan muatan listrik statis (**ESD / Electrostatic Discharge**).`
};
