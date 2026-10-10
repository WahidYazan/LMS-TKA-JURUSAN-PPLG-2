import { HOTSQuestion } from '../../../types';

export const q15: HOTSQuestion = {
  id: 15,
  moduleNum: 2,
  caseText: "Kasus: Studio gim menerapkan aturan backup 3-2-1. Jika mereka memiliki 1 salinan master di PC utama dan 1 salinan di server NAS kantor, maka salinan ketiga harus disimpan di...",
  options: [
    "Harddisk eksternal di meja yang sama",
    "Lokasi terpisah / Off-site Cloud Storage",
    "Flashdisk di saku celana programmer",
    "Dihapus karena sudah ada 2 salinan"
  ],
  correctIndex: 1,
  explanation: "Aturan 3-2-1 mensyaratkan minimal 1 salinan berada di lokasi terpisah (off-site/cloud) agar selamat jika terjadi musibah fisik di kantor."
};
