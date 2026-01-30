const video = document.getElementById("bg-video");
const audio = document.getElementById("bg-music");
const volumeSlider = document.getElementById("volumeSlider");
const volumeIcon = document.getElementById("volumeIcon");
const sidePanel = document.getElementById("sidePanel");

let lastVolume = 0.5;
function startSequence() {
  const overlay = document.getElementById("overlay");
  const main = document.getElementById("main-content");

  video.style.display = "block";
  video.currentTime = 0;
  audio.currentTime = 0;

  audio.volume = lastVolume;
  audio.loop = true;

  video.play().catch(()=>{});
  audio.play().catch(()=>{});

  requestAnimationFrame(() => video.style.opacity = "1");

  overlay.style.opacity = "0";
  setTimeout(() => overlay.remove(), 800);

  setTimeout(() => {
    main.style.display = "block";
    sidePanel.style.display = "flex";
  }, 1200);
}
volumeSlider.oninput = e => {
  lastVolume = e.target.value / 100;
  audio.volume = lastVolume;
  audio.muted = lastVolume === 0;
  updateIcon();
};
volumeIcon.onclick = () => {
  audio.muted = !audio.muted;
  audio.volume = audio.muted ? 0 : lastVolume || 0.5;
  updateIcon();
};

function updateIcon() {
  volumeIcon.className =
    (audio.muted || audio.volume === 0)
      ? "fa-solid fa-volume-xmark"
      : "fa-solid fa-volume-high";
}
function loadDocs() {
  if (window.openDocs) return openDocs();

  const s = document.createElement("script");
  s.src = "/docs.js";
  s.onload = () => openDocs();
  document.body.appendChild(s);
}

function loadServices() {
  if (window.openServices) return openServices();

  const s = document.createElement("script");
  s.src = "/serv.js";
  s.onload = () => openServices();
  document.body.appendChild(s);
}
