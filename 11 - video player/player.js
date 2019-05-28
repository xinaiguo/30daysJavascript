const toggleButton = document.querySelector('.toggle');
const playVideo = document.querySelector('.view');
const ranges = document.querySelectorAll('.player_slider');
const skipButtons = document.querySelectorAll('[data-skip]');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress_filled');


toggleButton.addEventListener('click', togglePlayer);
playVideo.addEventListener('click', togglePlayer);
playVideo.addEventListener('timeupdate', progressFilled);
playVideo.addEventListener('play', updateButton);
playVideo.addEventListener('pause', updateButton);
ranges.forEach(range => range.addEventListener('change', rangeHandle));
ranges.forEach(item => item.addEventListener('mousemove', rangeHandle));
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skipHandle));
progress.addEventListener('click',progressClickHandle);
progress.addEventListener('mousedown',()=>mousedownFlag = true);
progress.addEventListener('mousemove',progressMoveHandle);
progress.addEventListener('mouseup',()=>mousedownFlag=false);


//控制播放、暂停
function togglePlayer() {
    //video 对象有一个叫 paused 的属性来判断视频是否在播放,播放返回true，暂停返回false
    playVideo.paused ? playVideo.play() : playVideo.pause();

}

// 音量和播放速度控制函数
function rangeHandle() {
    playVideo[this.name] = this.value;
}

// 视频快退和快进
function skipHandle() {
    playVideo.currentTime += (+this.dataset.skip);

}

//进度条跟随视频播放改变,那么需要实时自动来执行这个函数。
function progressFilled() {
    progressBar.style.flexBasis = ((playVideo.currentTime / playVideo.duration) * 100).toFixed(2) + "%";
}

function updateButton() {
    toggleButton.textContent = playVideo.paused ? "►" : "II";
}

//点击进度条来改变视频播放（手动更新视频播放进度的函数，点击和拖动都要使用这个函数）
function progressClickHandle(e){
    playVideo.currentTime = (e.offsetX/progress.offsetWidth)*playVideo.duration;
}

let mousedownFlag = false;
function progressMoveHandle(e){
    if(mousedownFlag){
        progressClickHandle(e);
    }
}