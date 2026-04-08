// ============================================================
// MangaStore — Shop Page Logic
// ============================================================

let activeCategory = "all";
let activeSize = "all";
let activeColor = null;
let sortOrder = "newest";
let filteredProducts = [...PRODUCTS];

// ---------- Render product grid ----------
function renderGrid(products) {
  const grid = document.getElementById("productsGrid");
  const countEl = document.getElementById("resultsCount");
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:60px 20px; color:var(--text-secondary);">
        <div style="font-size:3rem;margin-bottom:12px;">😔</div>
        <h3 style="font-size:1.3rem;font-weight:700;margin-bottom:8px;">لا توجد منتجات</h3>
        <p>جرّب تغيير الفلاتر</p>
      </div>`;
    if (countEl) countEl.innerHTML = `<strong>0</strong> منتجات`;
    return;
  }

  grid.innerHTML = products.map(p => renderProductCard(p)).join("");
  if (countEl) countEl.innerHTML = `<strong>${products.length}</strong> منتج`;
}

// ---------- Apply filters ----------
function applyFilters() {
  filteredProducts = PRODUCTS.filter(p => {
    const catMatch = activeCategory === "all" || p.categorySlug === activeCategory;
    const sizeMatch = activeSize === "all" || p.sizes.includes(activeSize);
    const colorMatch = !activeColor || p.colors.some(c => c.hex === activeColor);
    return catMatch && sizeMatch && colorMatch;
  });

  // Sort
  if (sortOrder === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
  else if (sortOrder === "price-desc") filteredProducts.sort((a, b) => b.price - a.price);
  else if (sortOrder === "rating") filteredProducts.sort((a, b) => b.rating - a.rating);
  // newest: default array order

  renderGrid(filteredProducts);
}

// ---------- Init category filters ----------
function initCategoryFilters() {
  document.querySelectorAll("[data-cat]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-cat]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.cat;
      applyFilters();
    });
  });
}

// ---------- Init size filters ----------
function initSizeFilters() {
  document.querySelectorAll("[data-size]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-size]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeSize = btn.dataset.size;
      applyFilters();
    });
  });
}

// ---------- Init color filters ----------
function initColorFilters() {
  document.querySelectorAll("[data-color-hex]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
        activeColor = null;
      } else {
        document.querySelectorAll("[data-color-hex]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeColor = btn.dataset.colorHex;
      }
      applyFilters();
    });
  });
}

// ---------- Init sort ----------
function initSort() {
  const select = document.getElementById("sortSelect");
  if (!select) return;
  select.addEventListener("change", () => {
    sortOrder = select.value;
    applyFilters();
  });
}

// ---------- Mobile filter toggle ----------
function initMobileFilter() {
  const btn = document.getElementById("mobileFilterToggle");
  const panel = document.getElementById("filterPanel");
  if (!btn || !panel) return;
  btn.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("open");
    btn.textContent = isOpen ? "❌ إغلاق الفلاتر" : "🎯 فلترة المنتجات";
  });
}

// ---------- Check URL params for pre-filter ----------
function initFromURL() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  if (cat) {
    activeCategory = cat;
    const btn = document.querySelector(`[data-cat="${cat}"]`);
    if (btn) {
      document.querySelectorAll("[data-cat]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    }
  }
}

// ---------- Boot ----------
document.addEventListener("DOMContentLoaded", () => {
  initFromURL();
  initCategoryFilters();
  initSizeFilters();
  initColorFilters();
  initSort();
  initMobileFilter();
  applyFilters();
});
