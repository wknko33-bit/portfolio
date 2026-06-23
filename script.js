// 💡 全体を DOMContentLoaded イベントで包みます
document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. 必要な要素をすべて取得
  // ==========================================
  const sizeSlider = document.getElementById("size-slider");
  const galleryItems = document.querySelectorAll(".gallery-section .work-item");

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".modal .close-btn");
  const prevBtn = document.querySelector(".modal .prev-btn");
  const nextBtn = document.querySelector(".modal .next-btn");

  let currentIndex = 0;

  // ==========================================
  // 2. ZOOMスライダーの機能
  // ==========================================
  if (sizeSlider) {
    sizeSlider.addEventListener("input", (e) => {
      const zoomValue = e.target.value;
      galleryItems.forEach((item) => {
        item.style.width = zoomValue + "px";
      });
    });
  }

  // ==========================================
  // 3. モーダル（拡大画面）の制御機能
  // ==========================================
  function updateModal(index) {
    currentIndex = index;
    const targetImg = galleryItems[currentIndex].querySelector("img");
    modalImg.src = targetImg.src;
    modalImg.alt = targetImg.alt;
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
      updateModal(index);
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      let nextIndex = currentIndex + 1;
      if (nextIndex >= galleryItems.length) nextIndex = 0;
      updateModal(nextIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) prevIndex = galleryItems.length - 1;
      updateModal(prevIndex);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
}); // 💡 最後の閉じココを忘れずに！
