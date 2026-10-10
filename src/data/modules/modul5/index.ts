import { ModuleContent } from '../../../types';
import { bab1 } from './bab1';
import { bab2 } from './bab2';
import { bab3 } from './bab3';
import { bab4 } from './bab4';
import { bab5 } from './bab5';

export const modul5: ModuleContent = {
  id: "modul5",
  number: 5,
  moduleBadge: "MODUL 5",
  title: "Pemrograman Berorientasi Objek (OOP) & Dasar Gim",
  cardTitle: "OOP & Dasar Gim",
  shortDesc: "Class & object, 4 pilar OOP, arsitektur game loop, physics engine, dan komponen collider.",
  heroImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
  tableOfContents: [
    {
      id: "bab1",
      title: "1. Class, Object & Constructor"
    },
    {
      id: "bab2",
      title: "2. 4 Pilar Utama OOP"
    },
    {
      id: "bab3",
      title: "3. Prinsip Desain SOLID"
    },
    {
      id: "bab4",
      title: "4. Arsitektur Game Loop & Komponen"
    },
    {
      id: "bab5",
      title: "5. Fisika Gim & Collision Detection"
    }
  ],
  sections: [bab1, bab2, bab3, bab4, bab5]
};
