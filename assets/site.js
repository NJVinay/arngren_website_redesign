// site.js — shared layout, icons, cart helpers and product rendering.
// Load after products.js on every page.

const CART_KEY = 'cart';
const FREE_SHIPPING_FROM = 500;

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

function sortIds(ids, mode) {
  const list = [...ids];
  if (mode === 'price-asc') list.sort((a, b) => parsePrice(products[a].price) - parsePrice(products[b].price));
  if (mode === 'price-desc') list.sort((a, b) => parsePrice(products[b].price) - parsePrice(products[a].price));
  if (mode === 'name') list.sort((a, b) => products[a].name.localeCompare(products[b].name));
  return list;
}

// ---------- Icons (Lucide-style strokes) ----------

const ICONS = {
  'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'arrow-left': '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  bag: '<path d="M6 7h12l1 13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
  menu: '<path d="M4 7h16"/><path d="M4 17h16"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  truck: '<path d="M14 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.6a1 1 0 0 0-.2-.6l-3.5-4.4a1 1 0 0 0-.8-.4H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1Z"/><path d="m9 12 2 2 4-4"/>',
  pin: '<path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-9 5.7a2 2 0 0 1-2 0L2 7"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  recycle: '<path d="M7 19H4.8a1.8 1.8 0 0 1-1.6-2.7l3.9-6.7"/><path d="M11 19h8.2a1.8 1.8 0 0 0 1.6-2.7l-1.2-2.1"/><path d="m14 16-3 3 3 3"/><path d="M8.3 13.6 7.1 9.5 3 10.6"/><path d="m9.3 5.6 1.1-1.8a1.8 1.8 0 0 1 3.1 0l3.9 6.7"/><path d="m13.4 9.6 4.1 1.1 1.1-4.1"/>'
};

function icon(name, extraClass = '') {
  return `<svg class="icon ${extraClass}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

// Replace <i data-icon="name"></i> placeholders in static markup
function hydrateIcons(root = document) {
  root.querySelectorAll('i[data-icon]').forEach(el => {
    const cls = el.dataset.icon.startsWith('arrow') ? 'icon-arrow' : '';
    el.outerHTML = icon(el.dataset.icon, cls);
  });
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
  showToast(`${product.name} added`, { href: 'cart.html', label: 'View cart' });
}

function updateCartBadge() {
  const count = cartCount();
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.textContent = count > 99 ? '99+' : count;
    el.hidden = count === 0;
  });
  document.querySelectorAll('.cart-btn').forEach(el => {
    el.setAttribute('aria-label', `Cart, ${count} item${count === 1 ? '' : 's'}`);
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
  toast.innerHTML = `${icon('check')}<span>${escapeHtml(message)}</span>` +
    (action ? `<a href="${escapeHtml(action.href)}">${escapeHtml(action.label)}</a>` : '');
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

// ---------- Layout ----------

function currentPage() {
  const file = location.pathname.split('/').pop();
  return file || 'index.html';
}

function logo() {
  return `<a href="index.html" class="logo" aria-label="Arngren home"><span class="logo-mark"></span>arngren<span class="logo-tag">OSLO</span></a>`;
}

function renderHeader() {
  const slot = document.getElementById('site-header');
  if (!slot) return;

  const page = currentPage();
  const link = (href, label) =>
    `<a href="${href}" class="nav-link${page === href ? ' active' : ''}"${page === href ? ' aria-current="page"' : ''}>${escapeHtml(label)}</a>`;

  slot.outerHTML = `
    <div class="announce">Free shipping on orders over <strong>${formatPrice(FREE_SHIPPING_FROM)}</strong><span class="announce-extra"> &nbsp;·&nbsp; Free recycling of your old electronics</span></div>
    <header class="site-header">
      <div class="wrap header-inner">
        ${logo()}
        <nav id="main-nav" class="main-nav" aria-label="Main">
          ${Object.values(categories).map(cat => link(cat.page, cat.title)).join('')}
          ${link('contact.html', 'Contact')}
        </nav>
        <div class="header-actions">
          <a href="index.html#shop" class="icon-btn" aria-label="Search products">${icon('search')}</a>
          <a href="cart.html" class="icon-btn cart-btn" aria-label="Cart">${icon('bag')}<span class="cart-badge" data-cart-count hidden>0</span></a>
          <button class="icon-btn menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="main-nav">${icon('menu')}</button>
        </div>
      </div>
    </header>`;

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    toggle.innerHTML = icon(open ? 'close' : 'menu');
  });
}

function renderFooter() {
  const slot = document.getElementById('site-footer');
  if (!slot) return;

  slot.outerHTML = `
    <footer class="site-footer">
      <div class="wrap">
        <div class="footer-top">
          <div>
            ${logo()}
            <p>Electric vehicles, gadgets and hobby gear, shipped from Smestad, Oslo. Member of RENAS for responsible electronics recycling.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>${Object.values(categories).map(cat => `<li><a href="${cat.page}">${escapeHtml(cat.title)}</a></li>`).join('')}</ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li><a href="contact.html">Contact us</a></li>
              <li><a href="contact.html#recycling">Recycling &amp; EE waste</a></li>
              <li><a href="cart.html">Your cart</a></li>
            </ul>
          </div>
          <div>
            <h4>Visit</h4>
            <ul>
              <li>Sondreveien 3k</li>
              <li>0378 Oslo, Norway</li>
              <li><a href="tel:+4722419666">+47 22 41 96 66</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-word" aria-hidden="true">arngren</div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} Arngren.net</span>
          <span>Redesign concept</span>
        </div>
      </div>
    </footer>`;
}

// ---------- Product cards ----------

function productCard(id) {
  const p = products[id];
  if (!p) return '';
  const cat = categories[p.category];
  return `
    <article class="product-card" data-id="${id}">
      <div class="media">
        <img src="${escapeHtml(p.image)}" alt="" loading="lazy" decoding="async">
        <button type="button" class="quick-add" data-add-to-cart="${id}" aria-label="Add ${escapeHtml(p.name)} to cart">${icon('plus')}Add</button>
      </div>
      <div class="info">
        <div>
          <h3 class="name"><a href="product.html?id=${encodeURIComponent(id)}">${escapeHtml(p.name)}</a></h3>
          ${cat ? `<span class="label">${escapeHtml(cat.title)}</span>` : ''}
        </div>
        <span class="price">${formatPrice(parsePrice(p.price))}</span>
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

  const others = Object.entries(categories).filter(([k]) => k !== key);

  document.title = `${cat.title} — Arngren`;
  main.innerHTML = `
    <div class="wrap">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span>${escapeHtml(cat.title)}</span></nav>
      <header class="page-head" style="padding-top:8px">
        <div class="page-head-row">
          <div>
            <span class="label">Category · ${cat.items.length} products</span>
            <h1 class="h1">${escapeHtml(cat.title)}</h1>
            <p class="lead">${escapeHtml(cat.blurb)}</p>
          </div>
          <label><span class="visually-hidden">Sort by</span>
            <select id="sort-select" class="select">
              <option value="default">Sort: Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>
      </header>
      <div id="category-grid" class="product-grid"></div>

      <section class="section-tight" style="margin-top:56px">
        <hr class="rule">
        <div class="section-head" style="margin-top:40px"><h2 class="h2">Keep exploring</h2></div>
        <div class="cat-grid">${others.map(([k, c]) => categoryTile(c)).join('')}</div>
      </section>
    </div>`;

  const grid = document.getElementById('category-grid');
  const select = document.getElementById('sort-select');
  const render = () => renderProductGrid(grid, sortIds(cat.items, select.value));
  select.addEventListener('change', render);
  render();
}

