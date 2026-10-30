export interface PusmendikMuatan {
  id: string;
  nomor: number;
  judul: string;
  singkatan: string;
  deskripsi: string;
  penjelasanLengkap: string;
  subTopik: {
    judul: string;
    keterangan: string;
  }[];
}

export interface PusmendikProsesBerpikir {
  level: string;
  levelEn: string;
  levelBadge: string;
  prosesBerfikir: string;
  deskripsi: string;
  contohPenerapan: string;
}

export type TipeSoalPusmendik = 'PG' | 'PGK_KATEGORI' | 'PGK_MCMA';

export interface ContohSoalPusmendik {
  id: number;
  noSoal: number;
  kompetensi: string;
  subKompetensi: string;
  bentukSoal: string;
  tipeSoal: TipeSoalPusmendik;
  kunci: string;
  stimulus?: {
    tipe: 'text' | 'code' | 'topology';
    content?: string;
    bahasa?: string;
    diagramType?: 'client_server_db';
  };
  pertanyaan: string;
  // Untuk PG biasa
  pilihan?: {
    label: string;
    teks: string;
    isCorrect?: boolean;
  }[];
  // Untuk PGK Kategori (Benar / Salah)
  pernyataanKategori?: {
    label: string;
    teks: string;
    kunciBenar: boolean;
  }[];
  // Untuk PGK MCMA (Checklist majemuk)
  pilihanMcma?: {
    label: string;
    teks: string;
    isCorrect: boolean;
  }[];
  pembahasan: string;
}

