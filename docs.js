// wassup guys! i love js so mucj 112347
(function () {

  if (!document.getElementById("docsStyles")) {
    const style = document.createElement("style");
    style.id = "docsStyles";
    style.textContent = `
      .docs-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.75);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity .3s ease;
        z-index: 1000;
      }
      .docs-overlay.show { opacity: 1; }

      .docs-content {
        width: 80%;
        height: 80%;
        background: #111;
        border: 2px solid #fff;
        border-radius: 8px;
        transform: scale(.95);
        opacity: 0;
        transition: all .3s ease;
        display: flex;
        flex-direction: column;
      }
      .docs-content.show {
        transform: scale(1);
        opacity: 1;
      }

      .docs-close {
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        align-self: flex-end;
        padding: 10px;
      }

      iframe { flex: 1; border: none; }
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
