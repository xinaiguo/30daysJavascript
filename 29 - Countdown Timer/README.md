# Day29 - Countdown Timer

## 效果图

第20天的挑战是，设置一个倒计时时间，接下来开始倒计时。

## HTML代码

```html
display_endTime
```

- 上面的`button`中自定义的`data-time`为倒计时时间，以秒为单位。
- `form`为自定义倒计时时间，以分为单位。
- class为`display__time-left`的div主要为了展示倒计时的动态。
- class为`display__end-time`的div主要为了展示倒计时什么时候结束。

## CSS 代码

```css
html {
  box-sizing: border-box;
  font-family:"Inconsolata",monospace;
  background: url(./1.jpg) center no-repeat;
  background-size: cover;
  min-height: 100vh;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body{
  margin: 0;
}

.timer_controls{
  display: flex;
  flex: 1;
}

.timer_button{
  margin: 0;
  border: 0;
  padding: 10px;
  width: 300px;
  height: 60px;
  background: #457aac;
  color: white;
  font-size: 20px;
  border-right: 1px solid #2d5570;
  box-shadow: 0 3px #2d5570;
  font-weight: 500;
  cursor: pointer;
  font-family: 'Inconsolata', monospace;
}

.timer_button:hover,.timer_button:focus{
  background-color: rgba(0, 0, 0, 0.2);
  outline: 0;
}


#custom{
  display: inline-flex;
}

input{
  width: 260px;
  text-align:left;
  box-shadow: 0 0 #2d5570;
  padding: 15px;
}

.display{
  color: white;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 100px;
  margin-top: 150px;
  margin-bottom: 0;
  padding: 0;
}

.display_endTime{
  font-size: 40px;
  margin-top: 0;
}

```

## JS代码实现逻辑

```js
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
```
