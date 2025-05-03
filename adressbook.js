document.addEventListener("DOMContentLoaded", () => {
    const saveBtn = document.getElementById("save-btn");
  
    saveBtn.addEventListener("click", async (e) => {
      e.preventDefault();
  
      const email = JSON.parse(localStorage.getItem("user"))?.email;
      if (!email) {
        alert("You must be logged in to update address information.");
        return;
      }
  
      const countryCode = document.getElementById("countryCode").value;
      const phone = document.getElementById("phone").value;
      const city = document.getElementById("city").value;
      const region = document.getElementById("region").value;
  
      if (!countryCode || !phone || !city || !region) {
        alert("Please fill in all required fields.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5000/api/update-address", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            countryCode,
            phone,
            city,
            region,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert("Address updated successfully!");
          // Optional: update localStorage user object
          const storedUser = JSON.parse(localStorage.getItem("user"));
          storedUser.countryCode = countryCode;
          storedUser.phone = phone;
          storedUser.city = city;
          storedUser.region = region;
          localStorage.setItem("user", JSON.stringify(storedUser));
        } else {
          alert(result.message || "Failed to update address.");
        }
      } catch (err) {
        console.error("Error updating address:", err);
        alert("An error occurred. Please try again.");
      }
    });
  });
  