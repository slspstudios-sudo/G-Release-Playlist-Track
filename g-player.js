// Simple Audio Player Shell
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const seek = document.getElementById("seek");
const volume = document.getElementById("volume");
const title = document.getElementById("track-title");
const cover = document.getElementById("cover");

const playlist = [
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
audio.src = playlist[current].src;
cover.src = playlist[current].cover;
title.textContent = playlist[current].title;

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
nextBtn.addEventListener("click", () => nextTrack());
prevBtn.addEventListener("click", () => prevTrack());

function nextTrack() {
  current = (current + 1) % playlist.length;
  loadTrack();
}
function prevTrack() {
  current = (current - 1 + playlist.length) % playlist.length;
  loadTrack();
}

function loadTrack() {
  audio.src = playlist[current].src;
  cover.src = playlist[current].cover;
  title.textContent = playlist[current].title;
  audio.play();
  playBtn.textContent = "⏸";
}

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
