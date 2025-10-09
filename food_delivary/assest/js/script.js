// Cart functionality
let cart = [];
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const overlay = document.querySelector('.overlay');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.querySelector('.total-amount');
const checkoutBtn = document.querySelector('.checkout-btn');

// Toggle cart sidebar
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const menuItem = this.closest('.menu-item');
        const itemId = menuItem.getAttribute('data-id') || Date.now().toString();
        const itemTitle = menuItem.querySelector('.item-title').textContent;
        const itemPrice = parseFloat(menuItem.querySelector('.item-price').textContent.replace('$', ''));
        const itemImage = menuItem.querySelector('.item-image img').src;
        
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: itemId,
                title: itemTitle,
                price: itemPrice,
                image: itemImage,
                quantity: 1
            });
        }
        
        updateCart();
        
        // Show notification
        showNotification(`${itemTitle} added to cart!`);
    });
});

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message" style="text-align: center; padding: 40px 20px; color: #666;">
                <i class="fas fa-shopping-cart" style="font-size: 48px; margin-bottom: 15px; opacity: 0.5;"></i>
                <p>Your cart is empty</p>
                <p style="font-size: 14px; margin-top: 10px;">Add some delicious items from our menu</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease-quantity">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                        <button class="quantity-btn increase-quantity">+</button>
                        <button class="remove-item"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to cart item controls
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const itemId = cartItem.getAttribute('data-id');
                const item = cart.find(item => item.id === itemId);
                
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart = cart.filter(cartItem => cartItem.id !== itemId);
                }
                
                updateCart();
            });
        });
        
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const itemId = cartItem.getAttribute('data-id');
                const item = cart.find(item => item.id === itemId);
                
                item.quantity += 1;
                updateCart();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const itemId = cartItem.getAttribute('data-id');
                
                cart = cart.filter(item => item.id !== itemId);
                updateCart();
                
                showNotification('Item removed from cart');
            });
        });
    }
    
    // Update total amount
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Show/hide menu items based on filter
        document.querySelectorAll('.menu-item').forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Scroll to the appropriate category if not "all"
        if (filter !== 'all') {
            const categoryElement = document.getElementById(filter);
            if (categoryElement) {
                categoryElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Search functionality
const searchInput = document.querySelector('.menu-search input');
const searchButton = document.querySelector('.menu-search button');

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        // If search is empty, show all items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.style.display = 'block';
        });
        return;
    }
    
    document.querySelectorAll('.menu-item').forEach(item => {
        const title = item.querySelector('.item-title').textContent.toLowerCase();
        const description = item.querySelector('.item-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// Checkout functionality - UPDATED TO REDIRECT TO CHECKOUT PAGE
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Add some items before checking out.');
        return;
    }
    
    // Store cart data in localStorage to pass to checkout page
    localStorage.setItem('freshbiteCart', JSON.stringify(cart));
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--primary-color)';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    notification.style.zIndex = '1000';
    notification.style.transition = 'all 0.3s';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        navButtons.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navButtons.style.display = 'flex';
        
        // Adjust for mobile
        if (window.innerWidth <= 768) {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
            
            navButtons.style.flexDirection = 'column';
            navButtons.style.position = 'absolute';
            navButtons.style.top = '280px';
            navButtons.style.left = '0';
            navButtons.style.right = '0';
            navButtons.style.backgroundColor = 'white';
            navButtons.style.padding = '20px';
            navButtons.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
        }
    }

});

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    
    // Open mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close mobile menu
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close mobile menu when clicking outside
    mobileNav.addEventListener('click', function(e) {
        if (e.target === mobileNav) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});
