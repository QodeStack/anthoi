/* =========================================================
   DỮ LIỆU THỰC ĐƠN & JOURNAL - ĂN THÔI
   Nhà hàng Ẩm thực Việt - 114 Bạch Đằng, Hải Châu, Đà Nẵng
   ========================================================= */
window.AN_THOI_DATA = {
  menu: {
    /* Món đặc trưng của Bếp Trưởng */
    signature: [
      {
        id: "sig-1",
        name: "Cá Bớp Nướng Lá Chuối Tiêu Rừng",
        enName: "Charcoal-Grilled Cobia in Banana Leaves with Wild Forest Pepper",
        desc: "Cá bớp tươi bến Thọ Quang ướp mắc khén, tiêu rừng Tây Giang, cuộn lá chuối tươi nướng than hoa thơm lừng.",
        story: "Món ăn lấy cảm hứng từ những chuyến đi rừng của bếp trưởng tại rẻo cao Tây Giang kết hợp nguồn hải sản tươi rói sớm mai từ bến cá Thọ Quang Đà Nẵng.",
        pairing: "Gợi ý đồ uống: Vang trắng Sauvignon Blanc hoặc Trà Sen Tây Hồ ủ lạnh.",
        price: "265.000 đ",
        priceNum: 265000,
        tags: ["Signature", "Hải sản tươi", "Bán chạy"],
        category: "Món đặc trưng",
        spicy: 1,
        vegetarian: false,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "sig-2",
        name: "Mỳ Quảng Tôm Thịt Niêu Đất",
        enName: "Artisan Quang-Style Rice Noodles with Braised Shrimp & Pork in Claypot",
        desc: "Sợi mỳ gạo gia truyền cán thủ công, tôm đất xào đượm vị mắm ruốc, nước nhưỡng sánh vàng thơm nghệ tươi, ăn kèm bánh tráng mè nướng giòn rụm.",
        story: "Món quà trứ danh xứ Quảng được nâng niu trong niêu đất nung giữ trọn độ nóng ấm và hương vị mộc mạc nguyên bản từ thế hệ trước truyền lại.",
        pairing: "Gợi ý đồ uống: Nước mát thảo mộc sả tắc lá nếp.",
        price: "145.000 đ",
        priceNum: 145000,
        tags: ["Signature", "Đặc sản xứ Quảng", "Bán chạy"],
        category: "Món đặc trưng",
        spicy: 1,
        vegetarian: false,
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "sig-3",
        name: "Bò Tơ Nướng Ống Tre Tiêu Xanh",
        enName: "Young Beef Steamed in Mountain Bamboo with Fresh Green Peppercorns",
        desc: "Thịt bò tơ mềm ngọt ướp mật mía và tiêu xanh Tiên Phước, nhồi trong ống tre nứa non rồi om chậm trên than củi hồng.",
        story: "Hương nứa non quyện chặt vào thớ thịt bò mềm mọng tạo nên mùi thơm mộc mạc khó quên của núi rừng Trường Sơn hùng vĩ.",
        pairing: "Gợi ý đồ uống: Rượu Mơ Má Đào Mộc Châu hoặc Vang Đỏ tuyển chọn.",
        price: "295.000 đ",
        priceNum: 295000,
        tags: ["Signature", "Bếp trưởng gợi ý", "Đậm đà"],
        category: "Món đặc trưng",
        spicy: 1,
        vegetarian: false,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "sig-4",
        name: "Gỏi Bưởi Tôm Đất Cù Lao",
        enName: "Cu Lao Pomelo Salad with Wild River Shrimp & Fresh Herbs",
        desc: "Múi bưởi hồng mọng nước hòa quyện tôm đất rang giòn ngọt, rau răm Trà Quế, hành phi giòn rụm và nước mắm chua ngọt Nam Ô.",
        story: "Sự cân bằng tuyệt mỹ giữa vị thanh ngọt tự nhiên, chua dịu và thơm thảo từ vườn bưởi phù sa bên dòng sông Thu Bồn.",
        pairing: "Gợi ý đồ uống: Trà Sen Tây Hồ hoặc Mocktail chanh dây thảo mộc.",
        price: "185.000 đ",
        priceNum: 185000,
        tags: ["Signature", "Khai vị thanh mát", "Bán chạy"],
        category: "Món đặc trưng",
        spicy: 0,
        vegetarian: false,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      }
    ],

    /* Danh mục món ăn chi tiết */
    categories: [
      {
        id: "cat-khai-vi",
        name: "Khởi Vị (Khai Vị & Gỏi)",
        enName: "Appetizers & Refreshing Salads",
        desc: "Những thức quà mở màn đánh thức vị giác nhẹ nhàng và tươi mát.",
        items: [
          {
            id: "kv-1",
            name: "Nem Lụi Nướng Sả Phố Cổ",
            enName: "Hoi An Grilled Pork Skewers on Lemongrass Stalks",
            desc: "Thịt heo tơ quết dẻo nướng sả cây thơm ngậy, cuốn bánh tráng đại lộc, rau sống Trà Quế chấm nước tương đậu gan heo gia truyền.",
            price: "155.000 đ",
            priceNum: 155000,
            tags: ["Đặc sản", "Bán chạy"],
            vegetarian: false,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "kv-2",
            name: "Chả Giò Hải Sản Sốt Me Nướng",
            enName: "Crispy Seafood Spring Rolls with Roasted Tamarind Glaze",
            desc: "Vỏ ram giòn tan ôm trọn nhân mực và tôm bến Thọ Quang tươi ngọt, chấm cùng sốt me chín chua cay đậm vị.",
            price: "165.000 đ",
            priceNum: 165000,
            tags: ["Hải sản tươi", "Giòn rụm"],
            vegetarian: false,
            spicy: 1,
            image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "kv-3",
            name: "Nộm Hoa Chuối Gà Xé Phay",
            enName: "Banana Blossom Salad with Shredded Free-Range Chicken",
            desc: "Búp hoa chuối tiêu non thái mỏng giòn sần sật, thịt gà ta thả vườn dai ngọt xé phay bóp chua ngọt cùng rau răm và lạc rang thơm lừng.",
            price: "145.000 đ",
            priceNum: 145000,
            tags: ["Dân dã", "Thanh vị"],
            vegetarian: false,
            spicy: 1,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "kv-4",
            name: "Gỏi Ngó Sen Tôm Thịt Giòn Tan",
            enName: "Crisp Lotus Stem Salad with Poached Prawns & Pork",
            desc: "Ngó sen tươi ngâm giấm đường giòn rụm, tôm đất luộc chín đỏ au, thịt ba chỉ luộc thái mỏng rắc mè trắng và rau thơm.",
            price: "155.000 đ",
            priceNum: 155000,
            tags: ["Truyền thống"],
            vegetarian: false,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "kv-5",
            name: "Ram Tôm Đất Giòn Rụm Xứ Quảng",
            enName: "Crispy Central Wild Prawn Little Rolls",
            desc: "Tôm đất nguyên con tươi roi rói cuộn bánh tráng phơi sương, chiên phồng ráo dầu, ăn kèm rau rừng và nước mắm ớt tỏi lý sơn.",
            price: "160.000 đ",
            priceNum: 160000,
            tags: ["Đặc sản", "Bán chạy"],
            vegetarian: false,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80"
          }
        ]
      },
      {
        id: "cat-mon-chinh",
        name: "Món Chính Tuyển Chọn",
        enName: "Main Course Specialties",
        desc: "Tinh hoa ẩm thực nồng nàn từ lửa than hồng, niêu đất và nguyên liệu hảo hạng.",
        items: [
          {
            id: "mc-1",
            name: "Cá Lăng Kho Tộ Niêu Đất",
            enName: "Claypot Braised Catfish in Caramelized Fish Sauce",
            desc: "Thớ cá lăng béo ngọt om chậm trong niêu đất cùng nước hàng thắng kẹo đắng, ớt hiểm đỏ và tiêu sọ Phú Quốc thơm nức mũi.",
            price: "285.000 đ",
            priceNum: 285000,
            tags: ["Đậm đà", "Bán chạy", "Cơm nhà"],
            vegetarian: false,
            spicy: 1,
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "mc-2",
            name: "Sườn Heo Nướng Mật Ong Cà Phê",
            enName: "Grilled Pork Ribs Glazed with Highland Coffee Blossom Honey",
            desc: "Sườn non chọn lọc dẻ mềm ướp sốt mật ong hoa cà phê Tây Nguyên, nướng xém cạnh thơm phức, thịt mọng ngọt đậm đà.",
            price: "245.000 đ",
            priceNum: 245000,
            tags: ["Thơm lừng", "Món nhắm"],
            vegetarian: false,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "mc-3",
            name: "Mực Cơm Hấp Gừng Bến Thọ Quang",
            enName: "Steamed Baby Squid with Fresh Ginger & Shallots",
            desc: "Mực cơm đánh bắt trong đêm còn nhấp nháy, hấp chín tới với gừng già củ nhỏ và hành hoa giữ trọn vị giòn ngọt nguyên bản của biển.",
            price: "235.000 đ",
            priceNum: 235000,
            tags: ["Hải sản tươi", "Thanh ngọt"],
            vegetarian: false,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1559742811-822873691df8?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "mc-4",
            name: "Gà Đồi Nướng Muối Ớt Rừng & Xôi Chiên",
            enName: "Hill Chicken Grilled with Wild Chili Salt & Crispy Sticky Rice",
            desc: "Gà tre đồi thả tự nhiên da giòn thịt săn chắc, nướng than hoa phết muối ớt sim rừng cay thơm tê đầu lưỡi, kèm xôi nếp chiên phồng.",
            price: "320.000 đ",
            priceNum: 320000,
            tags: ["Bán chạy", "Cay thơm"],
            vegetarian: false,
            spicy: 2,
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "mc-5",
            name: "Ba Chỉ Cháy Cạnh Tiêu Đen Phú Quốc",
            enName: "Crispy Caramelized Pork Belly with Whole Black Peppercorns",
            desc: "Thịt ba chỉ heo cỏ thái con chì rán cháy cạnh thơm vàng, đảo sốt mắm nhĩ và hạt tiêu đen nguyên hạt cay thơm rực rỡ.",
            price: "175.000 đ",
            priceNum: 175000,
            tags: ["Đậm đà", "Đưa cơm"],
            vegetarian: false,
            spicy: 1,
            image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "mc-6",
            name: "Tôm Sú Rang Muối Tuyết Cực Phẩm",
            enName: "Wok-Tossed Tiger Prawns in Artisan Herb Snow Salt",
            desc: "Tôm sú biển tươi giòn vỏ đỏ ươm, đảo muối hạt thảo mộc rang khô vàng giòn tan có thể ăn cả vỏ.",
            price: "275.000 đ",
            priceNum: 275000,
            tags: ["Hải sản tươi", "Hảo hạng"],
            vegetarian: false,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1559742811-822873691df8?w=800&auto=format&fit=crop&q=80"
          }
        ]
      },
      {
        id: "cat-com-canh",
        name: "Cơm Niêu, Canh Quê & Rau Xanh",
        enName: "Claypot Rice, Country Soups & Farm Greens",
        desc: "Hồn cốt mâm cơm đoàn viên Việt Nam, ấm áp và tròn vị nghĩa tình.",
        items: [
          {
            id: "cc-1",
            name: "Cơm Niêu Gạo Nàng Thơm Cháy Giòn",
            enName: "Traditional Claypot Crusty Fragrant Rice",
            desc: "Hạt gạo Nàng Thơm dẻo ráo nấu trong niêu đất với kỹ thuật ép lửa thủ công tạo lớp cháy đáy vàng ươm giòn rụm quyến rũ.",
            price: "65.000 đ",
            priceNum: 65000,
            tags: ["Mâm cơm nhà", "Bán chạy"],
            vegetarian: true,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "cc-2",
            name: "Canh Chua Cá Bớp Nấu Khế Bạc Hà",
            enName: "Sweet & Sour Cobia Soup with Starfruit & Taro Stems",
            desc: "Cá bớp tươi ngọt béo nấu cùng vị chua thanh tao từ khế vườn và cà chua bi, thơm mát dọc mùng và ngò gai.",
            price: "195.000 đ",
            priceNum: 195000,
            tags: ["Thanh nhiệt", "Hải sản tươi"],
            vegetarian: false,
            spicy: 1,
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "cc-3",
            name: "Canh Cua Rau Đay Cà Pháo Giòn",
            enName: "Field Crab Soup with Jute Leaves & Crisp Pickled Eggplants",
            desc: "Thịt cua đồng giã tay đóng tảng dày béo ngọt, nấu cùng rau đay mướp hương mướt mát, kèm bát cà pháo muối giòn tan.",
            price: "135.000 đ",
            priceNum: 135000,
            tags: ["Đặc trưng", "Dân dã"],
            vegetarian: false,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "cc-4",
            name: "Rau Muống Xào Tỏi Cô Đơn Lý Sơn",
            enName: "Wok-Tossed Morning Glory with Single-Clove Ly Son Garlic",
            desc: "Ngọn rau muống giòn xanh mướt xào lửa lớn cùng những tép tỏi cô đơn thơm lừng từ đảo ngọc Lý Sơn.",
            price: "95.000 đ",
            priceNum: 95000,
            tags: ["Món rau", "Thuần Việt"],
            vegetarian: true,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "cc-5",
            name: "Bông Thiên Lý Xào Thịt Bò Tươi",
            enName: "Stir-Fried Fragrant Tonkin Jasmine Flowers with Tender Beef",
            desc: "Hoa thiên lý hái sáng sớm ngọt thanh ngát hương xào lăn cùng thịt bò phi lê tơ mềm ngọt đậm vị dầu hào.",
            price: "145.000 đ",
            priceNum: 145000,
            tags: ["Món xào", "Thanh vị"],
            vegetarian: false,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
          }
        ]
      },
      {
        id: "cat-mon-chay",
        name: "Món Chay Thanh Tịnh",
        enName: "Vegetarian & Plant-Based Delights",
        desc: "Thanh lọc thân tâm từ nguồn rau củ thảo mộc tươi sạch tự nhiên.",
        items: [
          {
            id: "cy-1",
            name: "Đậu Hũ Non Sốt Nấm Đông Cô",
            enName: "Braised Silken Tofu with Shiitake Mushroom Reduction",
            desc: "Đậu hũ non mịn mềm ngập trong nước sốt nấm hương đông cô cô đặc thơm thảo mộc và hành boa-rô phi bùi béo.",
            price: "135.000 đ",
            priceNum: 135000,
            tags: ["Chay thực dưỡng", "Bán chạy"],
            vegetarian: true,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "cy-2",
            name: "Nấm Đùi Gà Kho Tiêu Xanh Niêu Đất",
            enName: "King Oyster Mushrooms Braised with Green Peppercorns",
            desc: "Nấm đùi gà tươi dai giòn mọng nước kho trong niêu đất với sốt tương thơm lừng tiêu xanh cay the nồng ấm.",
            price: "145.000 đ",
            priceNum: 145000,
            tags: ["Chay thực dưỡng", "Đậm đà"],
            vegetarian: true,
            spicy: 1,
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "cy-3",
            name: "Cơm Chiên Hạt Sen Bọc Lá Sen Thơm",
            enName: "Fragrant Lotus Seed Fried Rice Wrapped in Lotus Leaf",
            desc: "Hạt cơm dẻo vàng óng đảo cùng hạt sen Huế bùi bùi, cà rốt, nấm hương, ủ trọn vẹn trong phiến lá sen thơm mát.",
            price: "125.000 đ",
            priceNum: 125000,
            tags: ["Chay thực dưỡng", "Hương sen"],
            vegetarian: true,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "cy-4",
            name: "Canh Nấm Hạt Sen Táo Đỏ Bổ Dưỡng",
            enName: "Lotus Seed & Red Date Mushroom Consommé",
            desc: "Nước dùng củ quả ninh ngọt thanh 4 tiếng, kết hợp hạt sen tươi, kỷ tử và các loại nấm quý bồi bổ sức khỏe.",
            price: "135.000 đ",
            priceNum: 135000,
            tags: ["Chay thực dưỡng", "Bổ dưỡng"],
            vegetarian: true,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
          }
        ]
      },
      {
        id: "cat-trang-mieng",
        name: "Tráng Miệng Tinh Hoa",
        enName: "Artisan Vietnamese Desserts",
        desc: "Dư vị ngọt ngào lưu luyến khép lại bữa ăn trọn vẹn.",
        items: [
          {
            id: "tm-1",
            name: "Chè Sen Long Nhãn Cung Đình",
            enName: "Hue Royal Lotus Seed & Longan Sweet Soup",
            desc: "Từng hạt sen tươi hầm mềm thơm bùi bọc khéo léo trong cùi nhãn lồng giòn ngọt, nước đường phèn hoa bưởi thanh khiết.",
            price: "65.000 đ",
            priceNum: 65000,
            tags: ["Cung đình", "Bán chạy"],
            vegetarian: true,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "tm-2",
            name: "Bánh Da Lợn Lá Dứa Cốt Dừa Non",
            enName: "Steamed Layered Pandan & Coconut Milk Cake",
            desc: "Lớp bánh dẻo dai thơm ngát hương lá dứa nếp tự nhiên đan xen đậu xanh bùi ngậy và cốt dừa non sánh mịn.",
            price: "55.000 đ",
            priceNum: 55000,
            tags: ["Truyền thống"],
            vegetarian: true,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "tm-3",
            name: "Kem Dừa Nướng Trái Thốt Nốt",
            enName: "Artisan Roasted Coconut Gelato with Palmyra Fruit",
            desc: "Viên kem dừa béo mịn thơm khói dừa nướng, kết hợp cùng những lát thốt nốt An Giang dẻo mềm và vụn dừa sấy giòn.",
            price: "75.000 đ",
            priceNum: 75000,
            tags: ["Hiện đại", "Đặc biệt"],
            vegetarian: true,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
          },
          {
            id: "tm-4",
            name: "Sương Sáo Hạt É Hoa Nhài",
            enName: "Grass Jelly with Basil Seeds & Wild Jasmine Nectar",
            desc: "Thạch sương sáo đen giòn mát, hạt é ngậm nước nở đều, ướp trong nước đường mật mía thoang thoảng hương hoa nhài vườn nhà.",
            price: "50.000 đ",
            priceNum: 50000,
            tags: ["Thanh nhiệt"],
            vegetarian: true,
            spicy: 0,
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
          }
        ]
      }
    ],

    /* Thức uống & Mỹ tửu */
    drinks: [
      {
        id: "dr-1",
        name: "Trà Sen Tây Hồ Ủ Sương",
        enName: "West Lake Artisan Lotus Scented Green Tea",
        desc: "Búp trà xanh móc câu ủ trọn vẹn trong bông sen bách diệp hái lúc sớm mai, hương hoa thuần khiết thanh tao.",
        price: "65.000 đ",
        priceNum: 65000,
        tags: ["Trà quý", "Bán chạy"],
        category: "Trà & Nước mát",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "dr-2",
        name: "Nước Mát Thảo Mộc Sả Tắc Lá Nếp",
        enName: "Lemongrass, Pandan Leaf & Calamansi Iced Herbal Infusion",
        desc: "Thảo mộc tươi đun chậm lấy nước cốt thơm dịu mát, hòa cùng mật mía tự nhiên và vị chua thanh của quất chín.",
        price: "55.000 đ",
        priceNum: 55000,
        tags: ["Thanh nhiệt", "Signature"],
        category: "Trà & Nước mát",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "dr-3",
        name: "Cà Phê Muối Đà Nẵng Đậm Đà",
        enName: "Da Nang Sea Salt Cream Robusta Coffee",
        desc: "Cốt cà phê phin nguyên chất đằm thắm quyện cùng lớp kem muối biển mịn màng béo ngậy ngọt ngào khó quên.",
        price: "55.000 đ",
        priceNum: 55000,
        tags: ["Đặc sản Đà Nẵng", "Bán chạy"],
        category: "Cà phê",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "dr-4",
        name: "Nước Ép Chanh Dây Mật Ong Rừng",
        enName: "Fresh Passion Fruit with Highland Wild Honey",
        desc: "Chanh dây tươi vắt nguyên chất ngọt dịu thơm nồng với mật ong rừng nguyên tổ Tây Giang.",
        price: "55.000 đ",
        priceNum: 55000,
        tags: ["Nước ép tươi"],
        category: "Nước ép tươi",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "dr-5",
        name: "Rượu Mơ Má Đào Mộc Châu (Chai 500ml)",
        enName: "Moc Chau Artisan Apricot Liqueur (Bottle 500ml)",
        desc: "Những quả mơ má đào căng mọng ủ đường phèn và rượu nếp thơm nồng trong chum sành suốt 18 tháng.",
        price: "185.000 đ",
        priceNum: 185000,
        tags: ["Mỹ tửu", "Ủ truyền thống"],
        category: "Mỹ tửu bản địa",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "dr-6",
        name: "Rượu Nếp Cái Hoa Vàng (Chai 500ml)",
        enName: "Golden Sticky Rice Traditional Wine (Bottle 500ml)",
        desc: "Chưng cất từ gạo nếp cái hoa vàng lên men bằng men thuốc bắc 36 vị gia truyền, vị êm dịu không đau đầu.",
        price: "165.000 đ",
        priceNum: 165000,
        tags: ["Mỹ tửu", "Men thảo mộc"],
        category: "Mỹ tửu bản địa",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "dr-7",
        name: "Vang Trắng Tuyển Chọn (Ghép Đôi Hải Sản)",
        enName: "Curated White Wine Selection for Vietnamese Seafood",
        desc: "Chai vang trắng với hương hoa cỏ bưởi thanh khiết, độ axit tròn trịa tôn vinh vị ngọt của tôm, cá, mực bến Thọ Quang.",
        price: "650.000 đ",
        priceNum: 650000,
        tags: ["Rượu vang", "Cao cấp"],
        category: "Rượu vang",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80"
      }
    ],

    /* Set Menu & Combo Đoàn Viên */
    combos: [
      {
        id: "cb-1",
        name: "Set “Ký Ức Xứ Quảng”",
        enName: "The Quang Heritage Tasting Set (2 - 3 Guests)",
        desc: "Mâm cơm gợi nhớ hương vị quê nhà nồng ấm: Gỏi Bưởi Tôm Đất Cù Lao, Cá Bớp Nướng Lá Chuối Tiêu Rừng, Canh Cua Rau Đay Cà Pháo, Cơm Niêu Cháy Hai Mặt, 2 phần Chè Sen Long Nhãn Cung Đình.",
        detailItems: [
          "Gỏi Bưởi Tôm Đất Cù Lao (Khai vị thanh nhẹ)",
          "Cá Bớp Nướng Lá Chuối Tiêu Rừng Tây Giang (Món chính thơm khói)",
          "Canh Cua Rau Đay Mướp Hương Cà Pháo Giòn (Món canh ngọt mát)",
          "Cơm Niêu Gạo Nàng Thơm Cháy Giòn Hai Mặt",
          "2 phần Chè Sen Long Nhãn Cung Đình Huế (Tráng miệng)"
        ],
        forGuests: "2 - 3 Khách",
        highlight: "Thích hợp cặp đôi & gia đình nhỏ",
        price: "590.000 đ",
        priceNum: 590000,
        originalPrice: "675.000 đ",
        savings: "Tiết kiệm 85.000 đ",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "cb-2",
        name: "Set “Hội Ngộ Bên Sông Hàn”",
        enName: "The Han River Reunion Banquet (4 - 6 Guests)",
        desc: "Mâm cỗ thịnh soạn thắt chặt tình thân: Nem Lụi Nướng Sả Phố Cổ, Gỏi Ngó Sen Tôm Thịt, Bò Tơ Nướng Ống Tre, Cá Lăng Kho Tộ Niêu Đất, Canh Chua Cá Bớp Nấu Khế, Rau Muống Xào Tỏi Lý Sơn, 2 Cơm Niêu Cháy, Bánh Da Lợn Cốt Dừa.",
        detailItems: [
          "Nem Lụi Nướng Sả Phố Cổ & Gỏi Ngó Sen Tôm Thịt (Bộ đôi khởi vị)",
          "Bò Tơ Nướng Ống Tre Tiêu Xanh (Món nướng thơm nức)",
          "Cá Lăng Kho Tộ Niêu Đất Sốt Kẹo Đắng (Món kho đậm đà)",
          "Canh Chua Cá Bớp Nấu Khế Bạc Hà (Canh chua thanh nhiệt)",
          "Rau Muống Xào Tỏi Cô Đơn Lý Sơn",
          "2 Niêu Cơm Nàng Thơm Cháy Giòn Hai Mặt",
          "Set Bánh Da Lợn Lá Dứa Cốt Dừa Non (Tráng miệng)"
        ],
        forGuests: "4 - 6 Khách",
        highlight: "Bán chạy nhất cho họp mặt & gia đình",
        price: "1.290.000 đ",
        priceNum: 1290000,
        originalPrice: "1.465.000 đ",
        savings: "Tiết kiệm 175.000 đ",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "cb-3",
        name: "Set “Đại Tiệc Ăn Thôi”",
        enName: "The Grand Feast of An Thoi (6 - 8 Guests)",
        desc: "Đỉnh cao thết đãi đối tác và tiệc sum vầy long trọng: Mâm Khai Vị 3 Miền, Cá Bớp Nướng Lá Chuối, Gà Đồi Muối Ớt Rừng & Xôi Chiên, Mực Cơm Hấp Gừng Bến Thọ Quang, Canh Chua Cá Bớp, Thiên Lý Xào Bò, 3 Cơm Niêu Cháy, Kem Dừa Thốt Nốt & Ấm Trà Sen Tây Hồ.",
        detailItems: [
          "Mâm Khai Vị 3 Miền (Nem lụi, Ram tôm đất giòn, Gỏi bưởi cù lao)",
          "Cá Bớp Nướng Lá Chuối Sốt Tiêu Rừng Tây Giang",
          "Gà Đồi Nướng Muối Ớt Rừng & Xôi Nếp Chiên Phồng",
          "Mực Cơm Hấp Gừng Bến Thọ Quang Giòn Ngọt",
          "Bông Thiên Lý Xào Thịt Bò Tươi Phi Lê",
          "Canh Chua Cá Bớp Nấu Khế Bạc Hà",
          "3 Niêu Cơm Nàng Thơm Cháy Giòn Rụm",
          "Set Kem Dừa Nướng Trái Thốt Nốt & 1 Ấm Trà Sen Tây Hồ Ủ Sương"
        ],
        forGuests: "6 - 8 Khách",
        highlight: "Hoàn hảo cho tiệc tiếp đãi & sinh nhật",
        price: "2.190.000 đ",
        priceNum: 2190000,
        originalPrice: "2.510.000 đ",
        savings: "Tiết kiệm 320.000 đ",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80"
      }
    ]
  },

  journal: {
    /* Chủ đề theo STEP 2 */
    categories: ["Ẩm thực", "Nguyên liệu", "Con người", "Đà Nẵng", "Trải nghiệm", "Tin tức"],
    /* featured: true -> hiện làm bài nổi bật ở đầu trang. body: danh sách đoạn văn của trang chi tiết */
    posts: [
      { id: "1", featured: true, category: "Ẩm thực", title: "Mâm cơm gia đình: Nơi một bữa ăn trở thành một ký ức", date: "12/10/2026", excerpt: "Giữa nhịp sống hối hả, ngồi xuống quanh bàn ăn nghi ngút khói thơm là lúc tình thân được kết nối sâu sắc nhất.", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80", body: ["Có lẽ những điều đẹp đẽ nhất đôi khi bắt đầu từ một lời rủ rất giản dị: “Ăn thôi.”", "Một bữa ăn ngon không chỉ được tạo nên bởi hương vị, mà còn bởi những con người cùng ngồi quanh một bàn ăn và những khoảnh khắc được sẻ chia."] },
      { id: "2", category: "Nguyên liệu", title: "Sớm mai bên bến cá Thọ Quang và những mẻ mực lấp lánh", date: "08/10/2026", excerpt: "Khám phá hành trình tuyển chọn nguyên liệu biển tươi rói của bếp trưởng Ăn Thôi khi thành phố còn ngái ngủ.", image: "https://images.unsplash.com/photo-1559742811-822873691df8?w=800&auto=format&fit=crop&q=80", body: ["Mỗi rạng sáng từ 4 giờ, bến cá Thọ Quang lại tấp nập tiếng cười nói của ngư dân và những mẻ cá bớp, mực cơm tươi rói cập bờ."] },
      { id: "3", category: "Con người", title: "Người giữ lửa bếp: 20 năm gắn bó với niêu đất và than hoa", date: "02/10/2026", excerpt: "Chuyện nghề của người bếp trưởng yêu say đắm gia vị thảo mộc và mâm cơm Việt Nam thuần mộc.", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80", body: ["Nấu nướng đối với chúng tôi không phải chỉ là công thức, mà là sự lắng nghe nguyên liệu và gửi gắm tấm lòng vào từng niêu cá kho."] },
      { id: "4", category: "Đà Nẵng", title: "Bạch Đằng - Con đường của những cuộc hẹn bên dòng sông Hàn", date: "28/09/2026", excerpt: "Trải nghiệm ẩm thực bên dải lụa sông Hàn thơ mộng trong không gian kiến trúc hoài niệm giao thoa đương đại.", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80", body: ["Bạch Đằng luôn là chứng nhân cho những chuyển động đẹp đẽ nhất của Đà Nẵng, nơi gió sông thổi qua và ánh đèn vàng thắp lên."] },
      { id: "5", category: "Trải nghiệm", title: "Nghệ thuật thưởng thức Trà Sen Tây Hồ sau bữa ăn", date: "20/09/2026", excerpt: "Vị ngọt bùi của sen và hương trà xanh êm dịu giúp khép lại bữa ăn với sự thư thái trọn vẹn.", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80", body: ["Một ấm trà sen nóng mở ra những câu chuyện dài bất tận quanh bàn ăn ấm áp."] },
      { id: "6", category: "Tin tức", title: "Ăn Thôi ra mắt thực đơn mùa mới: Vị mộc miền Trung", date: "15/09/2026", excerpt: "Hơn 50 món ăn được làm mới với tiêu chí tôn vinh nguyên liệu địa phương và giảm đường béo công nghiệp.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80", body: ["Thực đơn mới là bước tiến để mang đến trải nghiệm mỹ thực vừa ngon lành, vừa an lành cho sức khỏe thực khách."] }
    ]
  }
};