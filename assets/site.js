// site.js — shared layout, cart helpers and product rendering.
// Load after products.js on every page.

const CART_KEY = 'cart';

// ---------- Helpers ----------

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

// Prices are stored as strings like "$999"; normalise to a number
function parsePrice(price) {
  const n = parseFloat(String(price).replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function formatPrice(amount) {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

// ---------- Cart storage ----------

function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(cart) ? cart : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    // Storage unavailable (private mode etc.) — cart lives for this page only
  }
  updateCartBadge();
}

function cartCount(cart = getCart()) {
  return cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
}

function addToCart(id, quantity = 1) {
  const product = products[id];
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id, name: product.name, price: product.price, image: product.image, quantity });
  }
  saveCart(cart);
  showToast(`${product.name} added to your cart`, { href: 'cart.html', label: 'View cart' });
}

function updateCartBadge() {
  const count = cartCount();
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.textContent = count;
    el.hidden = count === 0;
  });
}

// ---------- Toast ----------

function showToast(message, action) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.innerHTML = escapeHtml(message) +
    (action ? ` <a href="${escapeHtml(action.href)}">${escapeHtml(action.label)}</a>` : '');
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---------- Layout ----------

function currentPage() {
  const file = location.pathname.split('/').pop();
  return file || 'index.html';
}

function renderHeader() {
  const slot = document.getElementById('site-header');
  if (!slot) return;

  const page = currentPage();
  const navLinks = Object.values(categories)
    .map(cat => `<a href="${cat.page}" class="nav-link${page === cat.page ? ' active' : ''}">${escapeHtml(cat.title)}</a>`)
    .join('');

  slot.outerHTML = `
    <header class="site-header">
      <div class="container mx-auto header-inner">
        <a href="index.html" class="brand">Arngren<span>.net</span></a>
        <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="main-nav">☰</button>
        <nav id="main-nav" class="main-nav">
          ${navLinks}
          <a href="contact.html" class="nav-link${page === 'contact.html' ? ' active' : ''}">Contact</a>
          <a href="cart.html" class="nav-link cart-link${page === 'cart.html' ? ' active' : ''}" aria-label="Cart">
            🛒 Cart <span class="cart-badge" data-cart-count hidden>0</span>
          </a>
        </nav>
      </div>
    </header>`;

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

function renderFooter() {
  const slot = document.getElementById('site-footer');
  if (!slot) return;

  const catLinks = Object.values(categories)
    .map(cat => `<li><a href="${cat.page}">${escapeHtml(cat.title)}</a></li>`)
    .join('');

  slot.outerHTML = `
    <footer class="site-footer">
      <div class="container mx-auto footer-grid">
        <div>
          <p class="brand">Arngren<span>.net</span></p>
          <p class="mt-2">Electric vehicles, gadgets and hobby products from Oslo, Norway.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>${catLinks}</ul>
        </div>
        <div>
          <h4>Help</h4>
          <ul>
            <li><a href="contact.html">Contact us</a></li>
            <li><a href="contact.html#recycling">Recycling &amp; EE waste</a></li>
            <li><a href="cart.html">Your cart</a></li>
          </ul>
        </div>
      </div>
      <p class="footer-bottom">&copy; ${new Date().getFullYear()} Arngren.net | All Rights Reserved</p>
    </footer>`;
}

// ---------- Product cards ----------

function productCard(id) {
  const p = products[id];
  if (!p) return '';
  const cat = categories[p.category];
  return `
    <article class="card product-card" data-id="${id}" data-name="${escapeHtml(p.name.toLowerCase())}"
             data-category="${p.category || ''}">
      <a href="product.html?id=${encodeURIComponent(id)}" class="card-link">
        <div class="card-media"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy"></div>
        ${cat ? `<span class="card-tag">${escapeHtml(cat.title)}</span>` : ''}
        <h3 class="card-title">${escapeHtml(p.name)}</h3>
      </a>
      <div class="card-footer">
        <span class="price">${escapeHtml(p.price)}</span>
        <button type="button" class="btn-primary btn-sm" data-add-to-cart="${id}">Add to cart</button>
      </div>
    </article>`;
}

function renderProductGrid(container, ids) {
  container.innerHTML = ids.map(productCard).join('');
}

// Delegate add-to-cart clicks for every card on the page
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-add-to-cart]');
  if (btn) addToCart(btn.dataset.addToCart);
});

// ---------- Category pages ----------

function renderCategoryPage(key) {
  const cat = categories[key];
  const main = document.getElementById('category-main');
  if (!cat || !main) return;

  document.title = `${cat.title} - Arngren`;
  main.innerHTML = `
    <section class="page-intro">
      <p class="eyebrow">${cat.icon} Category</p>
      <h1>${escapeHtml(cat.title)}</h1>
      <p>${escapeHtml(cat.blurb)}</p>
    </section>
    <div class="toolbar">
      <span class="muted">${cat.items.length} products</span>
      <label class="sort">Sort by
        <select id="sort-select">
          <option value="default">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name">Name</option>
        </select>
      </label>
    </div>
    <div id="category-grid" class="product-grid"></div>`;

  const grid = document.getElementById('category-grid');
  const sortItems = mode => {
    const ids = [...cat.items];
    if (mode === 'price-asc') ids.sort((a, b) => parsePrice(products[a].price) - parsePrice(products[b].price));
    if (mode === 'price-desc') ids.sort((a, b) => parsePrice(products[b].price) - parsePrice(products[a].price));
    if (mode === 'name') ids.sort((a, b) => products[a].name.localeCompare(products[b].name));
    renderProductGrid(grid, ids);
  };
  document.getElementById('sort-select').addEventListener('change', e => sortItems(e.target.value));
  sortItems('default');
}

// ---------- Boot ----------

renderHeader();
renderFooter();
updateCartBadge();

// Keep the badge in sync when the cart changes in another tab
window.addEventListener('storage', e => {
  if (e.key === CART_KEY) updateCartBadge();
});
