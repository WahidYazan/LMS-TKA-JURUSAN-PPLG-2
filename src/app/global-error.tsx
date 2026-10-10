'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            ⚠️
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Terjadi Kesalahan Sistem</h2>
          <p className="text-xs text-slate-500 mb-6">
            Aplikasi mengalami kendala saat memuat halaman. Silakan muat ulang halaman atau coba lagi.
          </p>
          <button
            onClick={() => reset()}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer"
          >
            Muat Ulang
          </button>
        </div>
      </body>
    </html>
  );
}
