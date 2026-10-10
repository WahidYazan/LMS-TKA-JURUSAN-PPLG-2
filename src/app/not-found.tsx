import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 font-bold text-2xl">
          404
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Halaman Tidak Ditemukan</h1>
        <p className="text-sm text-slate-500 mb-6">
          Halaman yang Anda tuju tidak tersedia atau telah dipindahkan.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
