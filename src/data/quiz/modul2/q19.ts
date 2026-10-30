import { HOTSQuestion } from '../../../types';

export const q19: HOTSQuestion = {
  id: 19,
  moduleNum: 2,
  caseText: "Kasus Pengelolaan Server: Seorang pengembang aplikasi web sedang menyiapkan proyek pada server lokal untuk keperluan pengujian. Saat aplikasi diakses melalui browser, muncul pesan kesalahan: 'Permission denied: /var/www/html/index.php'. Agar aplikasi web dapat diakses dengan normal, tindakan yang paling tepat adalah...",
  options: [
    "mengaktifkan layanan web server agar dapat memproses file PHP",
    "mengubah hak akses pada file atau direktori proyek",
    "memasang bahasa pemrograman PHP pada sistem server",
    "mengatur ulang port yang digunakan oleh web server"
  ],
  correctIndex: 1,
  explanation: "Kunci Jawaban: Mengubah hak akses pada file atau direktori proyek. Pesan error 'Permission denied' dari sistem operasi Linux menandakan akun user web server (misal www-data) tidak memiliki izin baca (r) terhadap file target. Solusinya adalah memodifikasi hak akses (chmod 644) atau mengatur kepemilikan (chown www-data:www-data). Layanan web server sendiri sudah aktif terbukti dari adanya respons error, sehingga menyalakan web server atau mengubah port tidak menyelesaikan akar masalah hak izin sistem berkas."
};
