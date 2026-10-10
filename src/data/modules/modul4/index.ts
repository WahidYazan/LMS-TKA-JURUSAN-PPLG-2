import { ModuleContent } from '../../../types';
import { bab1 } from './bab1';
import { bab2 } from './bab2';
import { bab3 } from './bab3';
import { bab4 } from './bab4';
import { bab5 } from './bab5';

export const modul4: ModuleContent = {
  id: "modul4",
  number: 4,
  moduleBadge: "MODUL 4",
  title: "Pemrograman Terstruktur & Algoritma Efisien",
  cardTitle: "Logika Algoritma",
  shortDesc: "Flowchart ISO, pseudocode, tipe data, struktur kontrol percabangan dan perulangan.",
  heroImage: "https://images.unsplash.com/photo-1516116211227-bbc045763266?auto=format&fit=crop&w=1200&q=80",
  tableOfContents: [
    {
      id: "bab1",
      title: "1. Logika Algoritma & Flowchart ISO"
    },
    {
      id: "bab2",
      title: "2. Tipe Data Primitif vs Komposit"
    },
    {
      id: "bab3",
      title: "3. Struktur Kontrol Percabangan"
    },
    {
      id: "bab4",
      title: "4. Perulangan & Optimasi Kompleksitas"
    },
    {
      id: "bab5",
      title: "5. Fungsi Modular & Penanganan Error"
    }
  ],
  sections: [bab1, bab2, bab3, bab4, bab5]
};
