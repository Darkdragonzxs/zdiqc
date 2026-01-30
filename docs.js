// WHY THE FUCK DO I HAVE TO DO SO MUCH JAVASCRIPT WHAT THE FUCKK
(function () {
  if (document.getElementById("popupOverlay")) return;

  const style = document.createElement("style");
  style.textContent = `
    #popupOverlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.75);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    #popupOverlay.show {
      opacity: 1;
    }

    #popupContent {
      position: relative;
      width: 80%;
      max-width: 900px;
      height: 80%;
      background: #111;
      border: 2px solid #fff;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: scale(0.95);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    #popupContent.show {
      opacity: 1;
      transform: scale(1);
    }

    #popupClose {
      position: absolute;
      top: 10px;
      right: 14px;
      font-size: 24px;
      color: #fff;
      cursor: pointer;
      z-index: 1001;
    }

    #popupFrame {
      width: 100%;
      height: 100%;
      border: none;
      flex: 1;
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.id = "popupOverlay";

  const content = document.createElement("div");
  content.id = "popupContent";

  const closeBtn = document.createElement("span");
  closeBtn.id = "popupClose";
  closeBtn.innerHTML = "&times;";

  const iframe = document.createElement("iframe");
  iframe.id = "popupFrame";
  iframe.src = "/docs.html";
  content.appendChild(closeBtn);
  content.appendChild(iframe);
  overlay.appendChild(content);
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.add("show");
    content.classList.add("show");
  });

  function closePopup() {
    overlay.classList.remove("show");
    content.classList.remove("show");

    setTimeout(() => {
      overlay.remove();
    }, 300);
  }

  closeBtn.addEventListener("click", closePopup);

  overlay.addEventListener("click", e => {
    if (e.target === overlay) closePopup();
  });

})();
