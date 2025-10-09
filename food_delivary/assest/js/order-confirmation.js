// order-confirmation.js - Order Confirmation Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing confirmation page');
    initConfirmationPage();
});

function initConfirmationPage() {
    console.log('Initializing confirmation page');
    
    // Load order data from localStorage
    loadOrderData();
    
    // Initialize event listeners
    initEventListeners();
    
    // Start order status updates
    startOrderStatusUpdates();
}

function initEventListeners() {
    console.log('Initializing event listeners');
    
    // Download receipt button
    const downloadReceiptBtn = document.getElementById('downloadReceiptBtn');
    console.log('Download button found:', downloadReceiptBtn);
    
    if (downloadReceiptBtn) {
        downloadReceiptBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Download button clicked!');
            downloadReceipt();
        });
    }

    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// CORRECTED downloadReceipt function - creates visible clone for PDF generation
function downloadReceipt() {
    console.log('downloadReceipt function called');
    
    // Test if html2pdf is available
    if (typeof html2pdf === 'undefined') {
        console.error('html2pdf is not loaded');
        alert('PDF library not loaded. Please check your internet connection.');
        return;
    }
    console.log('html2pdf is available');
    
    const receiptContainer = document.getElementById('receiptContainer');
    console.log('Receipt container found:', receiptContainer);
    
    if (!receiptContainer) {
        console.error('Receipt container not found');
        return;
    }
    
    // Show loading state on button
    const downloadReceiptBtn = document.getElementById('downloadReceiptBtn');
    const originalHTML = downloadReceiptBtn.innerHTML;
    downloadReceiptBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    downloadReceiptBtn.disabled = true;
    
    try {
        console.log('Starting PDF generation...');
        
        // Create a visible clone of the receipt for PDF generation
        const receiptClone = receiptContainer.cloneNode(true);
        receiptClone.style.display = 'block';
        receiptClone.style.visibility = 'visible';
        receiptClone.style.opacity = '1';
        receiptClone.style.position = 'fixed';
        receiptClone.style.left = '0';
        receiptClone.style.top = '0';
        receiptClone.style.zIndex = '99999';
        receiptClone.style.background = 'white';
        receiptClone.style.padding = '20px';
        receiptClone.style.width = '400px';
        receiptClone.style.height = 'auto';
        receiptClone.style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';
        
        // Add to document body temporarily
        document.body.appendChild(receiptClone);
        
        // Simple PDF options
        const opt = {
            margin: 10,
            filename: `FreshBite_Receipt_${Date.now()}.pdf`,
            image: { 
                type: 'jpeg', 
                quality: 0.98 
            },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: false,
                width: 400,
                windowWidth: 400
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait' 
            }
        };
        
        console.log('Generating PDF from visible clone...');
        
        // Generate PDF from the visible clone
        html2pdf()
            .set(opt)
            .from(receiptClone)
            .save()
            .then(() => {
                console.log('PDF generated successfully');
                showNotification('Receipt downloaded successfully!', 'success');
            })
            .catch((error) => {
                console.error('PDF generation failed:', error);
                showNotification('Failed to download receipt. Please try again.', 'error');
                
                // Fallback: Try alternative method
                downloadReceiptFallback(receiptContainer);
            })
            .finally(() => {
                // Always clean up the clone
                if (receiptClone.parentNode) {
                    receiptClone.parentNode.removeChild(receiptClone);
                }
                // Restore button state
                downloadReceiptBtn.innerHTML = originalHTML;
                downloadReceiptBtn.disabled = false;
                console.log('PDF generation process completed');
            });
            
    } catch (error) {
        console.error('Error in downloadReceipt:', error);
        // Restore button state on error
        downloadReceiptBtn.innerHTML = originalHTML;
        downloadReceiptBtn.disabled = false;
        showNotification('Error generating receipt. Please try again.', 'error');
    }
}

