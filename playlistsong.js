// Playlist sa metapodacima i trajanjem
const playlist = [
  {
    title: "Tears in Rain",
    artist: "Chris G SLS",
    year: "2025",
    mix: "Master 100bpm",
    duration: "3:45", // novi stupac
    file: "https://slspstudios-sudo.github.io/G-Release-Track/Tears%20in%20rain.%20100bpm%2C%20Bmin%20(Master).mp3",
    cover: "https://slspstudios-sudo.github.io/G-Release-Track/Chris%20G%20SLS%20-%20Tears%20in%20Rain.jpg"
  },
  {
    title: "Dummy Song 1",
    artist: "Artist 1",
    year: "2024",
    mix: "Demo Mix",
    duration: "2:30",
    file: "https://slspstudios-sudo.github.io/G-Release-Track/dummyemptyphoto.jpg",
    cover: "https://slspstudios-sudo.github.io/G-Release-Track/dummyemptyphoto.jpg"
  },
  {
    title: "Dummy Song 2",
    artist: "Artist 2",
    year: "2023",
    mix: "Radio Edit",
    duration: "4:10",
    file: "https://slspstudios-sudo.github.io/G-Release-Track/dummyemptyphoto.jpg",
    cover: "https://slspstudios-sudo.github.io/G-Release-Track/dummyemptyphoto.jpg"
  }
];

// Popunjavanje full playlist
const fullPlaylistContainer = document.getElementById("full-playlist");

playlist.forEach((song, i) => {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${song.title}</strong> | ${song.artist} | ${song.year} | ${song.mix} | ${song.duration}`;
  li.onclick = () => playSong(i);
  fullPlaylistContainer.appendChild(li);
});
