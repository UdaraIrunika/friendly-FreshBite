// checkout.js - Complete Checkout Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize checkout page
    initCheckoutPage();
});

function initCheckoutPage() {
    // Load cart data from localStorage
    loadCartData();
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize order totals
    updateOrderTotal();
}

function loadCartData() {
    const storedCart = localStorage.getItem('freshbiteCart');
    
    if (storedCart) {
        const cart = JSON.parse(storedCart);
        populateCheckoutPage(cart);
    } else {
        // If no cart data found, redirect back to menu
        alert('No items in cart. Redirecting to menu...');
        window.location.href = 'menu.html';
    }
}

function populateCheckoutPage(cart) {
    const orderItemsContainer = document.querySelector('.order-items');
    const sidebarTotalsContainer = document.querySelector('.sidebar-totals');
    
    if (!orderItemsContainer || cart.length === 0) {
        return;
    }
    
    // Clear existing items
    orderItemsContainer.innerHTML = '';
    
    // Calculate totals
    let subtotal = 0;
    let itemCount = 0;
    
    // Populate order items
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        itemCount += item.quantity;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="item-details">
                <div class="item-name">${item.title}</div>
                <div class="item-options">Regular</div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn">-</button>
                <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                <button class="quantity-btn">+</button>
            </div>
        `;
        
        orderItemsContainer.appendChild(orderItem);
    });
    
    // Update subtotal in both main and sidebar
    updateSubtotal(subtotal);
    
    // Update item count in sidebar
    const itemCountElement = document.querySelector('.sidebar-total-row:first-child span:first-child');
    if (itemCountElement) {
        itemCountElement.textContent = `Items (${itemCount})`;
    }
    
    // Update quantity event listeners for dynamically added items
    initQuantityButtons();
}

function updateSubtotal(subtotal) {
    // Update main order summary
    const mainSubtotal = document.querySelector('.total-row:first-child span:last-child');
    const sidebarSubtotal = document.querySelector('.sidebar-total-row:first-child span:last-child');
    
    if (mainSubtotal) mainSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (sidebarSubtotal) sidebarSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    
    // Store subtotal for calculations
    const orderSummary = document.querySelector('.order-summary');
    if (orderSummary) {
        orderSummary.dataset.subtotal = subtotal;
    }
}

function initEventListeners() {
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                
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
                }
            }
        });
    }

    // Delivery option selection
    document.querySelectorAll('.delivery-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.delivery-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            
            // Update delivery fee in totals
            const deliveryPrice = parseFloat(this.querySelector('.option-price').textContent.replace('$', ''));
            updateDeliveryFee(deliveryPrice);
        });
    });

    // Payment method selection
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', function() {
            document.querySelectorAll('.payment-method').forEach(m => {
                m.classList.remove('selected');
            });
            this.classList.add('selected');
            
            const methodType = this.getAttribute('data-method');
            const cardForm = document.querySelector('.card-form');
            
            if (methodType === 'card') {
                if (cardForm) cardForm.classList.add('active');
            } else {
                if (cardForm) cardForm.classList.remove('active');
            }
        });
    });

    // Promo code application
    const applyPromoBtn = document.querySelector('.apply-promo');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', applyPromoCode);
    }

    // Place order button
    const placeOrderBtn = document.querySelector('.place-order-btn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', placeOrder);
    }

    // Form validation
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Real-time validation for card fields
        if (input.id === 'cardNumber' || input.id === 'expiryDate' || input.id === 'cvv') {
            input.addEventListener('input', function() {
                formatCardField(this);
            });
        }
    });

    // Prevent form submission if form exists
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            placeOrder();
        });
    }
}

function initQuantityButtons() {
    // Quantity adjustment
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            
            if (this.textContent === '+' && value < 99) {
                value++;
            } else if (this.textContent === '-' && value > 1) {
                value--;
            }
            
            input.value = value;
            
            // Update cart in localStorage
            updateCartQuantity(this.closest('.order-item'), value);
            updateOrderTotal();
        });
    });
}

function updateCartQuantity(orderItem, newQuantity) {
    const storedCart = localStorage.getItem('freshbiteCart');
    if (!storedCart) return;
    
    const cart = JSON.parse(storedCart);
    const itemIndex = Array.from(document.querySelectorAll('.order-item')).indexOf(orderItem);
    
    if (itemIndex !== -1 && cart[itemIndex]) {
        cart[itemIndex].quantity = newQuantity;
        localStorage.setItem('freshbiteCart', JSON.stringify(cart));
        
        // Update subtotal
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        updateSubtotal(subtotal);
    }
}

function updateDeliveryFee(deliveryPrice) {
    // Update main order summary
    const deliveryRows = document.querySelectorAll('.total-row');
    deliveryRows.forEach(row => {
        if (row.textContent.includes('Delivery Fee')) {
            row.querySelector('span:last-child').textContent = `$${deliveryPrice.toFixed(2)}`;
        }
    });
    
    // Update sidebar delivery fee
    const sidebarDelivery = document.querySelector('.sidebar-total-row:nth-child(2) span:last-child');
    if (sidebarDelivery) {
        sidebarDelivery.textContent = `$${deliveryPrice.toFixed(2)}`;
    }
    
    updateOrderTotal();
}

function applyPromoCode() {
    const promoInput = document.querySelector('.promo-input');
    const promoCode = promoInput.value.trim();
    
    if (promoCode === '') {
        showNotification('Please enter a promo code', 'error');
        return;
    }
    
    // Valid promo codes
    const validPromoCodes = {
        'FRESH10': 0.1,    // 10% off
        'WELCOME15': 0.15, // 15% off
        'FIRSTORDER': 0.2  // 20% off
    };
    
    const discountRate = validPromoCodes[promoCode.toUpperCase()];
    
    if (discountRate) {
        showNotification(`Promo code applied! ${discountRate * 100}% discount has been added to your order.`, 'success');
        applyDiscount(discountRate, promoCode.toUpperCase());
    } else {
        showNotification('Invalid promo code. Please try again.', 'error');
    }
    
    promoInput.value = '';
}

function applyDiscount(discountRate, promoCode) {
    const orderSummary = document.querySelector('.order-summary');
    if (!orderSummary) return;
    
    const subtotal = parseFloat(orderSummary.dataset.subtotal) || 0;
    const discount = subtotal * discountRate;
    const newSubtotal = subtotal - discount;
    
    // Update subtotal display
    updateSubtotal(newSubtotal);
    
    // Add or update discount row
    let discountRow = document.querySelector('.total-row.discount');
    if (!discountRow) {
        discountRow = document.createElement('div');
        discountRow.className = 'total-row discount';
        
        const subtotalRow = document.querySelector('.total-row:first-child');
        if (subtotalRow && subtotalRow.parentNode) {
            subtotalRow.parentNode.insertBefore(discountRow, subtotalRow.nextSibling);
        }
    }
    
    discountRow.innerHTML = `
        <span>Discount (${promoCode})</span>
        <span>-$${discount.toFixed(2)}</span>
    `;
    
    // Store discount info for order processing
    orderSummary.dataset.discount = discount;
    orderSummary.dataset.promoCode = promoCode;
    
    updateOrderTotal();
}

function updateOrderTotal() {
    const orderSummary = document.querySelector('.order-summary');
    if (!orderSummary) return;
    
    const subtotal = parseFloat(orderSummary.dataset.subtotal) || 0;
    const discount = parseFloat(orderSummary.dataset.discount) || 0;
    
    // Get delivery fee
    const selectedDelivery = document.querySelector('.delivery-option.selected');
    const deliveryFee = selectedDelivery ? 
        parseFloat(selectedDelivery.querySelector('.option-price').textContent.replace('$', '')) : 2.99;
    
    // Fixed service fee
    const serviceFee = 1.50;
    
    // Calculate tax (8% on subtotal after discount)
    const taxRate = 0.08;
    const tax = (subtotal - discount) * taxRate;
    
    // Calculate total
    const total = (subtotal - discount) + deliveryFee + serviceFee + tax;
    
    // Update main order totals
    updateTotalRow('Service Fee', `$${serviceFee.toFixed(2)}`);
    updateTotalRow('Tax', `$${tax.toFixed(2)}`);
    updateTotalRow('Total', `$${total.toFixed(2)}`, true);
    
    // Update sidebar totals
    updateSidebarTotal('Service Fee', serviceFee);
    updateSidebarTotal('Tax', tax);
    updateSidebarTotal('Total', total, true);
}

function updateTotalRow(label, value, isFinal = false) {
    const rows = document.querySelectorAll('.total-row');
    let found = false;
    
    rows.forEach(row => {
        if (row.textContent.includes(label) && !row.classList.contains('discount')) {
            const lastSpan = row.querySelector('span:last-child');
            if (lastSpan) lastSpan.textContent = value;
            found = true;
        }
    });
    
    if (!found && isFinal) {
        // Update final total row
        const finalRow = document.querySelector('.total-row.final');
        if (finalRow) {
            const lastSpan = finalRow.querySelector('span:last-child');
            if (lastSpan) lastSpan.textContent = value;
        }
    }
}

function updateSidebarTotal(label, value, isFinal = false) {
    const rows = document.querySelectorAll('.sidebar-total-row');
    let targetIndex = -1;
    
    switch(label) {
        case 'Service Fee':
            targetIndex = 2; // Third row (0-indexed, but we skip the first which is items)
            break;
        case 'Tax':
            targetIndex = 3;
            break;
        case 'Total':
            targetIndex = 4;
            break;
    }
    
    if (targetIndex !== -1 && rows[targetIndex]) {
        const lastSpan = rows[targetIndex].querySelector('span:last-child');
        if (lastSpan) lastSpan.textContent = `$${value.toFixed(2)}`;
    }
}

function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && value === '') {
        field.style.borderColor = '#ff6b6b';
        return false;
    }
    
    // Specific validations
    switch(field.id) {
        case 'cardNumber':
            if (!isValidCardNumber(value)) {
                field.style.borderColor = '#ff6b6b';
                return false;
            }
            break;
        case 'expiryDate':
            if (!isValidExpiryDate(value)) {
                field.style.borderColor = '#ff6b6b';
                return false;
            }
            break;
        case 'cvv':
            if (!isValidCVV(value)) {
                field.style.borderColor = '#ff6b6b';
                return false;
            }
            break;
        case 'contactNumber':
            if (!isValidPhoneNumber(value)) {
                field.style.borderColor = '#ff6b6b';
                return false;
            }
            break;
    }
    
    field.style.borderColor = '#4ecdc4';
    return true;
}

function formatCardField(field) {
    switch(field.id) {
        case 'cardNumber':
            field.value = field.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
            break;
        case 'expiryDate':
            field.value = field.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
            break;
        case 'cvv':
            field.value = field.value.replace(/\D/g, '').substring(0, 4);
            break;
    }
}

function isValidCardNumber(number) {
    const cleaned = number.replace(/\s/g, '');
    return /^\d{16}$/.test(cleaned);
}

function isValidExpiryDate(date) {
    if (!/^\d{2}\/\d{2}$/.test(date)) return false;
    
    const [month, year] = date.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    if (month < 1 || month > 12) return false;
    if (year < currentYear || (year === currentYear && month < currentMonth)) return false;
    
    return true;
}

function isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

function isValidPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
}

function createOrderData() {
    const orderSummary = document.querySelector('.order-summary');
    const cart = JSON.parse(localStorage.getItem('freshbiteCart') || '[]');
    const selectedDelivery = document.querySelector('.delivery-option.selected');
    const selectedPayment = document.querySelector('.payment-method.selected');
    
    // Calculate totals
    const subtotal = parseFloat(orderSummary?.dataset.subtotal) || cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = parseFloat(orderSummary?.dataset.discount) || 0;
    const deliveryFee = selectedDelivery ? 
        parseFloat(selectedDelivery.querySelector('.option-price').textContent.replace('$', '')) : 2.99;
    const serviceFee = 1.50;
    const taxRate = 0.08;
    const tax = (subtotal - discount) * taxRate;
    const total = (subtotal - discount) + deliveryFee + serviceFee + tax;
    
    return {
        items: cart,
        subtotal: subtotal,
        discount: discount,
        promoCode: orderSummary?.dataset.promoCode || '',
        deliveryFee: deliveryFee,
        serviceFee: serviceFee,
        tax: tax,
        total: total,
        deliveryAddress: document.getElementById('deliveryAddress')?.value || '',
        deliveryInstructions: document.getElementById('deliveryInstructions')?.value || '',
        contactNumber: document.getElementById('contactNumber')?.value || '',
        paymentMethod: selectedPayment?.dataset.method || 'card',
        orderTime: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes from now
    };
}

function placeOrder() {
    // Validate required fields
    const requiredFields = document.querySelectorAll('.form-control[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields correctly', 'error');
        return;
    }
    
    // Validate payment method specific fields
    const selectedPayment = document.querySelector('.payment-method.selected');
    if (!selectedPayment) {
        showNotification('Please select a payment method', 'error');
        return;
    }
    
    if (selectedPayment.dataset.method === 'card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardholderName = document.getElementById('cardholderName').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        
        if (!cardNumber || !cardholderName || !expiryDate || !cvv) {
            showNotification('Please fill in all card details', 'error');
            return;
        }
        
        if (!isValidCardNumber(cardNumber) || !isValidExpiryDate(expiryDate) || !isValidCVV(cvv)) {
            showNotification('Please check your card details', 'error');
            return;
        }
    }
    
    // Show loading state
    const placeOrderBtn = document.querySelector('.place-order-btn');
    const originalText = placeOrderBtn.innerHTML;
    placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    placeOrderBtn.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
        // Create order summary
        const orderData = createOrderData();
        
        // Store order data for confirmation page
        localStorage.setItem('freshbiteOrder', JSON.stringify(orderData));
        
        // Clear cart
        localStorage.removeItem('freshbiteCart');
        
        // Redirect to order confirmation
        window.location.href = 'order-confirmation.html';
    }, 2000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `checkout-notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#checkout-notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'checkout-notification-styles';
        styles.textContent = `
            .checkout-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 10px;
                border-left: 4px solid #4ecdc4;
                animation: slideInRight 0.3s ease;
            }
            .checkout-notification.success { border-left-color: #4ecdc4; }
            .checkout-notification.error { border-left-color: #ff6b6b; }
            .checkout-notification.info { border-left-color: #ffe66d; }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}