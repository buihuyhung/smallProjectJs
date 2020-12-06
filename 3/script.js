const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

const duration = 4 * 60 + 44;
const toggleVideoStatus = function () {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const updatePlayIcon = function () {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
};

const stopVideo = function () {
  video.currentTime = 0;
  video.pause();
};

const updateProgress = function () {
  progress.value = (video.currentTime / duration) * 100;

  let mins = Math.floor(video.currentTime / 60);
  console.log(mins);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  let secs = Math.floor(video.currentTime % 60);
  console.log(secs);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.textContent = `${mins}:${secs}`;
};

const setVideoProgress = function () {
  video.currentTime = (+progress.value * duration) / 100;
};

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
console.log(video.currentTime);
