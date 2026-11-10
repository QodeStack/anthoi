/**
 * ==========================================================
 * ĂN THÔI - 3D REVIEWS WALL (Khách hàng nói gì)
 * - 5 columns infinite vertical auto-scrolling
 * - Alternating directions (even vs odd)
 * - 3D Perspective + Mouse parallax on desktop
 * - Preloaded images to avoid animation stutter
 * - Number counter animation (IntersectionObserver)
 * - Centralized config object for Google & Tripadvisor data
 * - Respects prefers-reduced-motion & .reduce-motion
 * ==========================================================
 */
(function () {
  "use strict";

  // =========================================================================
  // CẤU HÌNH SỐ LIỆU ĐÁNH GIÁ (Thay số liệu thật tại object này)
  // =========================================================================
  const REVIEW_CONFIG = {
    // Con số lớn hiển thị chính (đếm từ 0 đến 9539 trong 3 giây khi cuộn tới)
    mainCount: 9539,
    countDuration: 3000, // 3 giây (3000ms)

    // Khối Google Reviews (8.271 đánh giá)
    google: {
      score: "4.9 ★",
      reviewsCount: "8.271+ đánh giá được xác thực",
      url: "https://www.google.com/maps/place/%C4%82n+Th%C3%B4i/@16.0682463,108.222233,820m/data=!3m1!1e3!4m8!3m7!1s0x3142194921d15361:0xdd9637b7caf7eb1f!8m2!3d16.0682463!4d108.2248133!9m1!1b1!16s%2Fg%2F11tfk6fw62?entry=ttu&g_ep=EgoyMDI2MTEwNC4wIKXMDSoASAFQAw%3D%3D"
    },

    // Khối Tripadvisor (Top 55)
    tripadvisor: {
      score: "5.0 ●",
      ranking: "Top 55 Nhà hàng tại Đà Nẵng",
      url: "https://www.tripadvisor.com/Restaurant_Review-g298085-d24982748-Reviews-An_Thoi-Da_Nang.html"
    },

    // Link "Đọc thêm đánh giá"
    readMoreUrl: "https://www.google.com/maps/place/%C4%82n+Th%C3%B4i/@16.0682463,108.222233,820m/data=!3m1!1e3!4m8!3m7!1s0x3142194921d15361:0xdd9637b7caf7eb1f!8m2!3d16.0682463!4d108.2248133!9m1!1b1!16s%2Fg%2F11tfk6fw62?entry=ttu&g_ep=EgoyMDI2MTEwNC4wIKXMDSoASAFQAw%3D%3D"
  };

  // Thêm/bớt ảnh review chỉ cần sửa mảng này.
  const RW_IMAGES = [
    "image/rw/rw1_cropped.jpg",
    "image/rw/rw2_cropped.jpg",
    "image/rw/rw3_cropped.jpg",
    "image/rw/rw4_cropped.jpg",
    "image/rw/rw5_cropped.jpg",
    "image/rw/rw6_cropped.jpg",
    "image/rw/rw7_cropped.jpg",
    "image/rw/rw8_cropped.jpg",
    "image/rw/rw9_cropped.jpg",
    "image/rw/rw10_cropped.jpg",
    "image/rw/rw11_cropped.jpg",
    "image/rw/rw12_cropped.jpg",
    "image/rw/rw13_cropped.jpg",
    "image/rw/rw14_cropped.jpg",
    "image/rw/rw15_cropped.jpg",
    "image/rw/rw16_cropped.jpg",
    "image/rw/rw17_cropped.jpg",
    "image/rw/rw18_cropped.jpg",
    "image/rw/rw19_cropped.jpg"
  ];

  const NUM_COLS = 5;
  const CARDS_PER_COL = 6; // Số thẻ trong 1 chu kỳ trước khi nhân đôi

  function isReducedMotion() {
    return (
      document.documentElement.classList.contains("reduce-motion") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  // Áp dụng số liệu thật từ REVIEW_CONFIG vào các phần tử giao diện
  function applyReviewConfig() {
    const counterEl = document.getElementById("reviewsCount");
    if (counterEl) {
      counterEl.dataset.target = REVIEW_CONFIG.mainCount;
      counterEl.setAttribute("aria-label", REVIEW_CONFIG.mainCount + " đánh giá của khách hàng");
    }

    // Google badge
    const googleBadge = document.getElementById("googleBadge");
    const googleScore = document.getElementById("googleScore");
    const googleCount = document.getElementById("googleCount");
    if (googleBadge && REVIEW_CONFIG.google.url) googleBadge.href = REVIEW_CONFIG.google.url;
    if (googleScore && REVIEW_CONFIG.google.score) googleScore.textContent = REVIEW_CONFIG.google.score;
    if (googleCount && REVIEW_CONFIG.google.reviewsCount) googleCount.textContent = REVIEW_CONFIG.google.reviewsCount;

    // Tripadvisor badge
    const tripBadge = document.getElementById("tripBadge");
    const tripScore = document.getElementById("tripScore");
    const tripRank = document.getElementById("tripRank");
    if (tripBadge && REVIEW_CONFIG.tripadvisor.url) tripBadge.href = REVIEW_CONFIG.tripadvisor.url;
    if (tripScore && REVIEW_CONFIG.tripadvisor.score) tripScore.textContent = REVIEW_CONFIG.tripadvisor.score;
    if (tripRank && REVIEW_CONFIG.tripadvisor.ranking) tripRank.textContent = REVIEW_CONFIG.tripadvisor.ranking;

    // Read more link
    const readMoreEl = document.getElementById("reviewsReadMore");
    if (readMoreEl && REVIEW_CONFIG.readMoreUrl) readMoreEl.href = REVIEW_CONFIG.readMoreUrl;
  }

  // Preload toàn bộ ảnh review bằng new Image()
  function preloadImages(urls) {
    return Promise.all(
      urls.map(function (url) {
        return new Promise(function (resolve) {
          const img = new Image();
          img.onload = function () {
            resolve({
              url: url,
              w: img.naturalWidth || 900,
              h: img.naturalHeight || 1200,
              ok: true
            });
          };
          img.onerror = function () {
            resolve({ url: url, ok: false });
          };
          img.src = url;
        });
      })
    ).then(function (results) {
      return results.filter(function (r) {
        return r.ok;
      });
    });
  }

  // Thuật toán xáo trộn Fisher-Yates
  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  // Khởi tạo bức tường review
  function initReviewsWall(stageEl, wallEl, validImages) {
    if (!stageEl || !validImages.length) return;

    // Phân bổ ảnh vào 5 cột theo kiểu round-robin
    const colBuckets = Array.from({ length: NUM_COLS }, function () {
      return [];
    });

    const totalNeeded = NUM_COLS * CARDS_PER_COL;
    for (let i = 0; i < totalNeeded; i++) {
      const img = validImages[i % validImages.length];
      colBuckets[i % NUM_COLS].push(img);
    }

    // Xóa nội dung cũ
    stageEl.innerHTML = "";

    const colElements = [];

    colBuckets.forEach(function (bucket, colIdx) {
      // Xáo trộn riêng biệt từng cột
      const shuffled = shuffleArray(bucket);

      const colDiv = document.createElement("div");
      colDiv.className = "col col--" + (colIdx + 1);

      const trackDiv = document.createElement("div");
      trackDiv.className = "col__track";

      // Tạo thẻ ảnh duy nhất (chỉ dùng ảnh image/rw, hiển thị đúng tỉ lệ gốc)
      function createCard(item) {
        const card = document.createElement("div");
        card.className = "card--photo";

        const img = document.createElement("img");
        img.src = item.url;
        img.alt = "Đánh giá của khách hàng Ăn Thôi";
        img.loading = "lazy";
        img.decoding = "async";
        img.width = item.w;
        img.height = item.h;

        card.appendChild(img);
        return card;
      }

      // Chu kỳ 1 (Set A)
      shuffled.forEach(function (item) {
        trackDiv.appendChild(createCard(item));
      });

      // Chu kỳ 2 (Set B - nhân đôi danh sách để lặp liền mạch -50%)
      shuffled.forEach(function (item) {
        trackDiv.appendChild(createCard(item));
      });

      colDiv.appendChild(trackDiv);
      stageEl.appendChild(colDiv);
      colElements.push({ track: trackDiv, colIdx: colIdx });
    });

    // Tính toán chiều cao track và thiết lập duration để tốc độ px/giây đồng đều
    requestAnimationFrame(function () {
      colElements.forEach(function (item) {
        const track = item.track;
        const colIdx = item.colIdx; // 0-based

        // Chiều cao nửa track (quãng đường cuộn)
        const halfHeight = track.scrollHeight / 2 || 1200;
        // Vận tốc cuộn ~ 20-25 px/giây -> duration 60-100s
        const durationSec = Math.max(60, Math.min(100, halfHeight / 22));

        // Cột chẵn (2, 4 -> colIdx 1, 3): colScrollDown
        // Cột lẻ (1, 3, 5 -> colIdx 0, 2, 4): colScrollUp
        const isEvenCol = colIdx % 2 === 1;
        track.style.animationName = isEvenCol ? "colScrollDown" : "colScrollUp";
        track.style.animationDuration = durationSec.toFixed(1) + "s";
        track.style.animationTimingFunction = "linear";
        track.style.animationIterationCount = "infinite";

        // Delay âm so le để các cột không bắt đầu cùng một điểm
        const delay = -((colIdx * 16.7 + 6.3) % 45).toFixed(1);
        track.style.animationDelay = delay + "s";
      });

      // Hiển thị bức tường sau khi dựng xong (fade-in)
      stageEl.classList.add("is-ready");
    });

    // Hiệu ứng nghiêng 3D nhẹ theo chuột trên desktop (min-width: 901px)
    if (wallEl) {
      let isHovering = false;

      wallEl.addEventListener("mouseenter", function () {
        if (!isReducedMotion() && window.innerWidth > 900) {
          isHovering = true;
        }
      });

      wallEl.addEventListener("mousemove", function (e) {
        if (!isHovering || isReducedMotion() || window.innerWidth <= 900) return;
        const rect = wallEl.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        // Chuẩn hóa -1 -> +1
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

        // Giới hạn dao động ± ~3 - 5 độ
        const px = (nx * 4.5).toFixed(2);
        const py = (-ny * 3.5).toFixed(2);

        wallEl.style.setProperty("--px", px + "deg");
        wallEl.style.setProperty("--py", py + "deg");
      });

      wallEl.addEventListener("mouseleave", function () {
        isHovering = false;
        wallEl.style.setProperty("--px", "0deg");
        wallEl.style.setProperty("--py", "0deg");
      });
    }
  }

  // Hiệu ứng đếm tăng dần con số lớn khi cuộn tới
  function initReviewsCounter(counterEl) {
    if (!counterEl) return;

    const target = parseInt(counterEl.dataset.target || REVIEW_CONFIG.mainCount, 10);
    const formatter = new Intl.NumberFormat("vi-VN");

    if (isReducedMotion()) {
      counterEl.textContent = formatter.format(target);
      return;
    }

    counterEl.textContent = "0";
    let animated = false;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !animated) {
            animated = true;
            observer.disconnect();

            if (isReducedMotion()) {
              counterEl.textContent = formatter.format(target);
              return;
            }

            const startTime = performance.now();
            const duration = REVIEW_CONFIG.countDuration || 3000; // 3 giây (3000ms)

            function step(now) {
              const elapsed = now - startTime;
              const progress = Math.min(1, elapsed / duration);
              // easeOutCubic: 1 - (1 - progress)^3
              const ease = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(target * ease);
              counterEl.textContent = formatter.format(current);

              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                counterEl.textContent = formatter.format(target);
              }
            }

            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(counterEl);
  }

  // Khởi động khi DOM sẵn sàng
  function init() {
    const sec = document.getElementById("danh-gia");
    if (!sec) return;

    applyReviewConfig();

    const stageEl = document.getElementById("reviewsStage");
    const wallEl = sec.querySelector(".reviews__wall");
    const counterEl = document.getElementById("reviewsCount");

    initReviewsCounter(counterEl);

    // Preload ảnh rồi dựng cột
    preloadImages(RW_IMAGES).then(function (loadedImages) {
      if (loadedImages.length > 0) {
        initReviewsWall(stageEl, wallEl, loadedImages);
      }
    });

    // Lắng nghe thay đổi reduceMotion
    const rmBtn = document.getElementById("reduceMotion");
    if (rmBtn && wallEl) {
      rmBtn.addEventListener("click", function () {
        setTimeout(function () {
          if (isReducedMotion()) {
            wallEl.style.setProperty("--px", "0deg");
            wallEl.style.setProperty("--py", "0deg");
          }
        }, 50);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
