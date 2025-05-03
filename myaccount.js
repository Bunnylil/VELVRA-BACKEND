document.addEventListener("DOMContentLoaded", async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
  
    if (!userData || !userData.email) {
      console.warn("No user data found in localStorage.");
      document.getElementById("account-loading").textContent = "No account data available.";
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userData.email}`);
      const data = await response.json();
  
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch user details");
      }
  
      const { city, phone, region } = data.user;
  
      // Hide loading spinner
      document.getElementById("account-loading").style.display = "none";
  
      // Display user data
      document.getElementById("user-fullname").textContent = data.user.fullName || "N/A";
      document.getElementById("user-email").textContent = data.user.email || "N/A";
      document.getElementById("address-name").textContent = data.user.fullName || "N/A";
      document.getElementById("address-city").textContent = city || "N/A";
      document.getElementById("address-region").textContent = region || "N/A";
      document.getElementById("address-phone").textContent = data.user.countryCode + phone || "N/A";
  
    } catch (error) {
      console.error("Error fetching user details:", error);
      document.getElementById("account-loading").textContent = "Error loading account data.";
    }
  });
  