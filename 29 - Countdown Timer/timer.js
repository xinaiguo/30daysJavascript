const timerButtons = document.querySelectorAll('[data-time]');
const display_time = document.querySelector(".display_time");
const display_endTime = document.querySelector(".display_endTime");
const customForm = document.customForm;
let displayInterval;

timerButtons.forEach(timerButton => {
  timerButton.addEventListener('click', showTimer);
});

function showTimer(e) {
  timer(e.target.dataset.time);
}

function timer(seconds) {
  clearInterval(displayInterval);
  const endTime = Date.now() + seconds * 1000;
  displayTime(seconds);
  displayEndTime(endTime);
  displayInterval = setInterval(function () {
    const timeCount = Math.round((endTime - Date.now()) / 1000);
    if (timeCount < 0) {
      clearInterval(displayInterval);
    } else {
      displayTime(timeCount);
    }
  }, 1000);

}

function displayTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  display_time.textContent = `${mins}:${zero(secs)}`;
}

function displayEndTime(timestamp) {
  const end_time = new Date(timestamp);
  const hour = end_time.getHours();
  const minute = end_time.getMinutes();
  display_endTime.textContent = `${convertHours(hour)}:${zero(minute)} ${getMeridiem(hour)}`;

}

// convert to string with leading zero
const zero = (num) => num < 10 ? '0' + num : num.toString();

//convert to 12 hour clock

const convertHours = (hours) => hours > 12 ? hours - 12 : hours;

// add pm or am 
const getMeridiem = (hours) => hours > 12 ? 'pm' : 'am';

customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log(this.min);
  timer(this.min.value * 60);
  this.reset();
})