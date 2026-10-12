import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portal TKA PPLG - SMK Telekomunikasi Tunas Harapan',
  description: 'LMS dan Portal Pembelajaran TKA Pengembangan Perangkat Lunak dan Gim (PPLG) SMK Telekomunikasi Tunas Harapan dengan modul interaktif, simulator ujian TKA, dan rangkuman kompetensi.',
  openGraph: {
    title: 'Portal TKA PPLG - SMK Telekomunikasi Tunas Harapan',
    description: 'LMS dan Portal Pembelajaran TKA Pengembangan Perangkat Lunak dan Gim (PPLG) SMK Telekomunikasi Tunas Harapan dengan modul interaktif, simulator ujian TKA, dan rangkuman kompetensi.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portal TKA PPLG - SMK Telekomunikasi Tunas Harapan',
    description: 'LMS dan Portal Pembelajaran TKA Pengembangan Perangkat Lunak dan Gim (PPLG) SMK Telekomunikasi Tunas Harapan dengan modul interaktif, simulator ujian TKA, dan rangkuman kompetensi.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen bg-[#f8fafc] text-slate-800">
        {children}
      </body>
    </html>
  );
}
