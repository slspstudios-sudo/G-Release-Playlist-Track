// Top 3 pjesme
const top3Songs = [
  {
    title: "Tears in Rain ext",
    artist: "Chris G SLS",
    cover: "https://slspstudios-sudo.github.io/G-Release-Track/Chris%20G%20SLS%20-%20Tears%20in%20Rain.jpg",
    src: "https://slspstudios-sudo.github.io/G-Release-Track/Tears%20in%20rain.%20100bpm,%20Bmin%20(Master).mp3"
  },
  {
    title: "Dummy Song 2",
    artist: "Artist 2",
    cover: "https://via.placeholder.com/200x200?text=Cover2",
    src: "https://via.placeholder.com/1.mp3"
  },
  {
    title: "Dummy Song 3",
    artist: "Artist 3",
    cover: "https://via.placeholder.com/200x200?text=Cover3",
    src: "https://via.placeholder.com/2.mp3"
  }
];

// Top3 lista u HTML
const top3List = document.getElementById("top3-list");

function loadTop3() {
  top3List.innerHTML = "";
  top3Songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.textContent = song.title + " - " + song.artist;
    li.onclick = () => {
      loadSongFromTop3(i);
    };
    top3List.appendChild(li);
  });
}

// Učitavanje pjesme iz Top3
function loadSongFromTop3(index) {
  const song = top3Songs[index];
  const audio = document.getElementById("audio-player");
  const coverImg = document.getElementById("cover-img");

  audio.src = song.src;
  coverImg.src = song.cover;
  audio.play();
}

loadTop3();


