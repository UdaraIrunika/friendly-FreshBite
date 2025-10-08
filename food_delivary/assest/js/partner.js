        // FAQ Accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                faqItem.classList.toggle('active');
            });
        });

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

        // Partner Form Submission
        document.getElementById('partnerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const restaurantName = document.getElementById('restaurantName').value;
            const contactName = document.getElementById('contactName').value;
            const contactEmail = document.getElementById('contactEmail').value;
            const partnershipType = document.getElementById('partnershipType').value;
            
            // In a real application, you would send this data to a server
            // For this example, we'll just show a success message
            alert(`Thank you, ${contactName}! Your partnership application for ${restaurantName} has been submitted successfully. Our team will review your application and contact you at ${contactEmail} within 3 business days.`);
            
            // Reset the form
            this.reset();
        });

        // Plan selection buttons
        document.querySelectorAll('.type-card .btn').forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.type-card');
                const planName = card.querySelector('h3').textContent;
                
                if (planName === 'Enterprise Plan') {
                    // Scroll to form and select enterprise option
                    document.getElementById('partnershipType').value = 'enterprise';
                    document.querySelector('.partner-form-section').scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                    // Show plan selection message
                    alert(`You've selected the ${planName}. Please fill out the partnership application form to get started.`);
                    
                    // Scroll to form
                    document.querySelector('.partner-form-section').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // CTA buttons
        document.querySelector('.cta-section .btn-white').addEventListener('click', function() {
            document.querySelector('.partner-form-section').scrollIntoView({
                behavior: 'smooth'
            });
        });

        document.querySelector('.cta-section .btn-outline-white').addEventListener('click', function() {
            alert("Contacting our partnership team... In a real implementation, this would open a contact form or redirect to a contact page.");
        });

        // Order Now buttons
        document.querySelectorAll('.btn-primary').forEach(button => {
            if (button.textContent === 'Order Now') {
                button.addEventListener('click', function() {
                    window.location.href = 'menu.html';
                });
            }
        });

        // Form validation enhancement
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '' && this.hasAttribute('required')) {
                    this.style.borderColor = '#ff6b6b';
                } else {
                    this.style.borderColor = '#ddd';
                }
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });