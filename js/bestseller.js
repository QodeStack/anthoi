/* =========================================================
   ĂN THÔI - BESTSELLER PANORAMIC SHOWCASE
   - Bố cục chuẩn theo hình mẫu: Dial + Ruler + 3 Cards
   - Tỉ lệ ảnh 4:5 trọn vẹn 100% không bị cắt xén (lấy được nhiều hơn)
   - Kích thước nhỏ gọn, vừa vặn màn hình (Compact size)
   - Thẻ chính giữa bự hơn 1 tí (scale 1.0)
   - Hai thẻ bên thu nhỏ (scale 0.82), có khoảng cách rõ ràng
   - Không hiển thị nội dung bên dưới thẻ; khi nhấn vào ảnh sẽ mở cửa sổ popup chi tiết
   ========================================================= */

(() => {
  const initBestsellerShowcase = () => {
    const showcase = document.getElementById("bestsellerShowcase");
    if (!showcase) return;

    const cards = Array.from(showcase.querySelectorAll(".bestseller-card"));
    const dialItems = Array.from(showcase.querySelectorAll(".bestseller-dial-item"));
    const prevBtn = document.getElementById("bestsellerPrevBtn");
    const nextBtn = document.getElementById("bestsellerNextBtn");
    const rulerTrack = document.getElementById("bestsellerRulerTrack");
    const dotsContainer = document.getElementById("bestsellerDots");
    const counterCurrent = showcase.querySelector(".bestseller-counter__current");
    const counterTotal = showcase.querySelector(".bestseller-counter__total");

    // Modal elements
    const modal = document.getElementById("bestsellerModal");
    const modalBackdrop = document.getElementById("bestsellerModalBackdrop");
    const modalClose = document.getElementById("bestsellerModalClose");
    const modalImg = document.getElementById("bestsellerModalImg");
    const modalBadge = document.getElementById("bestsellerModalBadge");
    const modalTag = document.getElementById("bestsellerModalTag");
    const modalTitle = document.getElementById("bestsellerModalTitle");
    const modalDesc = document.getElementById("bestsellerModalDesc");

    const total = cards.length;
    if (total === 0) return;

    let currentIndex = 0;
    let isAnimating = false;

    
    // =========================================================
    // HỆ THỐNG NỀN NÂNG CẤP (BESTSELLER BACKGROUND CONTROLLER)
    // =========================================================
    const dishes = [
      { name: "BÁNH XÈO",              glow: "#e8c547", tint: "#222a14" },
      { name: "NEM LỤI",               glow: "#e58338", tint: "#281a10" },
      { name: "PHỞ BÒ",                glow: "#d4593b", tint: "#281512" },
      { name: "SÒ ĐIỆP NƯỚNG MỠ HÀNH", glow: "#52b788", tint: "#0f261f" },
      { name: "CƠM CHIÊN TRÁI THƠM",   glow: "#f3b738", tint: "#262210" },
      { name: "HÀU NƯỚNG PHÔ MAI",     glow: "#f5b921", tint: "#2a220e" },
      { name: "PHỞ LÒNG",              glow: "#ff5722", tint: "#2a130c" }
    ];

    const bestsellerSec = document.getElementById("bestseller");
    const watermark = document.getElementById("bestsellerWatermark");
    const embersContainer = document.getElementById("bestsellerEmbers");
    const modalEmbers = document.getElementById("bestsellerModalEmbers");
    const needlePip = document.querySelector(".bestseller-ruler__needle-pip");

    // Hàm cập nhật màu sắc nền, glow và âm hưởng theo món active
    const updateBackground = (index) => {
      if (!dishes || dishes.length === 0) return;
      const safeIndex = ((index % dishes.length) + dishes.length) % dishes.length;
      const dish = dishes[safeIndex];
      if (!dish) return;

      document.documentElement.style.setProperty("--glow-color", dish.glow);
      document.documentElement.style.setProperty("--dish-tint", dish.tint);

      if (needlePip) {
        needlePip.style.backgroundColor = dish.glow;
        needlePip.style.boxShadow = `0 0 10px ${dish.glow}`;
      }
    };
    window.updateBackground = updateBackground;

    // Khởi tạo các hạt đốm sáng bay bổng (Embers / Bokeh)
    const initEmbers = () => {
      if (!embersContainer) return;
      embersContainer.innerHTML = "";
      const isMobile = window.innerWidth <= 768;
      const emberCount = isMobile ? 12 : 28;
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < emberCount; i++) {
        const ember = document.createElement("span");
        ember.className = "bestseller-ember";

        const size = (Math.random() * 4 + 2).toFixed(1); // 2px - 6px
        const left = (Math.random() * 94 + 3).toFixed(1); // 3% - 97%
        const duration = (Math.random() * 6 + 7).toFixed(1); // 7s - 13s
        const delay = (Math.random() * 7).toFixed(1); // 0s - 7s
        const opacity = (Math.random() * 0.35 + 0.6).toFixed(2); // 0.6 - 0.95
        const sway1 = (Math.random() * 50 - 25).toFixed(0);
        const sway2 = (Math.random() * 50 - 25).toFixed(0);
        const sway3 = (Math.random() * 40 - 20).toFixed(0);

        ember.style.width = `${size}px`;
        ember.style.height = `${size}px`;
        ember.style.left = `${left}%`;
        ember.style.setProperty("--ember-dur", `${duration}s`);
        ember.style.setProperty("--ember-delay", `${delay}s`);
        ember.style.setProperty("--ember-op", opacity);
        ember.style.setProperty("--ember-sway1", `${sway1}px`);
        ember.style.setProperty("--ember-sway2", `${sway2}px`);
        ember.style.setProperty("--ember-sway3", `${sway3}px`);

        fragment.appendChild(ember);
      }
      embersContainer.appendChild(fragment);
    };

    // Khởi tạo hạt sáng nhỏ bên trong Modal
    const initModalEmbers = () => {
      if (!modalEmbers) return;
      modalEmbers.innerHTML = "";
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < 7; i++) {
        const mEmber = document.createElement("span");
        mEmber.className = "bestseller-modal-ember";
        const size = (Math.random() * 3 + 2).toFixed(1);
        const left = (Math.random() * 80 + 10).toFixed(1);
        const duration = (Math.random() * 3 + 4.5).toFixed(1);
        const delay = (Math.random() * 3).toFixed(1);
        const sway1 = (Math.random() * 30 - 15).toFixed(0);
        const sway2 = (Math.random() * 30 - 15).toFixed(0);

        mEmber.style.width = `${size}px`;
        mEmber.style.height = `${size}px`;
        mEmber.style.left = `${left}%`;
        mEmber.style.setProperty("--mdur", `${duration}s`);
        mEmber.style.setProperty("--mdel", `${delay}s`);
        mEmber.style.setProperty("--msway", `${sway1}px`);
        mEmber.style.setProperty("--msway2", `${sway2}px`);
        fragment.appendChild(mEmber);
      }
      modalEmbers.appendChild(fragment);
    };

    // Hiệu ứng Parallax chuột nhẹ cho chữ chìm ĂN THÔI
    if (bestsellerSec && watermark && window.innerWidth > 768) {
      bestsellerSec.addEventListener("mousemove", (e) => {
        const rect = bestsellerSec.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        watermark.style.setProperty("--mouse-x", x.toFixed(3));
        watermark.style.setProperty("--mouse-y", y.toFixed(3));
      }, { passive: true });
    }

    // Tạm dừng hạt sáng khi tab bị ẩn
    document.addEventListener("visibilitychange", () => {
      if (embersContainer) {
        embersContainer.classList.toggle("is-paused", document.hidden);
      }
    });

    initEmbers();

    // Khởi tạo các chi tiết minh họa bổ trợ (tay cầm đũa, muỗng sứ, các đám mây)
    const initDishProps = () => {
      const propsTemplate = `
        <div class="bs-dish-props" aria-hidden="true">
          <div class="bs-prop-slot bs-prop-slot--cloud-1">
            <div class="bs-prop-sway bs-prop-sway--cloud-1">
              <img src="image/bg_phu/bestseller/may_1.png" class="bs-prop-img bs-prop-img--sketch" alt="" loading="lazy">
            </div>
          </div>
          <div class="bs-prop-slot bs-prop-slot--cloud-2">
            <div class="bs-prop-sway bs-prop-sway--cloud-2">
              <img src="image/bg_phu/bestseller/may_2.png" class="bs-prop-img bs-prop-img--sketch" alt="" loading="lazy">
            </div>
          </div>
          <div class="bs-prop-slot bs-prop-slot--cloud-3">
            <div class="bs-prop-sway bs-prop-sway--cloud-3">
              <img src="image/bg_phu/bestseller/may_3.avif" class="bs-prop-img bs-prop-img--sketch" alt="" loading="lazy">
            </div>
          </div>
          <div class="bs-prop-slot bs-prop-slot--muong">
            <div class="bs-prop-sway bs-prop-sway--muong">
              <img src="image/bg_phu/bestseller/muong.png" class="bs-prop-img bs-prop-img--muong" alt="" loading="lazy">
            </div>
          </div>
          <div class="bs-prop-slot bs-prop-slot--dua">
            <div class="bs-prop-sway bs-prop-sway--dua">
              <img src="image/bg_phu/bestseller/dua.avif" class="bs-prop-img bs-prop-img--sketch" alt="" loading="lazy">
            </div>
          </div>
        </div>
      `;

      cards.forEach((card) => {
        const photoBox = card.querySelector(".bestseller-card__photo-box");
        if (photoBox && !photoBox.querySelector(".bs-dish-props")) {
          const temp = document.createElement("div");
          temp.innerHTML = propsTemplate.trim();
          const propsEl = temp.firstElementChild;
          const dishImg = photoBox.querySelector("img");
          if (dishImg) {
            photoBox.insertBefore(propsEl, dishImg);
          } else {
            photoBox.appendChild(propsEl);
          }
        }
      });
    };
    initDishProps();

    // 1. Tạo vạch thước đo (Ruler Ticks)
    if (rulerTrack) {
      rulerTrack.innerHTML = "";
      const totalTicks = 45;
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < totalTicks; i++) {
        const tick = document.createElement("span");
        tick.className = "bestseller-ruler__tick";
        if (i === Math.floor(totalTicks / 2)) {
          tick.classList.add("bestseller-ruler__tick--center");
        } else if (i % 5 === 0) {
          tick.classList.add("bestseller-ruler__tick--major");
        } else {
          tick.classList.add("bestseller-ruler__tick--minor");
        }
        fragment.appendChild(tick);
      }
      rulerTrack.appendChild(fragment);
    }

    // 2. Tạo các chấm pagination (Dots)
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      cards.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "bestseller-dot" + (i === 0 ? " is-active" : "");
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Xem món số ${i + 1}`);
        dot.addEventListener("click", () => goToIndex(i));
        dotsContainer.appendChild(dot);
      });
    }

    if (counterTotal) {
      counterTotal.textContent = String(total).padStart(2, "0");
    }

    // Tính khoảng cách vòng tròn (circular diff) giữa index và active
    const getCircularDiff = (index, active, count) => {
      let diff = index - active;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;
      return diff;
    };

    // 3. Cập nhật vị trí thẻ với kích thước nhỏ gọn (Compact size)
    const updateShowcase = () => {
      const isMobile = window.innerWidth <= 640;
      const isTablet = window.innerWidth <= 1024 && !isMobile;

      // Chiều rộng thẻ trung tâm nhỏ gọn
      const centerWidth = isMobile
        ? Math.min(window.innerWidth * 0.78, 290)
        : isTablet
        ? Math.min(window.innerWidth * 0.42, 320)
        : Math.min(window.innerWidth * 0.28, 340);

      const sideScale = 0.82; // Thẻ hai bên thu nhỏ 82%, thẻ giữa bự hơn 1 tí (scale 1.0)
      const gap = isMobile ? 32 : isTablet ? 68 : 105; // Khoảng cách giữa các ảnh (tăng khoảng cách để thoáng hơn)

      // Khoảng dịch chuyển tâm giữa thẻ giữa và thẻ bên
      const cardShift = (centerWidth / 2) + gap + (centerWidth * sideScale / 2);

      // Khoảng dịch chuyển của Dial Title phía trên
      const dialShift = isMobile ? 190 : isTablet ? 260 : 330;

      // Cập nhật từng Card
      cards.forEach((card, i) => {
        const diff = getCircularDiff(i, currentIndex, total);

        card.classList.remove("is-active", "is-prev", "is-next", "is-hidden");
        card.removeAttribute("aria-current");

        if (diff === 0) {
          // Thẻ ở giữa: BỰ HƠN 1 TÍ, trọn vẹn toàn bộ ảnh, nhấn vào mở modal
          card.classList.add("is-active");
          card.setAttribute("aria-current", "true");
          card.style.transform = "translate3d(-50%, 0, 0) scale(1)";
          card.style.opacity = "1";
          card.style.zIndex = "10";
          card.style.pointerEvents = "auto";
        } else if (diff === -1) {
          // Thẻ bên trái: Thu nhỏ nhẹ (scale 0.82), có khoảng cách
          card.classList.add("is-prev");
          card.style.transform = `translate3d(calc(-50% - ${cardShift}px), 0, 0) scale(${sideScale})`;
          card.style.opacity = isMobile ? "0.3" : "0.58";
          card.style.zIndex = "5";
          card.style.pointerEvents = "auto";
        } else if (diff === 1) {
          // Thẻ bên phải: Thu nhỏ nhẹ (scale 0.82), có khoảng cách
          card.classList.add("is-next");
          card.style.transform = `translate3d(calc(-50% + ${cardShift}px), 0, 0) scale(${sideScale})`;
          card.style.opacity = isMobile ? "0.3" : "0.58";
          card.style.zIndex = "5";
          card.style.pointerEvents = "auto";
        } else {
          // Các thẻ còn lại ẩn phía sau
          card.classList.add("is-hidden");
          const dir = diff > 0 ? 1 : -1;
          card.style.transform = `translate3d(calc(-50% + ${dir * cardShift * 1.5}px), 0, 0) scale(0.6)`;
          card.style.opacity = "0";
          card.style.zIndex = "1";
          card.style.pointerEvents = "none";
        }
      });

      // Cập nhật Dial Items phía trên
      dialItems.forEach((item, i) => {
        const diff = getCircularDiff(i, currentIndex, total);

        item.classList.remove("is-active", "is-prev", "is-next", "is-hidden");
        item.removeAttribute("aria-current");

        if (diff === 0) {
          item.classList.add("is-active");
          item.setAttribute("aria-current", "true");
          item.style.transform = "translate3d(-50%, -50%, 0) scale(1)";
          item.style.opacity = "1";
          item.style.zIndex = "10";
          item.style.pointerEvents = "auto";
        } else if (diff === -1) {
          item.classList.add("is-prev");
          item.style.transform = `translate3d(calc(-50% - ${dialShift}px), -50%, 0) scale(0.68)`;
          item.style.opacity = isMobile ? "0" : "0.32";
          item.style.zIndex = "4";
          item.style.pointerEvents = "auto";
        } else if (diff === 1) {
          item.classList.add("is-next");
          item.style.transform = `translate3d(calc(-50% + ${dialShift}px), -50%, 0) scale(0.68)`;
          item.style.opacity = isMobile ? "0" : "0.32";
          item.style.zIndex = "4";
          item.style.pointerEvents = "auto";
        } else {
          item.classList.add("is-hidden");
          const dir = diff > 0 ? 1 : -1;
          item.style.transform = `translate3d(calc(-50% + ${dir * dialShift * 1.5}px), -50%, 0) scale(0.5)`;
          item.style.opacity = "0";
          item.style.zIndex = "1";
          item.style.pointerEvents = "none";
        }
      });

      // Dịch chuyển nhẹ thước đo
      if (rulerTrack) {
        const shiftX = ((currentIndex % total) - (total - 1) / 2) * -10;
        rulerTrack.style.transform = `translateX(${shiftX}px)`;
      }

      // Cập nhật Counter số trang
      if (counterCurrent) {
        counterCurrent.textContent = String(currentIndex + 1).padStart(2, "0");
      }

      // Cập nhật Dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll(".bestseller-dot");
        dots.forEach((dot, idx) => {
          dot.classList.toggle("is-active", idx === currentIndex);
        });
      }

      // Cập nhật hệ thống nền động theo món active
      if (typeof updateBackground === "function") {
        updateBackground(currentIndex);
      }
    };

    const goToIndex = (newIndex) => {
      if (isAnimating) return;
      isAnimating = true;
      currentIndex = (newIndex + total) % total;
      updateShowcase();
      setTimeout(() => {
        isAnimating = false;
      }, 500);
    };

    const next = () => goToIndex(currentIndex + 1);
    const prev = () => goToIndex(currentIndex - 1);

    // 4. Mở cửa sổ popup chi tiết món ăn (Modal)
    const openModal = (index) => {
      if (!modal) return;
      const card = cards[index];
      if (!card) return;

      const name = card.dataset.name || "";
      const i18nName = card.dataset.i18nName;
      const desc = card.dataset.desc || "";
      const i18nDesc = card.dataset.i18nDesc;
      const badge = card.dataset.badge || "";
      const tag = card.dataset.tag || "";
      const img = card.dataset.img || "";
      const alt = card.dataset.alt || name;

      if (modalImg) {
        modalImg.src = img;
        modalImg.alt = alt;
        if (modalImg.parentElement) {
          const isCutout = img.toLowerCase().includes(".png") || (card && card.classList && card.classList.contains("bestseller-card--cutout"));
          modalImg.parentElement.classList.toggle("has-cutout", Boolean(isCutout));
        }
      }
      if (modalBadge) modalBadge.textContent = badge;
      if (modalTag) modalTag.textContent = tag;

      if (modalTitle) {
        modalTitle.textContent = name;
        if (i18nName) {
          modalTitle.setAttribute("data-i18n", i18nName);
        } else {
          modalTitle.removeAttribute("data-i18n");
        }
      }

      if (modalDesc) {
        modalDesc.textContent = desc;
        if (i18nDesc) {
          modalDesc.setAttribute("data-i18n", i18nDesc);
        } else {
          modalDesc.removeAttribute("data-i18n");
        }
      }

      // Hỗ trợ chuyển đổi ngôn ngữ nếu website có module i18n
      if (typeof window.applyLanguage === "function" && window.currentLanguage) {
        window.applyLanguage(window.currentLanguage);
      }

      if (embersContainer) embersContainer.classList.add("is-paused");
      if (typeof updateBackground === "function") updateBackground(index);
      if (typeof initModalEmbers === "function") initModalEmbers();
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    // Đóng cửa sổ popup
    const closeModal = () => {
      if (!modal) return;
      if (embersContainer) embersContainer.classList.remove("is-paused");
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    // Nút Previous & Next
    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);

    // Click vào thẻ: nếu là thẻ ở giữa -> Mở cửa sổ popup; nếu thẻ bên -> Chuyển vào giữa
    cards.forEach((card, i) => {
      card.addEventListener("click", () => {
        if (i === currentIndex) {
          openModal(i);
        } else {
          goToIndex(i);
        }
      });
    });

    // Click vào item trên dial strip: nếu đã ở giữa -> Mở modal; nếu chưa -> Chuyển vào giữa
    dialItems.forEach((item, i) => {
      item.addEventListener("click", () => {
        if (i === currentIndex) {
          openModal(i);
        } else {
          goToIndex(i);
        }
      });
    });

    // Sự kiện đóng modal
    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
        closeModal();
      }
    });

    // Cử chỉ vuốt chạm cảm ứng (Touch / Swipe) trên băng chuyền
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const stage = showcase.querySelector(".bestseller-cards-stage");
    if (stage) {
      stage.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      stage.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
          if (diffX < 0) next();
          else prev();
        }
      }, { passive: true });
    }

    // Điều khiển bằng phím mũi tên khi không mở modal
    window.addEventListener("keydown", (e) => {
      if (modal && modal.classList.contains("is-open")) return;
      if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      }
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateShowcase, 100);
    });

    updateShowcase();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBestsellerShowcase);
  } else {
    initBestsellerShowcase();
  }
})();
