// Playlist sa metapodacima
const playlist = [
  {
    title: "Tears in Rain",
    artist: "Chris G SLS",
    year: "2025",
    mix: "Master 100bpm",
    file: "https://slspstudios-sudo.github.io/G-Release-Track/Tears%20in%20rain.%20100bpm%2C%20Bmin%20(Master).mp3",
    cover: "https://slspstudios-sudo.github.io/G-Release-Track/Chris%20G%20SLS%20-%20Tears%20in%20Rain.jpg"
  },
  {
    title: "Dummy Song 1",
    artist: "Artist 1",
    year: "2024",
    mix: "Demo Mix",
    file: "https://slspstudios-sudo.github.io/G-Release-Track/dummyemptyphoto.jpg",
    cover: "https://slspstudios-sudo.github.io/G-Release-Track/dummyemptyphoto.jpg"
  },
  {
    title: "Dummy Song 2",
    artist: "Artist 2",
    year: "2023",
    mix: "Radio Edit",
    file: "https://slspstudios-sudo.github.io/G-Release-Track/dummyemptyphoto.jpg",
    cover: "https://slspstudios-sudo.github.io/G-Release-Track/dummyemptyphoto.jpg"
  }
];

// Popunjavanje full playlist
const fullPlaylistContainer = document.getElementById("full-playlist");

playlist.forEach((song, i) => {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${song.title}</strong> | ${song.artist} | ${song.year} | ${song.mix}`;
  li.onclick = () => playSong(i);
  fullPlaylistContainer.appendChild(li);
});
