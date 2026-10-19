/* ---------- Starfield ---------- */
const cv = document.getElementById("stars"), ctx = cv.getContext("2d");
let stars = [];
function resize() {
  cv.width = innerWidth; cv.height = innerHeight;
  stars = Array.from({ length: Math.round(innerWidth * innerHeight / 5000) }, () => ({
    x: Math.random() * cv.width, y: Math.random() * cv.height,
    r: Math.random() * 1.4 + .3, p: Math.random() * Math.PI * 2, s: Math.random() * .03 + .01
  }));
}
function draw() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  for (const t of stars) {
    t.p += t.s;
    ctx.globalAlpha = .35 + .65 * Math.abs(Math.sin(t.p));
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(t.x, t.y, t.r, 0, 6.2832); ctx.fill();
  }
  requestAnimationFrame(draw);
}
addEventListener("resize", resize); resize(); draw();

/* ---------- Flow: title -> abduction -> story ---------- */
const $ = id => document.getElementById(id);
const title = $("title"), story = $("story"), flash = $("flash");
const lines = [
  "Kamu melayang sendirian di luar angkasa. Tanpa tahu bagaimana bisa sampai di sini.",
  "Cahaya biru dari kapal raksasa menarikmu masuk. Kapal alien <em>ZYREX-9</em>, dikendalikan satu komputer pusat bernama <em>OMNI</em>.",
  "Kamu terbangun di sel logam yang dingin. Di sudut ruangan, satu terminal tua masih menyala:<br>“Akses darurat terdeteksi. Mode: <em>CoreManager</em>.”",
  "OMNI kewalahan. Antrean perintah menumpuk, memorinya berantakan, dan sistemnya rawan macet. Atur dengan benar, dan kamu bisa mengambil alih kapal.",
  "Ada lima lapis sistem sebelum pod penyelamat terbuka. Strategi yang salah memicu alarm, dan para alien akan menemukanmu."
];
let i = 0;

$("start").addEventListener("click", () => {
  title.classList.add("abducting");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  setTimeout(() => flash.classList.add("on"), reduce ? 0 : 2000);
  setTimeout(() => {
    title.classList.remove("active"); story.classList.add("active");
    showLine(); flash.classList.remove("on");
  }, reduce ? 100 : 2600);
});

function showLine() {
  const el = $("line");
  el.style.animation = "none"; void el.offsetWidth; el.style.animation = "";
  el.innerHTML = lines[i];
  $("hint").textContent = "";
  $("next").textContent = i === lines.length - 1 ? "MULAI STAGE 1" : "LANJUT";
  $("skip").style.visibility = i === lines.length - 1 ? "hidden" : "visible";
}
function goStage1() {
  // Titik sambung untuk anggota yang mengerjakan Stage 1.
  const handled = !dispatchEvent(new CustomEvent("osscape:start-stage1", { cancelable: true }));
  if (!handled) $("hint").textContent = "Stage 1 belum dibuat. Pasang di src/stages/.";
}
$("next").addEventListener("click", () => { i < lines.length - 1 ? (i++, showLine()) : goStage1(); });
$("skip").addEventListener("click", () => { i = lines.length - 1; showLine(); });
