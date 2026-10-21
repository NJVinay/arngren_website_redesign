// product.js — renders a single product from products.js using ?id=

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
const product = Object.prototype.hasOwnProperty.call(products, productId) ? products[productId] : null;

if (product) {
  const category = categories[product.category];
  const price = parsePrice(product.price);

  document.title = `${product.name} — Arngren`;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('product-price').textContent = formatPrice(price);
  document.getElementById('product-usage').textContent = product.usage;
  document.getElementById('shipping-note').textContent = price >= FREE_SHIPPING_FROM
    ? 'Ships free'
    : `Free shipping on orders over ${formatPrice(FREE_SHIPPING_FROM)}`;

  const image = document.getElementById('product-image');
  image.src = product.image;
  image.alt = product.name;

  document.getElementById('product-features').innerHTML =
    product.detailedFeatures.map(item => `<li>${icon('check')}<span>${escapeHtml(item)}</span></li>`).join('');

  const sep = '<span aria-hidden="true">/</span>';
  document.getElementById('breadcrumbs').innerHTML =
    `<a href="index.html">Home</a>${sep}` +
    (category ? `<a href="${category.page}">${escapeHtml(category.title)}</a>${sep}` : '') +
    `<span aria-current="page">${escapeHtml(product.name)}</span>`;

  if (category) {
    document.getElementById('product-category').textContent = category.title;

    // Related products from the same category
    const related = category.items.filter(id => id !== productId).slice(0, 4);
    if (related.length) {
      renderProductGrid(document.getElementById('related-grid'), related);
      document.getElementById('related-link').href = category.page;
      document.getElementById('related').hidden = false;
    }
  }

  // Quantity stepper
  const qtyInput = document.getElementById('qty-input');
  const clampQty = value => Math.min(99, Math.max(1, parseInt(value, 10) || 1));
  document.querySelectorAll('.qty [data-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      qtyInput.value = clampQty(Number(qtyInput.value) + Number(btn.dataset.step));
    });
  });
  qtyInput.addEventListener('change', () => { qtyInput.value = clampQty(qtyInput.value); });

  document.getElementById('buy-button').addEventListener('click', () => {
    addToCart(productId, clampQty(qtyInput.value));
  });
} else {
  document.querySelector('main').innerHTML = `
    <div class="empty" style="margin-top:48px">
      <div class="empty-icon">${icon('search')}</div>
      <h1 class="h3">Product not found</h1>
      <p class="muted">That product doesn't exist or has been removed.</p>
      <a href="index.html#shop" class="btn btn-ink">Browse all products ${icon('arrow-right', 'icon-arrow')}</a>
    </div>`;
}
