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
  title: "Arsitektur Jaringan, API & Komunikasi Client-Server",
  cardTitle: "Arsitektur Jaringan & API",
  shortDesc: "Komunikasi client-server, protokol HTTP/HTTPS, RESTful API JSON, dan troubleshooting.",
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
  tableOfContents: [
    {
      id: "bab1",
      title: "1. Model Client-Server & Protokol Web"
    },
    {
      id: "bab2",
      title: "2. HTTP Methods & Response Status Codes"
    },
    {
      id: "bab3",
      title: "3. Port Layanan, Localhost & DNS"
    },
    {
      id: "bab4",
      title: "4. Konsumsi REST API & Payload JSON"
    },
    {
      id: "bab5",
      title: "5. Troubleshooting Latency & Koneksi"
    }
  ],
  sections: [bab1, bab2, bab3, bab4, bab5]
};
