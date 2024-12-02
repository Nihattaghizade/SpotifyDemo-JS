"use strict";

const numberOfSongs = document.getElementById('numberOfSongs');
const totalDuration = document.getElementById('totalDuration');

const playlist = document.getElementById('playlist');

const songImage = document.getElementById('songImage');
const song = document.getElementById('song');
const songTitle = document.getElementById('songTitle');
const artist = document.getElementById('artist');

const previous = document.getElementById('previous');
const playAndPause = document.getElementById('playAndPause');
const playAndPauseIcon = document.querySelector('#playAndPause img');
const next = document.getElementById('next');

const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');

const progressContainer = document.getElementById('progressContainer');
const progressFill = document.getElementById('progressFill');

const songplayInfo = document.getElementById('songplayInfo');

const eachSong = document.querySelectorAll('.eachSong');

const volumebar = document.getElementById('volume-bar');
const volume = document.getElementById('volume');
const volumeIcon = document.querySelector('.volume-icon');
const muteIcon = document.querySelector('.volume-icon .muteIcon');
const unmuteIcon = document.querySelector('.volume-icon .unmuteIcon');


let index = 0;
let isPlaying = false;

const songs = [
    {
        name: "gelsin-hayat-bildigi-gibi",
        artist: "Ceza",
        title: "Gelsin Hayat Bildigi Gibi",
        duration: "4:55",
    },
    {
        name: "neyim-var-ki",
        artist: "Ceza",
        title: "Neyim Var Ki",
        duration: "3:26",
    },
    {
        name: "summertime-sadness",
        artist: "Lana Del Rey",
        title: "Summertime Sadness",
        duration: "3:58",
    },
    {
        name: "mendilimde-kirmizim-var",
        artist: "Mabel Matiz",
        title: "Mendilimde Kirmizim Var",
        duration: "6:02",
    },
    {
        name: "starboy",
        artist: "Weekend",
        title: "Starboy",
        duration: "3:50",
    },
    {
        name: "moth-to-a-flame",
        artist: "Weekend",
        title: "Moth To A Flame",
        duration: "3:54",
    },
    {
        name: "falling-down",
        artist: "XXXTentaction",
        title: "Falling Down",
        duration: "3:16",
    },
    {
        name: "changes",
        artist: "XXXTentaction",
        title: "Changes",
        duration: "2:01",
    },
];

const displayHeaderInfo = () => {
    numberOfSongs.textContent = `${songs.length} songs`;

    const allDurations = songs.map((song) => {
        const [minute, second] = song.duration.split(":");

        return minute * 60 + + second;
    });

    const totalSecond = allDurations.reduce((total,second) => (total += second));

    const minutes = Math.floor(totalSecond / 60);
    const seconds = totalSecond % 60;
    
    totalDuration.textContent = `${minutes}m ${String(seconds).padStart(2, "0")}s`;
};


const displayPlaylist = () => {
    playlist.innerHTML = "";

    songs.forEach((song, index) => {
        const songName = song.name.split("-").map((sName) => sName[0].toUpperCase() + sName.slice(1)).join(" ");
        
        playlist.innerHTML += `
            <li class="eachSong cursor-pointer flex justify-between p-2 text-[#B7B7B7]
            border-b border-[#B7B7B7] mb-2"
            data-index="${index}">
                <div class="flex">
                    <span class="me-8">${index + 1}</span>
                    <h3 class="text-black ">${songName}</h3>
                </div>
                <span class="">${song.duration}</span>
            </li>`;
    });

    
    document.querySelectorAll('.eachSong').forEach(songElement => {
        songElement.addEventListener('click', () => {
            index = parseInt(songElement.getAttribute('data-index')); 
            displaySong(); 
            playSong(); 
        });
    });
};


const displaySong = () => {
    songImage.src = `./assets/images/${songs[index].name}.jpeg`;
    songTitle.textContent = `${songs [index].title}`;
    artist.textContent = `${songs [index].artist}`;
    song.src= `./assets/songs/${songs [index].name}.mp3`;
    duration.textContent = `${songs [index].duration}`;
}

const playSong = () => {
    song.play();
    isPlaying = true;
    playAndPauseIcon.src = "./assets/icons/pause.svg";

    songplayInfo.textContent = "Now Playing";
};

const pauseSong = () => {
    song.pause();
    isPlaying = false;
    playAndPauseIcon.src = "./assets/icons/play.svg";

    songplayInfo.textContent = "Paused";
};

const nextSong = () => {
    if (index < songs.length-1) {
        index++;
    } else {
        index = 0;
    }
    
    displaySong();
    playSong();
};

const previousSong = () => {
    if (index > 0) {
        index--;
    } else {
        index = songs.length - 1;
    }
    
    displaySong();
    playSong();
};

playAndPause.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

next.addEventListener('click', nextSong);
previous.addEventListener('click', previousSong);

displayHeaderInfo();
displayPlaylist();
displaySong();

song.addEventListener("timeupdate", () => {
    const { currentTime: cTime, duration } = song;

    const minutes = Math.floor(cTime / 60);
    const seconds = Math.floor(cTime % 60);

    currentTime.textContent = `${(minutes)}:${String(seconds).padStart(2, "0")}`;

    progressFill.style.width = `${(cTime / duration) * 100}%`;
});

progressContainer.addEventListener("click", (event) => {
    const clicked = event.offsetX;
    const totalWidth = progressContainer.clientWidth;

    song.currentTime = (clicked / totalWidth) * song.duration;
});

song.addEventListener("ended", nextSong);

eachSong.forEach((song) => {
    song.addEventListener("click", () => {
        isPlaying ? pauseSong() : playSong();
    });
});

const displaySoundIcons = () => {};

volumebar.addEventListener("click", (event) => {
    const clickedVolume = event.offsetY;
    const totalHeight = volumebar.clientHeight;

    song.volume = (clickedVolume / totalHeight) * 1;

    volume.style.height = `${(clickedVolume / totalHeight) * 100}%`;
    console.log(song.volume);
});



let previousVolume = song.volume; 

volumeIcon.addEventListener("click", () => {
    const isMuted = muteIcon.classList.contains("hidden"); 

    if (isMuted) {
        // Mute the audio
        previousVolume = song.volume; 
        song.volume = 0; 
        volume.style.height = "0%"; 
    } else {
        // Unmute the audio
        song.volume = previousVolume; 
        volume.style.height = `${previousVolume * 100}%`; 
    }

    
    muteIcon.classList.toggle("hidden");
    unmuteIcon.classList.toggle("hidden");
});
