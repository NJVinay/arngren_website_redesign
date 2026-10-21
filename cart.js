// cart.js — renders the cart stored in localStorage (helpers live in assets/site.js)

const cartContainer = document.getElementById('cart-container');
const SHIPPING_FREE_FROM = 500;
const SHIPPING_FLAT = 25;

function renderCart() {
  const cart = getCart();

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="panel empty-state">
        <p class="text-5xl mb-4">🛒</p>
        <p class="mb-6">Your cart is empty.</p>
        <a href="index.html#shop" class="btn-primary">Let's shop!</a>
      </div>`;
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
  const shipping = subtotal >= SHIPPING_FREE_FROM ? 0 : SHIPPING_FLAT;

  const rows = cart.map((item, index) => {
    // Older carts did not store an image, so fall back to the catalog
    const image = item.image || (products[item.id] && products[item.id].image) || '';
    const lineTotal = parsePrice(item.price) * item.quantity;
    return `
      <div class="cart-item">
        <img src="${escapeHtml(image)}" alt="${escapeHtml(item.name)}">
        <div>
          <a href="product.html?id=${encodeURIComponent(item.id)}" class="name hover:underline">${escapeHtml(item.name)}</a>
          <p class="muted">${formatPrice(parsePrice(item.price))} each</p>
          <div class="qty mt-2">
            <button type="button" data-index="${index}" data-step="-1" aria-label="Decrease quantity">−</button>
            <input type="number" value="${item.quantity}" min="1" max="99" data-index="${index}" class="quantity-input" aria-label="Quantity">
            <button type="button" data-index="${index}" data-step="1" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="actions">
          <span class="font-bold">${formatPrice(lineTotal)}</span>
          <button type="button" class="link-danger" data-remove="${index}">Remove</button>
        </div>
      </div>`;
  }).join('');

  cartContainer.innerHTML = `
    <div class="cart-layout">
      <div class="panel">${rows}</div>
      <aside class="panel">
        <h2 class="text-xl font-bold mb-4">Order summary</h2>
        <div class="summary-row"><span>Items (${cartCount(cart)})</span><span>${formatPrice(subtotal)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
        ${shipping > 0 ? `<p class="muted text-sm">Free shipping on orders over ${formatPrice(SHIPPING_FREE_FROM)}.</p>` : ''}
        <div class="summary-row summary-total"><span>Total</span><span>${formatPrice(subtotal + shipping)}</span></div>
        <button type="button" id="checkout-btn" class="btn-primary w-full mt-4">Checkout</button>
        <button type="button" id="clear-btn" class="link-danger w-full mt-3">Clear cart</button>
      </aside>
    </div>`;
}

function setQuantity(index, quantity) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].quantity = Math.min(99, Math.max(1, parseInt(quantity, 10) || 1));
  saveCart(cart);
  renderCart();
}

function removeItem(index) {
  const cart = getCart();
  const [removed] = cart.splice(index, 1);
  saveCart(cart);
  renderCart();
  if (removed) showToast(`${removed.name} removed from your cart`);
}

// Demo checkout — no payment is taken
function checkout() {
  saveCart([]);
  cartContainer.innerHTML = `
    <div class="panel empty-state">
      <p class="text-5xl mb-4">🎉</p>
      <h2 class="text-2xl font-bold mb-2">Order placed!</h2>
      <p class="mb-6">Thank you for shopping with Arngren.net. This is a demo store, so no payment was taken.</p>
      <a href="index.html" class="btn-primary">Back to the shop</a>
    </div>`;
}

cartContainer.addEventListener('click', e => {
  const step = e.target.closest('[data-step]');
  if (step) {
    const index = Number(step.dataset.index);
    const cart = getCart();
    if (cart[index]) setQuantity(index, cart[index].quantity + Number(step.dataset.step));
    return;
  }
  const remove = e.target.closest('[data-remove]');
  if (remove) return removeItem(Number(remove.dataset.remove));
  if (e.target.id === 'checkout-btn') return checkout();
  if (e.target.id === 'clear-btn' && confirm('Remove all items from your cart?')) {
    saveCart([]);
    renderCart();
  }
});

cartContainer.addEventListener('change', e => {
  if (e.target.classList.contains('quantity-input')) setQuantity(Number(e.target.dataset.index), e.target.value);
});

// Re-render if the cart changes in another tab
window.addEventListener('storage', e => {
  if (e.key === CART_KEY) renderCart();
});

renderCart();
