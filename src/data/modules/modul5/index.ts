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
  title: "Pemrograman Berorientasi Objek",
  cardTitle: "Pemrograman Berorientasi Objek (OOP)",
  shortDesc: "Pemahaman dan penerapan konsep class dan object, prinsip dasar OOP, access modifier, enkapsulasi, inheritance, dan polymorphism untuk merancang struktur program yang modular dan terorganisasi.",
  heroImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
  tableOfContents: [
    {
      id: "bab1",
      title: "1. Class, Object, Atribut, Method, dan Constructor"
    },
    {
      id: "bab2",
      title: "2. Access Modifier dan Enkapsulasi"
    },
    {
      id: "bab3",
      title: "3. Pewarisan (Inheritance)"
    },
    {
      id: "bab4",
      title: "4. Polymorphism dan Method Overriding"
    },
    {
      id: "bab5",
      title: "5. Menerapkan OOP pada Proyek PPLG"
    }
  ],
  sections: [bab1, bab2, bab3, bab4, bab5]
};
