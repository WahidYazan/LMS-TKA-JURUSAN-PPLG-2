import { ModuleSection } from '../../../types';

export const bab2: ModuleSection = {
  id: "bab2",
  numberPrefix: "2.",
  title: "HTTP Methods & Status Code Standar RFC",
  paragraphs: [
    "RESTful API menggunakan HTTP Methods semantik: GET (membaca data), POST (membuat entitas data baru), PUT/PATCH (memperbarui data), dan DELETE (menghapus data).",
    "Server mengembalikan kode status numerik untuk memberitahukan status eksekusi:"
  ],
  bulletPoints: [
    {
      label: "200 OK",
      description: "Permintaan sukses diproses dan payload data dikembalikan."
    },
    {
      label: "201 Created",
      description: "Entitas sumber daya baru berhasil dibuat di database server."
    },
    {
      label: "400 Bad Request",
      description: "Klien mengirim format data yang keliru atau kolom validasi yang kosong."
    },
    {
      label: "401 Unauthorized",
      description: "Klien belum login atau token autentikasi JWT tidak disertakan."
    },
    {
      label: "403 Forbidden",
      description: "Klien sudah login namun tidak memiliki hak akses/otorisasi role."
    },
    {
      label: "404 Not Found",
      description: "Endpoint rute atau data yang dicari tidak ditemukan di server."
    },
    {
      label: "500 Internal Server Error",
      description: "Terjadi kegagalan bug unhandled exception pada kode server backend."
    }
  ]
};