// Fallback method using html2canvas only
function downloadReceiptFallback(receiptContainer) {
    console.log('Trying fallback method with html2canvas...');
    
    const receiptClone = receiptContainer.cloneNode(true);
    receiptClone.style.display = 'block';
    receiptClone.style.visibility = 'visible';
    receiptClone.style.opacity = '1';
    receiptClone.style.position = 'fixed';
    receiptClone.style.left = '0';
    receiptClone.style.top = '0';
    receiptClone.style.zIndex = '99999';
    receiptClone.style.background = 'white';
    receiptClone.style.padding = '20px';
    receiptClone.style.width = '400px';
    
    document.body.appendChild(receiptClone);
    
    html2canvas(receiptClone, {
        scale: 2,
        useCORS: true,
        logging: true,
        width: 400,
        windowWidth: 400
    }).then(canvas => {
        // Convert canvas to image data URL
        const imageData = canvas.toDataURL('image/png');
        
        // Create download link
        const link = document.createElement('a');
        link.download = `FreshBite_Receipt_${Date.now()}.png`;
        link.href = imageData;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Receipt image downloaded as PNG!', 'success');
    }).catch(error => {
        console.error('Error creating image:', error);
        showNotification('Error downloading receipt.', 'error');
        
        // Final fallback: open in new window for printing
        openReceiptInWindow(receiptContainer);
    }).finally(() => {
        // Clean up
        if (receiptClone.parentNode) {
            receiptClone.parentNode.removeChild(receiptClone);
        }
    });
}

// Final fallback: open receipt in new window
function openReceiptInWindow(receiptContainer) {
    console.log('Opening receipt in new window...');
    
    const receiptWindow = window.open('', '_blank');
    const receiptContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>FreshBite Receipt</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    padding: 20px; 
                    max-width: 400px;
                    margin: 0 auto;
                }
                .receipt-header { 
                    text-align: center; 
                    margin-bottom: 20px;
                    border-bottom: 2px solid #333;
                    padding-bottom: 10px;
                }
                .receipt-body { 
                    margin: 20px 0; 
                }
                .receipt-footer {
                    margin-top: 20px;
                    padding-top: 10px;
                    border-top: 1px solid #ccc;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                }
                .item-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #eee;
                }
                .total-row {
                    display: flex;
                    justify-content: space-between;
                    font-weight: bold;
                    margin-top: 10px;
                    padding-top: 10px;
                    border-top: 2px solid #333;
                }
            </style>
        </head>
        <body>
            ${receiptContainer.innerHTML}
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(function() {
                        window.close();
                    }, 1000);
                };
            <\/script>
        </body>
        </html>
    `;
    
    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
}

function loadOrderData() {
    const storedOrder = localStorage.getItem('freshbiteOrder');
    
    if (storedOrder) {
        const order = JSON.parse(storedOrder);
        populateOrderDetails(order);
    } else {
        // Use sample data for testing
        console.log('No order data found, using sample data');
        const sampleOrder = {
            paymentMethod: 'card',
            deliveryAddress: '123 Main Street, Apt 4B, New York, NY 10001',
            deliveryInstructions: 'Leave at door, ring bell',
            contactNumber: '(555) 123-4567',
            subtotal: 43.96,
            deliveryFee: 2.99,
            serviceFee: 1.50,
            tax: 3.52,
            total: 51.97,
            items: [
                {
                    title: 'Margherita Pizza',
                    price: 12.99,
                    quantity: 2,
                    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=100'
                },
                {
                    title: 'Caesar Salad',
                    price: 8.99,
                    quantity: 1,
                    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100'
                },
                {
                    title: 'Chocolate Brownie',
                    price: 6.99,
                    quantity: 1,
                    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=100'
                }
            ]
        };
        populateOrderDetails(sampleOrder);
    }
}

function populateOrderDetails(order) {
    console.log('Populating order details:', order);
    
    // Generate random order number
    const orderNumber = 'FB' + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('orderNumber').textContent = '#' + orderNumber;
    document.getElementById('receiptOrderNumber').textContent = '#' + orderNumber;
    
    // Update dates
    const now = new Date();
    document.getElementById('orderDate').textContent = formatDate(now);
    document.getElementById('receiptOrderDate').textContent = formatDate(now);
    
    // Update payment method
    document.getElementById('paymentMethod').textContent = formatPaymentMethod(order.paymentMethod);
    document.getElementById('receiptPaymentMethod').textContent = formatPaymentMethod(order.paymentMethod);
    
    // Update totals
    document.getElementById('orderTotal').textContent = formatCurrency(order.total);
    document.getElementById('subtotal').textContent = formatCurrency(order.subtotal);
    document.getElementById('deliveryFee').textContent = formatCurrency(order.deliveryFee);
    document.getElementById('serviceFee').textContent = formatCurrency(order.serviceFee);
    document.getElementById('taxAmount').textContent = formatCurrency(order.tax);
    document.getElementById('finalTotal').textContent = formatCurrency(order.total);
    
    // Update receipt totals
    document.getElementById('receiptSubtotal').textContent = formatCurrency(order.subtotal);
    document.getElementById('receiptDeliveryFee').textContent = formatCurrency(order.deliveryFee);
    document.getElementById('receiptServiceFee').textContent = formatCurrency(order.serviceFee);
    document.getElementById('receiptTax').textContent = formatCurrency(order.tax);
    document.getElementById('receiptTotal').textContent = formatCurrency(order.total);
    
    // Update delivery information
    document.getElementById('deliveryAddress').textContent = order.deliveryAddress;
    document.getElementById('receiptDeliveryAddress').textContent = order.deliveryAddress;
    document.getElementById('deliveryInstructions').textContent = order.deliveryInstructions || 'No special instructions';
    document.getElementById('contactNumber').textContent = order.contactNumber;
    
    // Populate order items
    populateOrderItems(order.items);
    
    // Store order number for receipt
    localStorage.setItem('currentOrderNumber', orderNumber);
}

function populateOrderItems(items) {
    const orderItemsContainer = document.getElementById('orderItemsList');
    const receiptItemsContainer = document.getElementById('receiptItemsList');
    
    if (!orderItemsContainer || !items || items.length === 0) {
        return;
    }
    
    // Clear existing items
    orderItemsContainer.innerHTML = '';
    receiptItemsContainer.innerHTML = '';
    
    let itemCount = 0;
    
    items.forEach(item => {
        itemCount += item.quantity;
        
        // Populate order items for main display
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="item-info">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'">
                </div>
                <div class="item-details">
                    <h4>${item.title}</h4>
                    <div class="item-options">Qty: ${item.quantity}</div>
                </div>
            </div>
            <div class="item-total">
                ${formatCurrency(item.price * item.quantity)}
            </div>
        `;
        orderItemsContainer.appendChild(orderItem);
        
        // Populate receipt items
        const receiptItem = document.createElement('div');
        receiptItem.style.display = 'flex';
        receiptItem.style.justifyContent = 'space-between';
        receiptItem.style.marginBottom = '10px';
        receiptItem.style.paddingBottom = '10px';
        receiptItem.style.borderBottom = '1px solid #f5f5f5';
        receiptItem.innerHTML = `
            <div>
                <div style="font-weight: bold;">${item.title}</div>
                <div style="font-size: 12px; color: #666;">Qty: ${item.quantity} × ${formatCurrency(item.price)}</div>
            </div>
            <div>${formatCurrency(item.price * item.quantity)}</div>
        `;
        receiptItemsContainer.appendChild(receiptItem);
    });
}

