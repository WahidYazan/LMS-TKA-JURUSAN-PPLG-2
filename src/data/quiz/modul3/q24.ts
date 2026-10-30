import { HOTSQuestion } from '../../../types';

export const q24: HOTSQuestion = {
  id: 24,
  moduleNum: 3,
  caseText: "Kasus: Format pertukaran data yang menggunakan pasangan kunci dan nilai (key-value) dengan struktur tanda kurung kurawal `{ \"nama\": \"Akmal\", \"kelas\": \"XII\" }` adalah...",
  options: [
    "JSON (JavaScript Object Notation)",
    "CSV (Comma Separated Values)",
    "XML Jadul",
    "Biner Assembly"
  ],
  correctIndex: 0,
  explanation: `📌 Kunci Jawaban: JSON (JavaScript Object Notation).

🔍 Konsep Dasar Format Serialisasi & Pertukaran Data (Data Interchange):
JSON (JavaScript Object Notation) adalah standar terbuka berbasis teks (RFC 8259) yang dirancang untuk merepresentasikan data terstruktur secara ringan, mudah dibaca manusia (*human-readable*), dan sangat cepat diparsing oleh mesin (*machine-readable*).
Karakteristik sintaksis JSON:
1. Pasangan Kunci dan Nilai (*Key-Value Pairs*): Kunci selalu diapit tanda petik ganda (\`"nama": "Akmal"\`).
2. Objek diapit oleh Kurung Kurawal: \`{ "kunci": "nilai" }\`.
3. Array/Daftar diapit oleh Kurung Siku: \`[ "item1", "item2" ]\`.
4. Tipe data yang didukung: String, Number, Boolean (true/false), Array, Object, dan null.
JSON merupakan standar mutlak *de facto* dalam komunikasi antarmuka web, REST API, GraphQL, dan penyimpanan dokumen NoSQL (seperti MongoDB).

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (JSON / JavaScript Object Notation): Tepat dan Benar. Format kurung kurawal dengan pasangan kunci bertanda petik adalah ciri khas JSON.
• Pilihan B (CSV / Comma Separated Values): Keliru. CSV menggunakan baris teks datar yang dipisahkan oleh tanda koma tanpa tanda kurung kurawal, contoh: \`Akmal, XII\`.
• Pilihan C (XML / Extensible Markup Language): Keliru. XML menggunakan struktur tag pembuka dan penutup bertanda kurung sudut, contoh: \`<siswa><nama>Akmal</nama><kelas>XII</kelas></siswa>\`.
• Pilihan D (Biner Assembly): Keliru. Assembly adalah instruksi kode mesin aras rendah (low-level), bukan format teks pertukaran data API.

💡 Tips Ujian:
- Menggunakan kurung kurawal \`{ "key": "value" }\` -> **JSON**
- Menggunakan tag bertingkat \`<tag>nilai</tag>\` -> **XML**
- Menggunakan tanda koma pemisah kolom -> **CSV**`
};
