import { ModuleContent } from '../../../types';
import { bab1 } from './bab1';
import { bab2 } from './bab2';
import { bab3 } from './bab3';
import { bab4 } from './bab4';
import { bab5 } from './bab5';

export const modul2: ModuleContent = {
  id: "modul2",
  number: 2,
  moduleBadge: "MODUL 2",
  title: "K3LH & Budaya Kerja Industri 5R di Bidang IT",
  cardTitle: "K3LH & Budaya 5R",
  shortDesc: "Keselamatan kerja, SOP laboratorium IT, dan budaya kerja industri 5R.",
  heroImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
  tableOfContents: [
    {
      id: "bab1",
      title: "1. Ergonomi Kerja Programmer"
    },
    {
      id: "bab2",
      title: "2. Pencegahan Bahaya Listrik & Lab Komputer"
    },
    {
      id: "bab3",
      title: "3. Budaya Kerja 5R (Seiri, Seiton, Seiso, Seiketsu, Shitsuke)"
    },
    {
      id: "bab4",
      title: "4. Manajemen Aset Fisik & Digital"
    },
    {
      id: "bab5",
      title: "5. Strategi Backup 3-2-1 untuk Software"
    }
  ],
  sections: [bab1, bab2, bab3, bab4, bab5]
};
