import { HOTSQuestion } from '../../../types';

export const q07: HOTSQuestion = {
  id: 7,
  moduleNum: 1,
  caseText: "Kasus: Penyerang siber menyusupkan skrip berbahaya `' OR '1'='1` ke dalam formulir login sehingga dapat masuk ke sistem tanpa kata sandi valid. Jenis kerentanan ini adalah...",
  options: [
    "Cross-Site Scripting (XSS)",
    "SQL Injection (SQLi)",
    "Denial of Service (DoS)",
    "Man-in-the-Middle Attack"
  ],
  correctIndex: 1,
  explanation: "SQL Injection terjadi ketika input pengguna digabungkan langsung ke string query SQL tanpa parameter binding atau sanitasi."
};
