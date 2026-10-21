// product.js — renders a single product from products.js using ?id=

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
const product = Object.prototype.hasOwnProperty.call(products, productId) ? products[productId] : null;

if (product) {
  const category = categories[product.category];

  document.title = `${product.name} - Arngren`;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('product-price').textContent = product.price;
  document.getElementById('product-usage').textContent = product.usage;

  const image = document.getElementById('product-image');
  image.src = product.image;
  image.alt = product.name;

  document.getElementById('product-features').innerHTML =
    product.detailedFeatures.map(item => `<li>${escapeHtml(item)}</li>`).join('');

  document.getElementById('breadcrumbs').innerHTML =
    `<a href="index.html">Home</a> / ` +
    (category ? `<a href="${category.page}">${escapeHtml(category.title)}</a> / ` : '') +
    `<span>${escapeHtml(product.name)}</span>`;

  if (category) {
    document.getElementById('product-category').textContent = `${category.icon} ${category.title}`;

    // Related products from the same category
    const related = category.items.filter(id => id !== productId).slice(0, 4);
    if (related.length) {
      renderProductGrid(document.getElementById('related-grid'), related);
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
    <div class="panel empty-state" style="margin-top:48px">
      <h1 class="text-3xl font-bold mb-2">Product not found</h1>
      <p>We couldn't find that product. <a href="index.html#shop" class="text-blue-600 underline">Browse all products</a>.</p>
    </div>`;
}
