
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
