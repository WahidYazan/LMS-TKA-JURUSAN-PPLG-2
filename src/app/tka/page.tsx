'use client';

import { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { Navbar } from '@/components/Navbar';
import { CheatsheetModal } from '@/components/CheatsheetModal';
import { usePathname } from 'next/navigation';

export default function HomePage() {
  const pathname = usePathname();
  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
      <Navbar
        currentPath={pathname}
        onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
      />
      <LandingPage onOpenCheatsheet={() => setIsCheatsheetOpen(true)} />
      {isCheatsheetOpen && (
        <CheatsheetModal onClose={() => setIsCheatsheetOpen(false)} />
      )}
    </div>
  );
}