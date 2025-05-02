document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const togglePasswordIcons = document.querySelectorAll(".toggle-password");
    const strengthDots = document.querySelectorAll(".strength-dot");
    const form = document.querySelector("form");
    const signupBtn = document.getElementById("signup-btn");

    // Get email from URL
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    
    if (!email) {
        showError(form, "Email parameter is missing from URL");
        return;
    }

    // Toggle password visibility
    togglePasswordIcons.forEach((icon) => {
        icon.addEventListener("click", function () {
            const input = this.parentElement.querySelector("input");
            if (input.type === "password") {
                input.type = "text";
                this.classList.remove("fa-eye-slash");
                this.classList.add("fa-eye");
            } else {
                input.type = "password";
                this.classList.remove("fa-eye");
                this.classList.add("fa-eye-slash");
            }
        });
    });

    // Password strength indicator
    passwordInput.addEventListener("input", function () {
        const password = this.value;
        let strength = 0;

        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        strengthDots.forEach((dot, index) => {
            dot.style.backgroundColor = index < strength ? "#4CAF50" : "#ddd";
        });
    });

    // Form submission
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const termsChecked = document.getElementById("terms").checked;

        // Clear previous errors
        clearErrors();

        // Validate form
        let isValid = true;

        if (password !== confirmPassword) {
            showError(confirmPasswordInput, "Passwords do not match");
            isValid = false;
        }

        if (password.length < 8) {
            showError(passwordInput, "Password must be at least 8 characters");
            isValid = false;
        }

        if (!termsChecked) {
            showError(document.getElementById("terms").parentElement, "You must agree to the terms");
            isValid = false;
        }

        if (!isValid) return;

        // Disable button during submission
        signupBtn.disabled = true;
        signupBtn.textContent = "Processing...";

        try {
            const response = await fetch("/api/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    newPassword: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to reset password");
            }

            const data = await response.json();

            if (data.success) {
                showSuccess(data.message || "Password reset successfully!");
                setTimeout(() => {
                    window.location.href = "signin.html";
                }, 3000);
            } else {
                throw new Error(data.message || "Password reset failed");
            }
        } catch (error) {
            showError(signupBtn.parentElement, error.message);
            console.error("Error:", error);
        } finally {
            signupBtn.disabled = false;
            signupBtn.textContent = "Confirm";
        }
    });

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.success-message').forEach(el => el.remove());
    }

    function showError(element, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.marginTop = '5px';
        errorDiv.style.fontSize = '0.8em';
        element.parentNode.insertBefore(errorDiv, element.nextSibling);
    }

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.color = 'green';
        successDiv.style.margin = '10px 0';
        form.insertBefore(successDiv, form.firstChild);
    }
});