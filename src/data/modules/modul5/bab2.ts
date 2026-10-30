import { ModuleSection } from '../../../types';

export const bab2: ModuleSection = {
  id: "bab2",
  numberPrefix: "2.",
  title: "Access Modifier dan Enkapsulasi",
  paragraphs: [
    "Access modifier menentukan bagian program mana yang dapat menggunakan atribut atau method. Nama dan cakupan modifier tidak sepenuhnya sama di semua bahasa; public umumnya tersedia bagi pemanggil, private dibatasi untuk bagian internal class, sedangkan protected dapat digunakan dalam konteks pewarisan atau cakupan tertentu.",
    "Enkapsulasi mengelompokkan data dan perilakunya serta membatasi perubahan langsung yang dapat merusak keadaan object. Class menyediakan operasi yang valid untuk membaca atau mengubah data, seperti getter dan setter yang melakukan pemeriksaan sebelum nilai diterapkan.",
    "Jangan membuat setter hanya karena setiap atribut memiliki nilai. Sediakan operasi sesuai kebutuhan supaya aturan bisnis tetap terjaga. Misalnya, jumlah saldo hanya berubah melalui transaksi setor atau tarik yang memvalidasi jumlah."
  ],
  bulletPoints: [
    {
      label: "public",
      description: "Dapat diakses oleh pemanggil sesuai aturan bahasa; gunakan untuk bagian antarmuka class yang memang ditujukan bagi pengguna."
    },
    {
      label: "private",
      description: "Membatasi akses langsung ke bagian internal class sehingga perubahan dapat dikendalikan melalui operasi yang disediakan."
    },
    {
      label: "protected",
      description: "Memberi akses pada cakupan turunan atau paket sesuai aturan bahasa yang digunakan."
    },
    {
      label: "Getter dan setter",
      description: "Method untuk membaca atau mengubah data melalui aturan class; setter dapat menolak nilai yang melanggar ketentuan."
    }
  ],
  codeSnippet: {
    language: "java",
    code: "class Akun {\n    private double saldo;\n\n    public double getSaldo() {\n        return saldo;\n    }\n\n    public void setor(double jumlah) {\n        if (jumlah > 0) saldo += jumlah;\n    }\n}",
    explanation: "Atribut saldo tidak dapat diubah langsung dari luar class; method setor menerapkan validasi sebelum mengubahnya."
  }
};
