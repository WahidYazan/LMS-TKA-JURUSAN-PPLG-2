import Image from "next/image";

export default function AdminLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#f8fafc]">
      <Image
        src="/images/brands/TTH-nobg.webp"
        alt="Memuat"
        width={72}
        height={72}
        priority
        className="animate-pulse"
      />
      <p className="text-sm font-medium text-slate-500">Memuat...</p>
    </div>
  );
}
