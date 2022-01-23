console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let changeName = document.getElementById('changeName');
let songs = [
    {songName: "Let me love you - Justin Beiber", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Huma Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "raise", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "ocean", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "lonely night", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Don't Turn off", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"}
];

songItems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
    // let tempElement = new Audio(songs[i].filePath);
    // let temp = parseInt(tempElement.duration);
    // console.log(temp);
    // // element.getElementsByClassName("timestamp")=tempElement.duration();
})

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
// make all other buttons transit to play as some song must be played previously
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        changeName.innerText = songs[songIndex].songName;
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>5){
        songIndex=0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    changeName.innerText = songs[songIndex].songName;
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=5;
    }
    else{
        songIndex -=1;
    }
    // make a function of it to avoid repetition
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    changeName.innerText = songs[songIndex].songName;
})