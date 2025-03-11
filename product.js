// product.js

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Fetch product data from products.js
const product = products[productId];

// Dynamically update the page
// Existing Code (already present)

// Dynamically update the page
if (product) {
  document.getElementById('product-name').innerText = product.name;
  document.getElementById('product-description').innerText = product.description;
  document.getElementById('product-price').innerText = `Price: ${product.price}`;
  document.getElementById('product-image').src = product.image;
  document.getElementById('product-image').alt = product.name;
  document.getElementById('buy-button').href = `checkout.html?id=${productId}`; // Optional: link to checkout

  // Add detailed features
  const featureList = product.detailedFeatures.map(item => `<li>${item}</li>`).join('');
  document.getElementById('product-features').innerHTML = `<ul class="list-disc ml-5">${featureList}</ul>`;

  // Add usage/why buy
  document.getElementById('product-usage').innerText = product.usage;
} else {
  // Product not found case
  document.querySelector('main').innerHTML = `
    <h2 class='text-3xl'>Product Not Found</h2>
    <p>Please go back to <a href='arngren_final_integrated.html' class='text-blue-500 underline'>Home</a>.</p>
  `;
}

// Add to Cart Functionality
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if product already exists in cart
  let existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1; // Increase quantity
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} has been added to your cart!`);
}

// Attach to button
document.getElementById('buy-button').addEventListener('click', function (e) {
  e.preventDefault(); // Prevent default link behavior
  addToCart({ id: productId, name: product.name, price: product.price });
});
