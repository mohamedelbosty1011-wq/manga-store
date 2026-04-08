// ============================================================
// MangaStore — Product Detail Page Logic
// ============================================================

let currentProduct = null;
let selectedColorIndex = 0;
let selectedImageIndex = 0;
let selectedSize = null;
let quantity = 1;

// ---------- Load product from URL param ----------
function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  currentProduct = getProductById(id);

  if (!currentProduct) {
    document.getElementById("productContent").innerHTML = `
      <div style="text-align:center;padding:80px 20px;grid-column:1/-1;">
        <div style="font-size:4rem;margin-bottom:16px;">😔</div>
        <h2 style="font-size:1.6rem;font-weight:900;margin-bottom:12px;">المنتج غير موجود</h2>
        <a href="shop.html" class="btn btn-primary">تصفح المنتجات</a>
      </div>`;
    return;
  }

  // SEO: update title & meta description
  document.title = `${currentProduct.name} — MangaStore`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = `${currentProduct.name} - ${currentProduct.description.substring(0, 120)}`;

  renderProductDetail();
  renderRelated();

  // BUG FIX: Gallery nav must be initialised AFTER loadProduct() sets currentProduct
  initGalleryNav();

  // BUG FIX: Fire productLoaded AFTER a micro-task so inline page listeners
  // (registered in the same DOMContentLoaded flush) are guaranteed to be set up.
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent("productLoaded", { detail: currentProduct }));
  }, 0);
}

// ---------- Render full product detail ----------
function renderProductDetail() {
  const p = currentProduct;

  // Breadcrumb
  document.getElementById("breadcrumbCategory").textContent = p.category;
  document.getElementById("breadcrumbProduct").textContent = p.name;

  // Badge & scarcity
  const badge = document.getElementById("pdBadge");
  if (p.badge) {
    const cls = p.badgeType === "new"        ? "badge-new"
              : p.badgeType === "bestseller" ? "badge-bestseller"
              :                                "badge-sale";
    badge.className = `card-badge ${cls}`;
    badge.textContent = p.badge;
    badge.style.position = "static";
    badge.style.marginBottom = "0";
  } else {
    badge.style.display = "none";
  }

  const scarcity = document.getElementById("scarcityBar");
  if (p.stock <= 10) {
    scarcity.innerHTML = `<span class="scarcity-dot"></span>الكمية محدودة — باقي ${p.stock} قطع فقط!`;
    scarcity.style.display = "flex";
  }

  // Title & rating
  document.getElementById("pdName").textContent = p.name;
  document.getElementById("pdStars").innerHTML = renderStars(p.rating);
  document.getElementById("pdRating").textContent = p.rating.toFixed(1);
  document.getElementById("pdReviews").textContent = `(${p.reviewCount} تقييم)`;

  // Price
  document.getElementById("pdPrice").textContent = `${p.price.toLocaleString("ar-EG")} ج.م`;
  const origEl = document.getElementById("pdOrigPrice");
  const saveEl = document.getElementById("pdSave");
  if (p.originalPrice) {
    origEl.textContent = `${p.originalPrice.toLocaleString("ar-EG")} ج.م`;
    const savePct = Math.round((1 - p.price / p.originalPrice) * 100);
    saveEl.textContent = `وفّر ${savePct}%`;
    origEl.style.display = "inline";
    saveEl.style.display = "inline";
  } else {
    origEl.style.display = "none";
    saveEl.style.display = "none";
  }

  // Description & features
  document.getElementById("pdDesc").textContent = p.description;
  document.getElementById("pdFeatures").innerHTML = p.features.map(f =>
    `<li class="feature-item"><span class="feature-icon">✅</span><span>${f}</span></li>`
  ).join("");

  // Colors & sizes
  renderColors();
  renderSizes();
  renderGallery();
}

// ---------- Colors ----------
function renderColors() {
  const wrap = document.getElementById("colorSwatches");
  const p = currentProduct;
  wrap.innerHTML = p.colors.map((c, i) => `
    <button class="color-swatch ${i === selectedColorIndex ? "active" : ""}"
      style="background:${c.hex}"
      data-index="${i}"
      data-name="${c.name}"
      title="${c.name}"
      aria-label="${c.name}"
      aria-pressed="${i === selectedColorIndex}">
    </button>`).join("");

  wrap.querySelectorAll(".color-swatch").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedColorIndex = parseInt(btn.dataset.index);
      selectedImageIndex = 0;
      wrap.querySelectorAll(".color-swatch").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      document.getElementById("selectedColor").textContent = btn.dataset.name;
      renderGallery();
    });
  });

  document.getElementById("selectedColor").textContent = p.colors[0].name;
}

// ---------- Sizes ----------
function renderSizes() {
  const wrap = document.getElementById("sizeButtons");
  wrap.innerHTML = "";
  currentProduct.sizes.forEach(size => {
    const btn = document.createElement("button");
    btn.className = "size-btn";
    btn.textContent = size;
    btn.dataset.size = size;
    btn.setAttribute("aria-label", `مقاس ${size}`);
    btn.addEventListener("click", () => {
      wrap.querySelectorAll(".size-btn").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      selectedSize = size;
      document.getElementById("selectedSize").textContent = size;
    });
    wrap.appendChild(btn);
  });
}

