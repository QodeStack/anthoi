/**
 * CHATBOT FAQ DATA - NHÀ HÀNG ĂN THÔI
 * Hỗ trợ 5 ngôn ngữ: VI (Tiếng Việt), EN (English), ZH (中文), KO (한국어), RU (Русский).
 * Ngôn ngữ lịch sự, ngắn gọn, chính xác, đồng bộ với toàn bộ hệ thống Ăn Thôi.
 */

window.AN_THOI_CHATBOT_DATA = {
  defaultLang: "vi",

  // Lời chào mở đầu với 4 gợi ý chính
  greeting: {
    text: {
      vi: "Xin chào, Ăn Thôi có thể giúp gì cho bạn? Bạn có thể chọn các gợi ý bên dưới hoặc gửi tin nhắn cho mình nhé.",
      en: "Hello, how can An Thoi assist you today? You can choose a quick topic below or type your question.",
      zh: "您好！Ăn Thôi 有什么可以帮您？您可以选择下方快捷选项或直接发送消息咨询。",
      ko: "안녕하세요! Ăn Thôi가 무엇을 도와드릴까요? 아래 추천 질문을 선택하시거나 메시지를 남겨주세요.",
      ru: "Здравствуйте! Чем Ăn Thôi может вам помочь? Выберите тему ниже или напишите нам сообщение."
    },
    quickReplies: [
      "gio-mo-cua",
      "dia-chi",
      "dat-ban",
      "thuc-don"
    ]
  },

  // Phản hồi khi không khớp từ khóa
  fallback: {
    text: {
      vi: "Dạ, mình chưa hiểu rõ câu hỏi. Bạn vui lòng chọn một trong các mục bên dưới hoặc liên hệ trực tiếp nhà hàng nhé.",
      en: "I didn't quite catch that. Please select an option below or contact our restaurant directly.",
      zh: "抱歉，我未能完全理解您的问题。请在下方选择相关选项，或直接联系我们的餐厅。",
      ko: "죄송합니다, 질문을 잘 이해하지 못했습니다. 아래 항목을 선택하시거나 매장으로 직접 문의해 주세요.",
      ru: "Извините, я не совсем понял ваш вопрос. Пожалуйста, выберите вариант ниже или свяжитесь с рестораном напрямую."
    },
    actions: [
      {
        label: {
          vi: "Xem trang Liên hệ",
          en: "Visit Contact Page",
          zh: "查看联系页面",
          ko: "문의 페이지 보기",
          ru: "Перейти к контактам"
        },
        url: "lien-he.html",
        target: "_self"
      }
    ],
    quickReplies: [
      "gio-mo-cua",
      "dia-chi",
      "dat-ban",
      "thuc-don"
    ]
  },

  // Danh sách các chủ đề kịch bản FAQ
  topics: [
    {
      id: "gio-mo-cua",
      label: {
        vi: "Giờ mở cửa",
        en: "Opening Hours",
        zh: "营业时间",
        ko: "영업 시간",
        ru: "Часы работы"
      },
      keywords: [
        // Tiếng Việt
        "gio mo cua", "gio hoat dong", "may gio mo cua", "may gio dong cua", "may gio", "gio giac",
        "thoi gian mo cua", "mo cua luc may gio", "dong cua luc may gio", "gio phuc vu", "thoi gian hoat dong",
        "khi nao mo cua", "khi nao dong cua", "last order", "dong cua", "mo cua",
        // English
        "open", "opening hours", "closing hours", "what time", "hours", "schedule", "close time",
        // Chinese
        "营业时间", "开门时间", "关门时间", "几点开门", "几点关门", "营业", "开门", "关门", "最后点餐",
        // Korean
        "영업시간", "영업 시간", "오픈시간", "마감시간", "몇시", "라스트오더", "운영시간", "몇 시", "문여는시간",
        // Russian
        "часы работы", "время работы", "когда открыто", "во сколько", "график", "последний заказ", "расписание"
      ],
      answer: {
        vi: "Ăn Thôi mở cửa vào lúc <strong>10h30</strong> đóng cửa vào <strong>23h00</strong> (Last Order 21h30).<br><br>Rất hân hạnh được đón tiếp và phục vụ bạn!",
        en: "An Thoi is open from <strong>10:30 AM</strong> to <strong>11:00 PM</strong> (Last Order at 9:30 PM).<br><br>We look forward to serving you!",
        zh: "Ăn Thôi 营业时间为 <strong>10:30</strong> 至 <strong>23:00</strong>（最后点餐时间：21:30）。<br><br>非常荣幸为您服务！",
        ko: "Ăn Thôi는 <strong>오전 10:30</strong>부터 <strong>오후 11:00</strong>까지 운영합니다 (라스트 오더: 오후 9:30).<br><br>정성을 다해 모시겠습니다!",
        ru: "Ăn Thôi открыт с <strong>10:30</strong> до <strong>23:00</strong> (последний заказ: 21:30).<br><br>Будем рады видеть вас в гостях!"
      },
      actions: [
        {
          label: {
            vi: "Đặt bàn ngay",
            en: "Book a table now",
            zh: "立即预订",
            ko: "지금 예약하기",
            ru: "Забронировать сейчас"
          },
          url: "dat-ban.html",
          target: "_self"
        }
      ]
    },

    {
      id: "dia-chi",
      label: {
        vi: "Địa chỉ",
        en: "Address",
        zh: "餐厅地址",
        ko: "매장 위치",
        ru: "Адрес"
      },
      keywords: [
        // Tiếng Việt
        "dia chi", "chi nhanh", "he thong", "o dau", "o cho nao", "dia diem", "vi tri", "duong di",
        "tim duong", "toa lac", "114 bach dang", "bach dang", "hai chau", "da nang", "nha trang", "hoi an",
        "ngo duc ke", "nguyen thi minh khai", "nguyen phuc tan", "map", "maps", "google map",
        // English
        "address", "location", "branches", "where", "how to get", "directions", "map",
        // Chinese
        "地址", "分店", "在哪里", "位置", "路线", "怎么走", "在哪", "岘港", "会安", "芽庄",
        // Korean
        "주소", "위치", "어디", "지점", "매장", "찾아가는길", "지도", "다낭", "호이안", "냐짱", "나트랑",
        // Russian
        "адрес", "где находится", "филиалы", "локация", "как добраться", "карта", "дананг", "нячанг", "хойан"
      ],
      answer: {
        vi: "Dạ, hệ thống nhà hàng Ăn Thôi gồm các chi nhánh:<br><br>" +
            "📍 <strong>Chi nhánh Đà Nẵng:</strong> 114 Bạch Đằng, Hải Châu, Đà Nẵng<br>" +
            "📍 <strong>Chi nhánh Nha Trang 1:</strong> 03 Ngô Đức Kế, Nha Trang<br>" +
            "📍 <strong>Chi nhánh Nha Trang 2:</strong> 64C Nguyễn Thị Minh Khai, Nha Trang<br>" +
            "📍 <strong>Chi nhánh Hội An:</strong> 40 Nguyễn Phúc Tần, An Hội",
        en: "Our restaurant locations:<br><br>" +
            "📍 <strong>Da Nang Branch:</strong> 114 Bach Dang, Hai Chau, Da Nang<br>" +
            "📍 <strong>Nha Trang Branch 1:</strong> 03 Ngo Duc Ke, Nha Trang<br>" +
            "📍 <strong>Nha Trang Branch 2:</strong> 64C Nguyen Thi Minh Khai, Nha Trang<br>" +
            "📍 <strong>Hoi An Branch:</strong> 40 Nguyen Phuc Tan, An Hoi",
        zh: "Ăn Thôi 旗下各分店地址如下：<br><br>" +
            "📍 <strong>岘港分店：</strong> 114 Bạch Đằng, Hải Châu, Đà Nẵng<br>" +
            "📍 <strong>芽庄1号店：</strong> 03 Ngô Đức Kế, Nha Trang<br>" +
            "📍 <strong>芽庄2号店：</strong> 64C Nguyễn Thị Minh Khai, Nha Trang<br>" +
            "📍 <strong>会安分店：</strong> 40 Nguyễn Phúc Tần, An Hội",
        ko: "Ăn Thôi 지점 안내:<br><br>" +
            "📍 <strong>다낭 지점:</strong> 114 Bạch Đằng, Hải Châu, Đà Nẵng<br>" +
            "📍 <strong>냐짱 1호점:</strong> 03 Ngô Đức Kế, Nha Trang<br>" +
            "📍 <strong>냐짱 2호점:</strong> 64C Nguyễn Thị Minh Khai, Nha Trang<br>" +
            "📍 <strong>호이안 지점:</strong> 40 Nguyễn Phúc Tần, An Hội",
        ru: "Адреса филиалов Ăn Thôi:<br><br>" +
            "📍 <strong>Филиал в Дананге:</strong> 114 Bạch Đằng, Hải Châu, Đà Nẵng<br>" +
            "📍 <strong>Филиал в Нячанге 1:</strong> 03 Ngô Đức Kế, Nha Trang<br>" +
            "📍 <strong>Филиал в Нячанге 2:</strong> 64C Nguyễn Thị Minh Khai, Nha Trang<br>" +
            "📍 <strong>Филиал в Хойане:</strong> 40 Nguyễn Phúc Tần, An Hội"
      },
      actions: [
        {
          label: {
            vi: "Chỉ đường: Đà Nẵng",
            en: "Directions: Da Nang",
            zh: "导航：岘港分店",
            ko: "길찾기: 다낭",
            ru: "Маршрут: Дананг"
          },
          url: "https://www.google.com/maps/search/?api=1&query=114+B%E1%BA%A1ch+%C4%90%E1%BA%B1ng+H%E1%BA%A3i+Ch%C3%A2u+%C4%90%C3%A0+N%E1%BA%B5ng",
          target: "_blank"
        },
        {
          label: {
            vi: "Chỉ đường: Nha Trang 1",
            en: "Directions: Nha Trang 1",
            zh: "导航：芽庄1号店",
            ko: "길찾기: 냐짱 1",
            ru: "Маршрут: Нячанг 1"
          },
          url: "https://www.google.com/maps/search/?api=1&query=03+Ng%C3%B4+%C4%90%E1%BB%A9c+K%E1%BA%BF+Nha+Trang",
          target: "_blank"
        },
        {
          label: {
            vi: "Chỉ đường: Nha Trang 2",
            en: "Directions: Nha Trang 2",
            zh: "导航：芽庄2号店",
            ko: "길찾기: 냐짱 2",
            ru: "Маршрут: Нячанг 2"
          },
          url: "https://www.google.com/maps/search/?api=1&query=64C+Nguy%E1%BB%85n+Th%E1%BB%8B+Minh+Khai+Nha+Trang",
          target: "_blank"
        },
        {
          label: {
            vi: "Chỉ đường: Hội An",
            en: "Directions: Hoi An",
            zh: "导航：会安分店",
            ko: "길찾기: 호이안",
            ru: "Маршрут: Хойан"
          },
          url: "https://www.google.com/maps/search/?api=1&query=40+Nguy%E1%BB%85n+Ph%C3%BAc+T%E1%BA%A7n+An+H%E1%BB%99i+H%E1%BB%99i+An",
          target: "_blank"
        }
      ]
    },

    {
      id: "dat-ban",
      label: {
        vi: "Hướng dẫn đặt bàn",
        en: "Booking Guide",
        zh: "预订指南",
        ko: "예약 안내",
        ru: "Как забронировать"
      },
      keywords: [
        // Tiếng Việt
        "huong dan dat ban", "cach dat ban", "dat ban", "giu cho", "dat cho", "book ban", "booking",
        "form dat ban", "dat ban truoc", "quy trinh dat ban", "lam sao de dat ban",
        // English
        "reserve", "reservation", "book a table", "how to book", "booking",
        // Chinese
        "预订", "订位", "订桌", "预约", "如何订位", "怎么预订", "订餐",
        // Korean
        "예약", "테이블예약", "자리예약", "예약방법", "예약하는법", "예약신청",
        // Russian
        "бронирование", "забронировать", "заказ столика", "как заказать", "резерв", "забронировать стол"
      ],
      answer: {
        vi: "Dạ, để đặt bàn bạn thực hiện theo các bước sau nhé:<br><br>" +
            "1. Vào trang <a href=\"dat-ban.html\" class=\"cb-link-highlight\"><strong>Đặt bàn</strong></a>.<br>" +
            "2. Điền đầy đủ thông tin (Họ tên, Số điện thoại, Ngày, Giờ, Số lượng khách, Chi nhánh) rồi bấm <strong>Xác nhận đặt bàn</strong>.<br>" +
            "3. Bạn sẽ nhận được xác nhận đặt bàn qua số điện thoại đã điền.<br><br>" +
            "Mời bạn bấm nút <strong>Đến trang Đặt bàn</strong> bên dưới để đặt bàn nhanh chóng nhé!",
        en: "To reserve a table, please follow these steps:<br><br>" +
            "1. Go to our <a href=\"dat-ban.html\" class=\"cb-link-highlight\"><strong>Reservation page</strong></a>.<br>" +
            "2. Fill in your details (Full name, Phone number, Date, Time, Guests, Branch) and click <strong>Confirm</strong>.<br>" +
            "3. You will receive a booking confirmation via your phone number.<br><br>" +
            "Click the button below to open the Reservation page now!",
        zh: "如需预订餐桌，请按照以下步骤操作：<br><br>" +
            "1. 访问 <a href=\"dat-ban.html\" class=\"cb-link-highlight\"><strong>预订页面</strong></a>。<br>" +
            "2. 填写您的信息（姓名、电话、日期、时间、就餐人数、分店），然后点击 <strong>确认预订</strong>。<br>" +
            "3. 预订确认信息将发送至您填写的电话号码。<br><br>" +
            "请点击下方按钮直接前往预订页面！",
        ko: "테이블 예약은 아래 절차를 통해 간편하게 진행하실 수 있습니다:<br><br>" +
            "1. <a href=\"dat-ban.html\" class=\"cb-link-highlight\"><strong>예약 페이지</strong></a>로 이동합니다.<br>" +
            "2. 정보(성함, 연락처, 날짜, 시간, 인원수, 방문 지점)를 입력하고 <strong>예약 확정</strong>을 누릅니다.<br>" +
            "3. 남겨주신 전화번호로 예약 확정 안내가 전송됩니다.<br><br>" +
            "아래 버튼을 눌러 지금 바로 예약해 보세요!",
        ru: "Чтобы забронировать столик, выполните следующие шаги:<br><br>" +
            "1. Перейдите на страницу <a href=\"dat-ban.html\" class=\"cb-link-highlight\"><strong>Бронирование</strong></a>.<br>" +
            "2. Заполните данные (Имя, Телефон, Дата, Время, Количество гостей, Филиал) и нажмите <strong>Подтвердить бронирование</strong>.<br>" +
            "3. Вы получите подтверждение по указанному номеру телефона.<br><br>" +
            "Нажмите кнопку ниже, чтобы перейти к бронированию!"
      },
      actions: [
        {
          label: {
            vi: "Đến trang Đặt bàn",
            en: "Go to Reservation Page",
            zh: "前往预订页面",
            ko: "예약 페이지로 이동",
            ru: "Перейти к бронированию"
          },
          url: "dat-ban.html",
          target: "_self"
        }
      ]
    },

    {
      id: "thuc-don",
      label: {
        vi: "Thực đơn",
        en: "Menu",
        zh: "菜单",
        ko: "메뉴",
        ru: "Меню"
      },
      keywords: [
        // Tiếng Việt
        "thuc don", "menu", "mon an", "co nhung mon gi", "danh sach mon", "an gi", "do an",
        // English
        "menu", "food", "dishes", "what to eat", "cuisine",
        // Chinese
        "菜单", "菜品", "特色菜", "有什么吃的", "美食", "吃什么",
        // Korean
        "메뉴", "음식", "요리", "식사", "추천메뉴", "먹을거리",
        // Russian
        "меню", "блюда", "еда", "что попробовать", "кухня", "список блюд"
      ],
      answer: {
        vi: "Dạ, mời bạn chọn nhóm món ăn bạn quan tâm bên dưới để xem gợi ý nhanh:",
        en: "Please select a category below to explore our signature suggestions:",
        zh: "请在下方选择您感兴趣的菜品类别以查看推荐：",
        ko: "원하시는 메뉴 구분을 선택하시면 추천 요리를 안내해 드립니다:",
        ru: "Выберите категорию блюд ниже, чтобы ознакомиться с рекомендациями:"
      },
      quickReplies: [
        "menu-bestseller",
        "menu-spicy",
        "menu-kids"
      ],
      actions: [
        {
          label: {
            vi: "Xem toàn bộ thực đơn",
            en: "View Full Menu",
            zh: "查看完整菜单",
            ko: "전체 메뉴 보기",
            ru: "Посмотреть полное меню"
          },
          url: "thuc-don.html",
          target: "_self"
        }
      ]
    },

    {
      id: "menu-bestseller",
      label: {
        vi: "1. Best Seller",
        en: "1. Best Seller",
        zh: "1. 招牌热卖 (Best Seller)",
        ko: "1. 베스트셀러 (Best Seller)",
        ru: "1. Хиты продаж (Best Seller)"
      },
      keywords: [
        // Tiếng Việt
        "best seller", "bestseller", "ban chay", "mon ban chay", "mon ngon nhat", "mon dac trung", "mon hot",
        // English
        "bestseller", "best seller", "signature", "popular", "top dishes",
        // Chinese
        "招牌", "热卖", "人气", "畅销", "推荐菜", "必点",
        // Korean
        "베스트셀러", "인기메뉴", "시그니처", "대표메뉴", "추천요리",
        // Russian
        "хит продаж", "популярные блюда", "фирменные блюда", "топ блюд", "бестселлер"
      ],
      answer: {
        vi: "Dạ, các món <strong>Best Seller</strong> được yêu thích nhất tại Ăn Thôi gồm:<br><br>" +
            "• Bánh xèo<br>" +
            "• Nem lụi<br>" +
            "• Phở bò<br>" +
            "• Hàu nướng phô mai<br>" +
            "• Cơm chiên trái thơm<br>" +
            "• Tôm sốt tỏi",
        en: "Our top <strong>Best Seller</strong> dishes at An Thoi:<br><br>" +
            "• Vietnamese Crispy Pancake (Banh xeo)<br>" +
            "• Lemongrass Pork Skewers (Nem lui)<br>" +
            "• Beef Pho<br>" +
            "• Grilled Oysters with Cheese<br>" +
            "• Pineapple Fried Rice<br>" +
            "• Garlic Butter Prawns",
        zh: "Ăn Thôi 最受欢迎的 <strong>招牌热卖菜品</strong>：<br><br>" +
            "• 越南酥脆煎饼 (Bánh xèo)<br>" +
            "• 香茅烤肉串 (Nem lụi)<br>" +
            "• 传统牛肉河粉 (Phở bò)<br>" +
            "• 芝士焗生蚝 (Hàu nướng phô mai)<br>" +
            "• 菠萝海鲜炒饭 (Cơm chiên trái thơm)<br>" +
            "• 蒜蓉大虾 (Tôm sốt tỏi)",
        ko: "Ăn Thôi에서 가장 사랑받는 <strong>베스트셀러 메뉴</strong>입니다:<br><br>" +
            "• 반쎄오 (베트남식 부침개)<br>" +
            "• 넴루이 (레몬그라스 돼지고기 꼬치구이)<br>" +
            "• 소고기 쌀국수 (포보)<br>" +
            "• 치즈 구이 굴 (Hàu nướng phô mai)<br>" +
            "• 파인애플 볶음밥<br>" +
            "• 갈릭버터 새우",
        ru: "Самые популярные <strong>хиты продаж</strong> в Ăn Thôi:<br><br>" +
            "• Вьетнамский блинчик Бань сео (Bánh xèo)<br>" +
            "• Шашлычки Нем луй с лемонграссом (Nem lụi)<br>" +
            "• Фо бо с говядиной (Phở bò)<br>" +
            "• Запеченные устрицы с сыром (Hàu nướng phô mai)<br>" +
            "• Жареный рис с ананасом (Cơm chiên trái thơm)<br>" +
            "• Креветки в чесночном соусе (Tôm sốt tỏi)"
      },
      quickReplies: [
        "menu-spicy",
        "menu-kids",
        "dat-ban"
      ],
      actions: [
        {
          label: {
            vi: "Xem toàn bộ thực đơn",
            en: "View Full Menu",
            zh: "查看完整菜单",
            ko: "전체 메뉴 보기",
            ru: "Посмотреть полное меню"
          },
          url: "thuc-don.html",
          target: "_self"
        }
      ]
    },

    {
      id: "menu-spicy",
      label: {
        vi: "2. Món ăn cay",
        en: "2. Spicy Dishes",
        zh: "2. 辛辣美味",
        ko: "2. 매콤한 요리",
        ru: "2. Острые блюда"
      },
      keywords: [
        // Tiếng Việt
        "mon an cay", "mon cay", "cay", "do cay", "vi cay",
        // English
        "spicy", "hot", "chili",
        // Chinese
        "辣", "微辣", "辛辣", "辣味", "辣椒",
        // Korean
        "매운", "매콤", "매운맛", "스파이시",
        // Russian
        "острое", "острые блюда", "перченый", "чили", "острый"
      ],
      answer: {
        vi: "Dạ, các <strong>Món ăn cay</strong> đậm đà hương vị tại Ăn Thôi gồm:<br><br>" +
            "• Phở Lòng<br>" +
            "• Hủ tiếu mực<br>" +
            "• Rau muống xào \"Ăn Thôi\"<br>" +
            "• Cơm rau Mặt trời",
        en: "Our flavorful <strong>Spicy Dishes</strong> at An Thoi:<br><br>" +
            "• Spicy Offal Pho (Pho Long)<br>" +
            "• Spicy Squid Noodle Soup<br>" +
            "• An Thoi Stir-fried Morning Glory<br>" +
            "• Sun-style Vegetable Rice",
        zh: "Ăn Thôi 浓郁浓香的 <strong>辛辣风味菜品</strong>：<br><br>" +
            "• 香辣牛杂河粉 (Phở Lòng)<br>" +
            "• 鲜鱿粿条 (Hủ tiếu mực)<br>" +
            "• Ăn Thôi 炒空心菜<br>" +
            "• 太阳风味时蔬炒饭",
        ko: "풍미 가득한 Ăn Thôi의 <strong>매콤한 요리</strong>:<br><br>" +
            "• 매콤 내장 쌀국수 (포 롱)<br>" +
            "• 오징어 후티우 국수<br>" +
            "• 안토이 특제 모닝글로리 볶음<br>" +
            "• 썬스타일 야채 볶음밥",
        ru: "Насыщенные и пикантные <strong>острые блюда</strong> в Ăn Thôi:<br><br>" +
            "• Пряный Фо с потрошками (Phở Lòng)<br>" +
            "• Острый суп с кальмарами Хутьеу<br>" +
            "• Жареный водяной шпинат по-антойски<br>" +
            "• Овощной рис «Солнечный»"
      },
      quickReplies: [
        "menu-bestseller",
        "menu-kids",
        "dat-ban"
      ],
      actions: [
        {
          label: {
            vi: "Xem toàn bộ thực đơn",
            en: "View Full Menu",
            zh: "查看完整菜单",
            ko: "전체 메뉴 보기",
            ru: "Посмотреть полное меню"
          },
          url: "thuc-don.html",
          target: "_self"
        }
      ]
    },

    {
      id: "menu-kids",
      label: {
        vi: "3. Món ăn phù hợp với trẻ em",
        en: "3. Kid-friendly Dishes",
        zh: "3. 儿童适宜菜品",
        ko: "3. 어린이 추천 메뉴",
        ru: "3. Блюда для детей"
      },
      keywords: [
        // Tiếng Việt
        "mon an phu hop voi tre em", "mon an tre em", "mon cho tre em", "tre em", "cho be", "em be", "khong cay", "mon khong cay",
        // English
        "kids", "kid friendly", "children", "baby", "non spicy", "mild",
        // Chinese
        "儿童", "小孩", "宝宝", "不辣", "儿童餐", "清淡",
        // Korean
        "어린이", "아이", "키즈", "안매운", "순한맛", "아기", "자녀",
        // Russian
        "дети", "детям", "для детей", "не острое", "детское меню", "малыш"
      ],
      answer: {
        vi: "Dạ, các <strong>Món ăn phù hợp với trẻ em</strong> (thanh dịu, dễ ăn, dinh dưỡng) gồm:<br><br>" +
            "• Phở bò<br>" +
            "• Mì xào hải sản<br>" +
            "• Cơm chiên trái thơm<br>" +
            "• Hoành thánh chiên<br>" +
            "• Nem lụi",
        en: "Our <strong>Kid-friendly Dishes</strong> (mild, nutritious and delicious):<br><br>" +
            "• Beef Pho<br>" +
            "• Seafood Fried Noodles<br>" +
            "• Pineapple Fried Rice<br>" +
            "• Crispy Fried Wontons<br>" +
            "• Lemongrass Pork Skewers (Nem lui)",
        zh: "适宜儿童享用（口味温和、清爽、营养丰富）的 <strong>精选菜品</strong>：<br><br>" +
            "• 传统牛肉河粉<br>" +
            "• 海鲜炒面<br>" +
            "• 菠萝炒饭<br>" +
            "• 香脆炸云吞<br>" +
            "• 香茅烤肉串 (Nem lụi)",
        ko: "아이들을 위한 <strong>순하고 영양 가득한 메뉴</strong>입니다:<br><br>" +
            "• 소고기 쌀국수 (포보)<br>" +
            "• 해산물 볶음면<br>" +
            "• 파인애플 볶음밥<br>" +
            "• 바삭한 튀김 완탕<br>" +
            "• 넴루이 (돼지고기 꼬치구이)",
        ru: "Блюда, <strong>подходящие для детей</strong> (мягкий вкус, полезно и вкусно):<br><br>" +
            "• Фо бо с говядиной<br>" +
            "• Жареная лапша с морепродуктами<br>" +
            "• Жареный рис с ананасом<br>" +
            "• Хрустящие жареные вонтоны<br>" +
            "• Шашлычки Нем луй"
      },
      quickReplies: [
        "menu-bestseller",
        "menu-spicy",
        "dat-ban"
      ],
      actions: [
        {
          label: {
            vi: "Xem toàn bộ thực đơn",
            en: "View Full Menu",
            zh: "查看完整菜单",
            ko: "전체 메뉴 보기",
            ru: "Посмотреть полное меню"
          },
          url: "thuc-don.html",
          target: "_self"
        }
      ]
    },

    {
      id: "khong-gian",
      label: {
        vi: "Không gian",
        en: "Space",
        zh: "餐厅环境",
        ko: "공간 & 분위기",
        ru: "Атмосфера и зал"
      },
      keywords: [
        // Tiếng Việt
        "khong gian", "trai nghiem", "view", "view song han", "song han", "cho ngoi", "phong rieng", "am cung",
        // English
        "space", "ambience", "view", "river view", "seating", "atmosphere",
        // Chinese
        "环境", "空间", "江景", "汉江", "包厢", "座位", "氛围",
        // Korean
        "공간", "분위기", "뷰", "한강뷰", "좌석", "룸", "인테리어",
        // Russian
        "атмосфера", "пространство", "интерьер", "вид", "река хан", "зал", "места"
      ],
      answer: {
        vi: "Ăn Thôi mang đến không gian ấm cúng, gần gũi bên dòng sông Hàn, nơi một bữa ăn trở thành một ký ức. Mời bạn ghé xem trang Trải nghiệm nhé.",
        en: "An Thoi offers a warm and cozy space by the Han River, where every meal turns into a lasting memory. Please visit our Experience page to learn more.",
        zh: "Ăn Thôi 位于诗意的汉江之畔，提供温馨亲切的就餐空间，让每一次用餐都成为难忘的回忆。欢迎浏览我们的体验页面了解更多。",
        ko: "Ăn Thôi는 한강변에 위치하여 식사가 소중한 추억이 되는 따스하고 아늑한 공간을 선사합니다. '경험' 페이지에서 더 자세히 만나보세요.",
        ru: "Ăn Thôi дарит теплую и уютную атмосферу на берегу реки Хан, где каждая трапеза превращается в приятное воспоминание. Приглашаем посетить страницу «Опыт»."
      },
      actions: [
        {
          label: {
            vi: "Xem không gian",
            en: "Explore Space",
            zh: "探索就餐环境",
            ko: "공간 둘러보기",
            ru: "Посмотреть зал"
          },
          url: "trai-nghiem.html",
          target: "_self"
        }
      ]
    },

    {
      id: "lien-he",
      label: {
        vi: "Liên hệ",
        en: "Contact",
        zh: "联系我们",
        ko: "문의하기",
        ru: "Контакты"
      },
      keywords: [
        // Tiếng Việt
        "lien he", "so dien thoai", "hotline", "sdt", "dien thoai",
        // English
        "phone", "contact", "hotline", "call", "telephone",
        // Chinese
        "联系", "电话", "热线", "咨询", "客服",
        // Korean
        "연락처", "문의", "전화", "핫라인", "전화번호",
        // Russian
        "контакты", "телефон", "горячая линия", "связаться", "номер"
      ],
      answer: {
        vi: "Bạn có thể liên hệ trực tiếp với chi nhánh Đà Nẵng qua Hotline: <strong>0987.824.285</strong> (hoặc qua trang Liên hệ).",
        en: "You can reach our Da Nang branch at Hotline: <strong>0987.824.285</strong> or visit our Contact page.",
        zh: "您可以直接拨打岘港分店热线：<strong>0987.824.285</strong> 与我们联系（或访问“联系我们”页面）。",
        ko: "다낭 지점 핫라인 <strong>0987.824.285</strong>로 바로 전화 주시거나 '문의' 페이지를 이용해 주세요.",
        ru: "Вы можете связаться с филиалом в Дананге по горячей линии: <strong>0987.824.285</strong> или через страницу «Контакты»."
      },
      actions: [
        {
          label: {
            vi: "Xem trang Liên hệ",
            en: "Contact Page",
            zh: "前往联系页面",
            ko: "문의 페이지 이동",
            ru: "Перейти к контактам"
          },
          url: "lien-he.html",
          target: "_self"
        }
      ]
    },

    {
      id: "loi-chao",
      label: {
        vi: "Chào hỏi",
        en: "Greeting",
        zh: "问候",
        ko: "인사",
        ru: "Приветствие"
      },
      keywords: [
        // Tiếng Việt
        "xin chao", "chao ban", "chao an thoi", "chao", "alo", "ad oi",
        // English
        "hello", "hi", "hey", "good morning", "good afternoon", "good evening",
        // Chinese
        "你好", "您好", "哈喽", "早上好", "晚上好", "打扰一下",
        // Korean
        "안녕", "안녕하세요", "반갑습니다", "하이", "처음 뵙겠습니다",
        // Russian
        "привет", "здравствуйте", "добрый день", "добрый вечер", "доброе утро", "хай"
      ],
      answer: {
        vi: "Xin chào bạn! Mình là trợ lý của Ăn Thôi. Bạn có thể chọn các gợi ý bên dưới hoặc gửi câu hỏi để mình hỗ trợ nhé.",
        en: "Hello! I am An Thoi's virtual assistant. Feel free to choose any quick topic below or type your question.",
        zh: "您好！我是 Ăn Thôi 的在线助手。您可以点击下方的快捷提示，或随时输入您的问题。",
        ko: "안녕하세요! Ăn Thôi 온라인 도우미입니다. 아래 제안된 항목을 누르시거나 궁금한 점을 입력해 주세요.",
        ru: "Здравствуйте! Я онлайн-помощник ресторана Ăn Thôi. Выберите тему ниже или напишите свой вопрос."
      },
      quickReplies: [
        "gio-mo-cua",
        "dia-chi",
        "dat-ban",
        "thuc-don"
      ],
      actions: []
    },

    {
      id: "loi-cam-on",
      label: {
        vi: "Cảm ơn",
        en: "Thank you",
        zh: "感谢",
        ko: "감사",
        ru: "Спасибо"
      },
      keywords: [
        // Tiếng Việt
        "cam on", "cam on ban", "cam on nhieu", "da cam on", "ok cam on", "tks",
        // English
        "thanks", "thank you", "thank", "appreciate", "thx",
        // Chinese
        "谢谢", "感谢", "多谢", "非常感谢", "谢了",
        // Korean
        "감사", "감사합니다", "고마워", "고맙습니다", "감사해요",
        // Russian
        "спасибо", "благодарю", "большое спасибо", "мерси"
      ],
      answer: {
        vi: "Dạ không có gì ạ! Rất vui được hỗ trợ bạn. Chúc bạn một ngày tốt lành và hy vọng sớm được đón tiếp bạn tại Ăn Thôi!",
        en: "You are very welcome! We wish you a wonderful day and look forward to welcoming you at An Thoi.",
        zh: "不客气！非常高兴能为您提供帮助。祝您度过愉快的一天，期待很快在 Ăn Thôi 与您相遇！",
        ko: "천만에요! 도움을 드릴 수 있어 기쁩니다. 오늘도 행복한 하루 보내시고 Ăn Thôi에서 곧 뵙기를 기대하겠습니다!",
        ru: "Пожалуйста! Всегда рады помочь. Желаем вам прекрасного дня и с нетерпением ждем вас в Ăn Thôi!"
      },
      actions: []
    }
  ]
};
