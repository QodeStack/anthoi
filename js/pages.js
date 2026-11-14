/* Ăn Thôi - hiển thị Thực đơn, Blog/Journal và trang chi tiết bài viết từ js/data.js.
   File này nạp TRƯỚC script.js để hiệu ứng reveal áp dụng được cho nội dung vừa tạo. */
(() => {
  const D = window.AN_THOI_DATA || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const img = (src, alt) => src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" onerror="this.remove()">` : "";

  /* ---------- THỰC ĐƠN ---------- */
  const dish = i => `<article class="card2 reveal"><div class="media">${img(i.image, i.name)}</div>
    <div class="card2__b"><div class="card2__row"><h3>${esc(i.name)}</h3><span class="price">${esc(i.price)}</span></div><p>${esc(i.desc)}</p></div></article>`;
  const cards = list => `<div class="cards">${list.map(dish).join("")}</div>`;

  const sig = $("#signature");
  if (sig && D.menu) sig.innerHTML = D.menu.signature.map((i, n) => `<article class="row reveal${n % 2 ? " row--rev" : ""}">
    <div class="media zoom">${img(i.image, i.name)}</div>
    <div class="row__t"><p class="eyebrow">Món đặc trưng</p><h3>${esc(i.name)}</h3><p>${esc(i.desc)}</p><p class="note">${esc(i.story)}</p></div></article>`).join("");

  const groups = $("#menu-groups"), chips = $("#menu-chips");
  if (groups && D.menu) {
    groups.innerHTML = D.menu.categories.map(c => `<div class="menu-group" data-cat="${esc(c.name)}"><h3 class="group-title">${esc(c.name)}</h3>${cards(c.items)}</div>`).join("");
    const names = ["Tất cả", ...D.menu.categories.map(c => c.name)];
    chips.innerHTML = names.map((n, k) => `<button type="button" class="chip" aria-pressed="${k === 0}">${esc(n)}</button>`).join("");
    chips.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      [...chips.children].forEach(x => x.setAttribute("aria-pressed", x === b));
      groups.querySelectorAll(".menu-group").forEach(g => g.hidden = b.textContent !== "Tất cả" && g.dataset.cat !== b.textContent);
    });
  }
  if ($("#drinks") && D.menu) $("#drinks").innerHTML = cards(D.menu.drinks);
  if ($("#combos") && D.menu) $("#combos").innerHTML = cards(D.menu.combos);

  /* ---------- BLOG / JOURNAL FILTERING ---------- */
  const blogChips = $("#blog-chips");
  const blogGrid = $("#blog-grid");
  const blogFeat = $("#blog-featured-wrap");
  if (blogChips && blogGrid) {
    blogChips.addEventListener("click", e => {
      const btn = e.target.closest(".blog-chip");
      if (!btn) return;
      $$(".blog-chip", blogChips).forEach(b => b.setAttribute("aria-pressed", b === btn));
      const targetCat = btn.dataset.cat || btn.textContent.trim();
      
      const cards = $$(".blog-card", blogGrid);
      cards.forEach(c => {
        const cat = c.dataset.cat || "";
        const show = targetCat === "Tất cả" || cat === targetCat;
        c.style.display = show ? "" : "none";
      });

      if (blogFeat) {
        const featCat = blogFeat.dataset.cat || "";
        const showFeat = targetCat === "Tất cả" || featCat === targetCat;
        blogFeat.style.display = showFeat ? "" : "none";
      }
    });
  }

  /* Legacy Journal Support */
  const posts = (D.journal && D.journal.posts) || [];
  const link = p => `bai-viet.html?id=${encodeURIComponent(p.id)}`;
  const featEl = $("#featured");
  if (featEl && posts.length) {
    const f = posts.find(p => p.featured) || posts[0];
    featEl.innerHTML = `<a class="feat reveal" href="${link(f)}"><div class="media zoom">${img(f.image, f.title)}</div>
      <div class="feat__t"><p class="eyebrow">Bài viết nổi bật · ${esc(f.category)}</p><h2>${esc(f.title)}</h2><p class="muted">${esc(f.excerpt)}</p>
      <span class="link">Đọc bài viết <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M3 10h14M11 4l6 6-6 6"/></svg></span><small class="date">${esc(f.date)}</small></div></a>`;
  }
  const jgrid = $("#journal-grid"), jchips = $("#journal-chips");
  if (jgrid) {
    const draw = cat => {
      const list = posts.filter(p => !cat || p.category === cat);
      jgrid.innerHTML = list.length ? list.map(p => `<a class="card2 card2--post" href="${link(p)}"><div class="media">${img(p.image, p.title)}</div>
        <div class="card2__b"><p class="meta"><span>${esc(p.category)}</span><span>${esc(p.date)}</span></p><h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p></div></a>`).join("")
        : `<p class="muted">Chưa có bài viết trong chủ đề này.</p>`;
    };
    draw("");
    const cats = ["Tất cả", ...((D.journal && D.journal.categories) || [])];
    jchips.innerHTML = cats.map((n, k) => `<button type="button" class="chip" aria-pressed="${k === 0}">${esc(n)}</button>`).join("");
    jchips.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      [...jchips.children].forEach(x => x.setAttribute("aria-pressed", x === b));
      draw(b.textContent === "Tất cả" ? "" : b.textContent);
    });
  }

  /* ---------- CHI TIẾT BÀI VIẾT (bai-viet.html?id=...) ---------- */
  const articleRoot = $("#article-view");
  if (articleRoot) {
    const params = new URLSearchParams(location.search);
    const queryId = (params.get("id") || "hoian").toLowerCase();
    
    // Tìm bài viết theo id hoặc numericId
    const post = posts.find(p => p.id.toLowerCase() === queryId || p.numericId === queryId) || posts[0];
    
    if (post) {
      document.title = `${post.title} - Ăn Thôi`;
      
      // Cập nhật breadcrumb & meta
      const breadTitle = $("#article-breadcrumb-title");
      if (breadTitle) breadTitle.textContent = post.title;
      
      const categoryBadge = $("#article-category");
      if (categoryBadge) categoryBadge.textContent = post.category;
      
      const headTitle = $("#article-title");
      if (headTitle) headTitle.textContent = post.title;
      
      const dateEl = $("#article-date");
      if (dateEl) dateEl.textContent = post.date;

      const readTimeEl = $("#article-readtime");
      if (readTimeEl) readTimeEl.textContent = post.readTime || "5 phút đọc";

      // Ẩn/hiện container tương ứng theo bài viết
      const hoianContent = $("#content-hoian");
      const danangContent = $("#content-danang");
      const michelinContent = $("#content-michelin");

      if (hoianContent) hoianContent.hidden = (post.id !== "hoian" && post.numericId !== "2");
      if (danangContent) danangContent.hidden = (post.id !== "danang" && post.numericId !== "1");
      if (michelinContent) michelinContent.hidden = (post.id !== "michelin" && post.numericId !== "3");

      /* ---------- COMMENTS SECTION (bai-viet.html) ---------- */
      const commentsSection = $("#comments-section");
      if (commentsSection) {
        const DEFAULT_COMMENTS = {
          danang: [
            {
              id: "cm_dn_1",
              name: "Trần Minh Tuấn",
              rating: 5,
              date: "2 ngày trước",
              text: "Mì Quảng và bánh tráng cuốn thịt heo ở đây rất chuẩn vị Đà Nẵng, nước chấm đậm đà khó quên. Lần nào có dịp ghé Đà Nẵng tôi cũng phải ghé Ăn Thôi một bữa."
            },
            {
              id: "cm_dn_2",
              name: "Nguyễn Hoàng Mai",
              rating: 5,
              date: "1 tuần trước",
              text: "Không gian bên Bạch Đằng ngắm sông Hàn cực chill, đồ ăn lên nóng hổi và bày biện rất chỉn chu. Nhân viên phục vụ rất nhiệt tình, chu đáo."
            }
          ],
          hoian: [
            {
              id: "cm_ha_1",
              name: "Lê Thu Thảo",
              rating: 5,
              date: "3 ngày trước",
              text: "Không gian nhà hàng tại Hội An mang đậm nét hoài cổ với tường vàng và đèn lồng ấm cúng. Cao lầu và cơm gà ở đây thực sự để lại ấn tượng sâu đậm."
            },
            {
              id: "cm_ha_2",
              name: "David Harrison",
              rating: 5,
              date: "5 ngày trước",
              text: "An unforgettable dinner in Hoi An! The dishes were exceptionally authentic, flavorful, and the atmosphere transported us back in time."
            }
          ],
          michelin: [
            {
              id: "cm_mc_1",
              name: "Phan Quốc Bảo",
              rating: 5,
              date: "Hôm qua",
              text: "Hoàn toàn xứng đáng với danh hiệu Michelin Bib Gourmand 3 năm liên tiếp! Chất lượng nguyên liệu rất tươi ngon, gia vị nêm nếm rất tròn trịa."
            },
            {
              id: "cm_mc_2",
              name: "Đỗ Diệu Hương",
              rating: 5,
              date: "4 ngày trước",
              text: "Tự hào khi ẩm thực miền Trung có những đại diện chỉn chu và tâm huyết như Ăn Thôi. Chúc nhà hàng ngày càng phát triển và giữ vững phong độ!"
            }
          ]
        };

        const postKey = (post.id || "hoian").toLowerCase();
        const storageKey = `anthoi_comments_${postKey}`;

        const getComments = () => {
          try {
            const saved = localStorage.getItem(storageKey);
            if (saved) return JSON.parse(saved);
          } catch(e) {}
          return DEFAULT_COMMENTS[postKey] || DEFAULT_COMMENTS.hoian;
        };

        const saveComments = (list) => {
          try {
            localStorage.setItem(storageKey, JSON.stringify(list));
          } catch(e) {}
        };

        const commentsList = $("#commentsList");
        const commentsCount = $("#commentsCount");

        const getInitials = (name) => {
          const parts = String(name || "").trim().split(/\s+/);
          if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
          }
          return (parts[0] || "A").substring(0, 2).toUpperCase();
        };

        const renderComments = () => {
          const list = getComments();
          if (commentsCount) {
            commentsCount.textContent = `(${list.length} bình luận)`;
          }

          if (!commentsList) return;
          if (!list.length) {
            commentsList.innerHTML = `<div class="comment-empty">Chưa có bình luận nào cho bài viết này. Hãy là người đầu tiên chia sẻ cảm nhận!</div>`;
            return;
          }

          commentsList.innerHTML = list.map(c => `
            <article class="comment-card reveal is-in">
              <div class="comment-card__header">
                <div class="comment-card__avatar" aria-hidden="true">${esc(getInitials(c.name))}</div>
                <div class="comment-card__meta">
                  <div class="comment-card__name">${esc(c.name)}</div>
                  <div class="comment-card__stars-row">
                    <span class="comment-card__stars" aria-label="${c.rating} sao">${"★".repeat(c.rating || 5)}${"☆".repeat(5 - (c.rating || 5))}</span>
                    <span class="comment-card__date">${esc(c.date)}</span>
                  </div>
                </div>
              </div>
              <div class="comment-card__body">
                <p>${esc(c.text)}</p>
              </div>
            </article>
          `).join("");
        };

        renderComments();

        // Star rating selector
        const starSelector = $("#starSelector");
        const starText = $("#starText");
        const ratingInput = $("#commentRatingVal");
        let currentRating = 5;

        const starLabels = {
          1: "1 / 5 sao (Cần cải thiện)",
          2: "2 / 5 sao (Tạm được)",
          3: "3 / 5 sao (Bình thường)",
          4: "4 / 5 sao (Hài lòng)",
          5: "5 / 5 sao (Tuyệt vời)"
        };

        if (starSelector) {
          const updateStarUI = (val) => {
            $$(".star-btn", starSelector).forEach(btn => {
              const bVal = parseInt(btn.dataset.value, 10);
              btn.classList.toggle("is-active", bVal <= val);
            });
            if (starText) starText.textContent = starLabels[val] || `${val} sao`;
            if (ratingInput) ratingInput.value = val;
          };

          starSelector.addEventListener("click", e => {
            const btn = e.target.closest(".star-btn");
            if (!btn) return;
            currentRating = parseInt(btn.dataset.value, 10) || 5;
            updateStarUI(currentRating);
          });

          starSelector.addEventListener("mouseover", e => {
            const btn = e.target.closest(".star-btn");
            if (!btn) return;
            const hVal = parseInt(btn.dataset.value, 10) || 5;
            $$(".star-btn", starSelector).forEach(b => {
              b.classList.toggle("is-active", parseInt(b.dataset.value, 10) <= hVal);
            });
          });

          starSelector.addEventListener("mouseleave", () => {
            updateStarUI(currentRating);
          });
        }

        // Form submit
        const commentForm = $("#commentForm");
        const commentAlert = $("#commentAlert");

        if (commentForm) {
          commentForm.addEventListener("submit", e => {
            e.preventDefault();
            const nameEl = $("#commentName");
            const emailEl = $("#commentEmail");
            const contentEl = $("#commentContent");

            const name = nameEl ? nameEl.value.trim() : "";
            const email = emailEl ? emailEl.value.trim() : "";
            const text = contentEl ? contentEl.value.trim() : "";
            const rating = parseInt(ratingInput ? ratingInput.value : "5", 10) || 5;

            if (!name || !email || !text) {
              if (commentAlert) {
                commentAlert.hidden = false;
                commentAlert.className = "comment-alert comment-alert--error";
                commentAlert.textContent = "Vui lòng điền đầy đủ Họ tên, Email và Nội dung bình luận.";
              }
              return;
            }

            const newComment = {
              id: "cm_" + Date.now(),
              name: name,
              rating: rating,
              date: "Vừa xong",
              text: text
            };

            const existing = getComments();
            const updated = [newComment, ...existing];
            saveComments(updated);
            renderComments();

            if (contentEl) contentEl.value = "";
            if (commentAlert) {
              commentAlert.hidden = false;
              commentAlert.className = "comment-alert comment-alert--success";
              commentAlert.textContent = "Cảm ơn bạn! Bình luận của bạn đã được đăng thành công.";
              setTimeout(() => {
                commentAlert.hidden = true;
              }, 5000);
            }
          });
        }
      }

      // Cập nhật Related Posts (bài viết liên quan - hiển thị các bài còn lại)
      const relatedGrid = $("#related-posts-grid");
      if (relatedGrid) {
        const others = posts.filter(p => p.id !== post.id && p.numericId !== post.numericId);
        setTimeout(() => { if (typeof window.applyLang === "function" && window.AN_THOI_LANG) window.applyLang(window.AN_THOI_LANG); }, 50);
        relatedGrid.innerHTML = others.map(o => `
          <article class="blog-card reveal is-in">
            <a class="blog-card__media" href="bai-viet.html?id=${esc(o.id)}">
              <img src="${esc(o.image)}" alt="${esc(o.title)}" loading="lazy">
            </a>
            <div class="blog-card__body">
              <div class="blog-meta">
                <span>${esc(o.category)}</span>
                <span class="blog-meta__dot">·</span>
                <span>${esc(o.date)}</span>
              </div>
              <h3 class="blog-card__title">
                <a href="bai-viet.html?id=${esc(o.id)}">${esc(o.title)}</a>
              </h3>
              <p class="blog-card__excerpt">${esc(o.excerpt)}</p>
              <div class="blog-card__foot">
                <a class="blog-readmore" href="bai-viet.html?id=${esc(o.id)}">
                  <span data-i18n="journal_read_more">Đọc bài viết</span>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path d="M4 10h12M11 5l5 5-5 5"/>
                  </svg>
                </a>
              </div>
            </div>
          </article>
        `).join("");
      }
    }
  }
})();
