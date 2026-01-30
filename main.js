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

(function(){
  const css = `
    .fade{opacity:0;transform:translateY(10px);transition:opacity 1s ease,transform 1s ease}
    .fade.show{opacity:1;transform:translateY(0)}
    #main-content,#sidePanel{display:none}
    #bg-video{opacity:0;transition:opacity 1.2s ease}
    #main-content .center{display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:100vh;gap:1rem;text-align:center}
    #main-content .buttons{display:flex;gap:1rem;margin-top:1rem}
    #main-content .buttons button{padding:0.6rem 1rem;background:#111;color:#fff;border:none;cursor:pointer;font-size:14px;border-radius:4px}
    #main-content .buttons button:hover{background:#222}
    #sidePanel{position:fixed;top:50%;right:20px;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:0.5rem}
    #volumeSlider{writing-mode:bt-lr;height:100px}
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
  main.classList.add("fade");
  sidePanel.classList.add("fade");
})();

(function(){
  const center = main.querySelector(".center");
  if(!center) return;
  if(center.querySelector(".buttons")) return;
  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "buttons fade";
  const docBtn = document.createElement("button");
  docBtn.textContent = "documentation";
  docBtn.onclick = loadDocs;
  const servBtn = document.createElement("button");
  servBtn.textContent = "services";
  servBtn.onclick = loadServices;
  buttonsDiv.appendChild(docBtn);
  buttonsDiv.appendChild(servBtn);
  center.appendChild(buttonsDiv);
})();

let uiReady=false;
function startSequence(){
  const overlay=document.getElementById("overlay");
  video.style.display="block";
  video.currentTime=0;
  audio.currentTime=0;
  audio.volume=lastVolume;
  audio.loop=true;
  video.play().catch(()=>{});
  audio.play().catch(()=>{});
  requestAnimationFrame(()=>video.style.opacity="1");
  overlay.style.opacity="0";
  setTimeout(()=>overlay.remove(),1500);
  setTimeout(()=>{
    main.style.display="block";
    sidePanel.style.display="flex";
    const fadeElements=main.querySelectorAll(".fade");
    fadeElements.forEach(el=>el.classList.add("show"));
    sidePanel.classList.add("show");
  },2000);
  setTimeout(()=>uiReady=true,2000);
}

function loadDocs(){
  if(!uiReady) return;
  if(window.openDocs) return openDocs();
  const s=document.createElement("script");
  s.src="/docs.js";
  s.onload=()=>openDocs();
  document.body.appendChild(s);
}

function loadServices(){
  if(!uiReady) return;
  if(window.openServices) return openServices();
  const s=document.createElement("script");
  s.src="/serv.js";
  s.onload=()=>openServices();
  document.body.appendChild(s);
}
