/**
 * AN THOI - SPACE GALLERY JAVASCRIPT
 * Interactive Draggable Polaroid Canvas with Hoi An Lantern Tabs
 */
(function () {
  "use strict";

  // Register i18n dictionary for all supported languages
  const SPACE_I18N = {
    VI: {
      space_eyebrow: "KHÔNG GIAN QUÁN",
      space_tab_inside: "Trong nhà",
      space_tab_outside: "Ngoài trời",
      space_tab_vip: "Khu VIP",
      space_book_this: "Đặt bàn khu này",
      space_hint: "Kéo ảnh để xếp lại · Bấm để xem lớn",
      space_reset: "Xếp lại",
      space_desc_inside: "Không gian ấm cúng mang đậm nét hoài niệm phố cổ, ánh đèn vàng dịu dàng lan tỏa. Rất thích hợp cho bữa cơm gia đình sum vầy, những buổi hẹn hò thân mật hay tiếp đãi bạn bè phương xa.",
      space_desc_outside: "Không gian mở thoáng đãng, lộng gió bên dòng sông Hàn thơ mộng. Tuyệt vời để vừa thưởng thức ẩm thực đặc sắc, vừa ngắm trọn vẹn thành phố lung linh ánh đèn và những cây cầu biểu tượng về đêm.",
      space_desc_vip: "Không gian sang trọng, riêng tư và tách biệt với lối bài trí trang nhã, tinh tế. Hoàn hảo cho các buổi tiệc chiêu đãi đối tác kinh doanh, họp mặt gia đình ấm cúng hay các sự kiện kỷ niệm đáng nhớ."
    },
    EN: {
      space_eyebrow: "RESTAURANT SPACES",
      space_tab_inside: "Indoor",
      space_tab_outside: "Outdoor",
      space_tab_vip: "VIP Room",
      space_book_this: "Book This Space",
      space_hint: "Drag photos to arrange · Click to expand",
      space_reset: "Reset",
      space_desc_inside: "A cozy atmosphere imbued with the nostalgic charm of ancient towns, bathed in gentle warm lantern light. Ideal for family reunions, intimate dates, or welcoming visiting friends.",
      space_desc_outside: "An airy open-air space breezy by the poetic Han River. Wonderful for savoring signature delicacies while taking in the glittering city lights and iconic bridges by night.",
      space_desc_vip: "An elegant, private sanctuary with refined aesthetics. Perfect for hosting business partners, intimate family gatherings, or celebrating memorable milestones."
    },
    ZH: {
      space_eyebrow: "餐厅空间",
      space_tab_inside: "室内",
      space_tab_outside: "户外",
      space_tab_vip: "贵宾包厢",
      space_book_this: "预订此区域",
      space_hint: "拖拽整理照片 · 点击放大查看",
      space_reset: "重置",
      space_desc_inside: "温馨的古镇怀旧氛围，柔和温暖的灯光洒满每个角落。非常适合家庭聚餐、浪漫约会或招待远方朋友。",
      space_desc_outside: "临汉江而居的开阔通风空间，微风拂面。一边享用特色美食，一边饱览璀璨城市夜景与标志性桥梁。",
      space_desc_vip: "高雅私密专属包厢，格调雅致细腻。是商务宴请、温馨家庭聚餐或重要纪念庆典的尊贵之选。"
    },
    KO: {
      space_eyebrow: "레스토랑 공간",
      space_tab_inside: "실내",
      space_tab_outside: "야외",
      space_tab_vip: "VIP 룸",
      space_book_this: "이 공간 예약하기",
      space_hint: "사진을 드래그해 정리 · 클릭하여 크게 보기",
      space_reset: "재배치",
      space_desc_inside: "은은하고 따스한 등불 아래 고즈넉한 옛 거리의 정취가 느껴지는 아늑한 공간. 가족 모임, 다정한 데이트, 소중한 분을 대접하기에 최적입니다.",
      space_desc_outside: "시원한 한강변의 탁 트인 야외 공간. 특색 있는 요리를 음미하며 반짝이는 도시 야경과 다채로운 다리 풍경을 감상하기에 제격입니다.",
      space_desc_vip: "세련되고 품격 있는 프라이빗 단독 공간. 비즈니스 파트너 접대, 소중한 가족 모임, 특별한 기념일을 위한 최상의 선택입니다."
    },
    RU: {
      space_eyebrow: "ПРОСТРАНСТВО РЕСТОРАНА",
      space_tab_inside: "Внутри",
      space_tab_outside: "На улице",
      space_tab_vip: "VIP-зал",
      space_book_this: "Забронировать эту зону",
      space_hint: "Перетаскивайте фото · Нажмите для увеличения",
      space_reset: "Сбросить",
      space_desc_inside: "Уютная атмосфера с очарованием старинного города и мягким теплым светом фонарей. Идеально для семейных встреч, свиданий и душевных бесед с друзьями.",
      space_desc_outside: "Просторная открытая терраса с освежающим бризом у реки Хан. Прекрасное место для дегустации блюд с видом на огни ночного города и знаменитые мосты.",
      space_desc_vip: "Элегантный и уединенный VIP-зал с изысканным оформлением. Идеально подходит для деловых ужинов, семейных торжеств и памятных событий."
    }
  };

  if (window.AN_THOI_I18N) {
    for (const lang in SPACE_I18N) {
      if (window.AN_THOI_I18N[lang]) {
        Object.assign(window.AN_THOI_I18N[lang], SPACE_I18N[lang]);
      }
    }
  }

  // Visual layout according to mockup:
  // Alternating high portrait & low landscape cards with overlapping fan composition
  const SPACES_DATA = {
    inside: {
      id: "inside",
      name: "Trong nhà",
      tag: "01 · Trong nhà",
      glowX: "18%",
      bookingHref: "dat-ban.html",
      descVi: "Không gian ấm cúng mang đậm nét hoài niệm phố cổ, ánh đèn vàng dịu dàng lan tỏa. Rất thích hợp cho bữa cơm gia đình sum vầy, những buổi hẹn hò thân mật hay tiếp đãi bạn bè phương xa.",
      descKey: "space_desc_inside",
      photos: [
        { src: "image/space/inside/inside1.jpg", title: "Bàn tiệc ấm cúng", type: "portrait", num: "01", rot: -4.5 },
        { src: "image/space/inside/inside2.jpg", title: "Góc hoài niệm", type: "landscape", num: "02", rot: 3.5 },
        { src: "image/space/inside/inside3.jpg", title: "Ánh vàng phố cổ", type: "portrait", num: "03", rot: -1.8 },
        { src: "image/space/inside/inside4.jpg", title: "Sum vầy thân tình", type: "landscape", num: "04", rot: 2.8 },
        { src: "image/space/inside/inside5.jpg", title: "Nét đẹp truyền thống", type: "portrait", num: "05", rot: 4.0 }
      ]
    },
    outside: {
      id: "outside",
      name: "Ngoài trời",
      tag: "02 · Ngoài trời",
      glowX: "36%",
      bookingHref: "dat-ban.html",
      descVi: "Không gian mở thoáng đãng, lộng gió bên dòng sông Hàn thơ mộng. Tuyệt vời để vừa thưởng thức ẩm thực đặc sắc, vừa ngắm trọn vẹn thành phố lung linh ánh đèn và những cây cầu biểu tượng về đêm.",
      descKey: "space_desc_outside",
      photos: [
        { src: "image/space/outside/outside1.jpg", title: "View sông Hàn thơ mộng", type: "portrait", num: "01", rot: -4.5 },
        { src: "image/space/outside/outside2.jpg", title: "Bàn tiệc thoáng đãng", type: "landscape", num: "02", rot: 3.5 },
        { src: "image/space/outside/outside3.jpg", title: "Thành phố lung linh", type: "portrait", num: "03", rot: -1.8 },
        { src: "image/space/outside/outside4.jpg", title: "Gió mát bên sông", type: "landscape", num: "04", rot: 2.8 },
        { src: "image/space/outside/outside5.jpg", title: "Khoảnh khắc thư thái", type: "portrait", num: "05", rot: -2.2 },
        { src: "image/space/outside/outside6.jpg", title: "Phố đêm rực rỡ", type: "landscape", num: "06", rot: 3.8 }
      ]
    },
    vip: {
      id: "vip",
      name: "Khu VIP",
      tag: "03 · Khu VIP",
      glowX: "54%",
      bookingHref: "dat-ban.html",
      descVi: "Không gian sang trọng, riêng tư và tách biệt với lối bài trí trang nhã, tinh tế. Hoàn hảo cho các buổi tiệc chiêu đãi đối tác kinh doanh, họp mặt gia đình ấm cúng hay các sự kiện kỷ niệm đáng nhớ.",
      descKey: "space_desc_vip",
      photos: [
        { src: "image/space/vip/vip2.jpg", title: "Tinh tế trang nhã", type: "portrait", num: "01", rot: -4.5 },
        { src: "image/space/vip/vip1.jpg", title: "Sang trọng & Riêng tư", type: "landscape", num: "02", rot: 3.5 },
        { src: "image/space/vip/vip3.jpg", title: "Bàn tiệc đẳng cấp", type: "portrait", num: "03", rot: -1.8 },
        { src: "image/space/vip/vip5.jpg", title: "Không gian hội ngộ", type: "landscape", num: "04", rot: 2.8 },
        { src: "image/space/vip/vip4.jpg", title: "Kỷ niệm trọn vẹn", type: "portrait", num: "05", rot: 4.0 }
      ]
    }
  };

  function initSpaceGallery() {
    const sec = document.getElementById("khong-gian-quan");
    if (!sec) return;

    const board = document.getElementById("spaceBoard");
    const descEl = document.getElementById("spaceDesc");
    const bookingBtn = document.getElementById("spaceBookingBtn");
    const resetBtn = document.getElementById("spaceResetBtn");
    const tabs = Array.from(document.querySelectorAll(".space-tab"));

    // Lightbox elements
    const lightbox = document.getElementById("spaceLightbox");
    const lbImg = document.getElementById("spaceLbImg");
    const lbBadge = document.getElementById("spaceLbBadge");
    const lbTitle = document.getElementById("spaceLbTitle");
    const lbCounter = document.getElementById("spaceLbCounter");
    const lbClose = document.getElementById("spaceLbClose");
    const lbPrev = document.getElementById("spaceLbPrev");
    const lbNext = document.getElementById("spaceLbNext");
    const lbBackdrop = document.getElementById("spaceLbBackdrop");

    let currentSpaceKey = "inside";
    let highestZ = 30;
    let currentLightboxIndex = 0;
    let activeCards = [];

    // Helper: get current translation if AN_THOI_I18N is available
    function getI18nText(key, fallback) {
      try {
        const lang = localStorage.getItem("anthoi_lang") || "VI";
        if (window.AN_THOI_I18N && window.AN_THOI_I18N[lang] && window.AN_THOI_I18N[lang][key]) {
          return window.AN_THOI_I18N[lang][key];
        }
      } catch (e) {}
      return fallback;
    }

    function boardRectHeight() {
      return board.getBoundingClientRect().height || board.clientHeight || 580;
    }

    // Render cards for selected space
    function renderSpace(spaceKey, animate) {
      currentSpaceKey = spaceKey;
      const data = SPACES_DATA[spaceKey];
      if (!data) return;

      // Update board spotlight & glow variable
      board.style.setProperty("--lantern-glow-x", data.glowX);

      // Update description text with smooth fade
      if (descEl) {
        descEl.classList.add("is-changing");
        setTimeout(() => {
          descEl.textContent = getI18nText(data.descKey, data.descVi);
          descEl.setAttribute("data-i18n", data.descKey);
          descEl.classList.remove("is-changing");
        }, 150);
      }

      // Update booking link
      if (bookingBtn) {
        bookingBtn.href = data.bookingHref;
      }

      // Update tab active states
      tabs.forEach(tab => {
        const isActive = tab.getAttribute("data-space") === spaceKey;
        tab.classList.toggle("space-tab--active", isActive);
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      // Clear existing cards
      board.querySelectorAll(".space-card").forEach(el => el.remove());
      activeCards = [];

      const boardRect = board.getBoundingClientRect();
      const bWidth = boardRect.width || board.clientWidth;
      const bHeight = boardRectHeight();

      // Create new cards
      data.photos.forEach((photo, idx) => {
        const card = document.createElement("div");
        card.className = `space-card space-card--${photo.type} ${animate ? "is-entering" : ""}`;
        card.setAttribute("data-index", idx);
        card.style.setProperty("--rot", `${photo.rot}deg`);
        card.style.transform = `rotate(${photo.rot}deg)`;

        card.innerHTML = `
          <div class="space-card__inner">
            <div class="space-card__photo">
              <img src="${photo.src}" alt="${photo.title} - ${data.name} Ăn Thôi" loading="lazy" decoding="async">
              <div class="space-card__zoom-hint" aria-hidden="true" title="Bấm để xem lớn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
            <div class="space-card__caption">
              <span class="space-card__tag">${photo.num} · ${data.name}</span>
              <span class="space-card__title">${photo.title}</span>
            </div>
          </div>
        `;

        board.appendChild(card);
        activeCards.push({ el: card, photo, data });

        if (animate) {
          card.addEventListener("animationend", () => {
            card.classList.remove("is-entering");
            card.style.transform = `rotate(${photo.rot}deg)`;
          }, { once: true });
        }

        // Position card organically based on staggered wave layout
        requestAnimationFrame(() => {
          positionCard(card, photo, bWidth, bHeight, idx, data.photos.length);
          attachDragListeners(card, idx);
        });
      });
    }

    // Calculate layout position - Harmonious Staggered Wave Layout matching mockup
    function positionCard(card, photo, bWidth, bHeight, index, total) {
      const isSmallMobile = bWidth <= 480;
      const isMobile = bWidth < 768;

      const fallbackW = photo.type === "landscape" ? (isSmallMobile ? 195 : (isMobile ? 220 : 335)) : (isSmallMobile ? 155 : (isMobile ? 175 : 255));
      const fallbackH = photo.type === "landscape" ? (isSmallMobile ? 175 : (isMobile ? 190 : 240)) : (isSmallMobile ? 230 : (isMobile ? 260 : 325));

      const cardW = card.offsetWidth || fallbackW;
      const cardH = card.offsetHeight || fallbackH;

      // We establish a wave layout:
      // Index 0: ẢNH DỌC (High Left, rot: -4.5deg, z: 2)
      // Index 1: ẢNH NGANG (Low Center-Left, rot: +3.5deg, z: 5 - overlaps #0)
      // Index 2: ẢNH DỌC (High Center, rot: -1.8deg, z: 3 - behind #1 & #3)
      // Index 3: ẢNH NGANG (Low Center-Right, rot: +2.8deg, z: 6 - overlaps #2 & #4)
      // Index 4: ẢNH DỌC (High Right, rot: +4.0deg, z: 4)

      let normX = 0;
      let normY = 0;
      let zIndex = 10;

      if (total === 6) {
        const stepX = [0.0, 0.17, 0.34, 0.51, 0.68, 0.85];
        const stepY = [0.08, 0.38, 0.06, 0.38, 0.07, 0.36];
        const zArr  = [2, 5, 3, 6, 4, 7];

        normX = stepX[index] !== undefined ? stepX[index] : (index / 5) * 0.85;
        normY = stepY[index] !== undefined ? stepY[index] : 0.2;
        zIndex = zArr[index] !== undefined ? zArr[index] : (10 + index);
      } else if (total === 5) {
        const stepX = [0.0, 0.21, 0.42, 0.63, 0.83];
        const stepY = [0.08, 0.38, 0.06, 0.36, 0.09];
        const zArr  = [2, 5, 3, 6, 4];

        normX = stepX[index] !== undefined ? stepX[index] : (index / 4) * 0.83;
        normY = stepY[index] !== undefined ? stepY[index] : 0.2;
        zIndex = zArr[index] !== undefined ? zArr[index] : (10 + index);
      } else {
        // 4 cards (VIP fallback)
        const stepX = [0.0, 0.28, 0.54, 0.80];
        const stepY = [0.08, 0.38, 0.06, 0.36];
        const zArr  = [2, 5, 3, 6];

        normX = stepX[index] !== undefined ? stepX[index] : (index / 3) * 0.80;
        normY = stepY[index] !== undefined ? stepY[index] : 0.2;
        zIndex = zArr[index] !== undefined ? zArr[index] : (10 + index);
      }

      const maxSpanFactor = total === 6 ? 0.85 : (total === 5 ? 0.83 : 0.80);
      let targetLeft = 0;

      if (bWidth >= 1100) {
        // Generous desktop width: perfectly horizontally centered group
        const targetGroupWidth = Math.min(bWidth - 60, total === 6 ? 1160 : (total === 5 ? 1040 : 880));
        const startX = (bWidth - targetGroupWidth) / 2;
        const groupInnerRange = targetGroupWidth - cardW;
        targetLeft = startX + (groupInnerRange * (normX / maxSpanFactor));
      } else if (bWidth >= 768) {
        // Tablet width
        const targetGroupWidth = bWidth - 40;
        const startX = 20;
        const groupInnerRange = targetGroupWidth - cardW;
        targetLeft = startX + (groupInnerRange * (normX / maxSpanFactor));
      } else {
        // Mobile screen: fan cards evenly across available width without any card clipping off-board
        const startX = isSmallMobile ? 10 : 16;
        const availableRange = Math.max(0, bWidth - cardW - (startX * 2));
        const stepX = total > 1 ? (availableRange / (total - 1)) : 0;
        targetLeft = startX + (index * stepX);
      }

      // Vertical position (contained within top and bottom bounds)
      const topPadding = isMobile ? 12 : 16;
      const bottomPadding = isMobile ? 14 : 20;
      let targetTop = Math.max(topPadding, Math.min(bHeight * normY, bHeight - cardH - bottomPadding));

      card.style.left = `${Math.round(targetLeft)}px`;
      card.style.top = `${Math.round(targetTop)}px`;
      card.style.zIndex = zIndex;
      card.dataset.initLeft = targetLeft;
      card.dataset.initTop = targetTop;
      card.dataset.initZ = zIndex;
    }

    // Drag & Drop Pointer Event Engine
    function attachDragListeners(card, photoIndex) {
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let initialLeft = 0;
      let initialTop = 0;
      let hasMoved = false;

      function onPointerDown(e) {
        if (e.button && e.button !== 0) return;

        isDragging = true;
        hasMoved = false;
        startX = e.clientX;
        startY = e.clientY;

        initialLeft = parseFloat(card.style.left) || card.offsetLeft;
        initialTop = parseFloat(card.style.top) || card.offsetTop;

        // Bring to front
        highestZ += 1;
        card.style.zIndex = highestZ;
        card.classList.add("is-dragging");

        try {
          card.setPointerCapture(e.pointerId);
        } catch (err) {}

        card.addEventListener("pointermove", onPointerMove);
        card.addEventListener("pointerup", onPointerUp);
        card.addEventListener("pointercancel", onPointerUp);
      }

      function onPointerMove(e) {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        if (Math.hypot(deltaX, deltaY) > 5) {
          hasMoved = true;
        }

        const bRect = board.getBoundingClientRect();
        const cardW = card.offsetWidth;
        const cardH = card.offsetHeight;

        let newLeft = initialLeft + deltaX;
        let newTop = initialTop + deltaY;

        // Bounded boundaries
        const minL = -cardW * 0.2;
        const maxL = bRect.width - cardW * 0.8;
        const minT = 5;
        const maxT = bRect.height - cardH * 0.85;

        newLeft = Math.max(minL, Math.min(newLeft, maxL));
        newTop = Math.max(minT, Math.min(newTop, maxT));

        card.style.left = `${newLeft}px`;
        card.style.top = `${newTop}px`;
      }

      function onPointerUp(e) {
        if (!isDragging) return;
        isDragging = false;
        card.classList.remove("is-dragging");

        try {
          card.releasePointerCapture(e.pointerId);
        } catch (err) {}

        card.removeEventListener("pointermove", onPointerMove);
        card.removeEventListener("pointerup", onPointerUp);
        card.removeEventListener("pointercancel", onPointerUp);

        // Click detection: if moved < 6px, treat as click to open Lightbox
        if (!hasMoved) {
          openLightbox(photoIndex);
        }
      }

      card.addEventListener("pointerdown", onPointerDown);
    }

    // Reset layout function
    function resetLayout() {
      const bRect = board.getBoundingClientRect();
      const bWidth = bRect.width || board.clientWidth;
      const bHeight = boardRectHeight();

      activeCards.forEach(({ el, photo }, i) => {
        el.style.transition = "all 0.5s cubic-bezier(0.2, 0.8, 0.25, 1)";
        el.style.transform = `rotate(${photo.rot}deg)`;
        positionCard(el, photo, bWidth, bHeight, i, activeCards.length);
        setTimeout(() => {
          el.style.transition = "";
        }, 500);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", resetLayout);
    }

    // Tab click handlers
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const space = tab.getAttribute("data-space");
        if (space && space !== currentSpaceKey) {
          renderSpace(space, true);
        }
      });
    });

    // ===== LIGHTBOX FUNCTIONALITY =====
    function openLightbox(index) {
      const currentData = SPACES_DATA[currentSpaceKey];
      if (!currentData || !currentData.photos[index]) return;

      currentLightboxIndex = index;
      updateLightboxContent();

      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleLightboxKeyDown);
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleLightboxKeyDown);
    }

    function updateLightboxContent() {
      const currentData = SPACES_DATA[currentSpaceKey];
      const photo = currentData.photos[currentLightboxIndex];
      if (!photo) return;

      lbImg.src = photo.src;
      lbImg.alt = `${photo.title} - ${currentData.name} Ăn Thôi`;
      if (lbBadge) lbBadge.textContent = currentData.name;
      if (lbTitle) lbTitle.textContent = photo.title;
      if (lbCounter) lbCounter.textContent = `${currentLightboxIndex + 1} / ${currentData.photos.length}`;
    }

    function prevLightbox() {
      const total = SPACES_DATA[currentSpaceKey].photos.length;
      currentLightboxIndex = (currentLightboxIndex - 1 + total) % total;
      updateLightboxContent();
    }

    function nextLightbox() {
      const total = SPACES_DATA[currentSpaceKey].photos.length;
      currentLightboxIndex = (currentLightboxIndex + 1) % total;
      updateLightboxContent();
    }

    function handleLightboxKeyDown(e) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    }

    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lbBackdrop) lbBackdrop.addEventListener("click", closeLightbox);
    if (lbPrev) lbPrev.addEventListener("click", prevLightbox);
    if (lbNext) lbNext.addEventListener("click", nextLightbox);

    // Initial render
    renderSpace("inside", false);

    // Re-position on window resize (debounced)
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const bRect = board.getBoundingClientRect();
        const bWidth = bRect.width;
        const bHeight = boardRectHeight();
        activeCards.forEach(({ el, photo }, i) => {
          positionCard(el, photo, bWidth, bHeight, i, activeCards.length);
        });
      }, 200);
    });

    // Listen to language changes
    window.addEventListener("anthoi_language_change", () => {
      const data = SPACES_DATA[currentSpaceKey];
      if (data && descEl) {
        descEl.textContent = getI18nText(data.descKey, data.descVi);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSpaceGallery);
  } else {
    initSpaceGallery();
  }
})();
