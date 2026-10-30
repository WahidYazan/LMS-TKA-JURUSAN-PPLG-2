import { ModuleContent } from '../../../types';
import { bab1 } from './bab1';
import { bab2 } from './bab2';
import { bab3 } from './bab3';
import { bab4 } from './bab4';
import { bab5 } from './bab5';

export const modul1: ModuleContent = {
  id: "modul1",
  number: 1,
  moduleBadge: "MODUL 1",
  title: "Wawasan Dunia Kerja Bidang Pengembangan Perangkat Lunak dan Gim",
  cardTitle: "Wawasan Dunia Kerja PPLG",
  shortDesc: "Pemahaman terhadap proses bisnis pengembangan perangkat lunak dan gim, perkembangan teknologi, peluang usaha, manajemen proyek, HAKI, serta budaya industri.",
  heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  tableOfContents: [
    {
      id: "bab1",
      title: "1. Profesi dan Peran dalam Tim PPLG"
    },
    {
      id: "bab2",
      title: "2. Kewirausahaan dan Peluang Usaha Digital"
    },
    {
      id: "bab3",
      title: "3. Proses Bisnis dan Siklus Pengembangan Perangkat Lunak"
    },
    {
      id: "bab4",
      title: "4. Perkembangan Teknologi dan Dunia Kerja PPLG"
    },
    {
      id: "bab5",
      title: "5. Manajemen Proyek, Budaya Mutu, dan HAKI"
    }
  ],
  sections: [bab1, bab2, bab3, bab4, bab5]
};
