# Arngren Website Redesign


A modern redesign of the Arngren e-commerce website featuring a clean, user-friendly interface with improved navigation and shopping experience.

## 📋 Project Overview

This project is a complete redesign of an e-commerce website, transforming it into a modern, responsive, and intuitive shopping platform. The site features multiple product categories, detailed product pages, a functional shopping cart, and contact functionality.

## ✨ Features

- **Responsive Design**: Fully responsive layout that works seamlessly across all devices
- **Product Categories**: Data-driven catalog pages generated from `products.js`:
  - Vehicles (e-bikes, scooters, ATVs, electric jeeps and cars)
  - Electronics & Gadgets (drones, robots, solar products, alarms, etc.)
  - Toys & Sports (RC cars and tanks, ride-on toys, billiard table)
  - Home & Garden (lawn mower, aquarium equipment, seasonal decor)
- **Search, Filter & Sort**: Live search, category filter chips and price/name sorting on the homepage; sorting on every category page
- **Shopping Cart**: Full-featured cart with:
  - Add/remove items
  - Quantity adjustment
  - Persistent storage using localStorage
  - Real-time subtotal, shipping and total calculation
  - Live cart-count badge in the header (synced across tabs)
- **Product Pages**: Detailed product information with:
  - Product images
  - Comprehensive descriptions
  - Feature lists
  - Usage recommendations
  - Pricing information
  - Quantity selector, breadcrumbs and related products
- **Modern UI/UX**:
  - Animated gradient backgrounds
  - Hover effects and smooth transitions
  - Card-based product displays
  - Shared sticky header with a mobile hamburger menu
  - Toast notifications instead of browser alerts
  - Respects `prefers-reduced-motion`
- **Contact Form**: Customer inquiry form with client-side validation (demo only, no messages are sent)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Custom animations and styling
- **JavaScript (ES6+)**: Interactive functionality and cart management
- **Tailwind CSS**: Utility-first CSS framework for styling
- **localStorage API**: Client-side data persistence for shopping cart

## 📁 Project Structure

```
arngren_website_redesign/
├── index.html                     # Homepage (hero, categories, featured, all products)
├── arngren_final_integrated.html  # Redirect to index.html (keeps old links working)
├── assets/
│   ├── site.js                    # Shared header/footer, cart helpers, product cards
│   └── styles.css                 # Shared styles for every page
├── cart.html                      # Shopping cart page
├── cart.js                        # Cart functionality
├── contact.html                   # Contact form page
├── electronics.html               # Electronics category page
├── home_garden.html               # Home & Garden category page
├── product.html                   # Individual product detail page
├── product.js                     # Product page functionality
├── products.js                    # Product data, categories and featured list
├── toys_sports.html               # Toys & Sports category page
├── vehicles.html                  # Vehicles category page
└── images/                        # Product images directory
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely client-side

### Installation

1. Clone or download the repository
2. Navigate to the project directory
3. Open `index.html` in your web browser

```bash
# If using a local server (optional)
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

4. Browse the site and test functionality

## 💻 Usage

### Browsing Products

1. Start at the homepage (`index.html`)
2. Navigate through different categories using the navigation menu
3. Click on product cards to view detailed information

### Adding to Cart

1. Click "Add to cart" on any product card, or choose a quantity on a product page
2. View your cart by clicking "🛒 Cart" in the navigation
3. Adjust quantities or remove items as needed

### Product Categories

- **Vehicles**: E-bikes, scooters, ATVs, electric jeeps and cars
- **Electronics & Gadgets**: Drones, robots, solar products and tech gadgets
- **Toys & Sports**: RC cars and tanks, ride-on toys and games
- **Home & Garden**: Garden, aquarium and seasonal products

### Contact

- Navigate to the contact page to fill in the inquiry form or find recycling information

## 🎨 Design Features

- **Animated Gradient Background**: Smooth, flowing gradient animation
- **Hover Effects**: Interactive card animations on hover
- **Responsive Cards**: Equal-height cards with consistent spacing
- **Modern Color Scheme**: Clean and professional color palette
- **Image Optimization**: Properly sized and contained images

## 🔧 Customization

### Adding New Products

Edit `products.js` and add a new product object:

```javascript
"product_id": {
  name: "Product Name",
  price: "$XX",
  description: "Short description",
  detailedFeatures: ["Feature 1", "Feature 2"],
  usage: "Usage description",
  image: "images/product.jpg"
}
```

Then add the product id to the `items` list of a category in the `categories` object at the bottom of `products.js` — it will appear on the homepage and its category page automatically.

### Modifying Styles

- Shared styles live in `assets/styles.css`
- Tailwind CSS classes can be adjusted directly in the HTML
- Animation durations and effects can be modified in the CSS

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📝 Future Enhancements

- [ ] Backend integration for persistent data storage
- [ ] User authentication and account management
- [ ] Payment gateway integration
- [x] Product search functionality
- [ ] Product reviews and ratings
- [ ] Wishlist feature
- [ ] Order tracking
- [ ] Email notifications

## 📄 License

This project is available for educational and personal use.

## 👤 Author

**njvinay**  
Email: jv5102003@gmail.com

## 🙏 Acknowledgments

- Tailwind CSS for the utility-first CSS framework
- Inspiration from modern e-commerce platforms
- Original Arngren.net concept

---

**Note**: This is a front-end demonstration project. For production use, implement proper backend services, security measures, and payment processing systems.
