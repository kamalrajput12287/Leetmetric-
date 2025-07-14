document.addEventListener('DOMContentLoaded', () => {
  // Mock data - in a real application, this would come from your backend
  const mockLeaderboardData = [
    { username: "code_master", total: 845, easy: 245, medium: 450, hard: 150, acceptance: 85.7 },
    { username: "algo_ninja", total: 789, easy: 230, medium: 420, hard: 139, acceptance: 82.3 },
    { username: "ds_expert", total: 756, easy: 220, medium: 410, hard: 126, acceptance: 79.5 },
    { username: "leet_champ", total: 712, easy: 210, medium: 390, hard: 112, acceptance: 81.2 },
    { username: "python_pro", total: 689, easy: 205, medium: 375, hard: 109, acceptance: 77.8 },
    { username: "java_guru", total: 645, easy: 195, medium: 350, hard: 100, acceptance: 75.4 },
    { username: "csharp_dev", total: 612, easy: 185, medium: 335, hard: 92, acceptance: 76.9 },
    { username: "js_wizard", total: 589, easy: 180, medium: 320, hard: 89, acceptance: 74.1 },
    { username: "swift_coder", total: 542, easy: 170, medium: 295, hard: 77, acceptance: 72.5 },
    { username: "kotlin_dev", total: 498, easy: 160, medium: 270, hard: 68, acceptance: 71.2 },
    { username: "ruby_master", total: 456, easy: 150, medium: 250, hard: 56, acceptance: 69.8 },
    { username: "php_expert", total: 423, easy: 145, medium: 230, hard: 48, acceptance: 68.3 },
    { username: "go_dev", total: 398, easy: 140, medium: 215, hard: 43, acceptance: 67.1 },
    { username: "rustacean", total: 367, easy: 135, medium: 195, hard: 37, acceptance: 65.7 },
    { username: "scala_dev", total: 345, easy: 130, medium: 180, hard: 35, acceptance: 64.4 }
  ];

  // DOM elements
  const leaderboardBody = document.getElementById('leaderboard-body');
  const sortBySelect = document.getElementById('sort-by');
  const searchInput = document.getElementById('search-user');
  const prevPageBtn = document.getElementById('prev-page');
  const nextPageBtn = document.getElementById('next-page');
  const pageInfo = document.getElementById('page-info');

  // Pagination variables
  const itemsPerPage = 10;
  let currentPage = 1;
  let filteredData = [...mockLeaderboardData];
  let sortBy = 'total';

  // Initialize the leaderboard
  function initLeaderboard() {
    sortLeaderboard();
    renderLeaderboard();
    setupEventListeners();
    updatePaginationControls();
  }

  // Set up event listeners
  function setupEventListeners() {
    sortBySelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      sortLeaderboard();
      renderLeaderboard();
    });

    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      filterLeaderboard(searchTerm);
      renderLeaderboard();
      updatePaginationControls();
    });

    prevPageBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderLeaderboard();
        updatePaginationControls();
      }
    });

    nextPageBtn.addEventListener('click', () => {
      const totalPages = Math.ceil(filteredData.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderLeaderboard();
        updatePaginationControls();
      }
    });
  }

  // Filter leaderboard based on search term
  function filterLeaderboard(searchTerm) {
    if (searchTerm === '') {
      filteredData = [...mockLeaderboardData];
    } else {
      filteredData = mockLeaderboardData.filter(user => 
        user.username.toLowerCase().includes(searchTerm))
    }
    currentPage = 1; // Reset to first page after filtering
    sortLeaderboard();
  }

  // Sort leaderboard
  function sortLeaderboard() {
    filteredData.sort((a, b) => b[sortBy] - a[sortBy]);
  }

  // Render leaderboard
  function renderLeaderboard() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);

    leaderboardBody.innerHTML = '';

    pageData.forEach((user, index) => {
      const rank = startIndex + index + 1;
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>
          <div class="rank-badge rank-${rank < 4 ? rank : 'other'}">
            ${rank}
          </div>
        </td>
        <td>${user.username}</td>
        <td><strong>${user.total}</strong></td>
        <td class="easy-badge">${user.easy}</td>
        <td class="medium-badge">${user.medium}</td>
        <td class="hard-badge">${user.hard}</td>
        <td>${user.acceptance}%</td>
      `;
      
      leaderboardBody.appendChild(row);
    });
  }

  // Update pagination controls
  function updatePaginationControls() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
  }

  // Initialize the leaderboard
  initLeaderboard();
});