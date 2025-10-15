const top3Songs = [
  {titleSong 1, artistArtist 1},
  {titleSong 2, artistArtist 2},
  {titleSong 3, artistArtist 3}
];

const top3List = document.getElementById(top3-list);

function loadTop3(){
  top3List.innerHTML=;
  top3Songs.forEach((song,i)={
    const li = document.createElement(li);
    li.textContent = song.title +  -  + song.artist;
    top3List.appendChild(li);
  });
}

loadTop3();
