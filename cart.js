// cart.js — renders the cart stored in localStorage (helpers live in assets/site.js)

const cartContainer = document.getElementById('cart-container');
const cartMeta = document.getElementById('cart-meta');
const SHIPPING_FLAT = 25;

function renderCart() {
  const cart = getCart();
  const count = cartCount(cart);
  cartMeta.textContent = count ? `${count} item${count === 1 ? '' : 's'}` : 'Your cart';

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty">
        <div class="empty-icon">${icon('bag')}</div>
        <h2 class="h3">Your cart is empty</h2>
        <p class="muted">Find something electric to fill it with.</p>
        <a href="index.html#shop" class="btn btn-ink">Start shopping ${icon('arrow-right', 'icon-arrow')}</a>
      </div>`;
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FLAT;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100);

  const lines = cart.map((item, index) => {
    // Older carts did not store an image, so fall back to the catalog
    const image = item.image || (products[item.id] && products[item.id].image) || '';
    const category = products[item.id] && categories[products[item.id].category];
    const unit = parsePrice(item.price);
    return `
      <div class="cart-line">
        <a href="product.html?id=${encodeURIComponent(item.id)}" class="thumb"><img src="${escapeHtml(image)}" alt=""></a>
        <div>
          ${category ? `<span class="label">${escapeHtml(category.title)}</span>` : ''}
          <a href="product.html?id=${encodeURIComponent(item.id)}" class="name text-link" style="text-decoration-color:transparent">${escapeHtml(item.name)}</a>
          <p class="muted small mono">${formatPrice(unit)} each</p>
          <div class="controls">
            <div class="qty qty-sm">
              <button type="button" data-index="${index}" data-step="-1" aria-label="Decrease quantity">${icon('minus')}</button>
              <input type="number" value="${item.quantity}" min="1" max="99" data-index="${index}" class="quantity-input" aria-label="Quantity for ${escapeHtml(item.name)}">
              <button type="button" data-index="${index}" data-step="1" aria-label="Increase quantity">${icon('plus')}</button>
            </div>
            <button type="button" class="remove-btn" data-remove="${index}">${icon('trash')}Remove</button>
          </div>
        </div>
        <span class="line-total">${formatPrice(unit * item.quantity)}</span>
      </div>`;
  }).join('');

  cartContainer.innerHTML = `
    <div class="cart-layout">
      <div class="cart-lines">${lines}</div>
      <aside class="summary" aria-label="Order summary">
        <h2 class="h3">Order summary</h2>
        <div class="ship-meter">
          <span class="small">${shipping === 0
            ? 'You\'ve unlocked <strong>free shipping</strong>'
            : `Add <strong class="mono">${formatPrice(FREE_SHIPPING_FROM - subtotal)}</strong> for free shipping`}</span>
          <div class="bar"><span style="width:${progress}%"></span></div>
        </div>
        <div class="summary-row"><span class="muted">Subtotal</span><span class="mono">${formatPrice(subtotal)}</span></div>
        <div class="summary-row"><span class="muted">Shipping</span><span class="mono">${shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
        <div class="summary-row summary-total"><span>Total</span><span class="mono">${formatPrice(subtotal + shipping)}</span></div>
        <button type="button" id="checkout-btn" class="btn btn-ink btn-block">Checkout ${icon('arrow-right', 'icon-arrow')}</button>
        <button type="button" id="clear-btn" class="clear">Clear cart</button>
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
  if (removed) showToast(`${removed.name} removed`);
}

// Demo checkout — no payment is taken
function checkout() {
  saveCart([]);
  cartMeta.textContent = 'Order confirmed';
  cartContainer.innerHTML = `
    <div class="empty">
      <div class="empty-icon" style="background:var(--volt)">${icon('check')}</div>
      <h2 class="h3">Order placed</h2>
      <p class="muted">Thanks for shopping with Arngren. This is a demo store, so no payment was taken.</p>
      <a href="index.html" class="btn btn-ink">Back to the shop ${icon('arrow-right', 'icon-arrow')}</a>
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
  if (e.target.closest('#checkout-btn')) return checkout();
  if (e.target.closest('#clear-btn') && confirm('Remove all items from your cart?')) {
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
