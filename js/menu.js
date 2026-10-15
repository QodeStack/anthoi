/* =========================================================
   THỰC ĐƠN ĂN THÔI - 3D FLIPBOOK MENU LOGIC (HEYZINE STYLE)
   Hiệu ứng lật sách 3D chân thực, kéo góc chuột, vuốt di động,
   bóng đổ gáy sách, phóng to (zoom & pan), toàn màn hình & âm thanh lật giấy.
   ========================================================= */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const bookEl = $("#flipbookBook");
  if (!bookEl) return;

  // Danh sách 10 trang thực đơn nguyên bản
  const TOTAL_PAGES = 10;
  const MENU_IMAGES = [
    "image/menu/trang1.jpg",
    "image/menu/trang2.jpg",
    "image/menu/trang3.jpg",
    "image/menu/trang4.jpg",
    "image/menu/trang5.jpg",
    "image/menu/trang6.jpg",
    "image/menu/trang7.jpg",
    "image/menu/trang8.jpg",
    "image/menu/trang9.jpg",
    "image/menu/trang10.jpg"
  ];

  /* ---------------------------------------------------------
     1. TIẾNG LẬT SÁCH BẰNG WEB AUDIO API (KHÔNG CẦN FILE NGOÀI)
     --------------------------------------------------------- */
  let soundEnabled = true;
  try {
    const savedSound = localStorage.getItem("anthoi_menu_sound");
    if (savedSound !== null) soundEnabled = savedSound === "true";
  } catch (e) {}

  let audioCtx = null;
  const playPageFlipSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      const sampleRate = audioCtx.sampleRate;
      const duration = 0.14; // 140ms
      const bufferSize = Math.floor(sampleRate * duration);
      const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);

      // Tạo tiếng sột soạt giấy tự nhiên (decaying shaped noise)
      for (let i = 0; i < bufferSize; i++) {
        const t = i / bufferSize;
        const env = Math.pow(1 - t, 2.2);
        const flutter = 1 + 0.3 * Math.sin(t * 80);
        data[i] = (Math.random() * 2 - 1) * env * flutter;
      }

      const noiseSource = audioCtx.createBufferSource();
      noiseSource.buffer = buffer;

      // Bandpass filter để tạo âm sắc giấy mỹ thuật trầm ấm
      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(850, audioCtx.currentTime);
      filter.Q.setValueAtTime(1.4, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(320, audioCtx.currentTime + duration);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.28, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noiseSource.start();
    } catch (err) {
      // Bỏ qua nếu browser yêu cầu tương tác người dùng
    }
  };

  /* ---------------------------------------------------------
     2. TIỀN TẢI HÌNH ẢNH (PRELOAD) ĐỂ TRÁNH GIẬT TRANG
     --------------------------------------------------------- */
  const preloadImages = (urls) => {
    return Promise.all(urls.map(url => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    })));
  };

  /* ---------------------------------------------------------
     3. KHỞI TẠO PAGE-FLIP
     --------------------------------------------------------- */
  let pageFlip = null;
  const loader = $("#flipbookLoader");
  const pageDisplay = $("#fbPageDisplay");
  const pageSlider = $("#fbPageSlider");
  const sidePrev = $("#flipSidePrev");
  const sideNext = $("#flipSideNext");
  const btnFirst = $("#fbBtnFirst");
  const btnPrev = $("#fbBtnPrev");
  const btnNext = $("#fbBtnNext");
  const btnLast = $("#fbBtnLast");
  const btnSound = $("#fbBtnSound");
  const btnFullscreen = $("#fbBtnFullscreen");
  const btnThumbs = $("#fbBtnThumbs");
  const thumbsDrawer = $("#flipbookThumbs");
  const thumbsTrack = $("#flipbookThumbsTrack");
  const thumbsClose = $("#flipbookThumbsClose");
  const zoomInBtn = $("#fbBtnZoomIn");
  const zoomOutBtn = $("#fbBtnZoomOut");
  const zoomResetBtn = $("#flipZoomReset");
  const zoomIndicator = $("#flipZoomIndicator");
  const zoomText = $("#flipZoomText");
  const zoomContainer = $("#flipbookZoomContainer");
  const secFlipbook = $("#cuon-thuc-don");

  // Cập nhật trạng thái nút âm thanh ban đầu
  const updateSoundUI = () => {
    if (!btnSound) return;
    const iconOn = btnSound.querySelector(".icon-sound-on");
    const iconOff = btnSound.querySelector(".icon-sound-off");
    if (soundEnabled) {
      btnSound.classList.add("is-active");
      btnSound.title = "Âm thanh lật trang: Đang bật";
      if (iconOn) iconOn.style.display = "";
      if (iconOff) iconOff.style.display = "none";
    } else {
      btnSound.classList.remove("is-active");
      btnSound.title = "Âm thanh lật trang: Đang tắt";
      if (iconOn) iconOn.style.display = "none";
      if (iconOff) iconOff.style.display = "";
    }
  };
  updateSoundUI();

  btnSound?.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    try { localStorage.setItem("anthoi_menu_sound", String(soundEnabled)); } catch (e) {}
    updateSoundUI();
    if (soundEnabled) playPageFlipSound();
  });

  /* ---------------------------------------------------------
     3. TÍNH TOÁN KÍCH THƯỚC SÁCH & KHỞI TẠO PAGE-FLIP
     - Tỷ lệ chuẩn ảnh thực đơn: 1080:1920 (0.5625 / trang đơn)
     - Trên Desktop/Tablet: hiển thị dạng 2 trang mở rộng (Landscape Spread, tỷ lệ 1.125)
     - Trang 1 (Bìa Menu) hiển thị 1 trang và tự động canh giữa
     - Các trang 2-3, 4-5, 6-7, 8-9 hiển thị 2 trang cùng nhau và tự động canh giữa
     - Trang 10 (Bìa sau) hiển thị 1 trang và tự động canh giữa
     - Trên Mobile: hiển thị 1 trang dọc trực quan (Portrait) tự canh giữa
     --------------------------------------------------------- */
  const calcBookSize = () => {
    const vp = $("#flipbookViewport");
    if (!vp) return null;

    const vpW = vp.clientWidth;
    const vpH = vp.clientHeight;
    const pageRatio = 1080 / 1920; // 0.5625

    // Màn hình hẹp (< 768px): chế độ 1 trang portrait
    const isPortraitMode = vpW < 768;

    if (isPortraitMode) {
      const availW = Math.max(220, vpW - 24);
      const availH = Math.max(360, vpH - 24);

      let h = availH;
      let w = h * pageRatio;

      if (w > availW) {
        w = availW;
        h = w / pageRatio;
      }

      const pw = Math.round(w);
      const ph = Math.round(h);

      return {
        mode: "portrait",
        bookWidth: pw,
        bookHeight: ph,
        pageWidth: pw,
        pageHeight: ph
      };
    } else {
      // Màn hình rộng (Desktop / Tablet): chế độ 2 trang landscape spread
      // Trừ khoảng cách 130px cho 2 mũi tên sườn không che mất nội dung
      const availW = Math.max(460, vpW - 130);
      const availH = Math.max(360, vpH - 40);

      const spreadRatio = pageRatio * 2; // 1.125 (2160 / 1920)

      let h = availH;
      let w = h * spreadRatio;

      if (w > availW) {
        w = availW;
        h = w / spreadRatio;
      }

      const singleW = Math.round(w / 2);
      const totalW = singleW * 2;
      h = Math.round(h);

      return {
        mode: "landscape",
        bookWidth: totalW,
        bookHeight: h,
        pageWidth: singleW,
        pageHeight: h
      };
    }
  };

  // Cập nhật lớp canh giữa: Bìa trước (1 trang), Trang đôi (2 trang), Bìa sau (1 trang)
  const updateCenterClass = (pageIndex) => {
    if (!bookEl || !pageFlip) return;
    const total = pageFlip.getPageCount();
    const orientation = pageFlip.getOrientation();

    bookEl.classList.remove("is-cover-front", "is-cover-back", "is-spread");

    if (orientation === "portrait") {
      // Ở chế độ portrait, PageFlip đã tự căn giữa trang đơn
      return;
    }

    if (pageIndex === 0) {
      bookEl.classList.add("is-cover-front");
    } else if (pageIndex >= total - 1) {
      bookEl.classList.add("is-cover-back");
    } else {
      bookEl.classList.add("is-spread");
    }
  };

  // Khởi tạo Flipbook
  const initFlipbook = () => {
    if (!window.St || !window.St.PageFlip) {
      console.error("Thư viện St.PageFlip chưa sẵn sàng.");
      return;
    }

    const size = calcBookSize();
    if (!size) return;

    bookEl.style.width = `${size.bookWidth}px`;
    bookEl.style.height = `${size.bookHeight}px`;

    pageFlip = new window.St.PageFlip(bookEl, {
      width: size.pageWidth,
      height: size.pageHeight,
      size: "fixed",
      autoSize: false,
      showCover: true,
      usePortrait: size.mode === "portrait",
      minWidth: size.pageWidth,
      maxWidth: size.pageWidth,
      minHeight: size.pageHeight,
      maxHeight: size.pageHeight,
      maxShadowOpacity: 0.65,
      mobileScrollSupport: false,
      flippingTime: 700,
      useMouseEvents: true,
      showPageCorners: true,
      clickEventForward: false
    });

    const pages = $$(".flipbook-page", bookEl);
    pageFlip.loadFromHTML(pages);

    // Cập nhật thông tin số trang
    const updatePageInfo = (pageIndex) => {
      const total = pageFlip.getPageCount();
      const orientation = pageFlip.getOrientation(); // 'portrait' | 'landscape'

      // Hiển thị số trang trực quan
      if (orientation === "portrait") {
        if (pageDisplay) pageDisplay.textContent = `Trang ${pageIndex + 1} / ${total}`;
      } else {
        if (pageIndex === 0) {
          if (pageDisplay) pageDisplay.textContent = `Trang 1 / ${total}`;
        } else if (pageIndex >= total - 1) {
          if (pageDisplay) pageDisplay.textContent = `Trang ${total} / ${total}`;
        } else {
          const leftP = pageIndex % 2 === 1 ? pageIndex + 1 : pageIndex;
          const rightP = Math.min(leftP + 1, total);
          if (pageDisplay) pageDisplay.textContent = `Trang ${leftP}, ${rightP} / ${total}`;
        }
      }

      // Slider
      if (pageSlider) {
        pageSlider.value = pageIndex;
      }

      // Nút điều hướng enabled / disabled
      const isStart = pageIndex <= 0;
      const isEnd = pageIndex >= total - 1;

      if (sidePrev) sidePrev.disabled = isStart;
      if (btnFirst) btnFirst.disabled = isStart;
      if (btnPrev) btnPrev.disabled = isStart;

      if (sideNext) sideNext.disabled = isEnd;
      if (btnLast) btnLast.disabled = isEnd;
      if (btnNext) btnNext.disabled = isEnd;

      // Cập nhật active thumbnail (trên trang đôi thì sáng cả 2 trang)
      if (thumbsTrack) {
        $$(".fb-thumb", thumbsTrack).forEach((t, i) => {
          if (orientation === "landscape" && pageIndex > 0 && pageIndex < total - 1) {
            const leftIdx = pageIndex % 2 === 1 ? pageIndex : pageIndex - 1;
            const isAct = (i === leftIdx || i === leftIdx + 1);
            t.classList.toggle("is-active", isAct);
            if (i === leftIdx) t.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          } else {
            const isAct = (i === pageIndex);
            t.classList.toggle("is-active", isAct);
            if (isAct) t.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          }
        });
      }

      updateCenterClass(pageIndex);
    };

    pageFlip.on("init", (e) => {
      loader?.classList.add("is-hidden");
      const initPage = e.data?.page || 0;
      updatePageInfo(initPage);
      updateCenterClass(initPage);
    });

    pageFlip.on("flip", (e) => {
      playPageFlipSound();
      updatePageInfo(e.data);
      updateCenterClass(e.data);
    });

    pageFlip.on("changeOrientation", () => {
      const cur = pageFlip.getCurrentPageIndex();
      updatePageInfo(cur);
      updateCenterClass(cur);
    });
  };

  // Nạp ảnh xong thì khởi chạy lật sách
  preloadImages(MENU_IMAGES).then(() => {
    initFlipbook();
  });

  /* ---------------------------------------------------------
     4. ĐIỀU HƯỚNG LẬT TRANG (BUTTONS, ARROWS, SLIDER, KEYS)
     --------------------------------------------------------- */
  const flipToNext = () => {
    if (!pageFlip) return;
    const current = pageFlip.getCurrentPageIndex();
    const total = pageFlip.getPageCount();
    const orientation = pageFlip.getOrientation();
    if (orientation === "landscape") {
      if (current === 0) {
        bookEl.classList.remove("is-cover-front", "is-cover-back");
        bookEl.classList.add("is-spread");
      } else if (current >= total - 3) {
        bookEl.classList.remove("is-cover-front", "is-spread");
        bookEl.classList.add("is-cover-back");
      }
    }
    pageFlip.flipNext();
  };

  const flipToPrev = () => {
    if (!pageFlip) return;
    const current = pageFlip.getCurrentPageIndex();
    const total = pageFlip.getPageCount();
    const orientation = pageFlip.getOrientation();
    if (orientation === "landscape") {
      if (current <= 2) {
        bookEl.classList.remove("is-spread", "is-cover-back");
        bookEl.classList.add("is-cover-front");
      } else if (current >= total - 1) {
        bookEl.classList.remove("is-cover-front", "is-cover-back");
        bookEl.classList.add("is-spread");
      }
    }
    pageFlip.flipPrev();
  };

  sidePrev?.addEventListener("click", flipToPrev);
  sideNext?.addEventListener("click", flipToNext);
  btnPrev?.addEventListener("click", flipToPrev);
  btnNext?.addEventListener("click", flipToNext);
  btnFirst?.addEventListener("click", () => {
    if (!pageFlip) return;
    updateCenterClass(0);
    pageFlip.flip(0);
  });
  btnLast?.addEventListener("click", () => {
    if (!pageFlip) return;
    const last = pageFlip.getPageCount() - 1;
    updateCenterClass(last);
    pageFlip.flip(last);
  });

  pageSlider?.addEventListener("input", (e) => {
    const target = parseInt(e.target.value, 10);
    if (pageFlip && !isNaN(target)) {
      updateCenterClass(target);
      pageFlip.flip(target);
    }
  });

  // Phím mũi tên bàn phím
  window.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
    if (e.key === "ArrowLeft") {
      flipToPrev();
    } else if (e.key === "ArrowRight") {
      flipToNext();
    } else if (e.key === "Escape") {
      if (zoomLevel > 1) resetZoom();
      if (thumbsDrawer?.classList.contains("is-open")) closeThumbs();
    }
  });

  /* ---------------------------------------------------------
     5. DẢI HÌNH ẢNH THU NHỎ (THUMBNAILS DRAWER)
     --------------------------------------------------------- */
  const toggleThumbs = () => {
    if (!thumbsDrawer) return;
    const isOpen = thumbsDrawer.classList.toggle("is-open");
    thumbsDrawer.setAttribute("aria-hidden", String(!isOpen));
    btnThumbs?.classList.toggle("is-active", isOpen);
  };
  const closeThumbs = () => {
    thumbsDrawer?.classList.remove("is-open");
    thumbsDrawer?.setAttribute("aria-hidden", "true");
    btnThumbs?.classList.remove("is-active");
  };

  btnThumbs?.addEventListener("click", toggleThumbs);
  thumbsClose?.addEventListener("click", closeThumbs);

  // Click vào thumbnail nhảy đến trang tương ứng
  thumbsTrack?.addEventListener("click", (e) => {
    const thumbBtn = e.target.closest(".fb-thumb");
    if (!thumbBtn || !pageFlip) return;
    const page = parseInt(thumbBtn.dataset.page, 10);
    if (!isNaN(page)) {
      updateCenterClass(page);
      pageFlip.flip(page);
    }
  });

  /* ---------------------------------------------------------
     6. PHÓNG TO / THU NHỎ & KÉO RÊ (ZOOM & PAN)
     --------------------------------------------------------- */
  let zoomLevel = 1.0;
  const ZOOM_STEPS = [1.0, 1.4, 1.8, 2.2];
  let panX = 0, panY = 0;
  let isDragging = false;
  let startX = 0, startY = 0;

  const applyZoom = (newZoom, animate = true) => {
    zoomLevel = Math.max(1.0, Math.min(newZoom, 2.2));
    if (zoomLevel === 1.0) {
      panX = 0;
      panY = 0;
      zoomContainer?.classList.remove("is-zoomed");
      zoomIndicator?.classList.remove("is-visible");
    } else {
      zoomContainer?.classList.add("is-zoomed");
      zoomIndicator?.classList.add("is-visible");
      if (zoomText) zoomText.textContent = `${Math.round(zoomLevel * 100)}%`;
    }

    if (zoomContainer) {
      zoomContainer.style.transition = animate ? "transform 0.25s cubic-bezier(0.1, 0.8, 0.2, 1)" : "none";
      zoomContainer.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
    }
  };

  const resetZoom = () => applyZoom(1.0, true);

  zoomInBtn?.addEventListener("click", () => {
    const nextStep = ZOOM_STEPS.find(s => s > zoomLevel + 0.05) || 2.2;
    applyZoom(nextStep, true);
  });

  zoomOutBtn?.addEventListener("click", () => {
    const prevSteps = ZOOM_STEPS.filter(s => s < zoomLevel - 0.05);
    const prevStep = prevSteps.length ? prevSteps[prevSteps.length - 1] : 1.0;
    applyZoom(prevStep, true);
  });

  zoomResetBtn?.addEventListener("click", resetZoom);

  // Nhấp đúp chuột toggle zoom nhanh (1x <-> 1.75x)
  zoomContainer?.addEventListener("dblclick", (e) => {
    e.preventDefault();
    if (zoomLevel > 1.05) {
      resetZoom();
    } else {
      applyZoom(1.75, true);
    }
  });

  // Kéo chuột rê trang khi đang zoom
  zoomContainer?.addEventListener("mousedown", (e) => {
    if (zoomLevel <= 1.0) return;
    isDragging = true;
    startX = e.clientX - panX * zoomLevel;
    startY = e.clientY - panY * zoomLevel;
    zoomContainer.classList.add("is-dragging");
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging || zoomLevel <= 1.0) return;
    panX = (e.clientX - startX) / zoomLevel;
    panY = (e.clientY - startY) / zoomLevel;

    const maxPan = 360 * (zoomLevel - 1);
    panX = Math.max(-maxPan, Math.min(panX, maxPan));
    panY = Math.max(-maxPan, Math.min(panY, maxPan));

    applyZoom(zoomLevel, false);
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      zoomContainer?.classList.remove("is-dragging");
    }
  });

  /* ---------------------------------------------------------
     7. TOÀN MÀN HÌNH (FULLSCREEN MODE)
     --------------------------------------------------------- */
  const toggleFullscreen = () => {
    const elem = secFlipbook;
    if (!elem) return;

    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  btnFullscreen?.addEventListener("click", toggleFullscreen);

  // Đồng bộ kích thước và canh lề sách khi thay đổi màn hình / toàn màn hình
  const handleResize = () => {
    if (!pageFlip) return;
    const size = calcBookSize();
    if (!size) return;

    bookEl.style.width = `${size.bookWidth}px`;
    bookEl.style.height = `${size.bookHeight}px`;

    const settings = pageFlip.getSettings();
    settings.width = size.pageWidth;
    settings.height = size.pageHeight;
    settings.minWidth = size.pageWidth;
    settings.maxWidth = size.pageWidth;
    settings.minHeight = size.pageHeight;
    settings.maxHeight = size.pageHeight;
    settings.usePortrait = size.mode === "portrait";

    pageFlip.update();

    const render = pageFlip.getRender();
    if (render) {
      if (typeof render.drawLeftPage === "function") render.drawLeftPage();
      if (typeof render.drawRightPage === "function") render.drawRightPage();
    }

    const cur = pageFlip.getCurrentPageIndex();
    updateCenterClass(cur);
  };

  const updateFullscreenUI = () => {
    const isFS = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
    const enterIcon = btnFullscreen?.querySelector(".icon-fs-enter");
    const exitIcon = btnFullscreen?.querySelector(".icon-fs-exit");

    if (isFS) {
      secFlipbook?.classList.add("is-fullscreen");
      if (enterIcon) enterIcon.style.display = "none";
      if (exitIcon) exitIcon.style.display = "";
      btnFullscreen?.setAttribute("title", "Thoát toàn màn hình");
    } else {
      secFlipbook?.classList.remove("is-fullscreen");
      if (enterIcon) enterIcon.style.display = "";
      if (exitIcon) exitIcon.style.display = "none";
      btnFullscreen?.setAttribute("title", "Toàn màn hình");
    }

    setTimeout(handleResize, 120);
  };

  document.addEventListener("fullscreenchange", updateFullscreenUI);
  document.addEventListener("webkitfullscreenchange", updateFullscreenUI);

  // Resize window cập nhật PageFlip layout
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 100);
  });

  /* ---------------------------------------------------------
     8. LƯU / IN THỰC ĐƠN (PRINT PDF)
     --------------------------------------------------------- */
  $("#btnPrintMenu")?.addEventListener("click", () => {
    window.print();
  });

  /* ---------------------------------------------------------
     9. GIỎ "MÂM CƠM CỦA BẠN" (TRAY DRAWER SUPPORT)
     --------------------------------------------------------- */
  const TRAY_KEY = "anthoi_tray_items";
  let tray = [];
  try {
    const raw = localStorage.getItem(TRAY_KEY);
    if (raw) tray = JSON.parse(raw);
  } catch (e) { tray = []; }

  const badge = $("#trayCountBadge");
  if (badge) badge.textContent = tray.reduce((s, x) => s + x.qty, 0);

  const trayDrawer = $("#trayDrawer");
  $("#trayFloatBtn")?.addEventListener("click", () => {
    trayDrawer?.classList.add("is-open");
    trayDrawer?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
  $("#trayDrawerClose")?.addEventListener("click", () => {
    trayDrawer?.classList.remove("is-open");
    trayDrawer?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  });
  $("#trayDrawerBackdrop")?.addEventListener("click", () => {
    trayDrawer?.classList.remove("is-open");
    trayDrawer?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  });
})();
