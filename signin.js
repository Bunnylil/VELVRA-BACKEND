document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const signinBtn = document.getElementById("signup-btn");

  // Check if user is already logged in (optional)
  const userData = localStorage.getItem("user");
  if (userData) {
    // Optional: Redirect if already logged in
    // window.location.href = "dashboard.html";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    signinBtn.disabled = true;
    signinBtn.textContent = "Signing in...";

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Basic client-side validation
    if (!email || !password) {
      showError("Please fill in all fields");
      signinBtn.disabled = false;
      signinBtn.textContent = "Sign In";
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sign in failed");
      }

      // Enhanced localStorage handling
      const userDataToStore = {
        id: data.user.id,
        fullName: data.user.fullName,
        email: data.user.email,
        // Add other relevant user data you might need
        lastLogin: new Date().toISOString()
      };

      localStorage.setItem("user", JSON.stringify(userDataToStore));
      localStorage.setItem("authToken", data.token || ""); // If using tokens

      console.log("User data stored in localStorage:", userDataToStore);

      // Redirect to dashboard or home page
      window.location.href = "dashboard.html";
    } catch (error) {
      showError(error.message);
      console.error("Sign in error:", error);
      
      // Clear invalid credentials from storage if needed
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
    } finally {
      signinBtn.disabled = false;
      signinBtn.textContent = "Sign In";
    }
  });

  function showError(message) {
    const errorContainer = document.querySelector(".password-error");
    if (!errorContainer) return;
    
    errorContainer.innerHTML = "";
    errorContainer.style.display = "block";

    const errorElement = document.createElement("div");
    errorElement.className = "error-text";
    errorElement.textContent = message;
    errorContainer.appendChild(errorElement);

    passwordInput.classList.add("error");
    emailInput.classList.add("error");
  }

  // Clear error when user starts typing
  emailInput.addEventListener("input", () => {
    emailInput.classList.remove("error");
    clearError();
  });

  passwordInput.addEventListener("input", () => {
    passwordInput.classList.remove("error");
    clearError();
  });

  function clearError() {
    const errorContainer = document.querySelector(".password-error");
    if (errorContainer) {
      errorContainer.innerHTML = "";
      errorContainer.style.display = "none";
    }
  }

  window.togglePassword = function () {
    const toggleIcon = document.querySelector(".toggle-password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleIcon.classList.replace("fa-eye-slash", "fa-eye");
    } else {
      passwordInput.type = "password";
      toggleIcon.classList.replace("fa-eye", "fa-eye-slash");
    }
  };
});