const defaultCover = "https://slspstudios-sudo.github.io/G-Release-Track/dummyemptyphoto.jpg";
let currentIndex = 0;
let isPlaying = false;
let repeatMode = "off"; // off | one | all
let shuffle = false;

const audio = new Audio();

function loadSong(song) {
  document.getElementById("title").textContent = song.title;
  document.getElementById("artist").textContent = song.artist;
  const cover = document.getElementById("cover-img");
  cover.src = song.cover || defaultCover;
  cover.onerror = () => (cover.src = defaultCover);
  audio.src = song.src;
}

function playSong() {
  audio.play();
  isPlaying = true;
  document.getElementById("play").textContent = "⏸️";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  document.getElementById("play").textContent = "▶️";
}

function stopSong() {
  audio.pause();
  audio.currentTime = 0;
  isPlaying = false;
  document.getElementById("play").textContent = "▶️";
}

function nextSong() {
  if (shuffle) currentIndex = Math.floor(Math.random() * playlist.length);
  else currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(playlist[currentIndex]);
  if (isPlaying) playSong();
}

function prevSong() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(playlist[currentIndex]);
  if (isPlaying) playSong();
}

function toggleRepeat() {
  const btn = document.getElementById("repeat");
  if (repeatMode === "off") {
    repeatMode = "one";
    btn.textContent = "🔁1";
  } else if (repeatMode === "one") {
    repeatMode = "all";
    btn.textContent = "🔁∞";
  } else {
    repeatMode = "off";
    btn.textContent = "🔁";
  }
}

function toggleShuffle() {
  shuffle = !shuffle;
  document.getElementById("shuffle").style.color = shuffle ? "#0af" : "#fff";
}

function setVolume(v) {
  audio.volume = v;
}

audio.addEventListener("ended", () => {
  if (repeatMode === "one") playSong();
  else if (repeatMode === "all") nextSong();
});

window.onload = () => {
  loadSong(playlist[currentIndex]);
  document.getElementById("play").onclick = () => (isPlaying ? pauseSong() : playSong());
  document.getElementById("stop").onclick = stopSong;
  document.getElementById("next").onclick = nextSong;
  document.getElementById("prev").onclick = prevSong;
  document.getElementById("repeat").onclick = toggleRepeat;
  document.getElementById("shuffle").onclick = toggleShuffle;
  document.getElementById("volume").oninput = e => setVolume(e.target.value);
};
