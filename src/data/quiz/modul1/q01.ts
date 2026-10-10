import { HOTSQuestion } from '../../../types';

export const q01: HOTSQuestion = {
  id: 1,
  moduleNum: 1,
  caseText: "Kasus: Sebuah instansi pemerintah ingin memindahkan server data fisik mereka ke sistem awan tanpa harus membeli perangkat keras server baru, namun mereka memerlukan kontrol penuh atas instalasi sistem operasi dan modifikasi kernelnya. Layanan cloud yang paling tepat dipilih adalah...",
  options: [
    "SaaS (Software as a Service)",
    "PaaS (Platform as a Service)",
    "IaaS (Infrastructure as a Service)",
    "BaaS (Backend as a Service)"
  ],
  correctIndex: 2,
  explanation: "IaaS memberikan kebebasan penuh mengonfigurasi perangkat keras tervirtualisasi (vCPU, RAM, Storage) dan hak akses root untuk memilih serta memodifikasi sistem operasi server sendiri."
};
