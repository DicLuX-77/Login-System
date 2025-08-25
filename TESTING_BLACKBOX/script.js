document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const rememberCheckbox = document.getElementById('remember');
    const loginBtn = document.querySelector('.login-btn');

    // Load saved credentials if "Remember me" was checked
    const savedUsername = localStorage.getItem('rememberedUsername');
    const savedPassword = localStorage.getItem('rememberedPassword');
    
    if (savedUsername && savedPassword) {
        usernameInput.value = savedUsername;
        passwordInput.value = savedPassword;
        rememberCheckbox.checked = true;
    }

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Form validation and submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        resetErrors();
        
        // Validate inputs
        let isValid = true;
        
        if (!usernameInput.value.trim()) {
            showError(usernameInput, 'Username harus diisi');
            isValid = false;
        }
        
        if (!passwordInput.value) {
            showError(passwordInput, 'Password harus diisi');
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Password minimal 6 karakter');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Show loading state
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        
        // Simulate login process (replace with actual API call)
        setTimeout(() => {
            // Save credentials if "Remember me" is checked
            if (rememberCheckbox.checked) {
                localStorage.setItem('rememberedUsername', usernameInput.value);
                localStorage.setItem('rememberedPassword', passwordInput.value);
            } else {
                localStorage.removeItem('rememberedUsername');
                localStorage.removeItem('rememberedPassword');
            }
            
            // Simulate successful login
            simulateLoginSuccess();
            
            // Reset loading state
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
        }, 2000);
    });

    // Input validation on blur
    usernameInput.addEventListener('blur', function() {
        if (!this.value.trim()) {
            showError(this, 'Username harus diisi');
        } else {
            clearError(this);
        }
    });

    passwordInput.addEventListener('blur', function() {
        if (!this.value) {
            showError(this, 'Password harus diisi');
        } else if (this.value.length < 6) {
            showError(this, 'Password minimal 6 karakter');
        } else {
            clearError(this);
        }
    });

    // Clear error on input
    usernameInput.addEventListener('input', function() {
        clearError(this);
    });

    passwordInput.addEventListener('input', function() {
        clearError(this);
    });

    // Social login buttons
    document.querySelector('.social-btn.google').addEventListener('click', function() {
        alert('Login dengan Google akan diimplementasikan');
    });

    document.querySelector('.social-btn.facebook').addEventListener('click', function() {
        alert('Login dengan Facebook akan diimplementasikan');
    });

    // Helper functions
    function showError(input, message) {
        input.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }

    function clearError(input) {
        input.classList.remove('error');
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    function resetErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        const errorInputs = document.querySelectorAll('.error');
        errorInputs.forEach(input => input.classList.remove('error'));
    }

    function simulateLoginSuccess() {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #48bb78;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span style="margin-left: 10px;">Login berhasil! Redirecting...</span>
        `;
        
        document.body.appendChild(successMessage);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            successMessage.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => successMessage.remove(), 300);
            
            // Here you would typically redirect to dashboard
            // window.location.href = '/dashboard';
            
        }, 2000);
        
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add some interactive effects
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.style.transform = 'scale(1)';
        });
    });
});
