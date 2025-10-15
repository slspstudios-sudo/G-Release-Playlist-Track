// Playlist sa 3 dummy pjesme
const playlist = [
  {
    title: "Dummy Playlist Song 1",
    artist: "Artist A",
    cover: "https://via.placeholder.com/200x200?text=Cover1",
    src: "https://via.placeholder.com/3.mp3"
  },
  {
    title: "Dummy Playlist Song 2",
    artist: "Artist B",
    cover: "https://via.placeholder.com/200x200?text=Cover2",
    src: "https://via.placeholder.com/4.mp3"
  },
  {
    title: "Dummy Playlist Song 3",
    artist: "Artist C",
    cover: "https://via.placeholder.com/200x200?text=Cover3",
    src: "https://via.placeholder.com/5.mp3"
  }
];

let currentIndex = -1;
let isPlaying = false;
let repeatMode = "off";
let shuffle = false;

const audio = document.getElementById("audio-player");
const playBtn = document.getElementById("play-pause");
const stopBtn = document.getElementById("stop");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const repeatBtn = document.getElementById("repeat");
const shuffleBtn = document.getElementById("shuffle");
const seekBar = document.getElementById("seek");
const coverImg = document.getElementById("cover-img");
const expandBtn = document.getElementById("expand-btn");
const expandArea = document.getElementById("expand-area");
const fullPlaylist = document.getElementById("full-playlist");

// Učitavanje pjesme iz playlist
function loadSong(index) {
  currentIndex = index;
  const song = playlist[index];
  audio.src = song.src;
  coverImg.src = song.cover;
  updateFullPlaylist();
  seekBar.value = 0;
}

function playPause() {
  if(currentIndex === -1){ loadSong(0); }
  if(isPlaying){ audio.pause(); playBtn.innerHTML='<i class="fas fa-play"></i>'; }
  else { audio.play(); playBtn.innerHTML='<i class="fas fa-pause"></i>'; }
  isPlaying = !isPlaying;
}

function stop() {
  audio.pause(); audio.currentTime = 0;
  playBtn.innerHTML='<i class="fas fa-play"></i>';
  coverImg.src = "https://via.placeholder.com/200x200?text=No+Song";
  isPlaying = false;
  currentIndex = -1;
}

function nextSong() {
  if(shuffle){ currentIndex = Math.floor(Math.random()*playlist.length); }
  else { currentIndex++; if(currentIndex>=playlist.length){ currentIndex = (repeatMode==="all")?0:playlist.length-1; } }
  loadSong(currentIndex);
  if(isPlaying) audio.play();
}

function prevSong() {
  currentIndex--; if(currentIndex<0) currentIndex=0;
  loadSong(currentIndex);
  if(isPlaying) audio.play();
}

function toggleRepeat() { repeatMode = (repeatMode==="off")?"all":(repeatMode==="all")?"one":"off"; repeatBtn.innerHTML='<i class="fas fa-redo"></i> '+repeatMode; }
function toggleShuffle() { shuffle=!shuffle; shuffleBtn.innerHTML='<i class="fas fa-random"></i> '+(shuffle?"On":"Off"); }

seekBar.addEventListener("input", ()=>{ audio.currentTime=(seekBar.value/100)*audio.duration; });
audio.addEventListener("timeupdate", ()=>{ if(audio.duration) seekBar.value=(audio.currentTime/audio.duration)*100; if(audio.ended){ if(repeatMode==="one") audio.play(); else nextSong(); } });

function updateFullPlaylist() {
  fullPlaylist.innerHTML = "";
  playlist.forEach((song,i)=>{
    const li = document.createElement("li");
    li.textContent = song.title + " - " + song.artist;
    li.onclick = ()=>{ loadSong(i); audio.play(); isPlaying=true; playBtn.innerHTML='<i class="fas fa-pause"></i>'; }
    fullPlaylist.appendChild(li);
  });
}

expandBtn.addEventListener("click", ()=>{ expandArea.style.maxHeight=(expandArea.style.maxHeight && expandArea.style.maxHeight!="0px")?"0":"300px"; });
