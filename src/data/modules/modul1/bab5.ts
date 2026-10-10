import { ModuleSection } from '../../../types';

export const bab5: ModuleSection = {
  id: "bab5",
  numberPrefix: "5.",
  title: "Keamanan Perangkat Lunak & Sistem Terapan (Cybersecurity)",
  paragraphs: [
    "Seiring pesatnya laju digitalisasi, ancaman hacker, malware, data leak, dan Ransomware (virus penyandera data) menjadi teror harian dunia korporasi. Konsep keamanan modern bergeser dari sekadar firewall jaringan konvensional menuju arsitektur holistik:"
  ],
  bulletPoints: [
    {
      label: "Zero Trust Architecture (ZTA)",
      description: "Prinsip kerja terkini yang mengasumsikan bahwa tidak ada siapapun di dalam atau di luar jaringan yang boleh dipercaya otomatis. Setiap akses request wajib melalui verifikasi identitas berlapis (Multi-Factor Authentication)."
    },
    {
      label: "Mitigasi OWASP Top 10",
      description: "Perlindungan aplikasi web dari serangan klasik mematikan seperti SQL Injection (dicegah dengan Prepared Statements), Cross-Site Scripting / XSS (sanitasi input HTML), dan Broken Access Control."
    },
    {
      label: "DevSecOps & Code Audit",
      description: "Mengintegrasikan pemindaian celah keamanan sejak baris kode pertama ditulis (Static Application Security Testing) sebelum kode dideploy ke server produksi."
    }
  ]
};