function showNotification(message, type = 'info') {
    // Remove any existing notifications first
    const existingNotifications = document.querySelectorAll('.confirmation-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `confirmation-notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#confirmation-notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'confirmation-notification-styles';
        styles.textContent = `
            .confirmation-notification {
                position: fixed;
                bottom: 20px;
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
            .confirmation-notification.success { border-left-color: #4ecdc4; }
            .confirmation-notification.error { border-left-color: #ff6b6b; }
            .confirmation-notification.info { border-left-color: #ffe66d; }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatCurrency(amount) {
    return '$' + parseFloat(amount).toFixed(2);
}

function formatPaymentMethod(method) {
    switch(method) {
        case 'card':
            return 'Credit Card';
        case 'paypal':
            return 'PayPal';
        default:
            return method;
    }
}

function startOrderStatusUpdates() {
    // Simulate order status updates
    setTimeout(() => {
        updateOrderStatus('preparing');
    }, 10000); // 10 seconds
    
    setTimeout(() => {
        updateOrderStatus('on-the-way');
    }, 600000); // 10 minutes
    
    setTimeout(() => {
        updateOrderStatus('delivered');
    }, 1800000); // 30 minutes
}

function updateOrderStatus(status) {
    const statusSteps = document.querySelectorAll('.status-step');
    
    switch(status) {
        case 'preparing':
            statusSteps[1].classList.add('completed');
            statusSteps[2].classList.add('active');
            document.querySelector('.status-step:nth-child(3) .step-time').textContent = 'Estimated: 20-25 min';
            break;
            
        case 'on-the-way':
            statusSteps[2].classList.add('completed');
            statusSteps[3].classList.add('active');
            document.querySelector('.status-step:nth-child(5) .step-time').textContent = 'Estimated: 10-15 min';
            
            // Update delivery time display
            document.getElementById('deliveryTime').textContent = '10-15 minutes';
            break;
            
        case 'delivered':
            statusSteps[3].classList.add('completed');
            document.querySelector('.status-step:nth-child(5) .step-time').textContent = 'Delivered';
            
            // Show delivery completion message
            showNotification('Your order has been delivered! Enjoy your meal!', 'success');
            break;
    }
}

// Add animation delay for staggered appearance
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.4}s`;
    });
});
