import { redirect } from 'next/navigation';

// const sections = [
//   {
//     href: '/tka',
//     title: 'Simulasi TKA PPLG',
//     description:
//       'Portal persiapan Tes Kompetensi Akademik Pengembangan Perangkat Lunak dan Gim: 5 modul, rangkuman, dan simulasi soal.',
//     icon: GraduationCap,
//   },
// ];

export default function HomePage() {
  return (
    // <main className="min-h-screen bg-[#f8fafc] text-slate-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
    //   <div className="w-full max-w-2xl">
    //     <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-2">
    //       SMK Telekomunikasi Tunas Harapan
    //     </h1>
    //     <p className="text-sm text-slate-500 leading-relaxed mb-8">
    //       Pilih portal yang ingin dibuka.
    //     </p>

    //     <div className="grid gap-4">
    //       {sections.map(({ href, title, description, icon: Icon }) => (
    //         <Link
    //           key={href}
    //           href={href}
    //           className="group bg-white rounded-3xl p-7 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex items-start gap-5"
    //         >
    //           <span className="h-14 w-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300 shadow-sm">
    //             <Icon className="w-6 h-6" aria-hidden="true" />
    //           </span>
    //           <span className="min-w-0">
    //             <span className="block text-xl font-bold text-slate-800 mb-2">
    //               {title}
    //             </span>
    //             <span className="block text-sm text-slate-500 leading-relaxed">
    //               {description}
    //             </span>
    //             <span className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 mt-2">
    //               <span>Buka</span>
    //               <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
    //             </span>
    //           </span>
    //         </Link>
    //       ))}
    //     </div>
    //   </div>
    // </main>
    redirect('/tka')

  );
}