function categoryTile(cat) {
  const cover = products[cat.cover || cat.items[0]];
  return `
    <a href="${cat.page}" class="cat-tile">
      <div class="media"><img src="${escapeHtml(cover.image)}" alt="" loading="lazy"></div>
      <div class="body">
        <div>
          <h3 class="h3">${escapeHtml(cat.title)}</h3>
          <span class="label">${cat.items.length} products</span>
        </div>
        ${icon('arrow-right')}
      </div>
    </a>`;
}

// ---------- Image fit ----------
// Catalog images are a mix of cut-outs on white and full photos. Cut-outs sit
// centred on the neutral tile; photos fill it edge to edge. Detect by sampling
// the corners once per image and cache the result.

const photoCache = new Map();
const MEDIA_SELECTOR = '.media, .pdp-media, .thumb';

function classifyImage(img) {
  const box = img.closest(MEDIA_SELECTOR);
  if (!box) return;
  const apply = isPhoto => box.classList.toggle('is-photo', isPhoto);
  if (photoCache.has(img.src)) return apply(photoCache.get(img.src));

  const run = () => {
    try {
      const w = img.naturalWidth, h = img.naturalHeight;
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const corners = [[2, 2], [w - 3, 2], [2, h - 3], [w - 3, h - 3]];
      const light = corners.filter(([x, y]) => {
        const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
        return r > 232 && g > 232 && b > 232;
      }).length;
      const isPhoto = light < 3;
      photoCache.set(img.src, isPhoto);
      apply(isPhoto);
    } catch (e) {
      // Canvas is tainted when opened via file:// — keep the cut-out layout
    }
  };
  if (img.complete && img.naturalWidth) run();
  else img.addEventListener('load', run, { once: true });
}

function classifyImages(root = document) {
  root.querySelectorAll(`:is(${MEDIA_SELECTOR}) img`).forEach(classifyImage);
}

new MutationObserver(mutations => {
  mutations.forEach(m => m.addedNodes.forEach(node => {
    if (node.nodeType === 1) classifyImages(node);
  }));
}).observe(document.documentElement, { childList: true, subtree: true });

// ---------- Scroll reveal ----------

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach(el => io.observe(el));
}

// ---------- Boot ----------

renderHeader();
renderFooter();
hydrateIcons();
updateCartBadge();
document.addEventListener('DOMContentLoaded', () => { hydrateIcons(); classifyImages(); initReveal(); });

// Keep the badge in sync when the cart changes in another tab
window.addEventListener('storage', e => {
  if (e.key === CART_KEY) updateCartBadge();
});
