/**
 * CHATBOT FAQ LOGIC - NHÀ HÀNG ĂN THÔI
 * Chạy tĩnh, thuần JavaScript, tự chèn DOM, không gọi API / AI
 * Hỗ trợ đa ngôn ngữ hoàn chỉnh: VI, EN, ZH, KO, RU
 */

(function () {
  "use strict";

  // Kiểm tra dữ liệu kịch bản
  var data = window.AN_THOI_CHATBOT_DATA;
  if (!data) {
    console.error("[Chatbot Ăn Thôi] Không tìm thấy AN_THOI_CHATBOT_DATA.");
    return;
  }

  // Danh sách các ngôn ngữ được hỗ trợ
  var SUPPORTED_LANGS = ["vi", "en", "zh", "ko", "ru"];

  function sanitizeLang(code) {
    if (!code) return "vi";
    var c = String(code).toLowerCase().trim();
    return SUPPORTED_LANGS.indexOf(c) !== -1 ? c : "vi";
  }

  // Ngôn ngữ hiện tại
  var currentLang = "vi";
  try {
    var savedLang = localStorage.getItem("anthoi_lang") || localStorage.getItem("anthoi-lang") || "";
    if (savedLang) {
      currentLang = sanitizeLang(savedLang);
    }
  } catch (e) {}

  // Bộ từ điển giao diện người dùng theo từng ngôn ngữ
  var UI_STRINGS = {
    vi: {
      subtitle: "Trợ lý trực tuyến · 114 Bạch Đằng",
      placeholder: "Nhập câu hỏi của bạn...",
      sendAria: "Gửi tin nhắn",
      closeAria: "Đóng cửa sổ trò chuyện",
      toggleAria: "Mở cửa sổ trợ lý Ăn Thôi",
      inputAria: "Nội dung tin nhắn",
      typingAria: "Ăn Thôi đang soạn câu trả lời",
      chipsAria: "Gợi ý câu hỏi",
      chatLogAria: "Nội dung trò chuyện"
    },
    en: {
      subtitle: "Virtual Assistant · 114 Bach Dang",
      placeholder: "Type your question here...",
      sendAria: "Send message",
      closeAria: "Close chat window",
      toggleAria: "Open An Thoi assistant",
      inputAria: "Message content",
      typingAria: "An Thoi is typing an answer",
      chipsAria: "Quick suggestions",
      chatLogAria: "Chat messages"
    },
    zh: {
      subtitle: "在线助手 · 白滕路114号",
      placeholder: "请输入您的问题...",
      sendAria: "发送消息",
      closeAria: "关闭聊天窗口",
      toggleAria: "打开 Ăn Thôi 助手",
      inputAria: "消息内容",
      typingAria: "Ăn Thôi 正在输入回复",
      chipsAria: "快捷建议",
      chatLogAria: "对话记录"
    },
    ko: {
      subtitle: "온라인 도우미 · 114 바하당",
      placeholder: "질문을 입력하세요...",
      sendAria: "메시지 보내기",
      closeAria: "채팅창 닫기",
      toggleAria: "Ăn Thôi 도우미 열기",
      inputAria: "메시지 내용",
      typingAria: "Ăn Thôi 답변 작성 중",
      chipsAria: "빠른 질문 제안",
      chatLogAria: "대화 내용"
    },
    ru: {
      subtitle: "Онлайн-помощник · 114 Батьданг",
      placeholder: "Введите ваш вопрос...",
      sendAria: "Отправить сообщение",
      closeAria: "Закрыть окно чата",
      toggleAria: "Открыть помощника Ăn Thôi",
      inputAria: "Текст сообщения",
      typingAria: "Ăn Thôi печатает ответ",
      chipsAria: "Быстрые подсказки",
      chatLogAria: "История диалога"
    }
  };

  function getUI(key) {
    var dict = UI_STRINGS[currentLang] || UI_STRINGS.vi;
    return dict[key] || UI_STRINGS.vi[key] || "";
  }

  /**
   * Chuẩn hóa văn bản:
   * Chuyển chữ thường, bỏ dấu tiếng Việt (NFD), xóa ký tự đặc biệt & dấu câu Đông Á, chuẩn hóa khoảng trắng
   */
  function normalizeText(str) {
    return String(str || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "d")
      .toLowerCase()
      .replace(/[\u3000-\u303F\uFF00-\uFFEF.,\/#!$%\^&\*;:{}=\-_`~()?，。！？、；：“”‘’（）《》【】]/g, " ")
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
   * Thoát ký tự HTML chống injection
   */
  function escapeHTML(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

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
    toggleBtn.setAttribute("aria-label", getUI("toggleAria"));
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
            '<span class="cb-header__sub">' + escapeHTML(getUI("subtitle")) + '</span>' +
          '</div>' +
        '</div>' +
        '<button type="button" class="cb-header__close" id="cbCloseBtn" aria-label="' + escapeHTML(getUI("closeAria")) + '">' +
          ICONS.close +
        '</button>' +
      '</header>' +
      '<div class="cb-body" id="cbMessages" role="log" aria-live="polite" aria-label="' + escapeHTML(getUI("chatLogAria")) + '">' +
      '</div>' +
      '<footer class="cb-footer">' +
        '<form class="cb-form" id="cbForm" novalidate>' +
          '<input type="text" class="cb-input" id="cbInput" placeholder="' + escapeHTML(getUI("placeholder")) + '" autocomplete="off" aria-label="' + escapeHTML(getUI("inputAria")) + '">' +
          '<button type="submit" class="cb-send-btn" id="cbSendBtn" aria-label="' + escapeHTML(getUI("sendAria")) + '">' +
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

    // Tìm topic theo ID
    function findTopicById(id) {
      for (var i = 0; i < data.topics.length; i++) {
        if (data.topics[i].id === id) return data.topics[i];
      }
      return null;
    }

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
          '<div class="cb-typing" aria-label="' + escapeHTML(getUI("typingAria")) + '">' +
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
          var actLabel = (act.label && act.label[currentLang]) || (act.label && act.label.vi) || "";
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
        contentHTML += '<div class="cb-chips" role="group" aria-label="' + escapeHTML(getUI("chipsAria")) + '">';
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

      // 3. Hiệu ứng đang trả lời (~0.35s)
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

    // Cập nhật động toàn bộ ngôn ngữ của chatbot
    function updateLanguage(newLang) {
      currentLang = sanitizeLang(newLang);
      var ui = UI_STRINGS[currentLang] || UI_STRINGS.vi;

      // Cập nhật tiêu đề phụ, placeholder và các aria-label
      var subEl = win ? win.querySelector(".cb-header__sub") : null;
      if (subEl) {
        subEl.textContent = ui.subtitle;
      }

      if (input) {
        input.placeholder = ui.placeholder;
        input.setAttribute("aria-label", ui.inputAria);
      }

      var sendBtn = document.getElementById("cbSendBtn");
      if (sendBtn) sendBtn.setAttribute("aria-label", ui.sendAria);
      if (closeBtn) closeBtn.setAttribute("aria-label", ui.closeAria);
      if (toggleBtn) toggleBtn.setAttribute("aria-label", ui.toggleAria);

      if (messagesContainer) {
        messagesContainer.setAttribute("aria-label", ui.chatLogAria);

        // Cập nhật các nhóm chips hiện có trên giao diện
        var chipGroups = messagesContainer.querySelectorAll(".cb-chips");
        for (var g = 0; g < chipGroups.length; g++) {
          chipGroups[g].setAttribute("aria-label", ui.chipsAria);
        }

        var chips = messagesContainer.querySelectorAll(".cb-chip[data-topic-id]");
        for (var c = 0; c < chips.length; c++) {
          var tid = chips[c].getAttribute("data-topic-id");
          var t = findTopicById(tid);
          if (t && t.label) {
            chips[c].textContent = t.label[currentLang] || t.label.vi || "";
          }
        }

        // Nếu mới chỉ hiển thị lời chào đầu tiên (khách chưa gõ gì), đổi luôn lời chào sang ngôn ngữ mới
        var allRows = messagesContainer.querySelectorAll(".cb-msg-row");
        if (hasGreeted && allRows.length === 1 && !isTyping) {
          var firstBubble = allRows[0].querySelector(".cb-bubble");
          if (firstBubble) {
            firstBubble.innerHTML = (data.greeting.text && data.greeting.text[currentLang]) || data.greeting.text.vi;
          }
        }
      }
    }

    // Lắng nghe sự kiện chuyển đổi ngôn ngữ từ i18n
    window.addEventListener("anthoi:lang-change", function (e) {
      if (e.detail && e.detail.lang) {
        updateLanguage(e.detail.lang);
      }
    });

    window.addEventListener("anthoi_language_change", function (e) {
      var code = (e.detail && e.detail.lang) || localStorage.getItem("anthoi_lang") || localStorage.getItem("anthoi-lang");
      if (code) {
        updateLanguage(code);
      }
    });

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
