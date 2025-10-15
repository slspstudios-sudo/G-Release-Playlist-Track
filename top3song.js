const top3 = playlist.slice(0, 3); // uzima prve tri pjesme iz playlist

const top3Container = document.getElementById("top3-list");

top3.forEach((song, i) => {
  const li = document.createElement("li");
  li.textContent = `${song.title}`;
  li.onclick = () => playSong(i); // koristi istu funkciju playSong iz g-player.js
  top3Container.appendChild(li);
});
