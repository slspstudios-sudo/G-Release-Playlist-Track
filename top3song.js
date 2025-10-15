window.addEventListener('DOMContentLoaded', () => {
  const top3 = playlist.slice(0, 3);
  const top3Container = document.getElementById("top3-list");
  top3.forEach((song, i) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.onclick = () => playSong(i);
    top3Container.appendChild(li);
  });
});
