// ============================================================
// MangaStore — Main shared JS (all pages)
// ============================================================

// ---------- Sticky header ----------
function initHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }, { passive: true });
}

// ---------- Mobile nav ----------
function initMobileNav() {
  const btn = document.getElementById("hamburger");
  const nav = document.getElementById("mobileNav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    btn.classList.toggle("open", isOpen);
    btn.setAttribute("aria-expanded", isOpen);
  });

  // Close on nav link click
  nav.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove("open");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

// ---------- Active nav link ----------
function initActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link[data-page]").forEach(link => {
    link.classList.toggle("active", link.dataset.page === currentPage);
  });
}

// ---------- Cart badge ----------
function updateCartBadge() {
  const count = Cart.getCount();
  document.querySelectorAll(".cart-count").forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle("visible", count > 0);
  });
}

function initCartBadge() {
  updateCartBadge();
  window.addEventListener("cartUpdated", updateCartBadge);
}

// ---------- Toast notifications ----------
function showToast(message, type = "success", duration = 3000) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  const icons = { success: "✅", error: "❌", info: "ℹ️" };
  const icon = icons[type] || icons.info;
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  // Animate out after duration
  setTimeout(() => {
    toast.classList.add("fade-out");
    toast.addEventListener("animationend", () => toast.remove(), { once: true });
  }, duration);
}

// ---------- WhatsApp float button ----------
function initFloatWA() {
  // All float-wa links: update href dynamically using centralised WA_NUMBER
  document.querySelectorAll(".float-wa, [id='floatWA']").forEach(btn => {
    if (btn) btn.href = buildWhatsAppUrl("مرحباً! أريد الاستفسار عن منتجاتكم 🔥");
  });
  // Header WA button
  const headerWA = document.getElementById("headerWABtn");
  if (headerWA) headerWA.href = buildWhatsAppUrl("مرحباً! أريد الاستفسار عن منتجاتكم 🔥");
}

// ---------- Countdown Timer ----------
function initCountdown(targetEl, targetDate) {
  if (!targetEl) return;
  const blocks = {
    days:  targetEl.querySelector(".t-days"),
    hours: targetEl.querySelector(".t-hours"),
    mins:  targetEl.querySelector(".t-mins"),
    secs:  targetEl.querySelector(".t-secs"),
  };

  const update = () => {
    const diff = targetDate - Date.now();
    if (diff <= 0) {
      Object.values(blocks).forEach(n => { if (n) n.textContent = "00"; });
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);
    if (blocks.days)  blocks.days.textContent  = String(d).padStart(2, "0");
    if (blocks.hours) blocks.hours.textContent = String(h).padStart(2, "0");
    if (blocks.mins)  blocks.mins.textContent  = String(m).padStart(2, "0");
    if (blocks.secs)  blocks.secs.textContent  = String(s).padStart(2, "0");
  };

  update();
  setInterval(update, 1000);
}

// ---------- Render star rating ----------
// BUG FIX: Half-star used same glyph as empty star — now uses distinct characters
function renderStars(rating) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let html = "";
  for (let i = 0; i < full; i++) html += `<span class="star-full">★</span>`;
  if (hasHalf)                      html += `<span class="star-half">⯨</span>`;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  for (let i = 0; i < empty; i++)   html += `<span class="star-empty">☆</span>`;
  return html;
}

// ---------- Render badge ----------
function renderBadge(product) {
  if (!product.badge) return "";
  const cls = product.badgeType === "new"        ? "badge-new"
            : product.badgeType === "bestseller" ? "badge-bestseller"
            :                                      "badge-sale";
  return `<span class="card-badge ${cls}">${product.badge}</span>`;
}

// ---------- Render product card ----------
function renderProductCard(product) {
  const img = product.colors[0].images[0];
  const priceHtml = product.originalPrice
    ? `<span class="price-current">${product.price.toLocaleString("ar-EG")} ج.م</span><span class="price-original">${product.originalPrice.toLocaleString("ar-EG")} ج.م</span>`
    : `<span class="price-current">${product.price.toLocaleString("ar-EG")} ج.م</span>`;

  const colorDots = product.colors.map(c =>
    `<span class="color-dot" style="background:${c.hex}" title="${c.name}"></span>`
  ).join("");

  return `
    <a href="product.html?id=${product.id}" class="product-card" id="card-${product.id}">
      <div class="card-image-wrap">
        <img src="${img}" alt="${product.name}" loading="lazy">
        ${renderBadge(product)}
        <div class="card-colors">${colorDots}</div>
        <div class="card-quick-add">
          <button class="btn btn-primary btn-sm btn-block"
            onclick="event.preventDefault(); quickAddToCart(${product.id}, this)"
            aria-label="أضف ${product.name} للسلة">
            🛒 أضف للسلة
          </button>
        </div>
      </div>
      <div class="card-body">
        <span class="card-category">${product.category}</span>
        <h3 class="card-name">${product.name}</h3>
        <div class="card-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span>(${product.reviewCount})</span>
        </div>
        <div class="card-price mt-auto">${priceHtml}</div>
      </div>
    </a>`;
}

// ---------- Quick add to cart ----------
function quickAddToCart(productId, btn) {
  const product = getProductById(productId);
  if (!product) return;

  Cart.addItem({
    productId: product.id,
    name: product.name,
    color: product.colors[0].name,
    // BUG FIX: Was hardcoded "M" — now uses the product's first available size
    size: product.sizes[0] || "M",
    qty: 1,
    price: product.price,
    image: product.colors[0].images[0]
  });

  const original = btn.innerHTML;
  btn.textContent = "✅ تمت الإضافة!";
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.disabled = false;
  }, 2000);

  showToast(`تمت إضافة "${product.name}" للسلة! 🛒`);
}

// ---------- Back to top button ----------
function initBackToTop() {
  const btn = document.createElement("button");
  btn.id = "backToTop";
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "العودة للأعلى");
  btn.innerHTML = "↑";
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---------- Init all ----------
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileNav();
  initActiveNav();
  initCartBadge();
  initFloatWA();
  initBackToTop();
});
