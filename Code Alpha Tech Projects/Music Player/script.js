const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playlist = document.getElementById('playlist');
const songTitle = document.getElementById('song-title');
const thumbnail = document.getElementById('thumbnail');

const songs = [
    { title: 'Amma Amma', src: 'song1.mp3', thumbnail: 'song1.jpeg' },
    { title: 'Paara', src: 'song2.mp3', thumbnail: 'song2.jpg' },
    { title: 'Spark', src: 'song3.mp3', thumbnail: 'song3.jpeg' }
];

let songIndex = 0;
let isPlaying = false;


function loadSong(index) {
    audio.src = songs[index].src;
    songTitle.textContent = songs[index].title;
    thumbnail.src = songs[index].thumbnail;
    updatePlaylistUI(index);
}


function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}

audio.addEventListener('timeupdate', () => {
    const { currentTime, duration } = audio;
    progressBar.style.width = `${(currentTime / duration) * 100}%`;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
});


function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}


function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audio.play();
    playPauseBtn.textContent = 'Pause';
    isPlaying = true;
}


function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    audio.play();
    playPauseBtn.textContent = 'Pause';
    isPlaying = true;
}


function updatePlaylistUI(activeIndex) {
    const items = playlist.querySelectorAll('.song');
    items.forEach((item, index) => {
        item.classList.toggle('active', index === activeIndex);
    });
}


playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);


loadSong(songIndex);


playlist.addEventListener('click', (e) => {
    if (e.target.classList.contains('song')) {
        songIndex = parseInt(e.target.getAttribute('data-index'));
        loadSong(songIndex);
        audio.play();
        playPauseBtn.textContent = 'Pause';
        isPlaying = true;
    }
});
