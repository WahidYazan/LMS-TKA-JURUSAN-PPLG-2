import { HOTSQuestion } from '../../../types';

export const q30: HOTSQuestion = {
  id: 30,
  moduleNum: 3,
  caseText: "Kasus: Gim multiplayer online membutuhkan komunikasi dua arah secara langsung (real-time streaming) tanpa perlu terus-menerus melakukan HTTP polling. Protokol yang paling tepat adalah...",
  options: [
    "FTP (File Transfer Protocol)",
    "WebSocket Protocol",
    "SMTP Email Protocol",
    "Telnet 23"
  ],
  correctIndex: 1,
  explanation: "WebSocket menyediakan saluran komunikasi persisten dua arah (full-duplex) dengan latensi ultra rendah untuk aplikasi real-time."
};
