document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("form");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const countryCode = document.getElementById("countryCode").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;
    const region = document.getElementById("region").value;
    const password = document.getElementById("password").value;
    const termsChecked = document.getElementById("terms").checked;

    if (!termsChecked) {
      alert("Please agree to the Terms and Conditions");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          countryCode,
          phone,
          city,
          region,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");

        window.location.href = "signin.html";
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration");
    }
  });

  const togglePassword = () => {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.querySelector(".toggle-password");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    } else {
      passwordInput.type = "password";
      eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    }
  };

  document
    .querySelector(".toggle-password")
    .addEventListener("click", togglePassword);

  document.getElementById("password").addEventListener("input", function () {
    const strengthDots = document.querySelectorAll(".strength-dot");
    const strengthText = document.querySelector(".strength-text");
    const password = this.value;
    let strength = 0;

    strengthDots.forEach((dot) => {
      dot.classList.remove("active");
      dot.style.backgroundColor = "";
    });
    strengthText.className = "strength-text";
    strengthText.textContent = "";

    if (password.length === 0) return;

    if (password.length > 0) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    for (let i = 0; i < strength && i < strengthDots.length; i++) {
      strengthDots[i].classList.add("active");
    }

    let strengthMessage = "";
    let strengthClass = "";

    if (strength <= 1) {
      strengthMessage = "Weak";
      strengthClass = "weak";
    } else if (strength <= 3) {
      strengthMessage = "Medium";
      strengthClass = "medium";
    } else if (strength === 4) {
      strengthMessage = "Strong";
      strengthClass = "strong";
    } else {
      strengthMessage = "Very Strong";
      strengthClass = "very-strong";
    }

    strengthText.textContent = `Password Strength: ${strengthMessage}`;
    strengthText.classList.add(strengthClass);
  });
});
