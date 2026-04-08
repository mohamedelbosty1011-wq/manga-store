// ============================================================
// MangaStore — Product Database
// All products are men's streetwear
// IMAGE AUDIT (2026-04-08): All URLs verified live — 404s replaced
// Broken: photo-1556821840-3a63f15732ce, photo-1572495532056-8583af1cbfe1
// ============================================================

const PRODUCTS = [
  {
    id: 1,
    name: "هودي أوفرسايز أسود",
    nameEn: "Black Oversized Hoodie",
    category: "هوديز",
    categorySlug: "hoodies",
    price: 480,
    originalPrice: null,
    badge: "جديد",
    badgeType: "new",
    rating: 4.8,
    reviewCount: 124,
    description: "هودي أوفرسايز من أجود أنواع القطن المصري. مريح، دافي، وستايله جامد 🔥 مناسب للشتاء والربيع. الكماشة ناعمة من الداخل وخامته ممتازة.",
    features: ["100% قطن مصري", "قياس أوفرسايز", "كنجر بوكيت", "غسيل عادي مطبوع"],
    colors: [
      { name: "أسود", hex: "#1a1a1a", images: [
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=85",
        "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=85",
        "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=85",
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=85"
      ]},
      { name: "رمادي", hex: "#6b7280", images: [
        "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=800&q=85",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85",
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=85",
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=85"
      ]},
      { name: "أبيض", hex: "#f5f5f5", images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=85",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=85",
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=85",
        "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&q=85"
      ]}
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 7,
    related: [2, 8, 5]
  },
  {
    id: 2,
    name: "هودي زيتي أوفرسايز",
    nameEn: "Olive Green Oversized Hoodie",
    category: "هوديز",
    categorySlug: "hoodies",
    price: 480,
    originalPrice: null,
    badge: "جديد",
    badgeType: "new",
    rating: 4.7,
    reviewCount: 98,
    description: "هودي أوفرسايز باللون الزيتي العصري. خامة قطن ناعمة ودافية، مثالي للستايل الكاجوال والسبور.",
    features: ["100% قطن مصري", "قياس أوفرسايز", "كنجر بوكيت", "لون زيتي مميز"],
    colors: [
      { name: "زيتي", hex: "#6b7c47", images: [
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=85&sat=-40&hue=80",
        "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=800&q=85",
        "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=85",
        "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=85"
      ]},
      { name: "أسود", hex: "#1a1a1a", images: [
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=85",
        "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=85",
        "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=85",
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=85"
      ]},
      { name: "رمادي", hex: "#6b7280", images: [
        "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=800&q=85",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85",
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=85",
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=85"
      ]}
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 12,
    related: [1, 8, 5]
  },
  {
    id: 3,
    name: "تيشيرت جرافيك مطبوع",
    nameEn: "Graphic Print T-Shirt",
    category: "تيشيرتات",
    categorySlug: "tshirts",
    price: 280,
    originalPrice: null,
    badge: "جديد",
    badgeType: "new",
    rating: 4.6,
    reviewCount: 87,
    description: "تيشيرت جرافيك بتصميم عصري مميز. خامة قطن ناعمة على الجلد، مريحة طول اليوم.",
    features: ["100% قطن كومبد", "طباعة واضحة وثابتة", "قصة عادية مريحة", "متوفر بألوان متعددة"],
    colors: [
      { name: "أبيض", hex: "#f5f5f5", images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85",
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=85",
        "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=85",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=85"
      ]},
      { name: "أسود", hex: "#1a1a1a", images: [
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=85",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=85",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=85",
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=85"
      ]}
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 20,
    related: [6, 4, 7]
  },
  {
    id: 4,
    name: "تراكسوت كامل",
    nameEn: "Full Tracksuit",
    category: "تراكسوت",
    categorySlug: "tracksuits",
    price: 750,
    originalPrice: 950,
    badge: "21%-",  // Math.round((1 - 750/950) * 100) = 21%
    badgeType: "sale",
    rating: 4.9,
    reviewCount: 203,
    description: "تراكسوت كامل (جاكيت + بنطلون) من أفخم الخامات. مريح للسبور والكاجوال، مناسب للشتاء والصيف.",
    features: ["جاكيت + بنطلون", "خامة رياضية ممتازة", "مقاومة للماء خفيفة", "جيوب جانبية وأمامية"],
    colors: [
      { name: "أسود", hex: "#1a1a1a", images: [
        "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=85",
        "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800&q=85",
        "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=85",
        "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=85"
      ]},
      { name: "رمادي", hex: "#6b7280", images: [
        "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=85",
        "https://images.unsplash.com/photo-1544441892-794166f1e3be?w=800&q=85",
        "https://images.unsplash.com/photo-1542295669297-4d352b042bca?w=800&q=85",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=85"
      ]}
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 5,
    related: [7, 1, 5]
  },
  {
    id: 5,
    name: "جاكيت شتوي هيفي",
    nameEn: "Heavy Winter Jacket",
    category: "شتوي",
    categorySlug: "winter",
    price: 650,
    originalPrice: null,
    badge: "جديد",
    badgeType: "new",
    rating: 4.8,
    reviewCount: 76,
    description: "جاكيت شتوي ثقيل مصنوع من خامات عالية الجودة. يحمي من البرد ويعطي ستايل أنيق.",
    features: ["خامة شتوية ثقيلة", "بطانة دافية", "سوستة معدنية", "ياقة مرفوعة للدفء"],
    colors: [
      { name: "أسود", hex: "#1a1a1a", images: [
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=85",
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=85",
        "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=85",
        "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=800&q=85"
      ]},
      { name: "بني", hex: "#78350f", images: [
        "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800&q=85",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=85",
        "https://images.unsplash.com/photo-1619603364863-19782f4d33f4?w=800&q=85",
        "https://images.unsplash.com/photo-1615886753866-79396abc3f30?w=800&q=85"
      ]}
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 9,
    related: [1, 2, 8]
  },
  {
    id: 6,
    name: "تيشيرت أوفرسايز أبيض",
    nameEn: "White Oversized T-Shirt",
    category: "تيشيرتات",
    categorySlug: "tshirts",
    price: 250,
    originalPrice: null,
    badge: "الأكثر مبيعاً",
    badgeType: "bestseller",
    rating: 4.9,
    reviewCount: 312,
    description: "تيشيرت أوفرسايز أبيض كلاسيك. خامة قطن مصري فاخر، ناعم على الجلد ومريح طول اليوم.",
    features: ["100% قطن مصري", "قياس أوفرسايز", "خامة ثقيلة مش شفافة", "مناسب للطباعة والبلايز"],
    colors: [
      { name: "أبيض", hex: "#f5f5f5", images: [
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=85",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85",
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=85",
        "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=85"
      ]},
      { name: "أسود", hex: "#1a1a1a", images: [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=85",
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=85",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=85",
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=85"
      ]},
      { name: "رمادي", hex: "#6b7280", images: [
        "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=800&q=85",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85",
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=85",
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=85"
      ]}
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 35,
    related: [3, 7, 4]
  },
  {
    id: 7,
    name: "بنطلون كارجو",
    nameEn: "Cargo Pants",
    category: "بناطيل",
    categorySlug: "pants",
    price: 420,
    originalPrice: null,
    badge: "جديد",
    badgeType: "new",
    rating: 4.7,
    reviewCount: 145,
    description: "بنطلون كارجو بجيوب جانبية واسعة. خامة قوية ومتينة، مريح ومناسب للسبور والكاجوال.",
    features: ["6 جيوب (4 جانبي + 2 خلفي)", "خامة تويل متينة", "مطاط في الخصر", "متوفر بألوان متعددة"],
    colors: [
      { name: "بيج", hex: "#d4b896", images: [
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=85",
        "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=85",
        "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&q=85",
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=85"
      ]},
      { name: "أسود", hex: "#1a1a1a", images: [
        "https://images.unsplash.com/photo-1576894647527-d6c2ab55a763?w=800&q=85",
        "https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=800&q=85",
        "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=85",
        "https://images.unsplash.com/photo-1542295669297-4d352b042bca?w=800&q=85"
      ]},
      { name: "زيتي", hex: "#6b7c47", images: [
        "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=800&q=85",
        "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=85",
        "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=800&q=85",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85"
      ]}
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 18,
    related: [4, 3, 6]
  },
  {
    id: 8,
    name: "هودي رمادي كلاسيك",
    nameEn: "Classic Gray Hoodie",
    category: "هوديز",
    categorySlug: "hoodies",
    price: 460,
    originalPrice: null,
    badge: "عرض محدود",
    badgeType: "sale",
    rating: 4.6,
    reviewCount: 167,
    description: "هودي رمادي كلاسيك بخامة أوفرسايز مريحة. تصميم بسيط وأنيق يناسب كل الاستايلات.",
    features: ["100% قطن مصري", "قياس أوفرسايز", "كنجر بوكيت", "غسيل عادي — لا يتقلش"],
    colors: [
      { name: "رمادي", hex: "#6b7280", images: [
        "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=800&q=85",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85",
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=85",
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=85"
      ]},
      { name: "أسود", hex: "#1a1a1a", images: [
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=85",
        "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=85",
        "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=85",
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=85"
      ]}
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 14,
    related: [1, 2, 5]
  }
];

// WhatsApp business number
const WA_NUMBER = "201063992579";

// Helper: get product by ID
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id)) || null;
}

// Helper: get products by category slug
function getProductsByCategory(slug) {
  if (!slug || slug === "all") return PRODUCTS;
  return PRODUCTS.filter(p => p.categorySlug === slug);
}

// Helper: format price
function formatPrice(price) {
  return `${price.toLocaleString("ar-EG")} ج.م`;
}

// Helper: build WhatsApp URL with message
function buildWhatsAppUrl(message) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
