/* Ăn Thôi - script chung: asset, header, menu, reveal, parallax, form */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* 1. Nạp asset từ assets-config.js. Thiếu file -> gỡ thẻ, giữ nền gradient. */
  const A = window.AN_THOI_ASSETS || {};
  $$("[data-asset]").forEach(el => {
    const src = A[el.dataset.asset]; if (!src) return;
    el.addEventListener("error", () => el.remove());
    el.src = src;
  });

  /* 2. Header đổi nền + hiện menu ngang khi cuộn */
  const header = $(".header");
  const onScroll = () => header.classList.toggle("is-solid", scrollY > 60 || !$(".hero"));
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* 3. Ngăn kéo menu bên phải */
  const burger = $(".burger"), drawer = $(".drawer");
  const setMenu = open => {
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", !open);
    burger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      if (window.__closeSocialMenu) window.__closeSocialMenu();
      $(".drawer__close").focus();
    } else if (drawer.contains(document.activeElement)) burger.focus();
  };
  burger.addEventListener("click", () => setMenu(!drawer.classList.contains("is-open")));
  $$(".drawer__close, .drawer__bg, .drawer__nav a, .drawer__foot a").forEach(el => el.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  /* 3b. Nút "Giảm chuyển động" ở footer (nhớ lựa chọn nếu trình duyệt cho phép) */
  const rm = $("#reduceMotion"), root = document.documentElement;
  const applyRm = on => {
    root.classList.toggle("reduce-motion", on);
    rm.setAttribute("aria-pressed", on);
    $("span", rm).textContent = on ? "Bật chuyển động" : "Giảm chuyển động";
    $$("video").forEach(v => on ? v.pause() : v.play().catch(() => {}));
  };
  let saved = false; try { saved = localStorage.getItem("anthoi-rm") === "1"; } catch (e) {}
  applyRm(saved);
  rm.addEventListener("click", () => {
    const on = !root.classList.contains("reduce-motion"); applyRm(on);
    try { localStorage.setItem("anthoi-rm", on ? "1" : "0"); } catch (e) {}
  });

  /* 4. Scroll reveal */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { threshold: .15 });
  $$(".reveal, .zoom").forEach(el => io.observe(el));

  /* 5. Parallax nhẹ cho hero (tắt khi reduced-motion hoặc màn hình nhỏ) */
  const heroMedia = $(".hero > .media");
  if (heroMedia && !root.classList.contains("reduce-motion") && !matchMedia("(prefers-reduced-motion: reduce), (max-width: 900px)").matches) {
    let busy = false;
    addEventListener("scroll", () => {
      if (busy) return; busy = true;
      requestAnimationFrame(() => { heroMedia.style.transform = `translate3d(0,${Math.min(scrollY, 900) * .18}px,0)`; busy = false; });
    }, { passive: true });
  }

  /* 6. Form đặt bàn: kiểm tra dữ liệu, CHƯA gửi đi đâu (chưa có backend) */
  const form = $("#booking");
  if (form) {
    try {
      const savedNote = localStorage.getItem("anthoi_booking_note");
      if (savedNote && $("#note", form)) {
        $("#note", form).value = savedNote;
        localStorage.removeItem("anthoi_booking_note");
      }
    } catch (err) {}
    $("#date").min = new Date().toISOString().slice(0, 10);
    form.addEventListener("submit", e => {
      e.preventDefault();
      let firstBad = null;
      $$(".field", form).forEach(f => {
        const i = $("input,select", f); if (!i || !i.required) return;
        let msg = "";
        if (!i.value.trim()) msg = "Vui lòng nhập thông tin này.";
        else if (i.name === "phone" && !/^(0|\+84)\d{8,10}$/.test(i.value.replace(/\s/g, ""))) msg = "Số điện thoại chưa đúng, ví dụ 0905 123 456.";
        $(".err", f).textContent = msg;
        if (msg && !firstBad) firstBad = i;
      });
      if (firstBad) return firstBad.focus();
      /* Khi có backend: fetch("/api/dat-ban", { method: "POST", body: new FormData(form) }) */
      $(".form__ok").hidden = false; form.reset();
    });
  }

  /* 7. Floating Social Media Menu */
  const floatSocial = $("#floatingSocial");
  if (floatSocial) {
    const floatToggle = $("#floatingSocialToggle", floatSocial);
    const floatItems = $("#floatingSocialItems", floatSocial);
    const items = $$(".floating-social__item", floatItems);

    const setSocialMenu = open => {
      floatSocial.classList.toggle("is-open", open);
      if (floatToggle) {
        floatToggle.setAttribute("aria-expanded", open ? "true" : "false");
        floatToggle.setAttribute("aria-label", open ? "Đóng danh sách mạng xã hội" : "Mở danh sách kết nối mạng xã hội Ăn Thôi");
      }
      if (floatItems) {
        floatItems.setAttribute("aria-hidden", open ? "false" : "true");
      }
      items.forEach(it => it.setAttribute("tabindex", open ? "0" : "-1"));
    };

    window.__closeSocialMenu = () => setSocialMenu(false);

    if (floatToggle) {
      floatToggle.addEventListener("click", e => {
        e.stopPropagation();
        setSocialMenu(!floatSocial.classList.contains("is-open"));
      });
    }

    // Đóng khi click ngoài
    document.addEventListener("click", e => {
      if (!floatSocial.contains(e.target) && floatSocial.classList.contains("is-open")) {
        setSocialMenu(false);
      }
    });

    // Đóng khi nhấn phím Escape
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && floatSocial.classList.contains("is-open")) {
        setSocialMenu(false);
        floatToggle?.focus();
      }
    });
  }

  /* 8. Language Selector – full i18n */
  const langSelect = $('#langSelect');
  if (langSelect) {
    const langBtn    = $('#langSelectBtn', langSelect);
    const langMenu   = $('#langSelectMenu', langSelect);
    const currentFlag = $('.lang-select__current-flag', langBtn);
    const currentCode = $('.lang-select__current-code', langBtn);
    const options    = $$('.lang-select__option', langMenu);

    /* Mở / đóng dropdown */
    const toggleLangMenu = open => {
      const isOpen = open !== undefined ? open : !langSelect.classList.contains('is-open');
      langSelect.classList.toggle('is-open', isOpen);
      langBtn?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    /* Áp dụng ngôn ngữ: cập nhật button + dịch nội dung */
    const activateLang = (code, flagSvg) => {
      /* Cập nhật button */
      if (code && currentCode) currentCode.textContent = code;
      if (flagSvg && currentFlag) currentFlag.innerHTML = flagSvg.outerHTML;

      /* Cập nhật trạng thái option */
      options.forEach(o => {
        const match = o.dataset.lang === code;
        o.classList.toggle('is-active', match);
        o.setAttribute('aria-selected', match ? 'true' : 'false');
      });

      /* Dịch trang */
      if (typeof window.applyLang === 'function') window.applyLang(code);

      /* Cập nhật nút Giảm/Bật chuyển động */
      const rmBtn = $('#reduceMotion');
      if (rmBtn) {
        const T = window.AN_THOI_I18N?.[code];
        if (T) {
          const isOn = document.documentElement.classList.contains('reduce-motion');
          $('span', rmBtn).textContent = isOn ? T.footer_rm_on : T.footer_rm;
        }
      }
    };

    /* Restore ngôn ngữ đã lưu */
    let savedLang = 'VI';
    try { savedLang = localStorage.getItem('anthoi-lang') || 'VI'; } catch(e) {}
    const savedOpt = options.find(o => o.dataset.lang === savedLang);
    if (savedOpt) {
      activateLang(savedLang, savedOpt.querySelector('.lang-flag'));
    }

    /* Click vào button dropdown */
    langBtn?.addEventListener('click', e => {
      e.stopPropagation();
      toggleLangMenu();
    });

    /* Click chọn ngôn ngữ */
    options.forEach(opt => {
      opt.addEventListener('click', e => {
        e.stopPropagation();
        const code   = opt.dataset.lang;
        const flagSvg = opt.querySelector('.lang-flag');
        activateLang(code, flagSvg);
        toggleLangMenu(false);
      });
    });

    /* Đóng khi click ngoài */
    document.addEventListener('click', e => {
      if (!langSelect.contains(e.target) && langSelect.classList.contains('is-open')) {
        toggleLangMenu(false);
      }
    });

    /* Đóng khi nhấn Escape */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && langSelect.classList.contains('is-open')) {
        toggleLangMenu(false);
        langBtn?.focus();
      }
    });
  }
  /* 9. Hệ thống nhà hàng – tab switching & map switching */
  const branchesSec = $('#he-thong-nha-hang');
  if (branchesSec) {
    const tabs      = $$('.branches-tab', branchesSec);
    const lists     = $$('.branches-list', branchesSec);
    const mapFrame  = $('#branchMap', branchesSec);

    /* Lấy src của chi nhánh đang active trong list hiện tại */
    const getActiveMap = (list) => {
      const active = $('.branches-item--active', list) || $('.branches-item', list);
      return active ? active.dataset.map : null;
    };

    /* Đổi map với hiệu ứng fade */
    const setMap = (src) => {
      if (!mapFrame || !src) return;
      if (mapFrame.getAttribute('src') === src) return;
      mapFrame.classList.add('is-loading');
      setTimeout(() => {
        mapFrame.src = src;
        const done = () => mapFrame.classList.remove('is-loading');
        mapFrame.onload = done;
        setTimeout(done, 1200);
      }, 180);
    };

    /* Activate một branch item */
    const activateItem = (item, list) => {
      $$('.branches-item--active', list).forEach(el => el.classList.remove('branches-item--active'));
      item.classList.add('branches-item--active');
      setMap(item.dataset.map);
    };

    /* Tab click */
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const brand = tab.dataset.brand;
        tabs.forEach(t => {
          t.classList.toggle('branches-tab--active', t === tab);
          t.setAttribute('aria-selected', t === tab);
        });
        lists.forEach(list => {
          const isTarget = list.id === `branches-${brand}`;
          list.classList.toggle('branches-list--hidden', !isTarget);
          if (isTarget) setMap(getActiveMap(list));
        });
      });
    });

    /* Branch item click */
    lists.forEach(list => {
      $$('.branches-item', list).forEach(item => {
        item.addEventListener('click', () => activateItem(item, list));
      });
    });
  }

  /* 10. Hành trình Trưởng Thành – carousel */
  const journeyCarousel = $('#journeyCarousel');
  if (journeyCarousel) {
    const textSlides = $$('.journey-text-slide', journeyCarousel);
    const mediaSlides = $$('.journey-media-slide', journeyCarousel);
    const prevBtn = $('#journeyPrev', journeyCarousel);
    const nextBtn = $('#journeyNext', journeyCarousel);
    const total = textSlides.length;
    let currentIndex = 0;
    let isBusy = false;

    const goTo = (idx) => {
      if (isBusy || total <= 1) return;
      isBusy = true;
      currentIndex = (idx + total) % total;

      textSlides.forEach((slide, i) => {
        const active = i === currentIndex;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', !active);
      });

      mediaSlides.forEach((slide, i) => {
        const active = i === currentIndex;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', !active);
      });

      setTimeout(() => { isBusy = false; }, 360);
    };

    prevBtn?.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn?.addEventListener('click', () => goTo(currentIndex + 1));

    // Keyboard support
    journeyCarousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { goTo(currentIndex - 1); }
      else if (e.key === 'ArrowRight') { goTo(currentIndex + 1); }
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    journeyCarousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    journeyCarousel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goTo(currentIndex + 1);
        else goTo(currentIndex - 1);
      }
    }, { passive: true });
  }
})();