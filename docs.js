// wassup guys! i love js so mucj 112347
(function () {

  if (!document.getElementById("docsStyles")) {
    const style = document.createElement("style");
    style.id = "docsStyles";
    style.textContent = `
      .docs-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
      }
      .docs-overlay.show {
        opacity: 1;
      }

      .docs-content {
        width: 80%;
        max-width: 1000px;
        height: 80%;
        background: #1e1e1e;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.5);
        transform: scale(0.95);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;
      }
      .docs-content.show {
        transform: scale(1);
        opacity: 1;
      }

      .docs-close {
        position: absolute;
        top: 12px;
        right: 16px;
        font-size: 28px;
        color: #fff;
        cursor: pointer;
        transition: color 0.2s ease;
        z-index: 1;
      }
      .docs-close:hover {
        color: #ff5f5f;
      }

      .docs-content iframe {
        flex: 1;
        border: none;
        border-radius: 0 0 12px 12px;
      }
    `;
    document.head.appendChild(style);
  }

  window.openDocs = function () {
    const overlay = document.createElement("div");
    overlay.className = "docs-overlay";

    const content = document.createElement("div");
    content.className = "docs-content";

    const close = document.createElement("div");
    close.className = "docs-close";
    close.innerHTML = "&times;";

    const iframe = document.createElement("iframe");
    iframe.src = "/docs.html";

    content.append(close, iframe);
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.classList.add("show");
      content.classList.add("show");
    });

    function closePopup() {
      overlay.classList.remove("show");
      content.classList.remove("show");
      setTimeout(() => overlay.remove(), 300);
    }

    close.onclick = closePopup;
    overlay.onclick = e => e.target === overlay && closePopup();
  };

})();
