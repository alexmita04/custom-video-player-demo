const video = document.querySelector("video");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress-fullfilled");
const togglePlayBtn = document.querySelector(".play-btn");
const ranges = document.querySelectorAll(".controls input[type='range']");
const skipBtns = document.querySelectorAll(".player-btn");

function togglePlay(e) {
  e.stopPropagation();
  if (video.paused) {
    video.play();
    togglePlayBtn.textContent = "►";
  } else {
    video.pause();
    togglePlayBtn.textContent = "❚❚";
  }
}

function skipToggle(e) {
  e.stopPropagation();
  const skipTime = parseFloat(this.dataset.skip);
  video.currentTime += skipTime;
}

function rangeHandler(e) {
  e.stopPropagation();
  const propertyName = this.name;
  const value = this.value;
  video[propertyName] = value;
}

function updateProgressBar(e) {
  e.stopPropagation();

  const percentage = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percentage}%`;
}

function progressHandler(e) {
  e.stopPropagation();
  const percentage = (e.offsetX / this.offsetWidth) * video.duration;
  video.currentTime = percentage;
}

function stopPropagation(e) {
  e.stopPropagation();
}

video.addEventListener("click", togglePlay);
togglePlayBtn.addEventListener("click", togglePlay);
skipBtns.forEach((btn) => btn.addEventListener("click", skipToggle));
ranges.forEach((range) => {
  range.addEventListener("input", rangeHandler);
  range.addEventListener("mousedown", stopPropagation);
  range.addEventListener("mouseup", stopPropagation);
  range.addEventListener("mousemove", stopPropagation);
});
video.addEventListener("timeupdate", updateProgressBar);
progress.addEventListener("click", progressHandler);
