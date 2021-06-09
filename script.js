const video = document.querySelector('video')
const progressRange = document.querySelector('.progress-range')
const progressBar = document.querySelector('.progress-bar')
const playBtn = document.getElementById('play-btn')
const volumeIcon = document.getElementById('volume-icon')
const volumeRange = document.querySelector('.volume-range')
const volumeBar = document.querySelector('.volume-bar')
const currentTime = document.querySelector('.time-elapsed')
const duration = document.querySelector('.time-duration')
const fullscreenBtn = document.querySelector('.fullscreen')
const speed = document.querySelector('.player-speed')
const player = document.querySelector('.player')

// Play & Pause ----------------------------------- //
const togglePlay = () => {
    if (video.paused){
        video.play()
        playBtn.classList.replace('fa-play','fa-pause')
        playBtn.setAttribute('title','pause')
    }
        
    else{
        video.pause()
        showPlayIcon()
        
    }
        
}

const showPlayIcon = () => {
    playBtn.classList.replace('fa-pause','fa-play')
    playBtn.setAttribute('title','play')
}


// Progress Bar ---------------------------------- //
//Calculate time
const displayTime = (time) => {
    let minutes = Math.floor(time/60) 
    let seconds = Math.floor(time%60)
    if (seconds<10)
        seconds = `0${seconds}`
    return (`${minutes}:${seconds}`)
}

// Seek functionality
const setProgress = (e) => {
    const newTime = e.offsetX / progressRange.offsetWidth
    progressBar.style.width = `${newTime *100}%`
    video.currentTime = video.duration * newTime
}

// Update progress bar as video plays
const updateProgress = () => {
    progressBar.style.width = `${(video.currentTime/video.duration) *100}%`
    currentTime.textContent = displayTime(video.currentTime)
}

const updateDuration = () => {
    duration.textContent = displayTime(video.duration)
}



// Volume Controls --------------------------- //

let lastVolume = 1

//alter VolumeIcon
const volIcon = (type, vol) => {
    //change icon depending on volume or whether to mute or unmute
    volumeIcon.className = ''
    lastVolume = vol
    if (type==="mute") {
        volumeIcon.classList.add('fas','fa-volume-mute')
        video.volume = 0
    }    
    else{
        if (lastVolume > 0.6)
            volumeIcon.classList.add('fas','fa-volume-up')
        else if (lastVolume <= 0.6 && lastVolume > 0)
            volumeIcon.classList.add('fas','fa-volume-down')
        else if (lastVolume===0)
            volumeIcon.classList.add('fas','fa-volume-off')
        video.volume = vol        
    }    
    volumeBar.style.width = `${video.volume*100}%`
}


// Volume Bar
const changeVolume = (e) => {
    let vol = e.offsetX / volumeRange.offsetWidth
    //Rounding up or down
    if (vol < 0.1 ) vol = 0
    if (vol > 0.9 ) vol = 1
    volIcon("alter", vol)
}

//Mute/unmute
const toggleMute = () => {
    if (!volumeIcon.classList.contains('fa-volume-mute')){
        volIcon("mute",lastVolume)
    }
    else{
        volIcon("unmute",lastVolume)
    }
}


// Change Playback Speed -------------------- //

const changeSpeed = () => {
    video.playbackRate = speed.value
}

// Fullscreen ------------------------------- //
let fullscreen = false

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add("video-fullscreen")
}
  
/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    video.classList.remove("video-fullscreen")
}

//   Toggle fullscreen
const toggleFullScreen = () => {
    fullscreen = !fullscreen
    fullscreen ? 
    openFullscreen(player) :
    closeFullscreen()    
}

//event listeners
playBtn.addEventListener('click',togglePlay)
video.addEventListener('click',togglePlay)
video.addEventListener('ended',showPlayIcon)
video.addEventListener('timeupdate',updateProgress)
video.addEventListener('canplay',updateDuration)
progressRange.addEventListener('click',setProgress)
volumeRange.addEventListener('click',changeVolume)
volumeIcon.addEventListener('click',toggleMute)
speed.addEventListener('change',changeSpeed)
fullscreenBtn.addEventListener('click',toggleFullScreen)