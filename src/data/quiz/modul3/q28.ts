import { HOTSQuestion } from '../../../types';

export const q28: HOTSQuestion = {
  id: 28,
  moduleNum: 3,
  caseText: "Kasus Topologi Jaringan: Sebuah arsitektur aplikasi web terdiri dari Server Aplikasi, File Storage (192.168.10.2/24), dan Database Server (Titik A). Server aplikasi memiliki dua interface, yaitu terhubung ke File Storage pada IP 192.168.10.1/24 dan terhubung ke Database Server pada IP 192.168.100.1/24. Agar Database Server dapat berkomunikasi dengan Server Aplikasi, alamat IP yang paling tepat digunakan pada Titik A adalah...",
  options: [
    "192.168.10.100/24",
    "192.168.100.1/24",
    "192.168.10.20/24",
    "192.168.100.100/24"
  ],
  correctIndex: 3,
  explanation: "Interface Server Aplikasi yang menuju ke Database Server berada di segmen jaringan 192.168.100.0/24 (IP 192.168.100.1). Database Server harus berada pada subnet yang sama (192.168.100.x/24) tanpa terjadi IP conflict dengan .1. Maka IP 192.168.100.100/24 adalah alamat yang valid dan tepat."
};
