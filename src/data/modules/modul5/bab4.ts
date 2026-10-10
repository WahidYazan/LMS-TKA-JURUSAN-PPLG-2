import { ModuleSection } from '../../../types';

export const bab4: ModuleSection = {
  id: "bab4",
  numberPrefix: "4.",
  title: "Arsitektur Game Loop & Komponen Game Engine",
  paragraphs: [
    "Game engine berjalan di atas Game Loop kontinu (biasanya 60 FPS) dengan tahapan: Input Processing -> Game Logic Update -> Physics Simulation -> Rendering ke Layar. Penggunaan Time.deltaTime mutlak diperlukan agar kecepatan gerak objek independen dari fluktuasi frame rate perangkat keras."
  ]
};
