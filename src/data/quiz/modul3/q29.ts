import { HOTSQuestion } from '../../../types';

export const q29: HOTSQuestion = {
  id: 29,
  moduleNum: 3,
  caseText: "Kasus: Server backend mengalami crash akibat memori RAM habis saat memproses data kueri besar. Klien web akan menerima balasan HTTP status code...",
  options: [
    "500 Internal Server Error",
    "200 OK",
    "404 Not Found",
    "201 Created"
  ],
  correctIndex: 0,
  explanation: "500 Internal Server Error mengabarkan bahwa server mengalami kondisi darurat yang tak terduga dan gagal melayani permintaan."
};
