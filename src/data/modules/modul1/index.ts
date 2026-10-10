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
  title: "Wawasan Dunia Kerja Bidang PPLG",
  cardTitle: "Wawasan Kerja",
  shortDesc: "Pengenalan profesi, proses bisnis, dan tren teknologi perangkat lunak dan gim industri.",
  heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  tableOfContents: [
    {
      id: "bab1",
      title: "1. Profil Pekerjaan & Jabatan"
    },
    {
      id: "bab2",
      title: "2. Technopreneurship & Peluang Usaha"
    },
    {
      id: "bab3",
      title: "3. Proses Bisnis Layanan Perangkat Lunak"
    },
    {
      id: "bab4",
      title: "4. Teknologi Komputasi Awan (Cloud)"
    },
    {
      id: "bab5",
      title: "5. Keamanan Perangkat Lunak (Cybersecurity)"
    }
  ],
  sections: [bab1, bab2, bab3, bab4, bab5]
};
