import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

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
    <html lang="id" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
        {children}
      </body>
    </html>
  );
}