export const kerangkaAsesmenPusmendik = {
  meta: {
    instansi: "Pusat Asesmen Pendidikan (Pusmendik)",
    kementerian: "Kementerian Pendidikan Dasar dan Menengah RI",
    jenjang: "SMA/MA/SMK/MAK Sederajat",
    mataPelajaran: "SMK - Pengembangan Perangkat Lunak dan Gim (PPLG)",
    fase: "Fase E & Fase F",
    dasarHukum: "Salinan Keputusan Kepala BSKAP Nomor 046/H/KR/2025",
    sumberResmiUrl:
      "https://pusmendik.kemendikdasmen.go.id/tka/tka/view/mata-pelajaran-pilihan/sma/pengembangan-perangkat-lunak-dan-gim-smk-mak",
  },

  definisi: {
    judul: "Definisi & Tujuan Tes Kemampuan Akademik (TKA) PPLG",
    teksUtama:
      "Tes Kemampuan Akademik (TKA) pada Program Keahlian Pengembangan Perangkat Lunak dan Gim (PPLG) merupakan asesmen standar nasional yang bertujuan mengukur penguasaan konsep, penalaran tingkat tinggi (HOTS), serta kemampuan penerapan pengetahuan dasar kejuruan peserta didik dalam menghadapi tantangan dunia industri perangkat lunak dan gim modern.",
    ruangLingkup:
      "Ruang lingkup asesmen mencakup proses bisnis pengembangan perangkat lunak dan gim, perkembangan teknologi dan dunia kerja, profesi serta kewirausahaan bidang PPLG, K3LH dan budaya kerja industri, penggunaan perangkat dan tools pengembangan, dasar basis data, pengelolaan aset dan antarmuka pengguna, algoritma, pemrograman terstruktur, serta pemrograman berorientasi objek pada konteks proyek perangkat lunak dan gim.",
    penjelasanMendalam:
      "Asesmen ini tidak menitikberatkan pada hafalan sintaks kode secara mekanis, melainkan pada kemampuan memecahkan masalah kontekstual (problem solving), kemampuan membaca dan menelusuri alur algoritma (code tracing), analisis arsitektur jaringan penunjang, penerapan prinsip modularitas, serta pemahaman alur kerja profesional dalam tim pengembang perangkat lunak dan studio gim.",
    karakteristik: [
      {
        poin: "Penalaran Berbasis Studi Kasus Nyata (HOTS)",
        penjelasan:
          "Setiap soal dirancang berangkat dari skenario kasus nyata di lingkungan kerja, seperti penanganan pesan error server, tracing alur fungsi bertingkat, penataan subnetting jaringan database, dan pembagian tugas dalam tim pengembang.",
      },
      {
        poin: "Rujukan Regulasi Resmi BSKAP 2025",
        penjelasan:
          "Materi dan capaian pembelajaran merujuk langsung pada Salinan Keputusan Kepala Badan Standar, Kurikulum, dan Asesmen Pendidikan (BSKAP) Nomor 046/H/KR/2025.",
      },
      {
        poin: "Multi-Format Bentuk Soal Asesmen",
        penjelasan:
          "Mengukur kompetensi secara menyeluruh melalui Pilihan Ganda Tunggal (PG), Pilihan Ganda Kompleks Kategori Benar/Salah (PGK Kategori), dan Checklist Pilihan Majemuk (PGK MCMA).",
      },
      {
        poin: "Penguatan Budaya Industri & Etika Kerja",
        penjelasan:
          "Mengintegrasikan kesadaran keselamatan kerja (K3LH), ergonomi saat bekerja di depan komputer, etika profesionalitas, lisensi perangkat lunak, dan perlindungan Hak Atas Kekayaan Intelektual (HAKI).",
      },
    ],
  },

  muatan: [
    {
      id: "muatan-1",
      nomor: 1,
      judul: "Wawasan dunia kerja bidang pengembangan perangkat lunak dan gim",
      singkatan: "Wawasan Dunia Kerja PPLG",
      deskripsi:
        "Pemahaman terhadap proses bisnis pengembangan perangkat lunak dan gim, perkembangan teknologi, peluang usaha, manajemen proyek, HAKI, serta budaya industri.",
      penjelasanLengkap:
        "Elemen ini membekali peserta didik dengan gambaran utuh tentang ekosistem industri teknologi informasi. Peserta didik mempelajari bagaimana ide produk bertransformasi melalui tahapan Software Development Life Cycle (SDLC) seperti Waterfall dan Agile/Scrum. Selain itu, dipelajari pula pemetaan profesi spesifik (UI/UX Designer, System Analyst, Frontend Developer, Backend Developer, QA Tester, DevOps, Game Programmer), peluang wirausaha digital (technopreneurship), hingga regulasi perlindungan karya cipta kode program melalui HAKI dan lisensi open-source.",
      subTopik: [
        {
          judul: "Profesi & Struktur Tim Pengembang",
          keterangan: "Pembagian peran UI/UX Designer, Developer, QA Tester, Project Manager, dan DevOps beserta batas tanggung jawabnya.",
        },
        {
          judul: "Siklus Hidup Pengembangan Perangkat Lunak (SDLC)",
          keterangan: "Tahapan analisis kebutuhan, perancangan antarmuka & basis data, pengodean, pengujian, rilis, hingga pemeliharaan.",
        },
        {
          judul: "Metodologi Proyek Modern (Agile & Scrum)",
          keterangan: "Penerapan sprint, backlog tugas, stand-up meeting, kolaborasi tim fleksibel, dan adaptasi terhadap perubahan kebutuhan pengguna.",
        },
        {
          judul: "Kewirausahaan Digital & Technopreneurship",
          keterangan: "Peluang model bisnis software-as-a-service (SaaS), monetisasi gim, perancangan proposal produk, dan validasi target pasar.",
        },
        {
          judul: "Hak Kekayaan Intelektual (HAKI) & Lisensi Perangkat Lunak",
          keterangan: "Etika pemanfaatan pustaka kode pihak ketiga, jenis lisensi (MIT, GPL, Apache, Proprietary), serta perlindungan hak cipta.",
        },
        {
          judul: "Budaya Mutu Industri Perangkat Lunak",
          keterangan: "Standar penjaminan kualitas kode (code review), dokumentasi teknis, serta keandalan performa sistem.",
        },
      ],
    },
    {
      id: "muatan-2",
      nomor: 2,
      judul: "Kecakapan kerja dasar (basic job skills), K3, dan budaya kerja",
      singkatan: "Kecakapan Kerja Dasar & K3",
      deskripsi:
        "Penerapan terhadap keselamatan kerja, penggunaan perangkat kerja, pengelolaan aset fisik dan digital, etika kerja, budaya kerja profesional, serta prosedur kerja di lingkungan pengembangan perangkat lunak dan gim.",
      penjelasanLengkap:
        "Elemen ini menekankan pembiasaan standar operasional kerja yang aman dan produktif bagi seorang profesional teknologi. Peserta didik diajarkan menerapkan ergonomi kerja yang benar untuk mencegah penyakit akibat kerja seperti Carpal Tunnel Syndrome (CTS) dan Computer Vision Syndrome (CVS). Selain itu, diajarkan penguasaan perangkat kerja esensial (terminal OS, Git version control, IDE), penerapan budaya industri 5R/5S (Ringkas, Rapi, Resik, Rawat, Rajin), etika kerahasiaan data (NDA), serta strategi pencadangan data terstandar (strategi 3-2-1).",
      subTopik: [
        {
          judul: "K3LH & Ergonomi Lingkungan Kerja Komputer",
          keterangan: "Pengaturan posisi monitor sejajar mata, sudut kursi ergonomis, pencahayaan ruang kerja, dan aturan relaksasi mata 20-20-20.",
        },
        {
          judul: "Penguasaan Perangkat Kerja & Development Tools",
          keterangan: "Pemanfaatan terminal perintah CLI, text editor/IDE modern, package manager, dan version control system (Git/GitHub).",
        },
        {
          judul: "Pengelolaan Aset Fisik & Digital",
          keterangan: "Penataan struktur repositori kode, manajemen hak akses file/direktori sistem, dan implementasi strategi pencadangan 3-2-1.",
        },
        {
          judul: "Budaya Kerja 5R/5S di Lingkungan Perangkat Lunak",
          keterangan: "Pembersihan file sampah (Seiri), penamaan folder terstandar (Seiton), kebersihan perangkat (Seiso), dan kepatuhan SOP (Shitsuke).",
        },
        {
          judul: "Etika Profesional & Kerahasiaan Informasi",
          keterangan: "Perlindungan data sensitif pengguna, kepatuhan non-disclosure agreement (NDA), dan integritas dalam pembuatan kode.",
        },
      ],
    },
    {
      id: "muatan-3",
      nomor: 3,
      judul: "Teknologi Jaringan Komputer",
      singkatan: "Teknologi Jaringan Komputer",
      deskripsi:
        "Pemahaman konsep dasar jaringan komputer dalam konteks pengembangan perangkat lunak dan gim, meliputi konfigurasi dasar lingkungan pengembangan berbasis jaringan, alamat IP dan konektivitas antar perangkat, komunikasi client-server, penggunaan protokol aplikasi seperti HTTP/HTTPS, akses basis data atau layanan API melalui jaringan, serta analisis terhadap kendala koneksi yang mempengaruhi proses pengembangan, pengujian, dan distribusi aplikasi atau gim.",
      penjelasanLengkap:
        "Aplikasi modern tidak pernah berdiri sendiri; mereka saling terhubung melalui jaringan komputer lokal maupun internet. Elemen ini membimbing siswa memahami arsitektur multi-tier di mana aplikasi klien (frontend) berkomunikasi dengan server aplikasi (backend) dan server database. Siswa belajar pengalamatan IPv4, subnetting, model komunikasi TCP/IP, metode HTTP (GET, POST, PUT, DELETE), pemanfaatan REST API berformat JSON, hingga keterampilan melakukan diagnosis dan penyelesaian kendala koneksi (troubleshooting error DNS, port, izin permission, dan aturan CORS).",
      subTopik: [
        {
          judul: "Pengalamatan IPv4, Subnetting, dan Topologi Server",
          keterangan: "Pemahaman pembagian subnet mask /24, alokasi IP host valid, gateway, dan penataan jaringan server aplikasi ke server basis data.",
        },
        {
          judul: "Model Arsitektur Komunikasi Client-Server",
          keterangan: "Interaksi permintaan (request) dan tanggapan (response) antara browser/aplikasi mobile dengan server backend.",
        },
        {
          judul: "Protokol Aplikasi Web (HTTP/HTTPS) & Status Code",
          keterangan: "Penggunaan port 80/443, enkripsi SSL/TLS, serta makna status code 200 (OK), 201 (Created), 401 (Unauthorized), 404 (Not Found), dan 500 (Server Error).",
        },
        {
          judul: "Integrasi REST API dan Format Pertukaran Data JSON",
          keterangan: "Pengiriman data terstruktur melalui format key-value JSON dan metode HTTP standar (GET, POST, PUT, DELETE).",
        },
        {
          judul: "Analisis Kendala Konektivitas & Troubleshooting",
          keterangan: "Diagnosis kendala jaringan menggunakan perintah ping, nslookup, netstat, penanganan hak izin permission denied, dan mekanisme CORS.",
        },
      ],
    },
    {
      id: "muatan-4",
      nomor: 4,
      judul: "Pemrograman Terstruktur",
      singkatan: "Pemrograman Terstruktur",
      deskripsi:
        "Pemahaman dan analisis penggunaan tipe data, struktur data, struktur kontrol percabangan dan perulangan, fungsi, prosedur, serta desain modular program untuk merancang solusi berbasis algoritma pada permasalahan kontekstual dalam pengembangan perangkat lunak atau gim.",
      penjelasanLengkap:
        "Elemen ini adalah fondasi logika komputasional setiap pengembang perangkat lunak. Peserta didik mengasah kemampuan berpikir runut melalui pemodelan flowchart dan pseudocode. Materi mendalam meliputi pemilihan tipe data primitif dan komposit (Array, List, Dictionary), struktur kontrol percabangan (if, else-if, nested condition), struktur perulangan (for, while) beserta pelacakan nilai variabel di setiap iterasi, hingga modularisasi kode program ke dalam fungsi dan prosedur independen yang menerima parameter dan mengembalikan nilai perhitungan.",
      subTopik: [
        {
          judul: "Dekomposisi Masalah & Desain Algoritma",
          keterangan: "Memecah persoalan rumit menjadi sub-masalah sederhana dan memodelkannya ke dalam bagan alur (flowchart) serta pseudocode.",
        },
        {
          judul: "Tipe Data & Struktur Data Koleksi",
          keterangan: "Penggunaan integer, float, string, boolean, serta pengorganisasian elemen data dalam array, list, dan matriks.",
        },
        {
          judul: "Struktur Kontrol Percabangan (Decision Making)",
          keterangan: "Evaluasi kondisi logika boolean menggunakan operator relasional (>, <, >=, <=, ==, !=) dan logika (AND, OR, NOT).",
        },
        {
          judul: "Struktur Kontrol Perulangan & Tracing Variabel",
          keterangan: "Penerapan for dan while loop, pelacakan langkah eksekusi variabel akumulator, counter, dan evaluasi kondisi penghentian loop.",
        },
        {
          judul: "Modularisasi: Pembuatan Fungsi & Prosedur",
          keterangan: "Membagi kode menjadi fungsi modular yang dapat digunakan kembali (reusable), pemetaan parameter, dan pengembalian return value.",
        },
      ],
    },
    {
      id: "muatan-5",
      nomor: 5,
      judul: "Pemrograman Berorientasi Objek",
      singkatan: "Pemrograman Berorientasi Objek (OOP)",
      deskripsi:
        "Pemahaman dan penerapan konsep class dan object, prinsip dasar OOP, access modifier, enkapsulasi, inheritance, dan polymorphism untuk merancang struktur program yang modular, terorganisasi, dan sesuai kebutuhan pada pengembangan perangkat lunak atau gim.",
      penjelasanLengkap:
        "Pemrograman Berorientasi Objek (OOP) adalah paradigma standar industri untuk membangun perangkat lunak berskala besar dan gim interaktif. Siswa mempelajari cara memodelkan entitas dunia nyata ke dalam Class (sebagai cetak biru) dan Object (sebagai instansiasi nyata dengan data dan perilaku unik). Materi mencakup pengamanan data internal melalui Enkapsulasi dan Access Modifier (public, private, protected), pembentukan hierarki class melalui Pewarisan (Inheritance), hingga perilaku fleksibel melalui Polimorfisme dan Method Overriding.",
      subTopik: [
        {
          judul: "Konsep Dasar Class, Object, Atribut, dan Method",
          keterangan: "Mendefinisikan blueprint class, mendeklarasikan atribut/property untuk menyimpan state, dan membuat method untuk perilaku objek.",
        },
        {
          judul: "Konstruktor & Inisialisasi Objek",
          keterangan: "Penggunaan method khusus constructor (__init__ di Python atau constructor di Java/JS) saat penciptaan instance objek baru.",
        },
        {
          judul: "Enkapsulasi & Pengendalian Akses (Access Modifiers)",
          keterangan: "Melindungi integritas data internal objek dari modifikasi langsung di luar class melalui getter, setter, dan modifier private/protected.",
        },
        {
          judul: "Pewarisan Sifat (Inheritance) & Hierarki Superclass-Subclass",
          keterangan: "Menurunkan atribut dan method umum dari superclass ke subclass guna mengurangi duplikasi kode dan memperjelas struktur relasi 'is-a'.",
        },
        {
          judul: "Polimorfisme & Penimpaan Method (Method Overriding)",
          keterangan: "Mendefinisikan ulang method superclass pada subclass sehingga objek yang berbeda dapat merespons pemanggilan method yang sama secara dinamis.",
        },
      ],
    },
  ] as PusmendikMuatan[],

  kompetensi: {
    kemampuanUmum: [
      {
        kategori: "Pemahaman Konseptual",
        deskripsi:
          "Memahami secara utuh konsep dasar proses bisnis pengembangan perangkat lunak dan gim, tata kelola lingkungan kerja PPLG, standar K3LH industri, teknologi penunjang jaringan, struktur kontrol pemrograman, dan paradigma berorientasi objek.",
      },
      {
        kategori: "Penerapan Konsep",
        deskripsi:
          "Menerapkan konsep teoritis dan logika pemrograman untuk menyelesaikan skenario masalah kontekstual yang dihadapi di lingkungan pengembangan perangkat lunak maupun perancangan logika gim.",
      },
      {
        kategori: "Analisis dan Evaluasi",
        deskripsi:
          "Menganalisis efektivitas alur algoritma, struktur data yang dipilih, pembagian fungsi modular, penerapan hierarki OOP, serta konfigurasi jaringan penunjang dalam proses pengembangan, pengujian, dan rilis aplikasi.",
      },
      {
        kategori: "Keterampilan Berpikir Komputasional",
        deskripsi:
          "Menerapkan kemampuan berpikir komputasional tingkat tinggi: melakukan dekomposisi masalah rumit, mengenali pola berulang, menyusun abstraksi model sistem, dan merancang solusi berbasis algoritma terstruktur.",
      },
    ],

    levelKognitif: [
      {
        level: "Pengetahuan dan Pemahaman",
        levelEn: "Knowing and Understanding",
        levelBadge: "Level 1",
        prosesBerfikir: "Mengidentifikasi",
        deskripsi:
          "Mengenali profesi-profesi spesifik dalam bidang PPLG beserta tugas dan wewenangnya, serta mengenali tahapan dasar dalam siklus manajemen proyek perangkat lunak.",
        contohPenerapan:
          "Contoh: Mengidentifikasi bahwa tugas merancang tampilan antarmuka dan alur kenyamanan pengguna adalah tanggung jawab UI/UX Designer.",
      },
      {
        level: "Pengetahuan dan Pemahaman",
        levelEn: "Knowing and Understanding",
        levelBadge: "Level 1",
        prosesBerfikir: "Menjelaskan",
        deskripsi:
          "Menjelaskan konsep dasar kewirausahaan digital, budaya mutu industri, keselamatan kerja K3LH, etika profesional, dan tata kelola perlindungan aset fisik maupun digital di lingkungan kerja PPLG.",
        contohPenerapan:
          "Contoh: Menjelaskan bahwa aturan ergonomis 20-20-20 berfungsi mengistirahatkan otot mata guna mencegah Computer Vision Syndrome.",
      },
      {
        level: "Pengetahuan dan Pemahaman",
        levelEn: "Knowing and Understanding",
        levelBadge: "Level 1",
        prosesBerfikir: "Melaksanakan",
        deskripsi:
          "Melakukan pengelolaan file dan struktur direktori proyek pada sistem operasi sesuai konvensi standar pengembangan perangkat lunak atau gim.",
        contohPenerapan:
          "Contoh: Memilah dan menempatkan file kode sumber, aset gambar, dan file konfigurasi ke dalam struktur direktori proyek yang rapi.",
      },
      {
        level: "Pengetahuan dan Pemahaman",
        levelEn: "Knowing and Understanding",
        levelBadge: "Level 1",
        prosesBerfikir: "Menerapkan",
        deskripsi:
          "Menggunakan konfigurasi dasar lingkungan pengembangan, prosedur pengelolaan aset, konsep class dan object, serta relasi pewarisan antar-class menggunakan mekanisme inheritance dalam perancangan program.",
        contohPenerapan:
          "Contoh: Menggunakan sintaks inheritance untuk menurunkan class Turunan dari class Induk agar dapat memakai method yang sudah ada.",
      },
      {
        level: "Penerapan dan Implementasi",
        levelEn: "Applying and Implementation",
        levelBadge: "Level 2",
        prosesBerfikir: "Mengimplementasikan",
        deskripsi:
          "Menggunakan konfigurasi jaringan dasar, pengalamatan IP, komunikasi data aplikasi, prinsip enkapsulasi OOP, dan polimorfisme untuk mendukung pembuatan, pengujian, atau perancangan program aplikasi/gim.",
        contohPenerapan:
          "Contoh: Menentukan alamat IP yang tepat pada database server agar dapat berkomunikasi langsung dengan server aplikasi pada satu subnet LAN.",
      },
      {
        level: "Penalaran",
        levelEn: "Reasoning",
        levelBadge: "Level 3",
        prosesBerfikir: "Menganalisis",
        deskripsi:
          "Menganalisis kendala konektivitas jaringan, alur logika program bertingkat, penelusuran eksekusi fungsi bersarang, pembagian prosedur modular, dan penentuan tipe atau struktur data dalam pemecahan masalah.",
        contohPenerapan:
          "Contoh: Menelusuri jalannya eksekusi program bertingkat proses(3) dan hitung(3, 4) untuk menemukan nilai akhir yang dihasilkan.",
      },
      {
        level: "Penalaran",
        levelEn: "Reasoning",
        levelBadge: "Level 3",
        prosesBerfikir: "Mengevaluasi",
        deskripsi:
          "Mengevaluasi efektivitas penggunaan struktur kontrol percabangan/perulangan, kebenaran pernyataan logika pada kode program, dan ketepatan desain modular.",
        contohPenerapan:
          "Contoh: Mengevaluasi apakah suatu kondisi if n >= 75 di dalam perulangan menghasilkan hitungan jumlah kelulusan yang benar atau salah.",
      },
      {
        level: "Penalaran",
        levelEn: "Reasoning",
        levelBadge: "Level 3",
        prosesBerfikir: "Mengklasifikasi",
        deskripsi:
          "Menganalisis dan mengklasifikasikan ketepatan penggunaan access modifier, enkapsulasi data, pewarisan sifat, serta perilaku polimorfisme dalam rancangan arsitektur class.",
        contohPenerapan:
          "Contoh: Mengklasifikasikan mana pernyataan yang benar dan salah terkait method overriding dan dynamic binding pada beberapa class turunan.",
      },
    ] as PusmendikProsesBerpikir[],
  },

  matriksAsesmen: [
    {
      elemen: "Wawasan dunia kerja bidang PPLG",
      level: "Knowing and Understanding",
      indikator: "Mengenali tugas spesifik profesi tim pengembangan (UI/UX, Frontend, Backend, QA, DevOps) serta tahapan SDLC dan etika HAKI.",
      bentukSoal: "Pilihan Ganda (PG)",
    },
    {
      elemen: "Kecakapan kerja dasar & K3",
      level: "Knowing & Applying",
      indikator: "Mengelola file sistem operasi, memecahkan error hak akses direktori (chmod/chown), dan menerapkan SOP ergonomi kerja komputer.",
      bentukSoal: "Pilihan Ganda (PG)",
    },
    {
      elemen: "Teknologi Jaringan Komputer",
      level: "Applying and Implementation",
      indikator: "Mengimplementasikan konfigurasi pengalamatan IP subnetting pada topologi arsitektur multi-tier (Server Aplikasi ke Database Server).",
      bentukSoal: "Pilihan Ganda (PG)",
    },
    {
      elemen: "Pemrograman Terstruktur",
      level: "Reasoning & Analyzing",
      indikator: "Menganalisis pembagian fungsi modular bersarang (nested call) serta mengevaluasi kebenaran alur kontrol percabangan dan perulangan.",
      bentukSoal: "Pilihan Ganda (PG) & PGK Kategori (Tabel Benar/Salah)",
    },
    {
      elemen: "Pemrograman Berorientasi Objek (OOP)",
      level: "Reasoning & Classifying",
      indikator: "Mengklasifikasikan konsep inheritance, method overriding, dan dynamic polymorphism melalui evaluasi beberapa objek turunan.",
      bentukSoal: "Pilihan Ganda Kompleks (PGK MCMA - Checklist Majemuk)",
    },
  ],

  contohSoal: [
    {
      id: 1,
      noSoal: 1,
      kompetensi:
        "Mengidentifikasi jenis-jenis profesi dalam bidang PPLG beserta tugas utamanya, serta menjelaskan prinsip dasar kewirausahaan di bidang pengembangan perangkat lunak dan gim.",
      subKompetensi: "Profesi dan Kewirausahaan PPLG",
      bentukSoal: "Pilihan Ganda (PG)",
      tipeSoal: "PG",
      kunci: "B",
      pertanyaan:
        "Dalam sebuah tim pengembangan perangkat lunak terdapat beberapa profesi dengan tugas yang berbeda. Tugas utama dari UI/UX Designer dalam proses pengembangan aplikasi adalah ....",
      pilihan: [
        {
          label: "A",
          teks: "mengelola server agar aplikasi dapat berjalan stabil",
        },
        {
          label: "B",
          teks: "merancang tampilan antarmuka dan pengalaman pengguna aplikasi",
          isCorrect: true,
        },
        {
          label: "C",
          teks: "menulis kode program untuk memproses data pada sisi server",
        },
        {
          label: "D",
          teks: "melakukan pengujian keamanan terhadap sistem aplikasi",
        },
        {
          label: "E",
          teks: "mengatur proses distribusi aplikasi ke pengguna",
        },
      ],
      pembahasan: `📌 KUNCI JAWABAN RESMI: B (merancang tampilan antarmuka dan pengalaman pengguna aplikasi)

🔍 1. Konsep Dasar & Teori Penunjang:
Dalam siklus pengembangan perangkat lunak (SDLC), sebuah produk dibangun oleh tim lintas disiplin ilmu dengan pembagian tugas yang terstandardisasi. UI/UX Designer berfokus pada dua aspek fundamental interaksi manusia dan komputer:
- UI (User Interface / Antarmuka Pengguna): Menyangkut seluruh aspek visual grafis yang dilihat langsung oleh mata pengguna, seperti tata letak (layout), palet warna, tipografi, ikon tombol, formulir input, dan konsistensi estetika aplikasi.
- UX (User Experience / Pengalaman Pengguna): Menyangkut kemudahan, alur logika, dan kenyamanan pengguna saat berinteraksi dengan produk. Tugasnya mencakup riset kebutuhan pengguna (user research), penyusunan alur navigasi (user flow), pembuatan sketsa kasar (wireframing), pembuatan prototipe interaktif, hingga pengujian kemudahan penggunaan (usability testing).

📊 2. Bedah Analisis Setiap Pilihan Jawaban:
• Pilihan A: "mengelola server agar aplikasi dapat berjalan stabil"
  ❌ SALAH. Tugas mengelola infrastruktur server, menjaga uptime, memantau penggunaan resource CPU/RAM, dan konfigurasi server adalah tanggung jawab DevOps Engineer, Cloud Engineer, atau System Administrator.
• Pilihan B: "merancang tampilan antarmuka dan pengalaman pengguna aplikasi"
  ✅ BENAR. Ini adalah deskripsi peran dan tanggung jawab mutlak dari seorang UI/UX Designer dalam tim pengembangan aplikasi.
• Pilihan C: "menulis kode program untuk memproses data pada sisi server"
  ❌ SALAH. Menulis logika bisnis backend, memproses kueri database, membuat endpoint REST API, dan mengelola validasi server adalah tugas utama Backend Developer.
• Pilihan D: "melakukan pengujian keamanan terhadap sistem aplikasi"
  ❌ SALAH. Menguji kerentanan sistem dari serangan peretasan (penetration testing, security audit) adalah tanggung jawab Cybersecurity Specialist atau Security Engineer.
• Pilihan E: "mengatur proses distribusi aplikasi ke pengguna"
  ❌ SALAH. Mengatur pipeline rilis aplikasi, deployment ke server produksi atau Google Play Store / Apple App Store adalah tanggung jawab Release Manager atau tim DevOps.

💡 Tips Ujian:
Kunci menghafal peran profesi PPLG:
- UI/UX Designer: Visual antarmuka, kenyamanan pengguna, wireframe, prototipe.
- Frontend Developer: Menerjemahkan desain UI ke kode web (HTML/CSS/JS/React).
- Backend Developer: Logika server, database, API.
- QA / Tester: Menjalankan skenario uji fungsi, mendeteksi bug.
- DevOps / Sysadmin: Server, cloud, deployment, jaringan server.`,
    },
    {
      id: 2,
      noSoal: 2,
      kompetensi:
        "Menerapkan pengelolaan file dan direktori proyek pada sistem operasi serta menerapkan konfigurasi dasar lingkungan pengembangan berbasis jaringan.",
      subKompetensi:
        "Lingkungan Sistem Operasi untuk Pengembangan Perangkat Lunak dan Gim",
      bentukSoal: "Pilihan Ganda (PG)",
      tipeSoal: "PG",
      kunci: "B",
      stimulus: {
        tipe: "code",
        content: "Permission denied: /var/www/html/index.php",
        bahasa: "bash",
      },
      pertanyaan:
        "Seorang pengembang aplikasi web sedang menyiapkan proyek pada server lokal untuk keperluan pengujian. Saat aplikasi diakses melalui browser, muncul pesan kesalahan: 'Permission denied: /var/www/html/index.php'. Agar aplikasi web dapat diakses dengan normal, tindakan yang paling tepat adalah ....",
      pilihan: [
        {
          label: "A",
          teks: "mengaktifkan layanan web server agar dapat memproses file PHP",
        },
        {
          label: "B",
          teks: "mengubah hak akses pada file atau direktori proyek",
          isCorrect: true,
        },
        {
          label: "C",
          teks: "memasang bahasa pemrograman PHP pada sistem server",
        },
        {
          label: "D",
          teks: "mengatur ulang port yang digunakan oleh web server",
        },
        {
          label: "E",
          teks: "memindahkan file aplikasi ke direktori lain pada sistem",
        },
      ],
      pembahasan: `📌 KUNCI JAWABAN RESMI: B (mengubah hak akses pada file atau direktori proyek)

🔍 1. Konsep Dasar & Teori Penunjang:
Pada sistem operasi berbasis Linux/Unix yang umum digunakan sebagai server web (seperti Ubuntu, Debian, CentOS), setiap file dan direktori memiliki hak akses (permissions) yang diatur secara ketat untuk tiga entitas pengguna:
1. User (pemilik file)
2. Group (grup pemilik file)
3. Others (pengguna lain di luar pemilik dan grup)

Setiap entitas memiliki 3 mode izin: Read (r / baca), Write (w / tulis), dan Execute (x / eksekusi). Layanan web server (seperti Apache HTTPD atau Nginx) di sistem operasi berjalan di bawah akun pengguna sistem khusus yang tidak memiliki hak administrator (biasanya akun user \`www-data\` atau \`nginx\`).

📊 2. Analisis Kasus & Penyebab Pesan Kesalahan:
Pesan: 'Permission denied: /var/www/html/index.php'
Ketika pengguna mengakses web dari browser, server web mencoba membuka dan membaca file \`/var/www/html/index.php\`. Namun, sistem operasi Linux menolak akses tersebut ("Permission denied") karena akun user web server (\`www-data\`) tidak memiliki hak baca (read) terhadap file tersebut atau hak jelajah (execute) pada direktori induknya.

📊 3. Bedah Analisis Setiap Pilihan Jawaban:
• Pilihan A: "mengaktifkan layanan web server agar dapat memproses file PHP"
  ❌ SALAH. Layanan web server faktanya SUDAH AKTIF dan sedang berjalan normal. Buktinya browser menerima balasan pesan error dari web server tersebut. Jika web server belum aktif/mati, pesan yang muncul di browser adalah "Connection Refused" atau "This site can’t be reached".
• Pilihan B: "mengubah hak akses pada file atau direktori proyek"
  ✅ BENAR. Solusi tepat dan tuntas untuk mengatasi "Permission denied" adalah memberikan izin baca/eksekusi kepada web server, misalnya dengan perintah Linux:
  \`sudo chmod 644 /var/www/html/index.php\` (memberikan izin baca untuk others) atau mengubah kepemilikan file ke user web server: \`sudo chown -R www-data:www-data /var/www/html\`.
• Pilihan C: "memasang bahasa pemrograman PHP pada sistem server"
  ❌ SALAH. Jika modul PHP belum terpasang di server, browser biasanya akan mengunduh file index.php sebagai file download biasa atau menampilkan kode mentah PHP sebagai teks polos di halaman, bukan memunculkan error permission denied dari kernel filesystem.
• Pilihan D: "mengatur ulang port yang digunakan oleh web server"
  ❌ SALAH. Port default web (Port 80 untuk HTTP atau 8080) sudah bekerja dengan baik karena koneksi browser sudah berhasil masuk ke server.
• Pilihan E: "memindahkan file aplikasi ke direktori lain pada sistem"
  ❌ SALAH. Direktori \`/var/www/html\` adalah direktori akar standar (DocumentRoot) bagi web server Linux. Memindahkannya ke folder sembarangan justru akan membuat file tidak ditemukan (Error 404 Not Found).

💡 Tips Ujian:
Setiap kali menemukan kata kunci pesan kesalahan "Permission denied" pada sistem operasi server Linux, jawabannya selalu berkaitan dengan hak izin akses file (chmod) atau kepemilikan file (chown).`,
    },
    {
      id: 3,
      noSoal: 3,
      kompetensi:
        "Menganalisis pembagian fungsi atau prosedur dalam program terstruktur serta mengevaluasi efektivitas desain modular dalam penyelesaian masalah pada perangkat lunak atau gim.",
      subKompetensi: "Modularisasi Program",
      bentukSoal: "Pilihan Ganda (PG)",
      tipeSoal: "PG",
      kunci: "A",
      stimulus: {
        tipe: "code",
        content: `def hitung(a, b):
    hasil = a + b
    return hasil * 2

def proses(x):
    return hitung(x, x + 1) - x

nilai = ...
print(nilai)`,
        bahasa: "python",
      },
      pertanyaan:
        "Agar output program menghasilkan angka 11, maka kode yang harus dilengkapi pada baris 8 adalah ....",
      pilihan: [
        {
          label: "A",
          teks: "nilai = proses(3)",
          isCorrect: true,
        },
        {
          label: "B",
          teks: "nilai = hitung(5, 6)",
        },
        {
          label: "C",
          teks: "nilai = proses(11)",
        },
        {
          label: "D",
          teks: "nilai = proses(hitung(3, 0))",
        },
        {
          label: "E",
          teks: "nilai = hitung(11, 0)",
        },
      ],
      pembahasan: `📌 KUNCI JAWABAN RESMI: A (nilai = proses(3))

🔍 1. Konsep Dasar & Teori Penunjang:
Soal ini menguji kemampuan penalaran tingkat tinggi (HOTS) dalam menelusuri alur eksekusi fungsi bersarang (nested function calls / code tracing) pada paradigma pemrograman terstruktur.
Terdapat dua fungsi modular pada kode stimulus:
1. Fungsi \`hitung(a, b)\`:
   - Menerima dua nilai parameter: \`a\` dan \`b\`.
   - Menghitung penjumlahan: \`hasil = a + b\`.
   - Mengembalikan nilai yang dikalikan dua: \`return hasil * 2\` (atau rumusnya: \`(a + b) * 2\`).
2. Fungsi \`proses(x)\`:
   - Menerima satu nilai parameter: \`x\`.
   - Di dalamnya memanggil fungsi \`hitung(x, x + 1)\`, lalu hasilnya dikurangi dengan \`x\`.
   - Rumusnya: \`return hitung(x, x + 1) - x\`.

Target yang harus dicapai: Baris 9 \`print(nilai)\` harus menghasilkan output angka 11.

📊 2. Langkah Analisis Aljabar & Penelusuran (Tracing):
Mari kita sederhanakan fungsi \`proses(x)\` ke dalam bentuk persamaan aljabar:
1. Panggilan \`hitung(x, x + 1)\`:
   - Nilai parameter a = x
   - Nilai parameter b = x + 1
   - hasil = a + b = x + (x + 1) = 2x + 1
   - return hasil * 2 = (2x + 1) * 2 = 4x + 2
2. Masukkan ke rumus fungsi \`proses(x)\`:
   - proses(x) = hitung(x, x + 1) - x
   - proses(x) = (4x + 2) - x
   - proses(x) = 3x + 2
3. Kita ingin hasilnya sama dengan 11:
   - 3x + 2 = 11
   - 3x = 11 - 2
   - 3x = 9
   - x = 9 / 3 = 3
Artinya, fungsi harus dipanggil dengan parameter x = 3, yaitu: \`nilai = proses(3)\`.

📊 3. Uji Coba Manual Seluruh Pilihan Jawaban:
• Pilihan A: \`nilai = proses(3)\`
  ✅ BENAR.
  - Masuk ke \`proses(3)\` -> nilai x = 3.
  - Memanggil \`hitung(3, 3 + 1)\` -> \`hitung(3, 4)\`.
  - Di dalam \`hitung(3, 4)\`: hasil = 3 + 4 = 7. Mengembalikan 7 * 2 = 14.
  - Kembali ke \`proses(3)\`: 14 - x = 14 - 3 = 11.
  - Nilai variabel \`nilai\` adalah 11, tepat sesuai soal.
• Pilihan B: \`nilai = hitung(5, 6)\`
  ❌ SALAH.
  - Masuk ke \`hitung(5, 6)\`: hasil = 5 + 6 = 11. Mengembalikan 11 * 2 = 22. Output adalah 22 (bukan 11).
• Pilihan C: \`nilai = proses(11)\`
  ❌ SALAH.
  - Masuk ke \`proses(11)\`: memanggil \`hitung(11, 12) - 11\` -> \`((11 + 12) * 2) - 11\` = \`(23 * 2) - 11\` = \`46 - 11 = 35\`. Output adalah 35.
• Pilihan D: \`nilai = proses(hitung(3, 0))\`
  ❌ SALAH.
  - Selesaikan bagian dalam terlebih dahulu: \`hitung(3, 0)\` = \`(3 + 0) * 2 = 6\`.
  - Lalu memanggil \`proses(6)\`: \`3(6) + 2 = 18 + 2 = 20\`. Output adalah 20.
• Pilihan E: \`nilai = hitung(11, 0)\`
  ❌ SALAH.
  - \`hitung(11, 0)\` = \`(11 + 0) * 2 = 22\`. Output adalah 22.

💡 Tips Ujian:
Ketika menganalisis fungsi di dalam fungsi (*nested call*), selalu hitung nilai parameter terdalam terlebih dahulu, lalu bawa nilai return tersebut ke fungsi luar.`,
    },
    {
      id: 4,
      noSoal: 4,
      kompetensi:
        "Mengimplementasikan konfigurasi jaringan dasar untuk memastikan konektivitas sistem dalam lingkungan pengembangan.",
      subKompetensi: "Infrastruktur dan Perangkat Jaringan",
      bentukSoal: "Pilihan Ganda (PG)",
      tipeSoal: "PG",
      kunci: "D",
      stimulus: {
        tipe: "topology",
        diagramType: "client_server_db",
      },
      pertanyaan:
        "Topologi tersebut menggambarkan infrastruktur aplikasi web yang terdiri dari server aplikasi, file storage, dan database server. Agar database server dapat berkomunikasi dengan server aplikasi, alamat IP yang paling tepat digunakan pada titik A adalah ....",
      pilihan: [
        {
          label: "A",
          teks: "192.168.10.100/24",
        },
        {
          label: "B",
          teks: "192.168.100.1/24",
        },
        {
          label: "C",
          teks: "192.168.10.20/24",
        },
        {
          label: "D",
          teks: "192.168.100.100/24",
          isCorrect: true,
        },
        {
          label: "E",
          teks: "192.168.100.300/24",
        },
      ],
      pembahasan: `📌 KUNCI JAWABAN RESMI: D (192.168.100.100/24)

🔍 1. Konsep Dasar & Teori Penunjang:
Dalam perancangan infrastruktur jaringan untuk sistem aplikasi terdistribusi:
- Notasi Subnet CIDR /24: Notasi prefix \`/24\` menunjukkan subnet mask adalah \`255.255.255.0\`. Artinya, 24 bit pertama (3 oktet awal) merupakan Network ID (identitas segmen jaringan), sedangkan 8 bit terakhir (oktet ke-4) merupakan Host ID (identitas perangkat komputer).
- Syarat Komunikasi Langsung (Satu Segmen LAN): Dua perangkat dapat saling berkirim paket data secara langsung tanpa bantuan router penerus hanya jika kedua perangkat tersebut memiliki Network ID yang identik.
- Batasan Alamat IPv4: Setiap oktet IPv4 bernilai 8 bit, sehingga hanya dapat diisi angka dari rentang 0 sampai 255 ($2^8 - 1$). Nilai di atas 255 adalah ilegal / tidak valid.
- Alamat Host Valid pada Subnet /24: Dari total 256 alamat (.0 sampai .255), alamat .0 digunakan untuk Network Address dan .255 untuk Broadcast Address. Alamat yang dapat dipasang ke komputer host adalah .1 sampai .254.

📊 2. Analisis Diagram Topologi Jaringan pada Stimulus:
Pada diagram topologi terlihat Server Aplikasi (Server App) memiliki dua kartu antarmuka jaringan (Network Interface Card / NIC):
1. Antarmuka Jaringan 1 (Kiri): Terhubung ke File Storage.
   - IP Server App pada antarmuka ini: \`192.168.10.1/24\`
   - IP File Storage: \`192.168.10.2/24\`
   - Segmen jaringan ini adalah: Network \`192.168.10.0/24\`.
2. Antarmuka Jaringan 2 (Kanan): Terhubung ke Database Server (Titik A).
   - IP Server App pada antarmuka ini: \`192.168.100.1/24\`
   - Segmen jaringan ini adalah: Network \`192.168.100.0/24\`.
   - Database Server (Titik A) terpasang langsung pada kabel antarmuka ini.

Syarat agar Titik A (Database Server) dapat terhubung ke Server App:
1. Harus berada di Network ID yang sama dengan antarmuka 2 Server App, yaitu wajib berawalan: \`192.168.100.x/24\`.
2. Angka host \`x\` tidak boleh sama dengan \`1\` (karena alamat \`192.168.100.1\` sudah dipakai oleh Server App; jika dipasang angka 1 akan terjadi IP Conflict / bentrok IP).
3. Angka host \`x\` harus berada di rentang host valid (2 sampai 254).

📊 3. Bedah Analisis Setiap Pilihan Jawaban:
• Pilihan A: \`192.168.10.100/24\`
  ❌ SALAH. Alamat ini berada pada segmen network \`192.168.10.0/24\` (segmen jaringan File Storage). Jika dipasang di Database Server, ia tidak akan dapat berkomunikasi dengan Server App antarmuka 2 yang berada di segmen \`192.168.100.0/24\`.
• Pilihan B: \`192.168.100.1/24\`
  ❌ SALAH. Network-nya memang benar (\`192.168.100.x\`), namun alamat \`192.168.100.1\` SUDAH DIGUNAKAN oleh antarmuka Server App. Dalam satu jaringan lokal, tidak boleh ada dua perangkat dengan alamat IP yang persis sama karena akan menyebabkan tabrakan koneksi (IP Address Conflict).
• Pilihan C: \`192.168.10.20/24\`
  ❌ SALAH. Berada di segmen jaringan yang salah (segmen storage \`192.168.10.x\`).
• Pilihan D: \`192.168.100.100/24\`
  ✅ BENAR.
  - Berada pada Network ID yang tepat: \`192.168.100.x/24\`.
  - Host ID (.100) unik dan tidak bentrok dengan IP Server App (.1).
  - Berada di rentang host yang valid (1-254). Komunikasi antara Server App dan Database Server dapat berjalan dengan lancar.
• Pilihan E: \`192.168.100.300/24\`
  ❌ SALAH. Angka 300 melebihi batas maksimum 1 oktet IPv4 (maksimal 255). Alamat IP ini tidak valid dan akan ditolak oleh sistem operasi mana pun saat konfigurasi.

💡 Tips Ujian:
Perhatikan garis kabel pada gambar topologi: lihat alamat IP port server yang dituju. Pastikan 3 angka oktet pertama sama persis, angka ke-4 tidak boleh sama (menghindari duplikasi), dan angka tidak boleh melebihi 255.`,
    },
    {
      id: 5,
      noSoal: 5,
      kompetensi:
        "Menganalisis alur logika program yang menggunakan struktur kontrol percabangan atau perulangan serta mengevaluasi efektivitas penggunaannya dalam penyelesaian masalah.",
      subKompetensi: "Struktur Kontrol Program",
      bentukSoal: "PGK Kategori",
      tipeSoal: "PGK_KATEGORI",
      kunci: "Pernyataan A: Benar, Pernyataan B: Benar, Pernyataan C: Salah",
      stimulus: {
        tipe: "code",
        content: `nilai = [70, 85, 60, 90]
jumlah_lulus = 0

for n in nilai:
    if n >= 75:
        jumlah_lulus += 1

print(jumlah_lulus)`,
        bahasa: "python",
      },
      pertanyaan:
        "Tentukan Benar atau Salah setiap pernyataan berikut berdasarkan potongan program di atas:",
      pernyataanKategori: [
        {
          label: "A",
          teks: "Perulangan digunakan untuk memeriksa setiap nilai dalam daftar nilai.",
          kunciBenar: true,
        },
        {
          label: "B",
          teks: "Nilai 75 masuk kategori Lulus.",
          kunciBenar: true,
        },
        {
          label: "C",
          teks: "Pada akhir program, isi variabel jumlah_lulus adalah 3.",
          kunciBenar: false,
        },
      ],
      pembahasan: `📌 KUNCI JAWABAN RESMI:
- Pernyataan A: BENAR
- Pernyataan B: BENAR
- Pernyataan C: SALAH

🔍 1. Konsep Dasar & Teori Penunjang:
Soal ini bertipe Pilihan Ganda Kompleks Kategori (Benar/Salah) yang menguji ketelitian dalam menelusuri (tracing) gabungan struktur perulangan (looping) dan struktur percabangan (conditional branching):
1. Struktur List/Array: \`nilai = [70, 85, 60, 90]\` menyimpan 4 elemen nilai siswa.
2. Variabel Akumulator: \`jumlah_lulus = 0\` disiapkan di awal dengan nilai 0 untuk menghitung frekuensi siswa yang lulus.
3. Perulangan: \`for n in nilai:\` mengiterasi setiap elemen list satu per satu dari indeks pertama hingga terakhir.
4. Percabangan: \`if n >= 75:\` mengevaluasi kondisi apakah nilai \`n\` lebih besar dari atau sama dengan 75.

📊 2. Tabel Pelacakan Eksekusi Lengkap (Execution Tracing):
Mari kita telusuri setiap putaran perulangan secara detail:

| Putaran (Iterasi) | Nilai Variabel \`n\` | Evaluasi Kondisi \`n >= 75\` | Hasil Boolean | Tindakan Program | Nilai Variabel \`jumlah_lulus\` |
| :---: | :---: | :---: | :---: | :---: | :---: |
| Awal | - | - | - | Inisialisasi awal | 0 |
| Iterasi ke-1 | 70 | Apakah 70 >= 75? | **False** (Salah) | Lewati blok if, tidak bertambah | 0 |
| Iterasi ke-2 | 85 | Apakah 85 >= 75? | **True** (Benar) | \`jumlah_lulus += 1\` (0 + 1) | **1** |
| Iterasi ke-3 | 60 | Apakah 60 >= 75? | **False** (Salah) | Lewati blok if, tidak bertambah | 1 |
| Iterasi ke-4 | 90 | Apakah 90 >= 75? | **True** (Benar) | \`jumlah_lulus += 1\` (1 + 1) | **2** |

Setelah loop selesai, baris terakhir mencetak nilai variabel \`jumlah_lulus\` yaitu angka **2**.

📊 3. Pembahasan Mendalam Setiap Butir Pernyataan:
• Pernyataan A: "Perulangan digunakan untuk memeriksa setiap nilai dalam daftar nilai."
  👉 JAWABAN: BENAR.
  Penjelasan: Perintah \`for n in nilai:\` adalah mekanisme perulangan terstruktur (foreach loop) yang secara otomatis menelusuri dan mengambil setiap elemen di dalam list \`nilai\` untuk kemudian dievaluasi oleh blok kondisi \`if\`.
• Pernyataan B: "Nilai 75 masuk kategori Lulus."
  👉 JAWABAN: BENAR.
  Penjelasan: Operator pembanding yang dipakai adalah \`>=\` (lebih besar atau sama dengan). Operator ini menyertakan nilai batas pembandingnya. Jika nilai siswa tepat bernilai 75, maka ekspresi \`75 >= 75\` bernilai True, sehingga nilai 75 diakui masuk kategori lulus. (Akan berbeda jika memakai operator \`>\`, di mana 75 tidak termasuk).
• Pernyataan C: "Pada akhir program, isi variabel jumlah_lulus adalah 3."
  👉 JAWABAN: SALAH.
  Penjelasan: Dari 4 angka yang ada [70, 85, 60, 90], hanya ada **2 angka** yang memenuhi syarat kelulusan ($\ge 75$), yaitu angka **85** dan **90**. Angka 70 dan 60 tidak memenuhi syarat. Dengan demikian, penambahan nilai \`jumlah_lulus += 1\` hanya terjadi sebanyak 2 kali, sehingga nilai akhirnya adalah **2**, bukan 3.`,
    },
    {
      id: 6,
      noSoal: 6,
      kompetensi:
        "Mengimplementasikan mekanisme polymorphism melalui method overriding atau penggunaan referensi superclass terhadap objek subclass.",
      subKompetensi: "Polymorphism",
      bentukSoal: "PGK MCMA",
      tipeSoal: "PGK_MCMA",
      kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 4",
      stimulus: {
        tipe: "code",
        content: `class A:
    def xxx(self):
        return "A"

class B(A):
    def xxx(self):
        return "B"

class C(A):
    def xxx(self):
        return "C"

def proses(obj):
    return obj.xxx()

data = [A(), B(), C()]

for item in data:
    print(proses(item))`,
        bahasa: "python",
      },
      pertanyaan:
        "Tentukan pernyataan yang benar terkait penerapan konsep polymorphism pada program tersebut! (Jawaban benar lebih dari satu)",
      pilihanMcma: [
        {
          label: "1",
          teks: "Method xxx() pada class B dan C merupakan bentuk method overriding dari class A.",
          isCorrect: true,
        },
        {
          label: "2",
          teks: "Fungsi proses() dapat menerima objek dari class yang berbeda selama memiliki method xxx().",
          isCorrect: true,
        },
        {
          label: "3",
          teks: "Output program akan selalu sama untuk setiap objek karena menggunakan fungsi yang sama.",
          isCorrect: false,
        },
        {
          label: "4",
          teks: "Pemanggilan obj.xxx() akan menyesuaikan dengan class dari objek yang diproses.",
          isCorrect: true,
        },
        {
          label: "5",
          teks: "Polymorphism pada program hanya dapat terjadi jika semua objek memiliki nilai atribut yang sama.",
          isCorrect: false,
        },
      ],
      pembahasan: `📌 KUNCI JAWABAN RESMI: Pernyataan 1, Pernyataan 2, dan Pernyataan 4

🔍 1. Konsep Dasar & Teori Penunjang:
Soal ini bertipe Pilihan Ganda Kompleks Checklist (PGK MCMA) yang menguji pemahaman konsep fundamental Pemrograman Berorientasi Objek (OOP):
1. Pewarisan (Inheritance):
   - \`class A\` adalah Superclass (Class Induk).
   - \`class B(A)\` dan \`class C(A)\` adalah Subclass (Class Turunan) yang mewarisi sifat dan struktur dari class A.
2. Penimpaan Method (Method Overriding):
   - Superclass A memiliki method \`xxx(self)\` yang me-return string \`"A"\`.
   - Subclass B dan C mendefinisikan ulang method dengan nama dan parameter yang sama (\`xxx\`), tetapi mengembalikan implementasi yang berbeda: B me-return \`"B"\` dan C me-return \`"C"\`. Praktik menulis ulang implementasi method milik induk pada class turunan disebut *Method Overriding*.
3. Polimorfisme (Polymorphism):
   - Secara harfiah berarti "memiliki banyak bentuk".
   - Fungsi \`proses(obj)\` bertindak sebagai antarmuka pemanggil tunggal yang polimorfik:
     \`\`\`python
     def proses(obj):
         return obj.xxx()
     \`\`\`
   - Fungsi \`proses\` dapat menerima objek instansi apa pun (baik A, B, maupun C). Saat program dieksekusi (*runtime*), Python secara dinamis (*dynamic binding*) mengenali class asal objek tersebut dan mengeksekusi method \`xxx()\` yang bersesuaian.

Daftar objek: \`data = [A(), B(), C()]\`.
Alur eksekusi perulangan:
- Putaran 1: \`item = A()\` -> \`proses(A())\` mengeksekusi \`A().xxx()\` -> mencetak string \`"A"\`.
- Putaran 2: \`item = B()\` -> \`proses(B())\` mengeksekusi \`B().xxx()\` -> mencetak string \`"B"\`.
- Putaran 3: \`item = C()\` -> \`proses(C())\` mengeksekusi \`C().xxx()\` -> mencetak string \`"C"\`.

📊 2. Bedah Analisis Setiap Pernyataan (Checklist):
• Pernyataan 1: "Method xxx() pada class B dan C merupakan bentuk method overriding dari class A."
  ✅ BENAR (CENTANG). Class B dan C mewarisi class A dan menimpa implementasi method \`xxx()\` milik class induk A dengan perilaku spesifik masing-masing. Ini adalah definisi formal dari method overriding.
• Pernyataan 2: "Fungsi proses() dapat menerima objek dari class yang berbeda selama memiliki method xxx()."
  ✅ BENAR (CENTANG). Ini adalah karakteristik utama polimorfisme (dan prinsip duck typing pada Python): pemanggil tidak terikat kaku pada satu tipe class, melainkan pada ketersediaan antarmuka/method yang dipanggil (\`obj.xxx()\`).
• Pernyataan 3: "Output program akan selalu sama untuk setiap objek karena menggunakan fungsi yang sama."
  ❌ SALAH (JANGAN CENTANG). Meskipun fungsi pemanggilnya satu (\`proses\`), output yang dihasilkan BERBEDA ("A", "B", dan "C") karena masing-masing objek memicu implementasi method uniknya sendiri.
• Pernyataan 4: "Pemanggilan obj.xxx() akan menyesuaikan dengan class dari objek yang diproses."
  ✅ BENAR (CENTANG). Mekanisme *dynamic polymorphism* memastikan bahwa pemanggilan method terikat pada class instansi aktual dari objek yang dikirimkan saat runtime.
• Pernyataan 5: "Polymorphism pada program hanya dapat terjadi jika semua objek memiliki nilai atribut yang sama."
  ❌ SALAH (JANGAN CENTANG). Polimorfisme berfokus pada kesamaan panggilan method (perilaku), bukan pada nilai atribut data. Objek-objek turunan justru lumrah memiliki data atribut yang berbeda satu sama lain.`,
    },
  ] as ContohSoalPusmendik[],
};
