/* =========================================================
   THỰC ĐƠN ĂN THÔI - MENU LOGIC
   Tìm kiếm tức thì, lọc thực dưỡng, chuyển chế độ xem,
   chi tiết món ăn & "Mâm cơm của bạn" tương tác.
   ========================================================= */
(() => {
  const D = window.AN_THOI_DATA || {};
  const M = D.menu || { signature: [], categories: [], drinks: [], combos: [] };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* Helper format tiền tệ VNĐ */
  const fmtMoney = n => typeof n === "number" ? n.toLocaleString("vi-VN") + " đ" : String(n);

  /* Helper refresh reveal animation cho các phần tử mới render */
  const refreshReveal = () => {
    $$(".reveal:not(.is-in)").forEach(el => {
      if (window.IntersectionObserver) {
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              obs.unobserve(e.target);
            }
          });
        }, { threshold: 0.08 });
        obs.observe(el);
      } else {
        el.classList.add("is-in");
      }
    });
  };

  /* Fallback ảnh an toàn: gỡ bỏ nếu lỗi */
  const imgTag = (src, alt, cls = "") => {
    if (!src) return "";
    return `<img src="${esc(src)}" alt="${esc(alt)}" class="${cls}" loading="lazy" onerror="this.style.display='none';">`;
  };

  /* Quản lý "Mâm Cơm Của Bạn" (Tray State in localStorage) */
  const TRAY_KEY = "anthoi_tray_items";
  let tray = [];
  try {
    const raw = localStorage.getItem(TRAY_KEY);
    if (raw) tray = JSON.parse(raw);
  } catch (e) { tray = []; }

  const saveTray = () => {
    try { localStorage.setItem(TRAY_KEY, JSON.stringify(tray)); } catch (e) {}
    updateTrayUI();
  };

  const showToast = msg => {
    let toast = $(".menu-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "menu-toast";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>${esc(msg)}</span>`;
    toast.classList.add("is-show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("is-show"), 2800);
  };

  const addToTray = (item, qty = 1) => {
    const existing = tray.find(x => x.id === item.id);
    if (existing) {
      existing.qty += qty;
    } else {
      tray.push({
        id: item.id,
        name: item.name,
        price: item.price,
        priceNum: item.priceNum || parseInt(String(item.price).replace(/\D/g, "")) || 0,
        image: item.image || "",
        qty: qty
      });
    }
    saveTray();
    showToast(`Đã thêm “${item.name}” vào Mâm Cơm`);
  };

  const updateTrayQty = (id, delta) => {
    const item = tray.find(x => x.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      tray = tray.filter(x => x.id !== id);
    }
    saveTray();
  };

  const removeFromTray = id => {
    tray = tray.filter(x => x.id !== id);
    saveTray();
  };

  const clearTray = () => {
    tray = [];
    saveTray();
  };

  /* UI Cập nhật Giỏ Mâm Cơm */
  const updateTrayUI = () => {
    const totalCount = tray.reduce((sum, x) => sum + x.qty, 0);
    const totalPrice = tray.reduce((sum, x) => sum + (x.priceNum * x.qty), 0);

    const badge = $("#trayCountBadge");
    if (badge) badge.textContent = totalCount;

    const bodyEl = $("#trayDrawerBody");
    const footEl = $("#trayDrawerFoot");

    if (bodyEl && footEl) {
      if (tray.length === 0) {
        bodyEl.innerHTML = `
          <div class="tray-drawer__empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <p><strong>Mâm cơm của bạn đang trống</strong></p>
            <p style="font-size:.9rem;margin-top:6px;line-height:1.6">Hãy chọn các món ăn ưng ý để lên thực đơn trọn vẹn và ước tính chi phí trước khi đặt bàn.</p>
          </div>
        `;
        footEl.style.display = "none";
      } else {
        bodyEl.innerHTML = tray.map(item => `
          <div class="tray-item">
            <div class="tray-item__info">
              <div class="tray-item__name">${esc(item.name)}</div>
              <div class="tray-item__price">${fmtMoney(item.priceNum)}</div>
            </div>
            <div class="tray-item__qty">
              <button type="button" class="tray-item__btn" data-act="dec" data-id="${esc(item.id)}" aria-label="Giảm">-</button>
              <span class="tray-item__val">${item.qty}</span>
              <button type="button" class="tray-item__btn" data-act="inc" data-id="${esc(item.id)}" aria-label="Tăng">+</button>
            </div>
            <button type="button" class="tray-item__del" data-act="del" data-id="${esc(item.id)}" aria-label="Xóa">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        `).join("");

        /* Gợi ý khẩu phần thông minh */
        let hint = "Mâm cơm nhẹ nhàng cho 1 - 2 người.";
        if (totalCount >= 7) hint = "Mâm cơm phong phú thịnh soạn cho 5 - 8 người.";
        else if (totalCount >= 4) hint = "Mâm cơm cân bằng đầy đủ dinh dưỡng cho 3 - 4 người.";

        footEl.style.display = "flex";
        footEl.innerHTML = `
          <div class="tray-balance-hint">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>${hint}</span>
          </div>
          <div class="tray-summary-row">
            <span>Tạm tính (${totalCount} món):</span>
            <strong>${fmtMoney(totalPrice)}</strong>
          </div>
          <button type="button" class="btn btn--green" id="btnBookWithTray" style="width:100%;justify-content:center">
            <span>Đặt bàn với mâm cơm này</span>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 13 13 3M5 3h8v8"/></svg>
          </button>
          <div style="display:flex;justify-content:space-between;gap:12px;margin-top:6px">
            <button type="button" class="btn btn--ghost" id="btnClearTray" style="font-size:.82rem;padding:0 12px;min-height:38px;color:var(--muted);border-color:var(--line)">Xóa mâm cơm</button>
            <button type="button" class="btn btn--ghost" id="btnCopyTray" style="font-size:.82rem;padding:0 12px;min-height:38px;color:var(--green);border-color:var(--line)">Sao chép danh sách</button>
          </div>
        `;
      }
    }
  };

  /* Event Delegation cho Tray Drawer */
  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const act = btn.dataset.act, id = btn.dataset.id;
    if (act === "inc") updateTrayQty(id, 1);
    if (act === "dec") updateTrayQty(id, -1);
    if (act === "del") removeFromTray(id);
  });

  /* Mở / Đóng Drawer Mâm Cơm */
  const trayDrawer = $("#trayDrawer");
  const openTray = () => {
    if (!trayDrawer) return;
    trayDrawer.classList.add("is-open");
    trayDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeTray = () => {
    if (!trayDrawer) return;
    trayDrawer.classList.remove("is-open");
    trayDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  $("#trayFloatBtn")?.addEventListener("click", openTray);
  $("#trayDrawerClose")?.addEventListener("click", closeTray);
  $("#trayDrawerBackdrop")?.addEventListener("click", closeTray);

  /* Xử lý hành động từ chân Drawer */
  document.addEventListener("click", e => {
    if (e.target.closest("#btnClearTray")) {
      if (confirm("Bạn có chắc chắn muốn xóa tất cả món đã chọn khỏi mâm cơm?")) {
        clearTray();
      }
    }
    if (e.target.closest("#btnCopyTray")) {
      const text = "MÂM CƠM ĂN THÔI:\n" + tray.map(x => `- ${x.name} x${x.qty} (${fmtMoney(x.priceNum * x.qty)})`).join("\n")
        + `\nTổng cộng: ${fmtMoney(tray.reduce((s, x) => s + (x.priceNum * x.qty), 0))}`;
      navigator.clipboard?.writeText(text).then(() => showToast("Đã sao chép danh sách món!"));
    }
    if (e.target.closest("#btnBookWithTray")) {
      const summary = "Món chọn trước tại Thực đơn:\n" + tray.map(x => `- ${x.name} x${x.qty}`).join("\n");
      try {
        localStorage.setItem("anthoi_booking_note", summary);
      } catch (err) {}
      window.location.href = "lien-he.html#dat-ban";
    }
  });

  /* --- MODAL CHI TIẾT MÓN ĂN (QUICK VIEW) --- */
  const modal = $("#dishModal");
  const modalMedia = $("#dishModalMedia");
  const modalTitle = $("#dishModalTitle");
  const modalEn = $("#dishModalEn");
  const modalPrice = $("#dishModalPrice");
  const modalDesc = $("#dishModalDesc");
  const modalDetails = $("#dishModalDetails");
  const modalAddBtn = $("#dishModalAddBtn");

  let currentModalItem = null;

  const openDishModal = item => {
    currentModalItem = item;
    if (!modal) return;
    if (modalMedia) {
      modalMedia.innerHTML = item.image
        ? `<img src="${esc(item.image)}" alt="${esc(item.name)}" onerror="this.remove()">`
        : "";
    }
    if (modalTitle) modalTitle.textContent = item.name;
    if (modalEn) modalEn.textContent = item.enName || "";
    if (modalPrice) modalPrice.textContent = item.price;
    if (modalDesc) modalDesc.textContent = item.desc || "";

    if (modalDetails) {
      let html = "";
      if (item.story) {
        html += `<div><strong>Câu chuyện món ăn:</strong> <span style="font-style:italic;color:var(--muted)">${esc(item.story)}</span></div>`;
      }
      if (item.pairing) {
        html += `<div style="color:var(--gold-d)"><strong>Gợi ý thức uống:</strong> <span>${esc(item.pairing)}</span></div>`;
      }
      const tags = [];
      if (item.vegetarian) tags.push("🌱 Món chay thanh tịnh");
      if (item.spicy) tags.push(`🌶️ Cay nhẹ (Mức ${item.spicy}/3)`);
      if (item.tags) item.tags.forEach(t => tags.push(`• ${t}`));
      if (tags.length) {
        html += `<div><strong>Đặc điểm:</strong> <span>${tags.map(esc).join(" &nbsp; ")}</span></div>`;
      }
      modalDetails.innerHTML = html;
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeDishModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    currentModalItem = null;
  };

  $("#dishModalClose")?.addEventListener("click", closeDishModal);
  $("#dishModalBackdrop")?.addEventListener("click", closeDishModal);
  modalAddBtn?.addEventListener("click", () => {
    if (currentModalItem) {
      addToTray(currentModalItem, 1);
      closeDishModal();
    }
  });

  window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeDishModal();
      closeTray();
    }
  });

  /* --- TÌM KIẾM, LỌC & CHẾ ĐỘ XEM (STATE) --- */
  let activeDiet = "all";
  let searchQuery = "";
  let viewMode = "grid"; // 'grid' | 'book'

  try {
    const savedMode = localStorage.getItem("anthoi_menu_view");
    if (savedMode === "book" || savedMode === "grid") viewMode = savedMode;
  } catch (e) {}

  /* Map all items for quick lookup */
  const allItems = [];
  (M.signature || []).forEach(x => allItems.push(x));
  (M.categories || []).forEach(c => (c.items || []).forEach(x => allItems.push(x)));
  (M.drinks || []).forEach(x => allItems.push(x));

  /* Filter evaluation */
  const matchesFilter = item => {
    // Diet filter
    if (activeDiet === "best" && !(item.tags && item.tags.includes("Bán chạy"))) return false;
    if (activeDiet === "veg" && !item.vegetarian && !(item.tags && item.tags.includes("Chay thực dưỡng"))) return false;
    if (activeDiet === "sea" && !(item.tags && (item.tags.includes("Hải sản tươi") || item.tags.includes("Hải sản")))) return false;
    if (activeDiet === "spicy" && !item.spicy) return false;

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      const name = (item.name || "").toLowerCase();
      const en = (item.enName || "").toLowerCase();
      const desc = (item.desc || "").toLowerCase();
      const tags = (item.tags || []).join(" ").toLowerCase();
      if (!name.includes(q) && !en.includes(q) && !desc.includes(q) && !tags.includes(q)) {
        return false;
      }
    }
    return true;
  };

  /* Render Signature Section */
  const renderSignatures = () => {
    const sigContainer = $("#signature");
    if (!sigContainer) return;
    const items = (M.signature || []).filter(matchesFilter);

    if (items.length === 0) {
      sigContainer.innerHTML = `<p class="muted" style="text-align:center;padding:30px">Không có món đặc trưng nào phù hợp với bộ lọc hiện tại.</p>`;
      return;
    }

    sigContainer.innerHTML = items.map((item, idx) => `
      <article class="signature-card reveal ${idx % 2 ? 'signature-card--rev' : ''}">
        <div class="signature-card__media">
          ${item.tags && item.tags.length ? `<span class="badge badge--solid signature-card__badge">★ ${esc(item.tags[0])}</span>` : ""}
          ${imgTag(item.image, item.name)}
        </div>
        <div class="signature-card__info">
          <p class="eyebrow" style="color:var(--gold-d);margin-bottom:8px">Bếp Trưởng Tuyển Chọn</p>
          <h3 style="font-size:clamp(1.8rem, 2.8vw, 2.5rem);margin-bottom:6px;cursor:pointer" data-detail-id="${esc(item.id)}">${esc(item.name)}</h3>
          ${item.enName ? `<p class="signature-card__en">${esc(item.enName)}</p>` : ""}
          <p style="color:var(--brown);font-size:1.02rem;line-height:1.7;margin-bottom:14px">${esc(item.desc)}</p>
          ${item.story ? `<p class="signature-card__story">${esc(item.story)}</p>` : ""}
          ${item.pairing ? `<div class="signature-card__pairing">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 22h8M12 11v11M5 2h14l-2 9H7L5 2Z"/></svg>
            <span>${esc(item.pairing)}</span>
          </div>` : ""}
          <div class="signature-card__bottom">
            <div class="signature-card__price">${esc(item.price)}</div>
            <div class="signature-card__btns">
              <button type="button" class="btn btn-add-tray" data-item-id="${esc(item.id)}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Thêm vào mâm</span>
              </button>
              <button type="button" class="btn btn--ghost" style="padding:0 16px;min-height:42px;color:var(--green);border-color:var(--line)" data-detail-id="${esc(item.id)}">
                <span>Chi tiết</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    `).join("");
    refreshReveal();
  };

  /* Render Regular Menu Groups (Grid or Book) */
  const renderMenuGroups = () => {
    const groupsContainer = $("#menu-groups");
    if (!groupsContainer) return;

    const categories = M.categories || [];
    let totalRendered = 0;

    let html = "";
    categories.forEach(cat => {
      const filteredItems = (cat.items || []).filter(matchesFilter);
      if (filteredItems.length === 0) return;
      totalRendered += filteredItems.length;

      html += `<section class="menu-group-wrap" id="${esc(cat.id || '')}">
        <div class="menu-group-header reveal">
          <div>
            <h2>${esc(cat.name)}</h2>
            ${cat.enName ? `<p style="font-family:var(--f-head);font-style:italic;color:var(--gold-d)">${esc(cat.enName)}</p>` : ""}
            ${cat.desc ? `<p style="margin-top:6px">${esc(cat.desc)}</p>` : ""}
          </div>
          <span class="badge badge--green">${filteredItems.length} món</span>
        </div>`;

      if (viewMode === "grid") {
        html += `<div class="menu-grid">
          ${filteredItems.map(item => `
            <article class="dish-card reveal">
              <div class="dish-card__media">
                ${item.tags && item.tags.length ? `
                  <div class="dish-card__tags">
                    ${item.tags.map(t => `<span class="badge ${t === 'Bán chạy' || t === 'Signature' ? 'badge--solid' : 'badge--green'}">${esc(t)}</span>`).join("")}
                  </div>` : ""}
                ${imgTag(item.image, item.name)}
                <button type="button" class="dish-card__quick-view" data-detail-id="${esc(item.id)}" aria-label="Xem chi tiết món">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <span>Xem nhanh</span>
                </button>
              </div>
              <div class="dish-card__body">
                <div class="dish-card__title-row">
                  <h3 style="cursor:pointer" data-detail-id="${esc(item.id)}">${esc(item.name)}</h3>
                </div>
                ${item.enName ? `<p class="dish-card__en">${esc(item.enName)}</p>` : ""}
                <p class="dish-card__desc">${esc(item.desc)}</p>
                <div class="dish-card__foot">
                  <span class="dish-card__price">${esc(item.price)}</span>
                  <button type="button" class="btn-add-tray" data-item-id="${esc(item.id)}" title="Thêm vào mâm cơm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    <span>Thêm</span>
                  </button>
                </div>
              </div>
            </article>
          `).join("")}
        </div>`;
      } else {
        /* Classic Book View */
        html += `<div class="menu-book-view reveal">
          ${filteredItems.map(item => `
            <div class="book-item">
              <div class="book-item__row">
                <span class="book-item__name" style="cursor:pointer" data-detail-id="${esc(item.id)}">${esc(item.name)}</span>
                <span class="book-item__dots"></span>
                <span class="book-item__price">${esc(item.price)}</span>
              </div>
              ${item.enName ? `<div class="book-item__en">${esc(item.enName)}</div>` : ""}
              <div class="book-item__desc">${esc(item.desc)}</div>
              <div class="book-item__actions">
                <button type="button" class="btn-add-tray" style="padding:4px 10px;font-size:.78rem" data-item-id="${esc(item.id)}">+ Thêm vào mâm</button>
                <button type="button" class="btn btn--ghost" style="padding:4px 10px;min-height:30px;font-size:.78rem;color:var(--green);border-color:var(--line)" data-detail-id="${esc(item.id)}">Chi tiết</button>
              </div>
            </div>
          `).join("")}
        </div>`;
      }

      html += `</section>`;
    });

    if (totalRendered === 0) {
      groupsContainer.innerHTML = `
        <div style="text-align:center;padding:60px 20px;background:var(--cream);border:1px dashed var(--line);margin:40px 0">
          <p style="font-size:1.2rem;font-family:var(--f-head);color:var(--green);margin-bottom:8px">Không tìm thấy món ăn phù hợp</p>
          <p style="color:var(--muted)">Hãy thử đổi từ khóa tìm kiếm hoặc chọn bộ lọc món ăn khác.</p>
        </div>
      `;
    } else {
      groupsContainer.innerHTML = html;
    }
    refreshReveal();
  };

  /* Render Drinks */
  const renderDrinks = () => {
    const drinksContainer = $("#drinks");
    if (!drinksContainer) return;
    const items = (M.drinks || []).filter(matchesFilter);

    if (items.length === 0) {
      drinksContainer.innerHTML = `<p class="muted" style="text-align:center;padding:30px">Không có thức uống phù hợp với bộ lọc.</p>`;
      return;
    }

    if (viewMode === "grid") {
      drinksContainer.innerHTML = `<div class="menu-grid">
        ${items.map(item => `
          <article class="dish-card reveal">
            <div class="dish-card__media">
              ${item.tags && item.tags.length ? `
                <div class="dish-card__tags">
                  ${item.tags.map(t => `<span class="badge ${t === 'Bán chạy' || t === 'Signature' ? 'badge--solid' : 'badge--green'}">${esc(t)}</span>`).join("")}
                </div>` : ""}
              ${imgTag(item.image, item.name)}
              <button type="button" class="dish-card__quick-view" data-detail-id="${esc(item.id)}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <span>Xem nhanh</span>
              </button>
            </div>
            <div class="dish-card__body">
              <div class="dish-card__title-row">
                <h3 style="cursor:pointer" data-detail-id="${esc(item.id)}">${esc(item.name)}</h3>
              </div>
              ${item.enName ? `<p class="dish-card__en">${esc(item.enName)}</p>` : ""}
              <p class="dish-card__desc">${esc(item.desc)}</p>
              <div class="dish-card__foot">
                <span class="dish-card__price">${esc(item.price)}</span>
                <button type="button" class="btn-add-tray" data-item-id="${esc(item.id)}">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>Thêm</span>
                </button>
              </div>
            </div>
          </article>
        `).join("")}
      </div>`;
    } else {
      drinksContainer.innerHTML = `<div class="menu-book-view reveal">
        ${items.map(item => `
          <div class="book-item">
            <div class="book-item__row">
              <span class="book-item__name" style="cursor:pointer" data-detail-id="${esc(item.id)}">${esc(item.name)}</span>
              <span class="book-item__dots"></span>
              <span class="book-item__price">${esc(item.price)}</span>
            </div>
            ${item.enName ? `<div class="book-item__en">${esc(item.enName)}</div>` : ""}
            <div class="book-item__desc">${esc(item.desc)}</div>
            <div class="book-item__actions">
              <button type="button" class="btn-add-tray" style="padding:4px 10px;font-size:.78rem" data-item-id="${esc(item.id)}">+ Thêm vào mâm</button>
              <button type="button" class="btn btn--ghost" style="padding:4px 10px;min-height:30px;font-size:.78rem;color:var(--green);border-color:var(--line)" data-detail-id="${esc(item.id)}">Chi tiết</button>
            </div>
          </div>
        `).join("")}
      </div>`;
    }
    refreshReveal();
  };

  /* Render Combos & Sets */
  const renderCombos = () => {
    const combosContainer = $("#combos");
    if (!combosContainer) return;
    const items = M.combos || [];

    combosContainer.innerHTML = `<div class="combos-grid">
      ${items.map((c, i) => `
        <article class="combo-card reveal ${i === 1 ? 'combo-card--featured' : ''}">
          ${i === 1 ? `<div class="combo-card__ribbon">Được Yêu Thích</div>` : ""}
          <div class="combo-card__media">
            ${imgTag(c.image, c.name)}
          </div>
          <div class="combo-card__body">
            <div class="combo-card__badge-row">
              <span class="badge badge--solid">${esc(c.forGuests || 'Set Tiệc')}</span>
              ${c.highlight ? `<span class="badge badge--green">${esc(c.highlight)}</span>` : ""}
            </div>
            <h3>${esc(c.name)}</h3>
            ${c.enName ? `<p class="combo-card__en">${esc(c.enName)}</p>` : ""}
            <p style="color:var(--muted);font-size:.94rem;line-height:1.6;margin-bottom:18px">${esc(c.desc)}</p>
            ${c.detailItems && c.detailItems.length ? `
              <ul class="combo-card__items">
                ${c.detailItems.map(m => `
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>${esc(m)}</span>
                  </li>
                `).join("")}
              </ul>` : ""}
            <div class="combo-card__price-box">
              <div>
                ${c.originalPrice ? `<span class="combo-card__orig-price">${esc(c.originalPrice)}</span>` : ""}
                <span class="combo-card__current-price">${esc(c.price)}</span>
              </div>
              ${c.savings ? `<span class="combo-card__savings">${esc(c.savings)}</span>` : ""}
            </div>
            <button type="button" class="btn btn--green" style="width:100%;justify-content:center" data-combo-id="${esc(c.id)}">
              <span>Chọn trọn bộ Set này</span>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 13 13 3M5 3h8v8"/></svg>
            </button>
          </div>
        </article>
      `).join("")}
    </div>`;
    refreshReveal();
  };

  /* Xử lý tương tác thêm món / xem chi tiết toàn trang */
  document.addEventListener("click", e => {
    // Thêm món lẻ
    const addBtn = e.target.closest("[data-item-id]");
    if (addBtn) {
      const id = addBtn.dataset.itemId;
      const item = allItems.find(x => x.id === id);
      if (item) addToTray(item, 1);
      return;
    }

    // Thêm trọn bộ Combo
    const comboBtn = e.target.closest("[data-combo-id]");
    if (comboBtn) {
      const id = comboBtn.dataset.comboId;
      const combo = (M.combos || []).find(x => x.id === id);
      if (combo) {
        addToTray({
          id: combo.id,
          name: combo.name,
          price: combo.price,
          priceNum: combo.priceNum,
          image: combo.image
        }, 1);
      }
      return;
    }

    // Xem chi tiết món
    const detailBtn = e.target.closest("[data-detail-id]");
    if (detailBtn) {
      const id = detailBtn.dataset.detailId;
      const item = allItems.find(x => x.id === id);
      if (item) openDishModal(item);
      return;
    }
  });

  /* Gắn sự kiện Search & Filters */
  const searchInput = $("#menuSearchInput");
  const searchClear = $("#menuSearchClear");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchQuery = searchInput.value.trim();
      if (searchClear) searchClear.style.display = searchQuery ? "grid" : "none";
      renderSignatures();
      renderMenuGroups();
      renderDrinks();
    });
  }
  if (searchClear) {
    searchClear.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      searchQuery = "";
      searchClear.style.display = "none";
      renderSignatures();
      renderMenuGroups();
      renderDrinks();
      searchInput?.focus();
    });
  }

  /* Category Tabs - Cuộn êm đến mục tương ứng */
  const catTabs = $$(".cat-tab");
  catTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      catTabs.forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      const targetId = tab.dataset.cat;
      if (targetId === "all") {
        const el = $("#danh-muc") || $("#mon-dac-trung");
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 130;
          window.scrollTo({ top, behavior: "smooth" });
        }
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 130;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    });
  });

  /* Dietary Filter Chips */
  const dietChips = $$(".diet-chip");
  dietChips.forEach(chip => {
    chip.addEventListener("click", () => {
      dietChips.forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeDiet = chip.dataset.diet || "all";
      renderSignatures();
      renderMenuGroups();
      renderDrinks();
    });
  });

  /* Chế độ xem: Grid vs Book */
  const viewBtns = $$(".view-btn");
  viewBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      viewBtns.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      viewMode = btn.dataset.view || "grid";
      try { localStorage.setItem("anthoi_menu_view", viewMode); } catch (e) {}
      renderMenuGroups();
      renderDrinks();
    });
  });

  // Khôi phục viewMode ban đầu
  const activeViewBtn = $(`[data-view="${viewMode}"]`);
  if (activeViewBtn) {
    viewBtns.forEach(b => b.classList.remove("is-active"));
    activeViewBtn.classList.add("is-active");
  }

  /* Khởi tạo hiển thị ban đầu */
  renderSignatures();
  renderMenuGroups();
  renderDrinks();
  renderCombos();
  updateTrayUI();

  /* Nút in / tải thực đơn PDF */
  $("#btnPrintMenu")?.addEventListener("click", () => {
    window.print();
  });
})();
