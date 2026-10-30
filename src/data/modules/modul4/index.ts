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
  title: "Pemrograman Terstruktur",
  cardTitle: "Pemrograman Terstruktur",
  shortDesc: "Pemahaman dan analisis penggunaan tipe data, struktur data, struktur kontrol percabangan dan perulangan, fungsi, prosedur, serta desain modular program untuk merancang solusi berbasis algoritma.",
  heroImage: "https://images.unsplash.com/photo-1516116211227-bbc045763266?auto=format&fit=crop&w=1200&q=80",
  tableOfContents: [
    {
      id: "bab1",
      title: "1. Dekomposisi Masalah dan Representasi Algoritma"
    },
    {
      id: "bab2",
      title: "2. Tipe Data dan Struktur Data"
    },
    {
      id: "bab3",
      title: "3. Percabangan dan Logika Boolean"
    },
    {
      id: "bab4",
      title: "4. Perulangan, Penelusuran, dan Efektivitas Algoritma"
    },
    {
      id: "bab5",
      title: "5. Fungsi, Prosedur, dan Modularisasi Program"
    }
  ],
  sections: [bab1, bab2, bab3, bab4, bab5]
};
