// ???? what
const video = document.getElementById("bg-video");
const audio = document.getElementById("bg-music");
const volumeSlider = document.getElementById("volumeSlider");
const volumeIcon = document.getElementById("volumeIcon");
const sidePanel = document.getElementById("sidePanel");
const main = document.getElementById("main-content");

let lastVolume = 0.5;
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

(function injectDynamicCSS() {
  const css = `
    .fade { opacity:0; transform: translateY(10px); transition: opacity 1s ease, transform 1s ease; }
    .fade.show { opacity:1; transform: translateY(0); }
    #main-content, #sidePanel { display:none; }
    #bg-video { opacity:0; transition: opacity 1.2s ease; }
    #sidePanel { position: fixed; top: 50%; right: 20px; transform: translateY(-50%); display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
    #volumeSlider { writing-mode: bt-lr; height: 100px; }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  main.classList.add("fade");
  sidePanel.classList.add("fade");
})();

(function createButtons() {
  const c = main.querySelector(".center");
  if (!c) return;
  if (c.querySelector(".buttons")) return;
  const b = document.createElement("div");
  b.className = "buttons fade";
  const d = document.createElement("button");
  d.textContent = "documentation";
  d.onclick = loadDocs;
  const s = document.createElement("button");
  s.textContent = "services";
  s.onclick = loadServices;
  b.appendChild(d);
  b.appendChild(s);
  c.appendChild(b);
})();

let uiReady = false;
function startSequence() {
  const overlay = document.getElementById("overlay");

  video.style.display = "block";
  video.currentTime = 0;
  audio.currentTime = 0;
  audio.volume = lastVolume;
  audio.loop = true;
  video.play().catch(()=>{});
  audio.play().catch(()=>{});

  requestAnimationFrame(() => video.style.opacity = "1");

  overlay.style.opacity = "0";
  setTimeout(() => overlay.remove(), 1500);

  setTimeout(() => {
    main.style.display = "block";
    sidePanel.style.display = "flex";
    requestAnimationFrame(() => {
      main.classList.add("show");
      sidePanel.classList.add("show");
      const f = main.querySelectorAll(".fade");
      f.forEach(el => el.classList.add("show"));
    });
  }, 2000);

  setTimeout(() => uiReady = true, 2000);
}

function loadDocs() {
  if (!uiReady) return;
  if (window.openDocs) return openDocs();
  const s = document.createElement("script");
  s.src = "/docs.js";
  s.onload = () => openDocs();
  document.body.appendChild(s);
}

function loadServices() {
  if (!uiReady) return;
  if (window.openServices) return openServices();
  const s = document.createElement("script");
  s.src = "/serv.js";
  s.onload = () => openServices();
  document.body.appendChild(s);
}
