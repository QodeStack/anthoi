/**
 * CHATBOT FAQ DATA - NHÀ HÀNG ĂN THÔI
 * Cấu trúc dữ liệu theo ngôn ngữ (i18n ready).
 * Ngôn ngữ lịch sự, ngắn gọn, đúng trọng tâm yêu cầu.
 */

window.AN_THOI_CHATBOT_DATA = {
  defaultLang: "vi",
  
  // Lời chào mở đầu với 4 gợi ý chính
  greeting: {
    text: {
      vi: "Xin chào, Ăn Thôi có thể giúp gì cho bạn? Bạn có thể chọn các gợi ý bên dưới hoặc gửi tin nhắn cho mình nhé.",
      en: "Hello, how can An Thoi assist you today? You can choose a quick topic below or type your question."
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
      en: "I didn't quite catch that. Please select an option below or contact our restaurant directly."
    },
    actions: [
      {
        label: {
          vi: "Xem trang Liên hệ",
          en: "Visit Contact Page"
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

  // Danh sách các chủ đề kịch bản
  topics: [
    {
      id: "gio-mo-cua",
      label: {
        vi: "Giờ mở cửa",
        en: "Opening Hours"
      },
      keywords: [
        "gio mo cua",
        "gio hoat dong",
        "may gio mo cua",
        "may gio dong cua",
        "may gio",
        "gio giac",
        "thoi gian mo cua",
        "mo cua luc may gio",
        "dong cua luc may gio",
        "gio phuc vu",
        "thoi gian hoat dong",
        "khi nao mo cua",
        "khi nao dong cua",
        "last order",
        "open",
        "opening hours",
        "closing hours"
      ],
      answer: {
        vi: "Ăn Thôi mở cửa vào lúc <strong>10h30</strong> đóng cửa vào <strong>23h00</strong> (Last Order 9h30).<br><br>Rất hân hạnh được đón tiếp và phục vụ bạn!",
        en: "An Thoi is open from <strong>10:30 AM</strong> to <strong>11:00 PM</strong> (Last Order at 9:30 PM).<br><br>We look forward to serving you!"
      },
      actions: [
        {
          label: {
            vi: "Đặt bàn ngay",
            en: "Book a table now"
          },
          url: "lien-he.html#dat-ban",
          target: "_self"
        }
      ]
    },
    {
      id: "dia-chi",
      label: {
        vi: "Địa chỉ",
        en: "Address"
      },
      keywords: [
        "dia chi",
        "chi nhanh",
        "he thong",
        "o dau",
        "o cho nao",
        "dia diem",
        "vi tri",
        "duong di",
        "tim duong",
        "toa lac",
        "114 bach dang",
        "bach dang",
        "hai chau",
        "da nang",
        "nha trang",
        "hoi an",
        "ngo duc ke",
        "nguyen thi minh khai",
        "nguyen phuc tan",
        "map",
        "maps",
        "google map",
        "address",
        "location",
        "branches"
      ],
      answer: {
        vi: "Dạ, hệ thống nhà hàng Ăn Thôi gồm các chi nhánh:<br><br>" +
            "📍 <strong>Da Nang Branch:</strong> 114 Bạch Đằng, Hải Châu, Đà Nẵng<br>" +
            "📍 <strong>Nha Trang Branch 1:</strong> 03 Ngô Đức Kế, Nha Trang<br>" +
            "📍 <strong>Nha Trang Branch 2:</strong> 64C Nguyễn Thị Minh Khai, Nha Trang<br>" +
            "📍 <strong>Hoi An Branch:</strong> 40 Nguyễn Phúc Tần, An Hội",
        en: "Our restaurant locations:<br><br>" +
            "📍 <strong>Da Nang Branch:</strong> 114 Bach Dang, Hai Chau, Da Nang<br>" +
            "📍 <strong>Nha Trang Branch 1:</strong> 03 Ngo Duc Ke, Nha Trang<br>" +
            "📍 <strong>Nha Trang Branch 2:</strong> 64C Nguyen Thi Minh Khai, Nha Trang<br>" +
            "📍 <strong>Hoi An Branch:</strong> 40 Nguyen Phuc Tan, An Hoi"
      },
      actions: [
        {
          label: {
            vi: "Chỉ đường: Đà Nẵng",
            en: "Directions: Da Nang"
          },
          url: "https://www.google.com/maps/search/?api=1&query=114+B%E1%BA%A1ch+%C4%90%E1%BA%B1ng+H%E1%BA%A3i+Ch%C3%A2u+%C4%90%C3%A0+N%E1%BA%B5ng",
          target: "_blank"
        },
        {
          label: {
            vi: "Chỉ đường: Nha Trang 1",
            en: "Directions: Nha Trang 1"
          },
          url: "https://www.google.com/maps/search/?api=1&query=03+Ng%C3%B4+%C4%90%E1%BB%A9c+K%E1%BA%BF+Nha+Trang",
          target: "_blank"
        },
        {
          label: {
            vi: "Chỉ đường: Nha Trang 2",
            en: "Directions: Nha Trang 2"
          },
          url: "https://www.google.com/maps/search/?api=1&query=64C+Nguy%E1%BB%85n+Th%E1%BB%8B+Minh+Khai+Nha+Trang",
          target: "_blank"
        },
        {
          label: {
            vi: "Chỉ đường: Hội An",
            en: "Directions: Hoi An"
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
        en: "Booking Guide"
      },
      keywords: [
        "huong dan dat ban",
        "cach dat ban",
        "dat ban",
        "giu cho",
        "dat cho",
        "book ban",
        "booking",
        "form dat ban",
        "dat ban truoc",
        "quy trinh dat ban",
        "lam sao de dat ban",
        "reserve",
        "reservation",
        "book a table"
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
            "Click the button below to open the Reservation page now!"
      },
      actions: [
        {
          label: {
            vi: "Đến trang Đặt bàn",
            en: "Go to Reservation Page"
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
        en: "Menu"
      },
      keywords: [
        "thuc don",
        "menu",
        "mon an",
        "co nhung mon gi",
        "danh sach mon",
        "an gi"
      ],
      answer: {
        vi: "Dạ, mời bạn chọn nhóm món ăn bạn quan tâm bên dưới để xem gợi ý nhanh:",
        en: "Please select a category below to explore our signature suggestions:"
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
            en: "View Full Menu"
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
        en: "1. Best Seller"
      },
      keywords: [
        "best seller",
        "bestseller",
        "ban chay",
        "mon ban chay",
        "mon ngon nhat",
        "mon dac trung",
        "mon hot"
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
            "• Garlic Butter Prawns"
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
            en: "View Full Menu"
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
        en: "2. Spicy Dishes"
      },
      keywords: [
        "mon an cay",
        "mon cay",
        "cay",
        "do cay",
        "vi cay",
        "spicy"
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
            "• Sun-style Vegetable Rice"
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
            en: "View Full Menu"
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
        en: "3. Kid-friendly Dishes"
      },
      keywords: [
        "mon an phu hop voi tre em",
        "mon an tre em",
        "mon cho tre em",
        "tre em",
        "cho be",
        "em be",
        "khong cay",
        "mon khong cay",
        "kids",
        "kid friendly"
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
            "• Lemongrass Pork Skewers (Nem lui)"
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
            en: "View Full Menu"
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
        en: "Space"
      },
      keywords: [
        "khong gian",
        "trai nghiem",
        "view",
        "view song han",
        "song han",
        "cho ngoi",
        "phong rieng",
        "am cung",
        "ambience"
      ],
      answer: {
        vi: "Ăn Thôi mang đến không gian ấm cúng, gần gũi bên dòng sông Hàn, nơi một bữa ăn trở thành một ký ức. Mời bạn ghé xem trang Trải nghiệm nhé.",
        en: "An Thoi offers a warm and cozy space by the Han River. Please visit our Experience page to learn more."
      },
      actions: [
        {
          label: {
            vi: "Xem không gian",
            en: "Explore Space"
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
        en: "Contact"
      },
      keywords: [
        "lien he",
        "so dien thoai",
        "hotline",
        "sdt",
        "dien thoai",
        "phone",
        "contact"
      ],
      answer: {
        vi: "Bạn có thể liên hệ trực tiếp với chi nhánh Đà Nẵng qua Hotline: <strong>0987.824.285</strong> (hoặc qua trang Liên hệ).",
        en: "You can reach our Da Nang branch at Hotline: <strong>0987.824.285</strong> or visit our Contact page."
      },
      actions: [
        {
          label: {
            vi: "Xem trang Liên hệ",
            en: "Contact Page"
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
        en: "Greeting"
      },
      keywords: [
        "xin chao",
        "chao ban",
        "chao an thoi",
        "chao",
        "hello",
        "hi",
        "hey",
        "alo",
        "ad oi"
      ],
      answer: {
        vi: "Xin chào bạn! Mình là trợ lý của Ăn Thôi. Bạn có thể chọn các gợi ý bên dưới hoặc gửi câu hỏi để mình hỗ trợ nhé.",
        en: "Hello! I am An Thoi's virtual assistant. Feel free to choose any quick topic below or type your question."
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
        en: "Thank you"
      },
      keywords: [
        "cam on",
        "cam on ban",
        "cam on nhieu",
        "da cam on",
        "thanks",
        "thank you",
        "ok cam on"
      ],
      answer: {
        vi: "Dạ không có gì ạ! Rất vui được hỗ trợ bạn. Chúc bạn một ngày tốt lành và hy vọng sớm được đón tiếp bạn tại Ăn Thôi!",
        en: "You are very welcome! We wish you a wonderful day and look forward to welcoming you at An Thoi."
      },
      actions: []
    }
  ]
};
