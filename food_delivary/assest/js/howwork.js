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

        // Order Now buttons
        document.querySelectorAll('.btn-primary, .btn-white').forEach(button => {
            if (button.textContent === 'Order Now') {
                button.addEventListener('click', function() {
                    window.location.href = 'menu.html';
                });
            }
        });

        // Delivery option selection
        document.querySelectorAll('.option-card .btn-primary').forEach(button => {
            button.addEventListener('click', function() {
                const optionCard = this.closest('.option-card');
                const optionName = optionCard.querySelector('h3').textContent;
                
                // Remove active class from all options
                document.querySelectorAll('.option-card').forEach(card => {
                    card.style.border = 'none';
                });
                
                // Add active indication to selected option
                optionCard.style.border = '2px solid var(--primary-color)';
                
                // Show confirmation message
                alert(`You've selected ${optionName}. This option will be applied to your next order.`);
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

        // Order Now buttons
        document.querySelectorAll('.btn-primary, .btn-white').forEach(button => {
            if (button.textContent === 'Order Now') {
                button.addEventListener('click', function() {
                    window.location.href = 'menu.html';
                });
            }
        });

        // Partner With Us button
        document.querySelector('.btn-outline-white').addEventListener('click', function() {
            alert("Thank you for your interest in partnering with FreshBite! Our partnership team will contact you soon.");
        });

        // Animate stats on scroll
        function animateStats() {
            const statNumbers = document.querySelectorAll('.stat-number');
            const statsSection = document.querySelector('.our-story');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        statNumbers.forEach(stat => {
                            const target = parseInt(stat.textContent);
                            let current = 0;
                            const increment = target / 50;
                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= target) {
                                    stat.textContent = target + (stat.textContent.includes('+') ? '+' : '%');
                                    clearInterval(timer);
                                } else {
                                    stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '%');
                                }
                            }, 30);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
        }
        
        // Initialize stat animation when page loads
        window.addEventListener('load', animateStats);

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