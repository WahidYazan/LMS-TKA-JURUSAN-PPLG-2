import { ModuleSection } from '../../../types';

export const bab2: ModuleSection = {
  id: "bab2",
  numberPrefix: "2.",
  title: "Empat Pilar Utama OOP (PBO)",
  paragraphs: [
    "Fondasi utama pemrograman berorientasi objek bertumpu pada 4 pilar arsitektur:"
  ],
  bulletPoints: [
    {
      label: "Enkapsulasi (Encapsulation)",
      description: "Membungkus data privat (access modifier private) dan hanya menyediakan akses melalui getter dan setter resmi."
    },
    {
      label: "Pewarisan (Inheritance)",
      description: "Mewariskan sifat dan method dari Superclass ke Subclass (keyword extends) untuk mencegah penulisan kode berulang."
    },
    {
      label: "Polimorfisme (Polymorphism)",
      description: "Satu nama method dapat memiliki banyak implementasi perilaku yang berbeda melalui method overriding pada subclass."
    },
    {
      label: "Abstraksi (Abstraction)",
      description: "Menyembunyikan detail kerumitan implementasi internal melalui Interface atau Abstract Class."
    }
  ]
};
