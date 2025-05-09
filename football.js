// Get references to HTML elements
const clubList = document.getElementById("club-list");
const searchInput = document.getElementById("search");
const clubDetailsContainer = document.getElementById("main");

// Attach an input event listener for the search input
searchInput.addEventListener("input", handleSearchInput);

// Initialize football club data and display all clubs
let clubData = footballClubs;
displayClubs(footballClubs);

// Display football clubs in the club list
function displayClubs(clubs) {
  // Generate HTML for club cards and set it in the clubList element
  const clubCardsHTML = clubs.map(createClubCardHTML).join("");
  clubList.innerHTML = clubCardsHTML;
}

// Create HTML for a football club card
function createClubCardHTML(club) {
  return `
        <div class="club-card" onclick="handleClubClick(this);"><!-- Add onclick event -->
            <h2>${club.name}</h2>
            <img src="${club.image}" alt="${club.name} Image" style="width:100%; height:20vh;">
            <p><b>League: </b>${club.league}</p>
            <p><b>City: </b>${club.city}</p>
            <button onclick="viewClubPlayers('${club.name}'); event.stopPropagation();" style="width:100%;">View Players</button>
        </div>
    `;
}

// Handle clicking on a football club card
function handleClubClick(element) {
  // Write your code here for task1
  // Get the name of the clicked club
  const clubName = element.querySelector("h2").innerText;

  // Find the selected club by its name
  const selectedClub = clubData.find((club) => club.name === clubName);

  // Display details of the selected club
  if (selectedClub) {
    displayClubDetails(selectedClub);
  }
}

// Display football club details
function displayClubDetails(club) {
  // Write your code here for task2
  // Create a club details HTML using template strings
  const clubDetailsHTML = `
            <div id="club-details">
                <h2>${club.name}</h2>
                <img src="${club.image}" alt="${
    club.name
  }" style="width:100%; height:30vh;">
                <p><b>League:</b> ${club.league}</p>
                <p><b>City:</b> ${club.city}</p>
                <p><b>Founded:</b> ${club.founded || "N/A"}</p>
                <p><b>Stadium:</b> ${club.stadium || "N/A"}</p>
                ${getBackButtonHTML()}
            </div>
        `;

  // Set the club details HTML in the clubDetailsContainer
  clubDetailsContainer.innerHTML = clubDetailsHTML;
}

// Function to view club players
function viewClubPlayers(clubName) {
  // Find the selected club by its name
  const selectedClub = clubData.find((club) => club.name === clubName);

  // Write your code here for task3
  // Generate HTML for the list of players and display it
  if (selectedClub && selectedClub.players && selectedClub.players.length > 0) {
    // Iterate over selectedClub object's players property
    // Create a string joining the information of all the players of the selected Club
    const playersHTML = selectedClub.players
      .map((player) => {
        return `<li><b>${player.name}</b> - ${player.position}</li>`;
      })
      .join("");

    // Display the information by setting the HTML in the clubDetailsContainer
    clubDetailsContainer.innerHTML = `
            <div id="club-details">
                <h2>Players of ${selectedClub.name}</h2>
                <ul>${playersHTML}</ul>
                ${getBackButtonHTML()}
            </div>
        `;
  } else {
    clubDetailsContainer.innerHTML = `
            <div id="club-details">
                <h2>No players found for ${clubName}.</h2>
                ${getBackButtonHTML()}
            </div>
        `;
  }
}

// Handle search input and filter clubs
function handleSearchInput() {
  // Write your code here for task4

  // Get the search term and convert it to lowercase for case-insensitive search
  const searchTerm = searchInput.value.toLowerCase();

  // Create a string containing club details for searching
  const filteredClubs = clubData.filter((club) => {
    const clubText = `${club.name} ${club.league} ${club.city}`.toLowerCase();
    return clubText.includes(searchTerm);
  });

  // Display the filtered clubs
  displayClubs(filteredClubs);
}

// Function to create and return a "Back to Home" button
function getBackButtonHTML() {
  return `
        <button onclick="goBackHome()" style="margin-top: 20px;">⬅ Back to Home</button>
    `;
}

// Function to go back to the home view (full list)
function goBackHome() {
  location.reload();
}
