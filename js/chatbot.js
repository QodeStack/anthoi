/**
 * CHATBOT FAQ LOGIC - NHÀ HÀNG ĂN THÔI
 * Chạy tĩnh, thuần JavaScript, tự chèn DOM, không gọi API / AI
 */

(function () {
  "use strict";

  // Kiểm tra dữ liệu kịch bản
  var data = window.AN_THOI_CHATBOT_DATA;
  if (!data) {
    console.error("[Chatbot Ăn Thôi] Không tìm thấy AN_THOI_CHATBOT_DATA.");
    return;
  }

  // Ngôn ngữ hiện tại (mặc định vi)
  var currentLang = "vi";
  try {
    var savedLang = (localStorage.getItem("anthoi_lang") || "").toLowerCase();
    if (savedLang && (savedLang === "vi" || savedLang === "en")) {
      currentLang = savedLang;
    }
  } catch (e) {}

  /**
   * Chuẩn hóa văn bản tiếng Việt:
   * Chuyển chữ thường, bỏ dấu thanh, bỏ dấu đ/Đ, xóa ký tự đặc biệt, chuẩn hóa khoảng trắng
   */
  function normalizeText(str) {
    return String(str || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "d")
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /**
   * Tìm chủ đề kịch bản khớp nhất với câu hỏi của khách
   */
  function findMatchingTopic(query) {
    var normQ = normalizeText(query);
    if (!normQ) return null;

    var bestMatch = null;
    var maxKeywordLen = 0;

    for (var i = 0; i < data.topics.length; i++) {
      var topic = data.topics[i];
      var kws = topic.keywords || [];

      for (var k = 0; k < kws.length; k++) {
        var normKw = normalizeText(kws[k]);
        if (!normKw) continue;

        // So khớp từ khóa với câu hỏi
        if (normQ.indexOf(normKw) !== -1) {
          if (normKw.length > maxKeywordLen) {
            maxKeywordLen = normKw.length;
            bestMatch = topic;
          }
        }
      }
    }

    return bestMatch;
  }

  /**
   * Tạo icon SVG an toàn
   */
  var ICONS = {
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',
    arrowRight: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
    external: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 13 13 3M5 3h8v8"/></svg>'
  };

  /**
   * Tự tạo và chèn HTML chatbot vào trang nếu chưa có
   */
  function injectChatbotDOM() {
    if (document.getElementById("cbWindow")) return;

    // Lớp phủ nền mờ cho mobile
    var overlay = document.createElement("div");
    overlay.className = "cb-overlay";
    overlay.id = "cbOverlay";
    overlay.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlay);

    // Nút FAB mở chatbot
    var toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "cb-toggle";
    toggleBtn.id = "cbToggle";
    toggleBtn.setAttribute("aria-label", "Mở cửa sổ trợ lý Ăn Thôi");
    toggleBtn.setAttribute("aria-haspopup", "dialog");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-controls", "cbWindow");
    toggleBtn.innerHTML =
      '<span class="cb-toggle__icon" aria-hidden="true">' +
      ICONS.chat +
      '</span><span class="cb-toggle__badge" aria-hidden="true"></span>';
    document.body.appendChild(toggleBtn);

    // Khung cửa sổ chat
    var win = document.createElement("section");
    win.className = "cb-window";
    win.id = "cbWindow";
    win.setAttribute("role", "dialog");
    win.setAttribute("aria-modal", "false");
    win.setAttribute("aria-labelledby", "cbTitle");

    win.innerHTML =
      '<header class="cb-header">' +
        '<div class="cb-header__brand">' +
          '<div class="cb-header__avatar" aria-hidden="true">' +
            '<img src="image/logo.png" alt="Ăn Thôi Logo" width="36" height="36">' +
          '</div>' +
          '<div class="cb-header__info">' +
            '<h2 class="cb-header__title" id="cbTitle">Ăn Thôi</h2>' +
            '<span class="cb-header__sub">Trợ lý trực tuyến · 114 Bạch Đằng</span>' +
          '</div>' +
        '</div>' +
        '<button type="button" class="cb-header__close" id="cbCloseBtn" aria-label="Đóng cửa sổ trò chuyện">' +
          ICONS.close +
        '</button>' +
      '</header>' +
      '<div class="cb-body" id="cbMessages" role="log" aria-live="polite" aria-label="Nội dung trò chuyện">' +
      '</div>' +
      '<footer class="cb-footer">' +
        '<form class="cb-form" id="cbForm" novalidate>' +
          '<input type="text" class="cb-input" id="cbInput" placeholder="Nhập câu hỏi của bạn..." autocomplete="off" aria-label="Nội dung tin nhắn">' +
          '<button type="submit" class="cb-send-btn" id="cbSendBtn" aria-label="Gửi tin nhắn">' +
            ICONS.send +
          '</button>' +
        '</form>' +
      '</footer>';

    document.body.appendChild(win);
  }

  // Khởi chạy khi DOM sẵn sàng
  function initChatbot() {
    injectChatbotDOM();

    var toggleBtn = document.getElementById("cbToggle");
    var closeBtn = document.getElementById("cbCloseBtn");
    var win = document.getElementById("cbWindow");
    var overlay = document.getElementById("cbOverlay");
    var form = document.getElementById("cbForm");
    var input = document.getElementById("cbInput");
    var messagesContainer = document.getElementById("cbMessages");

    var isTyping = false;
    var hasGreeted = false;

    // Cuộn xuống cuối vùng tin nhắn
    function scrollToBottom() {
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }

    // Hiển thị bong bóng của khách
    function appendUserMessage(text) {
      var row = document.createElement("div");
      row.className = "cb-msg-row cb-msg-row--user";
      row.innerHTML =
        '<div class="cb-msg-content">' +
          '<div class="cb-bubble">' + escapeHTML(text) + '</div>' +
        '</div>';
      messagesContainer.appendChild(row);
      scrollToBottom();
    }

    // Hiển thị hiệu ứng "đang trả lời"
    function showTypingIndicator() {
      var typingRow = document.createElement("div");
      typingRow.className = "cb-msg-row cb-msg-row--bot cb-msg-row--typing";
      typingRow.id = "cbTypingIndicator";
      typingRow.innerHTML =
        '<div class="cb-msg-avatar" aria-hidden="true">' +
          '<img src="image/logo.png" alt="Ăn Thôi" width="28" height="28">' +
        '</div>' +
        '<div class="cb-msg-content">' +
          '<div class="cb-typing" aria-label="Ăn Thôi đang soạn câu trả lời">' +
            '<span class="cb-typing__dot"></span>' +
            '<span class="cb-typing__dot"></span>' +
            '<span class="cb-typing__dot"></span>' +
          '</div>' +
        '</div>';
      messagesContainer.appendChild(typingRow);
      scrollToBottom();
      return typingRow;
    }

    // Ẩn hiệu ứng "đang trả lời"
    function removeTypingIndicator() {
      var indicator = document.getElementById("cbTypingIndicator");
      if (indicator && indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
      }
    }

    // Hiển thị tin nhắn của bot kèm quick replies và action buttons (nếu có)
    function appendBotMessage(text, actions, quickRepliesList) {
      var row = document.createElement("div");
      row.className = "cb-msg-row cb-msg-row--bot";

      var contentHTML = '<div class="cb-bubble">' + text + '</div>';

      // Nút hành động (actions)
      if (actions && actions.length > 0) {
        contentHTML += '<div class="cb-actions">';
        for (var i = 0; i < actions.length; i++) {
          var act = actions[i];
          var actLabel = (act.label && act.label[currentLang]) || act.label.vi || "";
          var isExternal = act.target === "_blank" || act.url.indexOf("http") === 0;
          var iconHTML = isExternal ? ICONS.external : ICONS.arrowRight;
          var targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
          contentHTML +=
            '<a href="' + act.url + '" class="cb-action-btn"' + targetAttr + '>' +
              '<span>' + escapeHTML(actLabel) + '</span>' +
              iconHTML +
            '</a>';
        }
        contentHTML += '</div>';
      }

      // Nút gợi ý nhanh (quick replies chips)
      if (quickRepliesList && quickRepliesList.length > 0) {
        contentHTML += '<div class="cb-chips" role="group" aria-label="Gợi ý câu hỏi">';
        for (var j = 0; j < quickRepliesList.length; j++) {
          var topicId = quickRepliesList[j];
          var topic = findTopicById(topicId);
          if (topic) {
            var chipLabel = (topic.label && topic.label[currentLang]) || topic.label.vi || "";
            contentHTML +=
              '<button type="button" class="cb-chip" data-topic-id="' + topic.id + '">' +
                escapeHTML(chipLabel) +
              '</button>';
          }
        }
        contentHTML += '</div>';
      }

      row.innerHTML =
        '<div class="cb-msg-avatar" aria-hidden="true">' +
          '<img src="image/logo.png" alt="Ăn Thôi" width="28" height="28">' +
        '</div>' +
        '<div class="cb-msg-content">' +
          contentHTML +
        '</div>';

      messagesContainer.appendChild(row);
      scrollToBottom();
    }

    // Tìm topic theo ID
    function findTopicById(id) {
      for (var i = 0; i < data.topics.length; i++) {
        if (data.topics[i].id === id) return data.topics[i];
      }
      return null;
    }

    // Thoát ký tự HTML chống injection
    function escapeHTML(str) {
      return String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    // Xử lý gửi tin nhắn / câu hỏi
    function handleUserQuery(userText, chosenTopic) {
      if (isTyping) return;
      var query = (userText || "").trim();
      if (!query && !chosenTopic) return;

      // 1. Hiện tin nhắn người dùng
      appendUserMessage(query);

      // 2. Xác định câu trả lời
      var targetTopic = chosenTopic || findMatchingTopic(query);
      var answerText = "";
      var actions = [];
      var quickReplies = null;

      if (targetTopic) {
        answerText = (targetTopic.answer && targetTopic.answer[currentLang]) || targetTopic.answer.vi || "";
        actions = targetTopic.actions || [];
        quickReplies = targetTopic.quickReplies || null;
      } else {
        // Fallback khi không khớp từ khóa
        answerText = (data.fallback.text && data.fallback.text[currentLang]) || data.fallback.text.vi;
        actions = data.fallback.actions || [];
        quickReplies = data.fallback.quickReplies || [];
      }

      // 3. Hiệu ứng đang trả lời (nhanh gọn, chính xác ~0.35s)
      isTyping = true;
      showTypingIndicator();

      var typingDelay = 350;
      if (document.documentElement.classList.contains("reduce-motion")) {
        typingDelay = 100;
      }

      setTimeout(function () {
        removeTypingIndicator();
        appendBotMessage(answerText, actions, quickReplies);
        isTyping = false;
      }, typingDelay);
    }

    // Khởi tạo lời chào mở đầu
    function showInitialGreeting() {
      if (hasGreeted) return;
      hasGreeted = true;
      var greetingText = (data.greeting.text && data.greeting.text[currentLang]) || data.greeting.text.vi;
      var quickList = data.greeting.quickReplies || [];
      appendBotMessage(greetingText, null, quickList);
    }

    // Mở khung chat
    function openChat() {
      win.classList.add("is-open");
      win.setAttribute("aria-modal", "true");
      overlay.classList.add("is-visible");
      toggleBtn.setAttribute("aria-expanded", "true");

      if (!hasGreeted) {
        showInitialGreeting();
      }

      // Focus vào ô input để người dùng gõ ngay
      setTimeout(function () {
        if (input) input.focus();
      }, 300);
    }

    // Đóng khung chat
    function closeChat() {
      win.classList.remove("is-open");
      win.setAttribute("aria-modal", "false");
      overlay.classList.remove("is-visible");
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.focus();
    }

    // Sự kiện mở / đóng
    toggleBtn.addEventListener("click", function () {
      if (win.classList.contains("is-open")) {
        closeChat();
      } else {
        openChat();
      }
    });

    closeBtn.addEventListener("click", function () {
      closeChat();
    });

    overlay.addEventListener("click", function () {
      closeChat();
    });

    // Đóng bằng phím Esc
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && win.classList.contains("is-open")) {
        closeChat();
      }
    });

    // Bắt sự kiện submit form tin nhắn
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = input.value;
      if (!q.trim()) return;
      input.value = "";
      handleUserQuery(q, null);
    });

    // Bắt sự kiện bấm vào các Quick Replies (ủy quyền sự kiện trên messagesContainer)
    messagesContainer.addEventListener("click", function (e) {
      var chip = e.target.closest(".cb-chip");
      if (chip) {
        var topicId = chip.getAttribute("data-topic-id");
        var topic = findTopicById(topicId);
        if (topic) {
          var labelText = (topic.label && topic.label[currentLang]) || topic.label.vi || "";
          handleUserQuery(labelText, topic);
        }
      }
    });
  }

  // Chạy khi DOM đã tải xong
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbot);
  } else {
    initChatbot();
  }
})();
