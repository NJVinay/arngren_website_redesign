// Retrieve cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartContainer = document.getElementById('cart-container');

// Function to render cart items
function renderCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <p class="text-center text-xl">Your cart is empty — <a href='arngren_final_integrated.html' class='text-blue-500 underline'>Let's shop!</a></p>
    `;
    return;
  }

  let html = `
    <table class="w-full text-left">
      <thead>
        <tr><th>Product</th><th>Price</th><th>Quantity</th><th>Action</th></tr>
      </thead>
      <tbody>
  `;

  cart.forEach((item, index) => {
    html += `
      <tr class="border-t">
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td><input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input border rounded p-1 w-16"></td>
        <td><button onclick="removeItem(${index})" class="bg-red-500 text-white px-3 py-1 rounded">Remove</button></td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
    <div class="text-right mt-4">
      <button onclick="checkout()" class="btn-primary px-4 py-2 rounded">Checkout</button>
    </div>
  `;

  cartContainer.innerHTML = html;

  // Add event listeners to quantity inputs
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', updateQuantity);
  });
}

// Function to remove item from cart
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Function to update quantity
function updateQuantity(e) {
  const index = e.target.dataset.index;
  cart[index].quantity = parseInt(e.target.value);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Checkout function (for demo purposes)
function checkout() {
  alert('Order placed successfully! Thank you for shopping with us.');
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Initial render
renderCart();
    