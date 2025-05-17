// Reference the <video> and the <source> elements
const video = document.getElementById("video");
const videoSource = document.getElementById("video-src");

// Reference other DOM elements
const videoList = document.getElementById("video-list");
const searchInput = document.getElementById("search-input");

// Create a copy of the original video playlist
const originalList = [...videos];
let currentPlaylist = [...originalList]; // ✅ Tracks currently displayed playlist

// Initialize variables to track the current video index and shuffle state
let currentvideoIndex = 0;
let isShuffle = false;

// Function to update the video playlist displayed in the UI
function updatePlayList(playlist) {
  videoList.innerHTML = ""; // Clear list
  currentPlaylist = playlist; // ✅ Save currently used playlist

  playlist.forEach((videoItem, index) => {
    let li = document.createElement("li");
    li.textContent = videoItem.title;
    li.setAttribute("data-index", index);
    videoList.appendChild(li);
  });
}

// Function to update the UI with video information
function updateUI(currentvideoIndex, playlist) {
  document.getElementById("video-title").textContent =
    playlist[currentvideoIndex]["title"];
  document.getElementById("video-artist").textContent =
    playlist[currentvideoIndex]["artist-name"];
}

// Function to play the current video
function playvideo(playlist) {
  video.pause();
  videoSource.src = playlist[currentvideoIndex]["url"];
  video.load();
  video.play();
  updateUI(currentvideoIndex, playlist);
}

// Event delegation for video selection in the playlist
videoList.addEventListener("click", (e) => {
  if (e.target && e.target.tagName === "LI") {
    const index = parseInt(e.target.getAttribute("data-index"));
    currentvideoIndex = index;
    playvideo(currentPlaylist); // ✅ Use filtered/shuffled list
  }
});

// Play button
document.getElementById("play-button").addEventListener("click", () => {
  playvideo(currentPlaylist);
});

// Next button
document.getElementById("next-button").addEventListener("click", () => {
  currentvideoIndex++;
  if (currentvideoIndex >= currentPlaylist.length) currentvideoIndex = 0;
  playvideo(currentPlaylist);
});

// Previous button
document.getElementById("prev-button").addEventListener("click", () => {
  currentvideoIndex--;
  if (currentvideoIndex < 0) currentvideoIndex = currentPlaylist.length - 1;
  playvideo(currentPlaylist);
});

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Shuffle button
document.getElementById("shuffle-button").addEventListener("click", (event) => {
  isShuffle = !isShuffle;

  if (isShuffle) {
    event.target.textContent = "Click to Unshuffle";
    shuffleArray(videos);
    updatePlayList(videos);
    currentvideoIndex = 0;
    playvideo(videos);
  } else {
    event.target.textContent = "Click to Shuffle";
    updatePlayList(originalList);
    currentvideoIndex = 0;
    playvideo(originalList);
  }
});

// Search filter
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredVideos = originalList.filter((video) =>
    video.title.toLowerCase().includes(searchTerm)
  );
  updatePlayList(filteredVideos); // ✅ Update the list
  currentvideoIndex = 0; // Optional: reset to first result
  if (filteredVideos.length > 0) {
    updateUI(currentvideoIndex, filteredVideos);
  } else {
    document.getElementById("video-title").textContent = "No video found";
    document.getElementById("video-artist").textContent = "";
  }
});

// Initial load
updatePlayList(originalList);
updateUI(currentvideoIndex, originalList);
