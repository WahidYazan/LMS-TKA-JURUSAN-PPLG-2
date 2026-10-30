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
  title: "Kecakapan Kerja Dasar (Basic Job Skills), K3, dan Budaya Kerja",
  cardTitle: "Kecakapan Kerja Dasar & K3",
  shortDesc: "Penerapan terhadap keselamatan kerja, penggunaan perangkat kerja, pengelolaan aset fisik dan digital, etika kerja, budaya kerja profesional, serta prosedur kerja di lingkungan pengembangan perangkat lunak dan gim.",
  heroImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
  tableOfContents: [
    {
      id: "bab1",
      title: "1. K3LH dan Ergonomi Lingkungan Kerja PPLG"
    },
    {
      id: "bab2",
      title: "2. Perangkat dan Tools Pengembangan"
    },
    {
      id: "bab3",
      title: "3. Etika, Budaya Kerja Profesional, dan 5R"
    },
    {
      id: "bab4",
      title: "4. Pengelolaan Aset Fisik dan Digital"
    },
    {
      id: "bab5",
      title: "5. Antarmuka Pengguna dan Aset Desain"
    }
  ],
  sections: [bab1, bab2, bab3, bab4, bab5]
};
