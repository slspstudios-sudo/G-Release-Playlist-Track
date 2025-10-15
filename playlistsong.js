const playlist = [
  { title:"Song 1", artist:"Artist 1", cover:"https://via.placeholder.com/200x200?text=Cover1", src:"https://raw.githubusercontent.com/slspstudios-sudo/G-Release-Track/main/Tears%20in%20rain.%20100bpm,%20Bmin%20(Master).mp3" },
  { title:"Song 2", artist:"Artist 2", cover:"https://via.placeholder.com/200x200?text=Cover2", src:"https://raw.githubusercontent.com/slspstudios-sudo/G-Release-Track/main/Tears%20in%20rain.%20100bpm,%20Bmin%20(Master).mp3" },
  { title:"Song 3", artist:"Artist 3", cover:"https://via.placeholder.com/200x200?text=Cover3", src:"https://raw.githubusercontent.com/slspstudios-sudo/G-Release-Track/main/Tears%20in%20rain.%20100bpm,%20Bmin%20(Master).mp3" },
  { title:"Song 4", artist:"Artist 4", cover:"https://via.placeholder.com/200x200?text=Cover4", src:"https://raw.githubusercontent.com/slspstudios-sudo/G-Release-Track/main/Tears%20in%20rain.%20100bpm,%20Bmin%20(Master).mp3" }
];

let currentIndex=-1, isPlaying=false, repeatMode="off", shuffle=false;

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

function loadSong(index){
  currentIndex=index;
  const song = playlist[index];
  audio.src = song.src;
  coverImg.src = song.cover;
  updateFullPlaylist();
  seekBar.value=0;
}

function playPause(){
  if(currentIndex===-1){ loadSong(0); }
  if(isPlaying){ audio.pause(); playBtn.innerHTML='<i class="fas fa-play"></i>'; }
  else { audio.play(); playBtn.innerHTML='<i class="fas fa-pause"></i>'; }
  isPlaying=!isPlaying;
}

function stop(){
  audio.pause(); audio.currentTime=0;
  playBtn.innerHTML='<i class="fas fa-play"></i>';
  coverImg.src = "https://via.placeholder.com/200x200?text=No+Song";
  isPlaying=false;
  currentIndex=-1;
}

function nextSong(){
  if(shuffle){ currentIndex = Math.floor(Math.random()*playlist.length); }
  else { currentIndex++; if(currentIndex>=playlist.length){ currentIndex = (repeatMode==="all")?0:playlist.length-1; } }
  loadSong(currentIndex);
  if(isPlaying) audio.play();
}

function prevSong(){
  currentIndex--; if(currentIndex<0) currentIndex=0;
  loadSong(currentIndex);
  if(isPlaying) audio.play();
}

function toggleRepeat(){ repeatMode = (repeatMode==="off")?"all":(repeatMode==="all")?"one":"off"; repeatBtn.innerHTML='<i class="fas fa-redo"></i> '+repeatMode; }
function toggleShuffle(){ shuffle=!shuffle; shuffleBtn.innerHTML='<i class="fas fa-random"></i> '+(shuffle?"On":"Off"); }

seekBar.addEventListener("input", ()=>{ audio.currentTime=(seekBar.value/100)*audio.duration; });
audio.addEventListener("timeupdate", ()=>{ if(audio.duration) seekBar.value=(audio.currentTime/audio.duration)*100; if(audio.ended){ if(repeatMode==="one") audio.play(); else nextSong(); } });

function updateFullPlaylist(){
  fullPlaylist.innerHTML="";
  playlist.forEach((song,i)=>{
    const li = document.createElement("li");
    li.textContent = song.title + " - " + song.artist;
    li.onclick = ()=>{ loadSong(i); audio.play(); isPlaying=true; playBtn.innerHTML='<i class="fas fa-pause"></i>'; }
    fullPlaylist.appendChild(li);
  });
}

expandBtn.addEventListener("click", ()=>{ expandArea.style.maxHeight=(expandArea.style.maxHeight && expandArea.style.maxHeight!="0px")?"0":"300px"; });

