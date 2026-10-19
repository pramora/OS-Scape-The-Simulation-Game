// Menghubungkan tombol "MULAI STAGE 1" dengan stage yang sudah dibuat.
// Stage dianggap siap jika OSScape.stages.stage1.start() tersedia.
addEventListener("osscape:start-stage1", (e) => {
  const s = OSScape.stages.stage1;
  if (s && typeof s.start === "function") { e.preventDefault(); s.start(); }
});
