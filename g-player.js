const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const repeatBtn = document.getElementById("repeat");
const shuffleBtn = document.getElementById("shuffle");
const seek = document.getElementById("seek");
const volume = document.getElementById("volume");
const title = document.getElementById("track-title");
const cover = document.getElementById("cover");
const playlistContainer = document.getElementById("playlist");
const togglePlaylistBtn = document.getElementById("togglePlaylist");

let playlist = [
  {
    title: "Tears in Rain",
    src: "https://slspstudios-sudo.github.io/G-Release-Track/Tears%20in%20rain.%20100bpm%2C%20Bmin%20(Master).mp3",
    cover: "https://slspstudios-sudo.github.io/G-Release-Track/Chris%20G%20SLS%20-%20Tears%20in%20Rain.jpg"
  },
  {
    title: "Dummy Song 1",
    src: "https://slspstudios-sudo.github.io/G-Release-Track/dummy1.mp3",
    cover: "https://slspstudios-sudo.github.io/G-Release-Track/dummyemptyphoto.jpg"
  },
  {
    title: "Dummy Song 2",
    src: "https://slspstudios-sudo.github.io/G-Release-Track/dummy2.mp3",
    cover: "https://slspstudios-sudo.github.io/G-Release-Track/dummyemptyphoto.jpg"
  }
];

let current = 0;
let repeatMode = "off";
let isShuffle = false;

function loadTrack() {
  const track = playlist[current];
  audio.src = track.src;
  cover.src = track.cover;
  title.textContent = track.title;
}
loadTrack();

// Play / Pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
});

// Next / Prev
function nextTrack() {
  current = isShuffle ? Math.floor(Math.random() * playlist.length) : (current + 1) % playlist.length;
  loadTrack();
  audio.play();
  playBtn.textContent = "⏸";
}
function prevTrack() {
  current = (current - 1 + playlist.length) % playlist.length;
  loadTrack();
  audio.play();
  playBtn.textContent = "⏸";
}
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

// Repeat
repeatBtn.addEventListener("click", () => {
  if (repeatMode === "off") {
    repeatMode = "one";
    repeatBtn.textContent = "🔂1";
  } else if (repeatMode === "one") {
    repeatMode = "all";
    repeatBtn.textContent = "🔁";
  } else {
    repeatMode = "off";
    repeatBtn.textContent = "🔁";
    repeatBtn.style.opacity = 0.5;
  }
});

// Shuffle
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.color = isShuffle ? "#00bcd4" : "#fff";
});

// When track ends
audio.addEventListener("ended", () => {
  if (repeatMode === "one") {
    audio.currentTime = 0;
    audio.play();
  } else if (repeatMode === "all") {
    nextTrack();
  } else {
    playBtn.textContent = "▶️";
  }
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Seek
audio.addEventListener("timeupdate", () => {
  seek.value = audio.currentTime / audio.duration || 0;
});
seek.addEventListener("input", () => {
  audio.currentTime = audio.duration * seek.value;
});

// Playlist toggle
togglePlaylistBtn.addEventListener("click", () => {
  playlistContainer.classList.toggle("active");
  togglePlaylistBtn.textContent = playlistContainer.classList.contains("active") ? "Hide Playlist ▲" : "Show Playlist ▼";
});

// Generate playlist
function renderPlaylist() {
  playlistContainer.innerHTML = "";
  playlist.forEach((track, index) => {
    const item = document.createElement("div");
    item.classList.add("playlist-item");
    item.innerHTML = `<span>${index + 1}. ${track.title}</span>`;
    item.addEventListener("click", () => {
      current = index;
      loadTrack();
      audio.play();
      playBtn.textContent = "⏸";
    });
    playlistContainer.appendChild(item);
  });
}
renderPlaylist();
