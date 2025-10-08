# FreshBite 🍔

A modern and user-friendly food delivery web application **template** built with vanilla **HTML**, **CSS**, and **JavaScript**. FreshBite provides a ready-to-use interface for customers to browse menus, order food, and manage their accounts, while also offering partner registration for restaurants.

> **Note:** This is a frontend template/UI design. Backend functionality and database integration are not included.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Run Locally](#installation--run-locally)
- [Project Structure](#project-structure)
- [Features in Detail](#features-in-detail)
  - [User Authentication](#user-authentication)
  - [Shopping Cart](#shopping-cart)
  - [Search Functionality](#search-functionality)
  - [Partner Registration](#partner-registration)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Author / Contact](#author--contact)

---

## Overview

FreshBite is a comprehensive food delivery platform **template** that provides a ready-to-use frontend interface connecting customers with restaurants. Built with core web technologies, this template demonstrates modern web development practices including responsive design, form layouts, and interactive UI components.

**Perfect for:**
- Learning web development fundamentals
- Starting a food delivery project
- Portfolio demonstration
- Client presentation mockups
- Customizing for your own food delivery business

---

## Features

- 🍕 **Browse Menu Interface** - Clean layout to display food items and restaurants
- 🛒 **Add to Cart UI** - Shopping cart interface with add/remove functionality
- 👤 **Authentication Pages** - Pre-built login and signup forms
- 🔍 **Search Bar** - Functional search interface for filtering items
- 🤝 **Partner Registration Form** - Complete form for restaurant partner applications
- 📱 **Responsive Design** - Fully optimized for all devices (mobile, tablet, desktop)
- 🎨 **Modern UI/UX** - Clean, professional, and intuitive interface design
- ⚡ **Lightweight** - Pure HTML/CSS/JS without heavy frameworks
- 🎯 **Ready to Customize** - Easy to modify and extend for your needs

---

## Tech Stack

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling, animations, and responsive layouts
- **JavaScript (ES6)** - Interactive functionality and dynamic content
- **Local Storage** - Client-side data persistence for cart and user sessions

---

## Installation & Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/UdaraIrunika/friendly-FreshBite.git
   cd friendly-FreshBite
   ```

2. **Open in browser:**
   
   **Option A** - Direct file open:
   - Simply double-click `index.html` or open it in your browser

   **Option B** - Using a local server (recommended):
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   # Then navigate to http://localhost:8000
   
   # OR using Node.js
   npx http-server
   ```

3. **Using VS Code Live Server:**
   - Install the "Live Server" extension
   - Right-click on `index.html`
   - Select "Open with Live Server"

---

## Project Structure

```
friendly-FreshBite/
├── index.html              # Main landing page
├── login.html             # User login page
├── signup.html            # User registration page
├── partner-register.html  # Restaurant partner registration
├── menu.html              # Food menu/catalog page
├── cart.html              # Shopping cart page
├── css/
│   ├── style.css         # Main stylesheet
│   ├── responsive.css    # Responsive design rules
│   └── components.css    # Component-specific styles
├── js/
│   ├── main.js           # Main application logic
│   ├── cart.js           # Shopping cart functionality
│   ├── auth.js           # Authentication logic
│   └── search.js         # Search functionality
├── images/               # Image assets
│   ├── food/            # Food item images
│   └── icons/           # UI icons
├── assets/              # Additional assets
└── README.md            # Project documentation
```

---

## Features in Detail

### User Authentication

- **Sign Up**: New users can create an account with email validation
- **Login**: Secure login system with session management
- **Password Security**: Client-side validation and secure storage
- **Session Management**: Persistent login using local storage

### Shopping Cart

- **Add Items**: Click to add food items to cart
- **Update Quantity**: Increase or decrease item quantities
- **Remove Items**: Delete items from cart
- **Price Calculation**: Automatic total price calculation
- **Cart Persistence**: Cart data saved in local storage
- **View Cart**: Dedicated cart page with full order summary

### Search Functionality

- **Real-time Search**: Instant search results as you type
- **Filter Options**: Search by food name, category, or restaurant
- **Smart Suggestions**: Auto-complete and search suggestions
- **Responsive Results**: Dynamic display of search results

### Partner Registration

- **Restaurant Sign-up**: Dedicated form for restaurant partners
- **Business Details**: Capture restaurant information and contact details
- **Menu Uploaded**: Option to add initial menu items
- **Verification Process**: Partner application submission system

---

## Screenshots

---

### 💻 Desktop View

| ![Hero Section](https://github.com/user-attachments/assets/21c73851-a84b-434b-aca7-d9fd6ff2a279) | ![Features and Dishes](https://github.com/user-attachments/assets/6a85063d-7928-4fb8-9981-e79de17fcf2b) | ![Testimonials](https://github.com/user-attachments/assets/6b2e62e4-e0cd-4fa5-a799-28f300245c3f) |
|:---:|:---:|:---:|
| **Hero Section** | **Features & Dishes** | **Testimonials Section** |

---

| ![Mobile Nav](https://github.com/user-attachments/assets/416c3b02-cccc-45c3-ac40-570d69ec0f41) | ![Mobile Hero](https://github.com/user-attachments/assets/a171c594-df30-4ed9-a46d-6790b09cebe2) | ![Mobile Menu](https://github.com/user-attachments/assets/8309eebb-e0e8-4996-8c6e-302f711a6238) |
|:---:|:---:|:---:|
| **Navigation Bar** | **Hero Section** | **Menu Section** |

| ![Mobile Dishes](https://github.com/user-attachments/assets/a50eb211-90e6-49e1-8486-6d03765b02d9) | ![Mobile Footer](https://github.com/user-attachments/assets/ec2127c6-b8b5-45d1-aec2-1aeb879183f8) |
|:---:|:---:|
| **Dishes Section** | **Footer Section** |

---

## Future Enhancements

To turn this template into a fully functional application, consider adding:

- 🔐 Backend integration with database (MongoDB/MySQL)
- 🔒 Real authentication and user management system
- 💳 Payment gateway integration (Stripe/PayPal)
- 📍 GPS location tracking for delivery
- 🚚 Real-time order tracking system
- ⭐ Restaurant ratings and reviews functionality
- 🔔 Push notifications for order updates
- 📧 Email confirmation and receipt system
- 🎁 Promo codes and discount system
- 📊 User order history dashboard
- 🌐 Multi-language support
- 🔄 API integration for dynamic data

---

## Usage Guide

### For Customers:

1. **Sign Up/Login** - Create an account or login to existing account
2. **Browse Menu** - Explore available restaurants and food items
3. **Search** - Use the search bar to find specific dishes
4. **Add to Cart** - Click on items to add them to your cart
5. **Checkout** - Review your cart and place your order

### For Restaurant Partners:

1. **Register** - Fill out the partner registration form
2. **Submit Details** - Provide restaurant information and documentation
3. **Wait for Approval** - Your application will be reviewed
4. **Start Accepting Orders** - Once approved, start receiving orders

---

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Internet Explorer (not supported)

---

## Contributing

Contributions are welcome! If you'd like to improve FreshBite, please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines:

- Write clean, readable code
- Follow existing code style and conventions
- Test your changes thoroughly
- Update documentation as needed
- Add comments for complex logic

---

## Known Issues

- Cart data currently stored in local storage (will be moved to backend)
- Payment integration pending
- Email verification not yet implemented
- Mobile optimization in progress

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author / Contact

**D. Udara Irunika De Zoysa**

🌟 Creative Designer | Web Developer | Cybersecurity Enthusiast 🌟

### Connect with me:

- 🌐 **Portfolio:** [https://uidd-protfilo.vercel.app/](https://uidd-protfilo.vercel.app/)
- 💼 **GitHub:** [@UdaraIrunika](https://github.com/UdaraIrunika)
- 📧 **Email:** [uiindustryprivetlimited@gmail.com](mailto:uiindustryprivetlimited@gmail.com)
- 📍 **Location:** Galewela, Sri Lanka

---

## Acknowledgments

- Thanks to all contributors and testers
- Inspired by popular food delivery platforms
- Icons and images from various open-source resources

---

⭐️ **If you like this project, please give it a star on GitHub!**

🍔 **Hungry for collaboration?** Feel free to reach out for suggestions, bug reports, or feature requests!
