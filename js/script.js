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
})();