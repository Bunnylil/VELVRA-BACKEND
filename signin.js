document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const signinBtn = document.getElementById("signup-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    signinBtn.disabled = true;
    signinBtn.textContent = "Signing in...";

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

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

      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "dashboard.html";
    } catch (error) {
      showError(error.message);
      console.error("Sign in error:", error);
    } finally {
      signinBtn.disabled = false;
      signinBtn.textContent = "Sign In";
    }
  });

  function showError(message) {
    const existingError = document.querySelector(".password-error");
    if (existingError) existingError.innerHTML = "";

    const errorElement = document.createElement("div");
    errorElement.className = "error-text";
    errorElement.textContent = message;

    document.querySelector(".password-error").appendChild(errorElement);

    document.getElementById("password").classList.add("error");
  }

  window.togglePassword = function () {
    const passwordInput = document.getElementById("password");
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
