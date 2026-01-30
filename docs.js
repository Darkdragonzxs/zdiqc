// WHY THE FUCK DO I HAVE TO DO SO MUCH JAVASCRIPT WHAT THE FUCKK
(function () {

  if (!document.getElementById("docsPopupStyles")) {
    const style = document.createElement("style");
    style.id = "docsPopupStyles";
    style.textContent = `
      .docs-overlay {
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

      .docs-overlay.show {
        opacity: 1;
      }

      .docs-content {
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

      .docs-content.show {
        opacity: 1;
        transform: scale(1);
      }

      .docs-close {
        position: absolute;
        top: 10px;
        right: 14px;
        font-size: 24px;
        color: #fff;
        cursor: pointer;
        z-index: 1001;
      }

      .docs-frame {
        width: 100%;
        height: 100%;
        border: none;
        flex: 1;
      }
    `;
    document.head.appendChild(style);
  }
  window.openDocs = function () {

    const overlay = document.createElement("div");
    overlay.className = "docs-overlay";

    const content = document.createElement("div");
    content.className = "docs-content";

    const closeBtn = document.createElement("span");
    closeBtn.className = "docs-close";
    closeBtn.innerHTML = "&times;";

    const iframe = document.createElement("iframe");
    iframe.className = "docs-frame";
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
      setTimeout(() => overlay.remove(), 300);
    }

    closeBtn.onclick = closePopup;

    overlay.onclick = e => {
      if (e.target === overlay) closePopup();
    };
  };

})();
