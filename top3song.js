// Top 3 pjesme - primjer sa stvarnim GitHub linkovima
const top3Songs = [
  {
    title: "Tears in Rain",
    artist: "Chris G SLS",
    cover: "https://raw.githubusercontent.com/slspstudios-sudo/G-Release-Track/main/Chris%20G%20SLS%20-%20Tears%20in%20Rain.jpg",
    src: "https://raw.githubusercontent.com/slspstudios-sudo/G-Release-Track/main/Tears%20in%20rain.%20100bpm,%20Bmin%20(Master).mp3"
  },
  {
    title: "Dummy Song 2",
    artist: "Artist 2",
    cover: "https://via.placeholder.com/200x200?text=Cover2",
    src: "https://raw.githubusercontent.com/slspstudios-sudo/G-Release-Track/main/Tears%20in%20rain.%20100bpm,%20Bmin%20(Master).mp3"
  },
  {
    title: "Dummy Song 3",
    artist: "Artist 3",
    cover: "https://via.placeholder.com/200x200?text=Cover3",
    src: "https://raw.githubusercontent.com/slspstudios-sudo/G-Release-Track/main/Tears%20in%20rain.%20100bpm,%20Bmin%20(Master).mp3"
  }
];

// Funkcija za prikaz Top 3 u HTML listi
const top3List = document.getElementById("top3-list");

function loadTop3() {
  top3List.innerHTML = "";
  top3Songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.textContent = song.title + " - " + song.artist;
    li.onclick = () => {
      // Event kada korisnik klikne na top3 pjesmu
      loadSongFromTop3(i);
    };
    top3List.appendChild(li);
  });
}

// Funkcija za učitavanje pjesme iz Top3
function loadSongFromTop3(index) {
  const song = top3Songs[index];
  const audio = document.getElementById("audio-player");
  const coverImg = document.getElementById("cover-img");

  audio.src = song.src;
  coverImg.src = song.cover;
  audio.play();
}

loadTop3();


