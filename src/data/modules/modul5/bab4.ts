import { ModuleSection } from '../../../types';

export const bab4: ModuleSection = {
  id: "bab4",
  numberPrefix: "4.",
  title: "Polymorphism dan Method Overriding",
  paragraphs: [
    "Polymorphism memungkinkan pemanggil menggunakan antarmuka atau tipe dasar yang sama untuk object dengan perilaku berbeda. Dalam inheritance, subclass dapat melakukan method overriding: menyediakan implementasi sendiri untuk method yang diwariskan dengan nama dan bentuk pemanggilan yang sesuai.",
    "Ketika method dipanggil melalui referensi superclass, implementasi yang dipilih mengikuti class object sebenarnya pada saat program berjalan. Mekanisme ini memudahkan kode memproses beberapa jenis object tanpa menuliskan percabangan khusus untuk setiap subclass.",
    "Pastikan method yang dioverride memiliki tujuan yang sejalan dengan kontrak superclass. Jika perilakunya tidak lagi sesuai, pertimbangkan mengubah desain daripada mempertahankan inheritance yang membingungkan."
  ],
  bulletPoints: [
    {
      label: "Overriding",
      description: "Subclass mengganti implementasi method yang diwariskan dengan perilaku khusus, sambil menjaga cara pemanggilan yang diharapkan."
    },
    {
      label: "Referensi tipe dasar",
      description: "Variabel atau parameter bertipe superclass dapat merujuk object subclass yang sesuai."
    },
    {
      label: "Pemilihan method",
      description: "Pemanggilan method yang dioverride ditentukan oleh class object saat runtime, bukan hanya nama variabel referensinya."
    },
    {
      label: "Manfaat",
      description: "Kode dapat mengolah berbagai object melalui antarmuka yang sama dan tetap memperoleh perilaku masing-masing."
    }
  ],
  codeSnippet: {
    language: "python",
    code: "class Notifikasi:\n    def kirim(self):\n        return \"pesan umum\"\n\nclass Email(Notifikasi):\n    def kirim(self):\n        return \"kirim email\"\n\nkanal = [Notifikasi(), Email()]\nfor item in kanal:\n    print(item.kirim())",
    explanation: "Pemanggilan kirim memakai nama method yang sama, tetapi hasilnya mengikuti class object."
  }
};
