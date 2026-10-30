import { ModuleContent } from '../../../types';
import { bab1 } from './bab1';
import { bab2 } from './bab2';
import { bab3 } from './bab3';
import { bab4 } from './bab4';
import { bab5 } from './bab5';

export const modul3: ModuleContent = {
  id: "modul3",
  number: 3,
  moduleBadge: "MODUL 3",
  title: "Teknologi Jaringan Komputer",
  cardTitle: "Teknologi Jaringan Komputer",
  shortDesc: "Pemahaman konsep dasar jaringan komputer, konfigurasi lingkungan pengembangan, alamat IP, komunikasi client-server, protokol HTTP/HTTPS, akses basis data dan API, serta analisis kendala konektivitas.",
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
  tableOfContents: [
    {
      id: "bab1",
      title: "1. Sistem Operasi dan Lingkungan Pengembangan"
    },
    {
      id: "bab2",
      title: "2. Infrastruktur, IP, Subnet, dan Perangkat Jaringan"
    },
    {
      id: "bab3",
      title: "3. Lapisan TCP/IP dan Mekanisme Komunikasi"
    },
    {
      id: "bab4",
      title: "4. Client-Server, HTTP/HTTPS, API, dan Basis Data"
    },
    {
      id: "bab5",
      title: "5. Analisis Kendala Konektivitas"
    }
  ],
  sections: [bab1, bab2, bab3, bab4, bab5]
};
