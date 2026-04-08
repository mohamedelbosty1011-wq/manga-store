// ============================================================
// MangaStore — Checkout Page Controller
// Extracted from inline <script> in checkout.html for
// cleaner separation of concerns.
// ============================================================

const CITIES = [
  "القاهرة","الجيزة","الإسكندرية","الشرقية","الدقهلية","البحيرة",
  "المنوفية","الغربية","القليوبية","كفر الشيخ","المنيا","أسيوط",
  "سوهاج","قنا","الأقصر","أسوان","الفيوم","بني سويف","الإسماعيلية",
  "السويس","بورسعيد","دمياط","شمال سيناء","جنوب سيناء","البحر الأحمر",
  "مطروح","الوادي الجديد"
];

// ---------- Render checkout ----------
function renderCheckout() {
  const section = document.getElementById("checkoutSection");
  const cart = Cart.get();

  // Empty cart → redirect prompt
  if (cart.items.length === 0) {
    section.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h2>السلة فاضية!</h2>
        <p>مش ممكن تكمل الطلب والسلة فاضية.</p>
        <a href="shop.html" class="btn btn-primary btn-lg" style="margin-top:8px;">تسوق الآن 🔥</a>
      </div>`;
    return;
  }

  const sub      = Cart.getSubtotal();
  const shipping = Cart.getShipping(sub);
  const total    = sub + shipping;

  const citiesOptions = CITIES.map(c => `<option value="${c}">${c}</option>`).join("");

  const itemsSummary = cart.items.map(i => `
    <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);font-size:0.9rem;gap:8px;">
      <span style="flex:1;min-width:0;">
        ${i.name}
        <span style="display:block;color:var(--text-dim);font-size:0.82rem;">${i.color} · ${i.size} × ${i.qty}</span>
      </span>
      <span style="color:var(--accent);font-weight:700;flex-shrink:0;">${(i.price * i.qty).toLocaleString("ar-EG")} ج.م</span>
    </div>`).join("");

  const freeShippingNote = sub < 500
    ? `<div style="font-size:0.8rem;color:var(--text-secondary);padding:8px 0;border-bottom:1px solid var(--border);">
         🚚 أضف <strong style="color:var(--accent)">${(500 - sub).toLocaleString("ar-EG")} ج.م</strong> وتاخد شحن مجاني!
       </div>`
    : "";

  section.innerHTML = `
    <div class="checkout-layout">

      <!-- ===== FORM SIDE ===== -->
      <div class="checkout-form-card">
        <h2 class="checkout-form-title">📋 بياناتك</h2>
        <form id="orderForm" novalidate autocomplete="on">
          <div class="form-grid">

            <div class="form-group">
              <label class="form-label" for="fname">الاسم الأول *</label>
              <input class="form-input" type="text" id="fname" name="fname"
                     placeholder="محمد" required autocomplete="given-name">
            </div>

            <div class="form-group">
              <label class="form-label" for="lname">الاسم الأخير *</label>
              <input class="form-input" type="text" id="lname" name="lname"
                     placeholder="أحمد" required autocomplete="family-name">
            </div>

            <div class="form-group full">
              <label class="form-label" for="phone">رقم الهاتف *</label>
              <input class="form-input" type="tel" id="phone" name="phone"
                     placeholder="01xxxxxxxxx" required
                     pattern="^(01)[0-9]{9}$"
                     autocomplete="tel"
                     inputmode="tel">
            </div>

            <div class="form-group">
              <label class="form-label" for="city">المحافظة *</label>
              <select class="form-select" id="city" name="city" required>
                <option value="">اختار المحافظة</option>
                ${citiesOptions}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="area">المنطقة / الحي</label>
              <input class="form-input" type="text" id="area" name="area"
                     placeholder="مدينة نصر" autocomplete="address-level2">
            </div>

            <div class="form-group full">
              <label class="form-label" for="address">العنوان بالتفصيل *</label>
              <textarea class="form-textarea" id="address" name="address"
                        placeholder="اسم الشارع، رقم العمارة، رقم الشقة..."
                        required rows="3" autocomplete="street-address"></textarea>
            </div>

            <div class="form-group full">
              <label class="form-label" for="notes">ملاحظات (اختياري)</label>
              <textarea class="form-textarea" id="notes" name="notes"
                        placeholder="أي ملاحظات على الطلب..."
                        rows="2"></textarea>
            </div>
          </div>

          <!-- Payment method -->
          <div style="margin-top:24px;">
            <h3 style="font-size:1rem;font-weight:800;margin-bottom:14px;">💳 طريقة الدفع</h3>
            <div class="payment-methods">
              <div class="payment-method selected" id="pmCOD">
                <div class="payment-icon">💵</div>
                <div class="payment-text">
                  <strong>دفع عند الاستلام</strong>
                  <span>Cash on Delivery — متاح لكل محافظات مصر</span>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-wa btn-lg btn-block"
                  style="margin-top:24px;" id="submitBtn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            ✅ تأكيد الطلب عبر واتساب
          </button>
        </form>
      </div>

      <!-- ===== ORDER SUMMARY SIDEBAR ===== -->
      <div class="order-summary">
        <h3 class="summary-title">📦 ملخص طلبك</h3>
        ${itemsSummary}
        <div class="summary-row" style="margin-top:8px;">
          <span>المجموع</span>
          <span>${sub.toLocaleString("ar-EG")} ج.م</span>
        </div>
        <div class="summary-row">
          <span>الشحن</span>
          <span style="${shipping === 0 ? "color:var(--wa-green);font-weight:700;" : ""}">
            ${shipping === 0 ? "مجاني ✅" : shipping.toLocaleString("ar-EG") + " ج.م"}
          </span>
        </div>
        ${freeShippingNote}
        <div class="summary-row total">
          <span>الإجمالي</span>
          <span>${total.toLocaleString("ar-EG")} ج.م</span>
        </div>

        <!-- Store contact card -->
        <div style="margin-top:16px;padding:14px;background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.25);border-radius:var(--radius-md);font-size:0.85rem;">
          <div style="color:var(--wa-green);font-weight:700;margin-bottom:6px;">💬 واتساب المتجر</div>
          <div>📱 <a href="https://wa.me/${WA_NUMBER}" style="color:var(--wa-green);">01063992579</a></div>
          <div style="color:var(--text-dim);margin-top:4px;">⏰ متاح 9 ص — 11 م • كل الأيام</div>
        </div>

        <a href="cart.html" class="btn btn-secondary btn-block" style="margin-top:12px;">← رجوع للسلة</a>

        <!-- Trust row -->
        <div style="display:flex;gap:12px;margin-top:14px;justify-content:center;">
          <span style="font-size:0.78rem;color:var(--text-dim);">🚚 توصيل 24-48 ساعة</span>
          <span style="font-size:0.78rem;color:var(--text-dim);">🔄 إرجاع 7 أيام</span>
        </div>
      </div>
    </div>`;

  // Bind form submit
  document.getElementById("orderForm").addEventListener("submit", submitOrder);
}

// ---------- Validate & highlight errors ----------
function validateForm(form) {
  const fields = ["fname", "lname", "phone", "city", "address"];
  let isValid = true;
  const errors = [];

  // Clear previous errors
  fields.forEach(id => {
    const el = form[id];
    if (el) { el.classList.remove("error"); }
  });

  const fname   = form.fname.value.trim();
  const lname   = form.lname.value.trim();
  const phone   = form.phone.value.trim();
  const city    = form.city.value;
  const address = form.address.value.trim();

  if (!fname) {
    form.fname.classList.add("error");
    errors.push("الاسم الأول مطلوب");
    isValid = false;
  }
  if (!lname) {
    form.lname.classList.add("error");
    errors.push("الاسم الأخير مطلوب");
    isValid = false;
  }
  if (!/^(01)[0-9]{9}$/.test(phone)) {
    form.phone.classList.add("error");
    errors.push("رقم الهاتف غير صحيح — يجب أن يبدأ بـ 01 ويتكون من 11 رقم");
    isValid = false;
  }
  if (!city) {
    form.city.classList.add("error");
    errors.push("المحافظة مطلوبة");
    isValid = false;
  }
  if (!address) {
    form.address.classList.add("error");
    errors.push("العنوان مطلوب");
    isValid = false;
  }

  return { isValid, errors };
}

// ---------- Submit order ----------
function submitOrder(e) {
  e.preventDefault();
  const form   = e.target;
  const btn    = document.getElementById("submitBtn");

  const { isValid, errors } = validateForm(form);
  if (!isValid) {
    showToast(errors[0], "error");
    // Scroll to first error field
    const firstError = form.querySelector(".error");
    if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // Disable button to prevent double-submit
  btn.disabled = true;
  btn.textContent = "⏳ جاري الإرسال...";

  // BUG FIX: Only prepend area if it has a value — avoids " - Street" leading dash
  const area    = form.area.value.trim();
  const address = form.address.value.trim();
  const fullAddress = area ? `${area} — ${address}` : address;

  const customerInfo = {
    name:    `${form.fname.value.trim()} ${form.lname.value.trim()}`,
    phone:   form.phone.value.trim(),
    city:    form.city.value,
    address: fullAddress,
    notes:   form.notes.value.trim()
  };

  const msg   = Cart.buildOrderMessage(customerInfo);
  const waUrl = buildWhatsAppUrl(msg);

  // Small delay so user sees the loading state
  setTimeout(() => {
    window.open(waUrl, "_blank");
    Cart.clear();
    showSuccessScreen();
  }, 400);
}

// ---------- Success screen ----------
function showSuccessScreen() {
  document.getElementById("checkoutSection").innerHTML = `
    <div class="checkout-success">
      <div class="checkout-success-icon">🎉</div>
      <h2>تم إرسال طلبك!</h2>
      <p>
        تم فتح واتساب بتفاصيل طلبك بنجاح.<br>
        هنتواصل معاك خلال دقائق لتأكيد الطلب وترتيب التوصيل.
      </p>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:20px;margin-bottom:28px;text-align:right;">
        <div style="font-size:0.85rem;color:var(--text-secondary);display:flex;flex-direction:column;gap:8px;">
          <span>📦 طلبك سيصلك خلال <strong style="color:var(--text-primary)">24-48 ساعة</strong></span>
          <span>💵 الدفع عند الاستلام — مفيش دفع مقدم</span>
          <span>🔄 إرجاع مجاني خلال 7 أيام</span>
        </div>
      </div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <a href="index.html" class="btn btn-primary btn-lg">🏠 الرئيسية</a>
        <a href="shop.html" class="btn btn-secondary btn-lg">🛍 تسوق مجدداً</a>
      </div>
    </div>`;
}

// ---------- Boot ----------
document.addEventListener("DOMContentLoaded", renderCheckout);
