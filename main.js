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

  requestAnimationFrame(() => {
    video.style.opacity = "1";
  });

  overlay.style.opacity = "0";

  setTimeout(() => overlay.remove(), 800);
  setTimeout(() => {
    main.style.display = "block";
    sidePanel.style.display = "flex";
  }, 1500);
}

volumeSlider.addEventListener("input", e => {
  const v = e.target.value / 100;
  audio.volume = v;
  lastVolume = v;
  audio.muted = v === 0;
  updateIcon();
});

volumeIcon.addEventListener("click", () => {
  audio.muted = !audio.muted;
  if (!audio.muted) audio.volume = lastVolume || 0.5;
  updateIcon();
});

function updateIcon() {
  volumeIcon.className =
    (audio.muted || audio.volume === 0)
      ? "fa-solid fa-volume-xmark"
      : "fa-solid fa-volume-high";
}

function loadDocs() {
  loadScript("/docs.js");
}

function loadServices() {
  loadScript("/serv.js");
}

function loadScript(src) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.src = src;
  document.body.appendChild(s);
}

function keepVideoPlaying(video) {
  function step() {
    if (!video.paused) {
      video.currentTime += 0.016;
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