// ---------- Gallery ----------
function renderGallery() {
  const images = currentProduct.colors[selectedColorIndex].images;
  const mainImg = document.getElementById("galleryMain");
  const thumbs = document.getElementById("galleryThumbs");

  mainImg.src = images[selectedImageIndex];
  mainImg.alt = currentProduct.name;

  thumbs.innerHTML = images.map((img, i) => `
    <div class="gallery-thumb ${i === selectedImageIndex ? "active" : ""}" data-index="${i}">
      <img src="${img}" alt="${currentProduct.name} - زاوية ${i + 1}" loading="lazy">
    </div>`).join("");

  thumbs.querySelectorAll(".gallery-thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      selectedImageIndex = parseInt(thumb.dataset.index);
      thumbs.querySelectorAll(".gallery-thumb").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      mainImg.style.opacity = "0";
      setTimeout(() => {
        mainImg.src = images[selectedImageIndex];
        mainImg.style.opacity = "1";
      }, 150);
    });
  });
}

// ---------- Gallery nav arrows ----------
// BUG FIX: Previous was forward and Next was backward — corrected here
function initGalleryNav() {
  const prevBtn = document.getElementById("galleryPrev");
  const nextBtn = document.getElementById("galleryNext");
  if (!prevBtn || !nextBtn) return;

  prevBtn.addEventListener("click", () => {
    const images = currentProduct.colors[selectedColorIndex].images;
    selectedImageIndex = (selectedImageIndex - 1 + images.length) % images.length;
    updateMainImage();
  });

  nextBtn.addEventListener("click", () => {
    const images = currentProduct.colors[selectedColorIndex].images;
    selectedImageIndex = (selectedImageIndex + 1) % images.length;
    updateMainImage();
  });
}

function updateMainImage() {
  const images = currentProduct.colors[selectedColorIndex].images;
  const mainImg = document.getElementById("galleryMain");
  const thumbs = document.getElementById("galleryThumbs");

  mainImg.style.opacity = "0";
  setTimeout(() => {
    mainImg.src = images[selectedImageIndex];
    mainImg.style.opacity = "1";
  }, 150);

  thumbs.querySelectorAll(".gallery-thumb").forEach((t, i) => {
    t.classList.toggle("active", i === selectedImageIndex);
  });
}

// ---------- Quantity ----------
function initQty() {
  document.getElementById("qtyMinus").addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      document.getElementById("qtyNum").textContent = quantity;
    }
  });
  document.getElementById("qtyPlus").addEventListener("click", () => {
    const maxStock = currentProduct ? currentProduct.stock : 99;
    if (quantity < maxStock) {
      quantity++;
      document.getElementById("qtyNum").textContent = quantity;
    } else {
      showToast(`الكمية المتوفرة ${maxStock} قطعة فقط`, "error");
    }
  });
}

// ---------- Add to Cart ----------
function initAddToCart() {
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    if (!selectedSize) {
      showToast("الرجاء اختيار المقاس أولاً! 📏", "error");
      const sizeWrap = document.getElementById("sizeButtons");
      sizeWrap.style.animation = "none";
      // Force reflow to restart animation
      void sizeWrap.offsetWidth;
      sizeWrap.style.animation = "shake 0.4s ease";
      return;
    }
    const p = currentProduct;
    const color = p.colors[selectedColorIndex];
    Cart.addItem({
      productId: p.id,
      name: p.name,
      color: color.name,
      size: selectedSize,
      qty: quantity,
      price: p.price,
      image: color.images[0]
    });
    showToast(`✅ تمت إضافة "${p.name}" للسلة!`);
    const btn = document.getElementById("addToCartBtn");
    btn.textContent = "✅ تمت الإضافة!";
    setTimeout(() => btn.innerHTML = `🛒 أضف للسلة`, 2000);
  });
}

// ---------- WhatsApp direct order ----------
function initWAOrder() {
  const btn = document.getElementById("waOrderBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const p = currentProduct;
    const color = p.colors[selectedColorIndex].name;
    const size = selectedSize || "غير محدد";
    const msg = `مرحباً MangaStore 👋\nأريد طلب:\n🧥 ${p.name}\n🎨 اللون: ${color}\n📏 المقاس: ${size}\n🔢 الكمية: ${quantity}\n💰 السعر: ${(p.price * quantity).toLocaleString("ar-EG")} ج.م`;
    window.open(buildWhatsAppUrl(msg), "_blank");
  });
}

// ---------- Mobile sticky CTA ----------
function initMobileCTA() {
  const addBtn = document.getElementById("mobileStickyAdd");
  const waBtn  = document.getElementById("mobileStickyWA");
  if (!addBtn) return;

  addBtn.addEventListener("click", () => document.getElementById("addToCartBtn").click());
  if (waBtn) waBtn.addEventListener("click", () => document.getElementById("waOrderBtn").click());
}

// ---------- Related products ----------
function renderRelated() {
  const wrap = document.getElementById("relatedGrid");
  if (!wrap || !currentProduct.related) return;
  const related = currentProduct.related.map(id => getProductById(id)).filter(Boolean);
  wrap.innerHTML = related.map(p => renderProductCard(p)).join("");
}

// ---------- Boot ----------
document.addEventListener("DOMContentLoaded", () => {
  loadProduct();
  initQty();
  initAddToCart();
  initWAOrder();
  initMobileCTA();
});
