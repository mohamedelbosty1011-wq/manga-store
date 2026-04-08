// ============================================================
// MangaStore — Cart Management (localStorage)
// ============================================================

const CART_KEY = "mangastore_cart_v1";

const Cart = {
  // ---------- Read ----------
  get() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : { items: [] };
    } catch {
      return { items: [] };
    }
  },

  // ---------- Write ----------
  save(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    Cart._dispatch();
  },

  // ---------- Add / Update ----------
  addItem({ productId, name, color, size, qty = 1, price, image }) {
    const cart = Cart.get();
    const key = `${productId}-${color}-${size}`;
    const existing = cart.items.find(i => `${i.productId}-${i.color}-${i.size}` === key);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.items.push({ productId, name, color, size, qty, price, image, key });
    }
    Cart.save(cart);
  },

  removeItem(key) {
    const cart = Cart.get();
    cart.items = cart.items.filter(i => i.key !== key);
    Cart.save(cart);
  },

  updateQty(key, delta) {
    const cart = Cart.get();
    const item = cart.items.find(i => i.key === key);
    if (item) {
      item.qty = Math.max(1, item.qty + delta);
    }
    Cart.save(cart);
  },

  setQty(key, qty) {
    const cart = Cart.get();
    const item = cart.items.find(i => i.key === key);
    if (item) {
      item.qty = Math.max(1, parseInt(qty) || 1);
    }
    Cart.save(cart);
  },

  clear() {
    Cart.save({ items: [] });
  },

  // ---------- Computed ----------
  getCount() {
    return Cart.get().items.reduce((sum, i) => sum + i.qty, 0);
  },

  getSubtotal() {
    return Cart.get().items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  /**
   * Returns shipping cost.
   * Free shipping on orders >= 500 ج.م
   */
  getShipping(subtotal) {
    return subtotal >= 500 ? 0 : 60;
  },

  getTotal() {
    const sub = Cart.getSubtotal();
    return sub + Cart.getShipping(sub);
  },

  // ---------- WhatsApp order message ----------
  buildOrderMessage(customerInfo = null) {
    const cart = Cart.get();
    if (!cart.items.length) return "";

    let msg = "🛒 طلب جديد من MangaStore\n";
    msg += "━━━━━━━━━━━━━━━━━\n";

    if (customerInfo) {
      msg += `👤 الاسم: ${customerInfo.name}\n`;
      msg += `📞 الهاتف: ${customerInfo.phone}\n`;
      msg += `📍 المحافظة: ${customerInfo.city}\n`;
      msg += `🏠 العنوان: ${customerInfo.address}\n`;
      if (customerInfo.notes) msg += `📝 ملاحظات: ${customerInfo.notes}\n`;
      msg += "━━━━━━━━━━━━━━━━━\n";
    }

    msg += "📦 المنتجات:\n";
    cart.items.forEach(item => {
      msg += `• ${item.name} (${item.color} - ${item.size}) × ${item.qty} = ${(item.price * item.qty).toLocaleString("ar-EG")} ج.م\n`;
    });

    const sub = Cart.getSubtotal();
    const shipping = Cart.getShipping(sub);
    const total = sub + shipping;

    msg += "━━━━━━━━━━━━━━━━━\n";
    msg += `💰 المجموع: ${sub.toLocaleString("ar-EG")} ج.م\n`;
    msg += `🚚 الشحن: ${shipping === 0 ? "مجاني ✅" : shipping.toLocaleString("ar-EG") + " ج.م"}\n`;
    msg += `💳 الإجمالي: ${total.toLocaleString("ar-EG")} ج.م\n`;
    msg += "━━━━━━━━━━━━━━━━━\n";
    msg += "الدفع عند الاستلام 💵";

    return msg;
  },

  // ---------- Event ----------
  _dispatch() {
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { count: Cart.getCount() } }));
  }
};
