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

        // Contact Form Submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For this example, we'll just show a success message
            alert(`Thank you, ${firstName}! Your message has been sent successfully. We'll get back to you within 24 hours.`);
            
            // Reset the form
            this.reset();
        });

        // Call Now button
        document.querySelector('.btn-white').addEventListener('click', function() {
            window.location.href = 'tel:+15551234567';
        });

        // Live Chat button
        document.querySelector('.btn-outline-white').addEventListener('click', function() {
            alert("Live chat feature would open here. In a real implementation, this would connect you with a customer service representative.");
        });

        // Order Now buttons
        document.querySelectorAll('.btn-primary').forEach(button => {
            if (button.textContent === 'Order Now') {
                button.addEventListener('click', function() {
                    window.location.href = 'menu.html';
                });
            }
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