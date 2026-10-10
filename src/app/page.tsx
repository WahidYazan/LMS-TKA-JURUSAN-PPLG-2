'use client';

import { LandingPage } from '@/components/LandingPage';
import { Navbar } from '@/components/Navbar';
import { usePathname } from 'next/navigation';

export default function HomePage() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar currentPath={pathname} onOpenCheatsheet={() => {}} />
      <LandingPage />
    </div>
  );
}