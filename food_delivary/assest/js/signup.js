        // Password visibility toggle
        document.getElementById('togglePassword').addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });

        // Confirm password visibility toggle
        document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const icon = this.querySelector('i');
            
            if (confirmPasswordInput.type === 'password') {
                confirmPasswordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                confirmPasswordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });

        // Password strength indicator
        document.getElementById('password').addEventListener('input', function() {
            const password = this.value;
            const strengthBar = document.querySelector('.password-strength-bar');
            const strengthContainer = document.getElementById('passwordStrength');
            
            // Reset requirements
            document.getElementById('lengthReq').classList.remove('met');
            document.getElementById('uppercaseReq').classList.remove('met');
            document.getElementById('lowercaseReq').classList.remove('met');
            document.getElementById('numberReq').classList.remove('met');
            
            let strength = 0;
            
            // Check password requirements
            if (password.length >= 8) {
                strength += 25;
                document.getElementById('lengthReq').classList.add('met');
            }
            
            if (/[A-Z]/.test(password)) {
                strength += 25;
                document.getElementById('uppercaseReq').classList.add('met');
            }
            
            if (/[a-z]/.test(password)) {
                strength += 25;
                document.getElementById('lowercaseReq').classList.add('met');
            }
            
            if (/[0-9]/.test(password)) {
                strength += 25;
                document.getElementById('numberReq').classList.add('met');
            }
            
            // Update strength bar
            strengthBar.style.width = strength + '%';
            
            // Update strength class
            strengthContainer.className = 'password-strength';
            if (strength <= 25) {
                strengthContainer.classList.add('weak');
            } else if (strength <= 75) {
                strengthContainer.classList.add('medium');
            } else {
                strengthContainer.classList.add('strong');
            }
        });

        // Password match validation
        document.getElementById('confirmPassword').addEventListener('input', function() {
            const password = document.getElementById('password').value;
            const confirmPassword = this.value;
            const matchIndicator = document.getElementById('passwordMatch');
            
            if (confirmPassword === '') {
                matchIndicator.style.display = 'none';
                return;
            }
            
            matchIndicator.style.display = 'block';
            
            if (password === confirmPassword) {
                matchIndicator.innerHTML = '<i class="fas fa-check" style="color: #4ecdc4;"></i> Passwords match';
                matchIndicator.style.color = '#4ecdc4';
            } else {
                matchIndicator.innerHTML = '<i class="fas fa-times" style="color: #ff6b6b;"></i> Passwords do not match';
                matchIndicator.style.color = '#ff6b6b';
            }
        });

        // Form submission
        document.getElementById('signUpForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            const newsletter = document.getElementById('newsletter').checked;
            
            // Simple validation
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!terms) {
                alert('Please agree to the Terms of Service and Privacy Policy.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Password validation
            if (password.length < 8) {
                alert('Password must be at least 8 characters long.');
                return;
            }
            
            if (!/[A-Z]/.test(password)) {
                alert('Password must contain at least one uppercase letter.');
                return;
            }
            
            if (!/[a-z]/.test(password)) {
                alert('Password must contain at least one lowercase letter.');
                return;
            }
            
            if (!/[0-9]/.test(password)) {
                alert('Password must contain at least one number.');
                return;
            }
            
            // Password match validation
            if (password !== confirmPassword) {
                alert('Passwords do not match. Please confirm your password.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this example, we'll simulate a successful registration
            simulateRegistration(firstName, lastName, email, newsletter);
        });

        // Simulate registration process
        function simulateRegistration(firstName, lastName, email, newsletter) {
            // Show loading state
            const submitBtn = document.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                let message = `Welcome to FreshBite, ${firstName}! Your account has been created successfully.`;
                if (newsletter) {
                    message += " You'll receive special offers and updates soon.";
                }
                message += " Redirecting to your dashboard...";
                
                alert(message);
                
                // In a real application, you would redirect to the dashboard
                // window.location.href = 'dashboard.html';
            }, 2000);
        }

        // Social login buttons
        document.querySelectorAll('.social-btn').forEach(button => {
            button.addEventListener('click', function() {
                const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
                
                // Show loading state
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
                this.disabled = true;
                
                // Simulate social registration process
                setTimeout(() => {
                    // Reset button
                    this.innerHTML = originalText;
                    this.disabled = false;
                    
                    // Show message
                    alert(`Connecting with ${provider}... In a real application, this would redirect to OAuth authentication.`);
                }, 1000);
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
            
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.style.borderColor = '#ddd';
                }
            });
        });

        // Terms agreement validation
        document.getElementById('terms').addEventListener('change', function() {
            if (!this.checked) {
                this.style.accentColor = '#ff6b6b';
            } else {
                this.style.accentColor = '';
            }
        });