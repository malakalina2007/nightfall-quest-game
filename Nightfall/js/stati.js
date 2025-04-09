window.searchPlayer = function() {
    const input = document.getElementById('searchPlayer');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('leaderboardTable');
    const tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        const tdUsername = tr[i].getElementsByTagName('td')[2];
        if (tdUsername) {
            const txtValue = tdUsername.textContent || tdUsername.innerText;
            tr[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? '' : 'none';
        }
    }
};

async function fetchLeaderboard() {
    let leaderboardTable = document.getElementById("leaderboardTable");
    let resultsContainer = document.getElementById("resultsContainer");
    const playerName = sessionStorage.getItem('username') || 'Guest';
    const sessionDuration = sessionStorage.getItem('sessionDuration') || '--';
   
    resultsContainer.innerHTML = `
        <h2>Results</h2>
      
        <p>Congragulations ${playerName} <br>for escaping the nightfall caves!</p>
    `;

    let sqlQuery = "SELECT id, username, session_duration FROM users WHERE session_duration IS NOT NULL ORDER BY session_duration ASC";
    dbConfig.set('query', sqlQuery);

    try {
        const response = await fetch(dbConnectorUrl, {
            method: 'POST',
            body: dbConfig
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Leaderboard Response:", result);

        if (result.error) {
            throw new Error(result.error);
        }

        leaderboardTable.innerHTML = result.data && result.data.length
            ? result.data.map((user, index) => 
                `<tr class="${user.username === playerName ? 'highlight-row' : ''}">
                    <td>${index + 1}</td>

                    <td>${user.username}</td>
                    <td>${user.session_duration} mins</td>
                </tr>`
              ).join('')
            : "<tr><td colspan='4'>No data available</td></tr>";

    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        leaderboardTable.innerHTML = "<tr><td colspan='4'>Error loading data</td></tr>";
    }
}

document.addEventListener("DOMContentLoaded", fetchLeaderboard);