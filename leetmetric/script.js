document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
  }
});

async function handleSearch() {
  const username = document.getElementById('user-input').value.trim();
  if (!validateUsername(username)) return;

  try {
    // Show loading state
    const searchBtn = document.getElementById('search-btn');
    searchBtn.textContent = 'Searching...';
    searchBtn.disabled = true;

    const response = await fetch(`/api/${username}`);
    if (!response.ok) throw new Error('User not found');
    
    const data = await response.json();
    displayData(data);
  } catch (error) {
    showError(error.message);
  } finally {
    // Reset button state
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
      searchBtn.textContent = 'Analyze';
      searchBtn.disabled = false;
    }
  }
}

function validateUsername(username) {
  const regex = /^[a-zA-Z0-9_-]{1,15}$/;
  if (!regex.test(username)) {
    alert('Invalid username! Use only letters, numbers, - or _ (max 15 chars)');
    return false;
  }
  return true;
}

function displayData(data) {
  // Check if the data is valid
  if (data.status === 'error') {
    showError(data.message);
    return;
  }

  // Update progress circles
  updateProgressCircle('easy', data.easySolved, data.totalEasy);
  updateProgressCircle('medium', data.mediumSolved, data.totalMedium);
  updateProgressCircle('hard', data.hardSolved, data.totalHard);

  // Display acceptance rate
  displayAcceptanceRate(data.acceptanceRate);
}

function updateProgressCircle(difficulty, solved, total) {
  const label = document.getElementById(`${difficulty}-label`);
  const circle = document.querySelector(`.${difficulty}-progress`);

  if (label && circle) {
    label.textContent = `${solved}/${total}`;
    
    // Calculate percentage for conic gradient
    const percentage = (solved / total) * 100;
    circle.style.background = `conic-gradient(
      #41E2BA ${percentage}%, 
      rgba(40, 40, 60, 0.8) 0%
    )`;
  }
}

function displayAcceptanceRate(rate) {
  const statsContainer = document.querySelector('.stats-container');
  if (!statsContainer) return;

  // Create or update acceptance rate card
  let card = document.getElementById('acceptance-card');
  if (!card) {
    card = document.createElement('div');
    card.id = 'acceptance-card';
    card.className = 'card';
    card.innerHTML = `
      <h3>Acceptance Rate</h3>
      <p>${rate}%</p>
    `;
    statsContainer.appendChild(card);
  } else {
    card.querySelector('p').textContent = `${rate}%`;
  }
}

function showError(message) {
  const statsContainer = document.querySelector('.stats-container');
  if (statsContainer) {
    statsContainer.innerHTML = `<div class="error">${message}</div>`;
  }
}