const song1 = new Audio("mp3s/Bakar - Hell N Back.mp3")
const song2 = new Audio("mp3s/Cautious Clay - Ohio.mp3")
const song3 = new Audio("mp3s/Mac Demarco - Salad Days.mp3")
const song4 = new Audio("mp3s/Benny Sings - Rolled Up.mp3")
const song5 = new Audio("mp3s/Coconut Records - West Coast.mp3")

const playPauseButton = document.querySelector(".play")
const stopButton = document.querySelector(".stop")
const nextButton = document.querySelector(".next")
const prevButton = document.querySelector(".prev")

const artist = document.querySelector(".curr-art-label");
const track = document.querySelector(".curr-track-label");


let currentSong = null;
let currentSongIndex = 0;
let prevClickTime = 0;

const songs = [
  {
    title: "Hell N Back",
    artist: "Bakar",
    mp3: song1
  },
  {
    title: "Ohio",
    artist: "Cautious Clay",
    mp3: song2
  },
  {
    title: "Salad Days",
    artist: "Mac Demarco",
    mp3: song3
  },
  {
    title: "Rolled Up",
    artist: "Benny Sings",
    mp3: song4
  },
  {
    title: "West Coast",
    artist: "Coconut Records",
    mp3: song5
  }
];



function playPauseAudio(audio) {
  if (audio.paused){
      audio.play();
    if (currentSong && currentSong !== audio){
      currentSong.pause()
    }
    currentSong = audio;
  } else {
      audio.pause();
  }
}

function playNextSong(){
  if (currentSongIndex < songs.length -1) {
    currentSongIndex++;
  } else {
    currentSongIndex = 0;
  }
  playPauseAudio(songs[currentSongIndex].mp3);
  artist.innerHTML = (songs[currentSongIndex].artist);
  track.innerHTML = (songs[currentSongIndex].title)
}

function playPrevSong() {
  if (currentSongIndex > 0) {
    currentSongIndex--;
  } else {
    currentSongIndex = songs.length - 1;
  }
  playPauseAudio(songs[currentSongIndex].mp3);
}

function playFromStart(){
  currentSong.pause();
  currentSong.currentTime = 0;
  currentSong.play();
}

  playPauseButton.addEventListener('click', () =>{
    if (!currentSong) {
          playPauseAudio(songs[currentSongIndex].mp3)
    } else {
          playPauseAudio(currentSong)
    }
  });

  stopButton.addEventListener('click', () => {
      if (currentSong) {
        currentSong.pause();
        currentSong.currentTime = 0;
        currentSong = null;
      }
  });

  nextButton.addEventListener('click', () => {
    playNextSong();
  })

  prevButton.addEventListener('click', () => {
    const currentTime = new Date().getTime();
    if (currentTime - prevClickTime < 300) {
      playPrevSong();
      artist.innerHTML = (songs[currentSongIndex].artist);
      track.innerHTML = (songs[currentSongIndex].title)
    } else {
    playFromStart();
    }
    prevClickTime = currentTime;
  })

