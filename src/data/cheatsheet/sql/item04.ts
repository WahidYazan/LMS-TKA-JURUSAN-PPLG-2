export const item04 = {
  commandOrConcept: "CASCADE ON DELETE",
  description: "Menghapus otomatis seluruh relasi anak ketika entitas induk dihapus.",
  example: "FOREIGN KEY (siswa_id) REFERENCES siswa(id) ON DELETE CASCADE"
};
