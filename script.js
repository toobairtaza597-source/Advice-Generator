// script.js - Fetch random advice from API

// Get DOM elements
const adviceText = document.getElementById('advice-text');
const getAdviceBtn = document.getElementById('get-advice-btn');
const loadingIndicator = document.getElementById('loading');

// API endpoint (using Advice Slip API)
const API_URL = 'https://api.adviceslip.com/advice';

// Function to fetch random advice
async function fetchRandomAdvice() {
  // Show loading, hide previous advice text
  loadingIndicator.style.display = 'block';
  adviceText.style.display = 'none';
  adviceText.textContent = ''; // Clear previous text
  
  // Disable button while fetching
  getAdviceBtn.disabled = true;
  getAdviceBtn.textContent = 'Loading...';

  try {
    // Fetch from API with cache-busting parameter
    const response = await fetch(`${API_URL}?t=${Date.now()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const advice = data.slip.advice;
    
    // Display the advice
    adviceText.textContent = `💡 ${advice}`;
    
  } catch (error) {
    console.error('Error fetching advice:', error);
    adviceText.textContent = '⚠️ Oops! Could not fetch advice. Please try again.';
  } finally {
    // Hide loading, show advice text
    loadingIndicator.style.display = 'none';
    adviceText.style.display = 'block';
    
    // Re-enable button
    getAdviceBtn.disabled = false;
    getAdviceBtn.textContent = 'Get Advice';
  }
}

// Add event listener to button
getAdviceBtn.addEventListener('click', fetchRandomAdvice);

// Optional: Load a random advice automatically when page loads
window.addEventListener('DOMContentLoaded', () => {
  fetchRandomAdvice();
});