document.getElementById('reset-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const resetBtn = document.getElementById('reset-btn');
  
  if (!email) {
    alert('Please enter your email address');
    return;
  }

  
  resetBtn.disabled = true;
  resetBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
  
  try {
    const response = await fetch('http://localhost:5000/api/check-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to check email');
    }
    
    const data = await response.json();
    
    if (data.success) {
      
      window.location.href = `resetpassword.html?email=${encodeURIComponent(email)}`;
    } else {
      alert(data.message || 'Email not found. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert(`Error: ${error.message}`);
  } finally {
    // Reset button state
    resetBtn.disabled = false;
    resetBtn.textContent = 'Reset Password';
  }
});