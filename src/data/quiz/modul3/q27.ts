import { HOTSQuestion } from '../../../types';

export const q27: HOTSQuestion = {
  id: 27,
  moduleNum: 3,
  caseText: "Kasus: Endpoint REST API dirancang untuk memperbarui seluruh data profil pengguna. HTTP Method standar yang paling tepat digunakan adalah...",
  options: [
    "GET",
    "PUT atau PATCH",
    "DELETE",
    "HEAD"
  ],
  correctIndex: 1,
  explanation: "Method PUT (mengganti keseluruhan entitas) atau PATCH (mengubah sebagian atribut) adalah konvensi resmi untuk update."
};
