// player.js

const audio = document.getElementById("audio-player");
const coverImg = document.getElementById("cover-img");
const playBtn = document.getElementById("play-pause");
const stopBtn = document.getElementById("stop");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const repeatBtn = document.getElementById("repeat");
const repeatNumber = repeatBtn.querySelector(".repeat-number");
const shuffleBtn = document.getElementById("shuffle");
const seekBar = document.getElementById("seek");
const volumeBar = document.getElementById("volume");
const expandBtn = document.getElementById("expand-btn");
const expandArea = document.getElementById("expand-area");
const top3List = document.getElementById("top3-list");
const fullPlaylist = document.getElementById("full-playlist");

let currentIndex = -1;
let isPlaying = false;
let repeatMode = "off";
let shuffle = false;

// ----- Load Top3 -----
function loadTop3() {
  top3List.innerHTML = "";
  top3Songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.textContent = song.title + " - " + song.artist;
    li.onclick = () => loadSongFromTop3(i);
    top3List.appendChild(li);
  });
}

function loadSongFromTop3(i) {
  const song = top3Songs[i];
  audio.src = song.src;
  coverImg.src = song.cover;
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  currentIndex = i;
}

// ----- Playlist -----
function loadSong(i) {
  currentIndex = i;
  const song = playlist[i];
  audio.src = song.src;
  coverImg.src = song.cover;
  updateFullPlaylist();
  seekBar.value = 0;
}

function updateFullPlaylist() {
  fullPlaylist.innerHTML = "";
  playlist.forEach((song, i) => {
    const li = document.createElement("li");
    li.textContent = song.title + " - " + song.artist;
    li.onclick = () => {
      loadSong(i);
      audio.play();
      isPlaying = true;
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    };
    fullPlaylist.appendChild(li);
  });
}

// ----- Controls -----
function playPause() {
  if (currentIndex === -1) loadSong(0);
  if (isPlaying) { audio.pause(); playBtn.innerHTML = '<i class="fas fa-play"></i>'; }
  else { audio.play(); playBtn.innerHTML = '<i class="fas fa-pause"></i>'; }
  isPlaying = !isPlaying;
}

function stop() {
  audio.pause(); audio.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  coverImg.src = "https://slspstudios-sudo.github.io/G-Release-Track/Chris%20G%20SLS%20-%20Tears%20in%20Rain.jpg";
  isPlaying = false;
  currentIndex = -1;
}

function nextSong() {
  if (shuffle) currentIndex = Math.floor(Math.random() * playlist.length);
  else { currentIndex++; if (currentIndex >= playlist.length) currentIndex = (repeatMode === "all") ? 0 : playlist.length - 1; }
  loadSong(currentIndex); if (isPlaying) audio.play();
}

function prevSong() {
  currentIndex--; if (currentIndex < 0) currentIndex = 0;
  loadSong(currentIndex); if (isPlaying) audio.play();
}

function toggleRepeat() {
  repeatMode = (repeatMode === "off") ? "one" : (repeatMode === "one") ? "all" : "off";
  repeatNumber.textContent = (repeatMode === "one") ? "1" : "";
}

function toggleShuffle() {
  shuffle = !shuffle;
  shuffleBtn.innerHTML = '<i class="fas fa-random"></i> ' + (shuffle ? "On" : "Off");
}

// ----- Seek & Volume -----
seekBar.addEventListener("input", () => { audio.currentTime = (seekBar.value / 100) * audio.duration; });
audio.addEventListener("timeupdate", () => {
  if (audio.duration) seekBar.value = (audio.currentTime / audio.duration) * 100;
  if (audio.ended) { if (repeatMode === "one") audio.play(); else nextSong(); }
});
volumeBar.addEventListener("input", () => { audio.volume = volumeBar.value; });

// ----- Expand playlist -----
expandBtn.addEventListener("click", () => { expandArea.style.maxHeight = (expandArea.style.maxHeight && expandArea.style.maxHeight != "0px") ? "0" : "300px"; });

// ----- Event listeners -----
playBtn.addEventListener("click", playPause);
stopBtn.addEventListener("click", stop);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
repeatBtn.addEventListener("click", toggleRepeat);
shuffleBtn.addEventListener("click", toggleShuffle);

// ----- Init -----
loadTop3();
updateFullPlaylist();
