// =====================
// 1️⃣ Top 3 SONG
// =====================

// Playlist definicija
const playlist = [
  {
    title: "Tears in Rain",
    artist: "Chris G SLS",
    year: "2024",
    mix: "(Original Mix)",
    duration: "3:45",
    file: "https://raw.githubusercontent.com/slspstudios-sudo/G-Release-Track/main/Tears%20in%20rain.%20100bpm%2C%20Bmin%20(Master).mp3",
    cover: "https://raw.githubusercontent.com/slspstudios-sudo/G-Release-Track/main/Chris%20G%20SLS%20-%20Tears%20in%20Rain.jpg"
  },
  {
    title: "Do You Feel",
    artist: "Chris G SLS",
    year: "2025",
    mix: "(Original Mix)",
    duration: "2:30",
    file: "https://slspstudios-sudo.github.io/G-Release-Track/dummyemptyphoto.jpg",
    cover: "https://slspstudios-sudo.github.io/G-Release-Track/dummyemptyphoto.jpg"
  },
  {
    title: "Hexagon Heart",
    artist: "Chris G SLS",
    year: "2024",
    mix: "(Original Mix)",
    duration: "4:10",
    file: "https://slspstudios-sudo.github.io/G-Release-Track/dummyemptyphoto.jpg",
    cover: "https://slspstudios-sudo.github.io/G-Release-Track/dummyemptyphoto.jpg"
  }
];

// Popunjavanje Top 3 liste
const top3Container = document.getElementById("top3-list");
playlist.slice(0, 3).forEach((song, i) => {
  const li = document.createElement("li");
  li.textContent = song.title; // samo ime pjesme
  li.onclick = () => playSong(i); // funkcija iz g-player
  top3Container.appendChild(li);
});

// =====================
// 2️⃣ FULL PLAYLIST
// =====================
const fullPlaylistContainer = document.getElementById("full-playlist");
playlist.forEach((song, i) => {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${song.title}</strong> | ${song.artist} | ${song.year} | ${song.mix} | ${song.duration}`;
  li.onclick = () => playSong(i); // isto playSong
  fullPlaylistContainer.appendChild(li);
});

// =====================
// 3️⃣ G-PLAYER
// =====================
const audio = document.getElementById("audio-player");
const playBtn = document.getElementById("play-pause");
const stopBtn = document.getElementById("stop");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const repeatBtn = document.getElementById("repeat");
const shuffleBtn = document.getElementById("shuffle");
const seekBar = document.getElementById("seek");
const volumeBar = document.getElementById("volume");
const coverImg = document.getElementById("cover-img");
const trackTitle = document.getElementById("track-title");
const expandBtn = document.getElementById("expand-btn");
const expandArea = document.getElementById("expand-area");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

let currentIndex = 0;
let isPlaying = false;
let repeatMode = 0; // 0=off,1=once,2=all
let shuffleMode = false;

// Play odabranu pjesmu
function playSong(index) {
  currentIndex = index;
  const song = playlist[currentIndex];
  audio.src = song.file;
  trackTitle.textContent = `${song.title} - ${song.artist}`;
  coverImg.src = song.cover;
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  // show playlist dolje
  expandArea.style.maxHeight = "300px";
}

// Toggle Play / Pause
playBtn.onclick = () => {
  if (!audio.src) {
    playSong(currentIndex);
    return;
  }
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }
  isPlaying = !isPlaying;
};

// Stop
stopBtn.onclick = () => {
  audio.pause();
  audio.currentTime = 0;
  isPlaying = false;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
};

// Next / Prev
nextBtn.onclick = () => {
  if (shuffleMode) {
    currentIndex = Math.floor(Math.random() * playlist.length);
  } else {
    currentIndex++;
    if (currentIndex >= playlist.length) currentIndex = 0;
  }
  playSong(currentIndex);
};

prevBtn.onclick = () => {
  currentIndex--;
  if (currentIndex < 0) currentIndex = playlist.length -1;
  playSong(currentIndex);
};

// Repeat toggle
repeatBtn.onclick = () => {
  repeatMode = (repeatMode +1) % 3;
  const num = repeatBtn.querySelector(".repeat-number");
  if(repeatMode===0){ num.textContent=""; }
  else if(repeatMode===1){ num.textContent="1"; }
  else { num.textContent="A"; }
};

// Shuffle toggle
shuffleBtn.onclick = () => {
  shuffleMode = !shuffleMode;
  shuffleBtn.innerHTML = shuffleMode ? '<i class="fas fa-random"></i> On' : '<i class="fas fa-random"></i> Off';
};

// Seek bar update
audio.ontimeupdate = () => {
  if(audio.duration){
    seekBar.value = (audio.currentTime/audio.duration)*100;
    // update vremena
    const current = Math.floor(audio.currentTime);
    const dur = Math.floor(audio.duration);
    const formatTime = t => `${Math.floor(t/60)}:${(t%60).toString().padStart(2,'0')}`;
    currentTimeEl.textContent = formatTime(current);
    durationEl.textContent = formatTime(dur);
  }
};

seekBar.oninput = () => {
  if(audio.duration){
    audio.currentTime = (seekBar.value/100)*audio.duration;
  }
};

// Volume
volumeBar.oninput = () => {
  audio.volume = volumeBar.value;
};

// Expand / Collapse playlist
expandBtn.onclick = () => {
  if(expandArea.style.maxHeight && expandArea.style.maxHeight!=="0px"){
    expandArea.style.maxHeight="0";
  } else {
    expandArea.style.maxHeight="300px";
  }
};

// Auto play next song when ended
audio.onended = () => {
  if(repeatMode===1){
    playSong(currentIndex);
  } else {
    nextBtn.onclick();
    if(repeatMode===0 && currentIndex===0){ 
      audio.pause(); 
      isPlaying=false; 
      playBtn.innerHTML='<i class="fas fa-play"></i>'; 
    }
  }
};








