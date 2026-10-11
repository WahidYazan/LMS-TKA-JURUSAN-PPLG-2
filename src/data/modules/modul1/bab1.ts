import { ModuleSection, ModuleMedia } from '../../../types';

const bab1Media: ModuleMedia[] = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    alt: 'Software engineer working on code',
    caption: 'Gambar 1: Seorang Software Engineer sedang mengembangkan aplikasi web modern',
  },
  {
    type: 'video',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    alt: 'Video pengenalan karier PPLG',
    caption: 'Video 1: Pengenalan prospek karier lulusan PPLG',
  },
];

export const bab1: ModuleSection = {
  id: "bab1",
  numberPrefix: "1.",
  title: "Profil Pekerjaan dan Jabatan Kerja (Job Profile)",
  paragraphs: [
    "Dunia industri saat ini telah memasuki era Revolusi Industri 4.0 dan bersiap menuju Society 5.0, di mana segala aspek kehidupan terkoneksi ke dalam ekosistem digital. Lulusan Pengembangan Perangkat Lunak dan Gim (PPLG) tidak lagi hanya dipandang sebagai \"tukang ketik kode\", melainkan arsitek solusi digital yang sangat dibutuhkan oleh korporasi global, BUMN, hingga instansi pemerintahan.",
    "Berikut adalah klasifikasi jabatan profesional yang dapat ditekuni oleh lulusan PPLG:"
  ],
  bulletPoints: [
    {
      label: "Software Engineer / Fullstack Developer",
      description: "Merancang, membangun, dan memelihara aplikasi web dan sistem enterprise menggunakan bahasa pemrograman modern seperti TypeScript, PHP, Python, atau Java."
    },
    {
      label: "Mobile Application Developer",
      description: "Mengembangkan aplikasi native atau cross-platform (Flutter, React Native) untuk ekosistem Android dan iOS yang dioptimalkan untuk performa gawai seluler."
    },
    {
      label: "Game Developer & Technical Artist",
      description: "Mewujudkan mekanika permainan, sistem kecerdasan buatan (AI) musuh, fisika gerak karakter, dan integrasi aset 2D/3D pada game engine terkemuka (Unity, Unreal Engine, Godot)."
    },
    {
      label: "Quality Assurance (QA) & Automation Tester",
      description: "Menjamin perangkat lunak yang dirilis terbebas dari bug kritis melalui pengujian fungsionalitas, performa, dan keamanan secara otomatis."
    },
    {
      label: "Database Administrator & Data Engineer",
      description: "Merancang arsitektur basis data, memastikan integritas ACID, normalisasi relasional, optimasi kueri berkecepatan tinggi, serta backup disaster recovery."
    }
  ],
  media: bab1Media,
};
