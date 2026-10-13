import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PPLG - SMK Telekomunikasi Tunas Harapan',
  description: 'Simulasi TKA PPLG (Pengembangan Perangkat Lunak dan Gim) SMK Telekomunikasi Tunas Harapan dengan modul interaktif, simulator ujian TKA, dan rangkuman kompetensi.',
  openGraph: {
    title: 'PPLG - SMK Telekomunikasi Tunas Harapan',
    description: 'Simulasi TKA PPLG (Pengembangan Perangkat Lunak dan Gim) SMK Telekomunikasi Tunas Harapan dengan modul interaktif, simulator ujian TKA, dan rangkuman kompetensi.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPLG - SMK Telekomunikasi Tunas Harapan',
    description: 'Simulasi TKA PPLG (Pengembangan Perangkat Lunak dan Gim) SMK Telekomunikasi Tunas Harapan dengan modul interaktif, simulator ujian TKA, dan rangkuman kompetensi.',
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
        <Analytics />
      </body>
    </html>
  );
}
