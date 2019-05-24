
# Day23 - Speech Synthesis

第23天要做一个语音的记事本类似的场景，输入一段内容，选择不同的语言可以进行朗读。还可以选择不同的语速和语调。

## 基础知识

#### 一、SpeechSynthesis

[参考文档](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)


##### 1、属性

- `SpeechSynthesis.paused`（只读）

判断是否是处于暂停状态。

- `SpeechSynthesis.pending` (只读)

判断是否处于等待状态。

- `SpeechSynthesis.speaking ` (只读)

判断是否处于在读中。

##### 2、事件

- `SpeechSynthesis.onvoiceschanged`

监听翻译的语言是否发生了变化。

#### 3、方法

- `SpeechSynthesis.cancel()`

取消。

- `SpeechSynthesis.getVoices()`

获取所有当前设备支持的`SpeechSynthesisVoice `对象。

- `SpeechSynthesis.pause()`

暂停。

- `SpeechSynthesis.resume()`

恢复。

- `SpeechSynthesis.speak()`

开始语音读取。

#### 二、SpeechSynthesisUtterance 

[参考文档](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)

##### 1、构造函数

- `SpeechSynthesisUtterance.SpeechSynthesisUtterance()`

返回一个新的`SpeechSynthesisUtterance`对象实例。

##### 2、属性

- SpeechSynthesisUtterance.lang

获取或者是设置`utterance`的语言。

- SpeechSynthesisUtterance.pitch

获取或者是设置`utterance`的音高。

- SpeechSynthesisUtterance.rate

获取或者是设置`utterance`的播放速率。


- SpeechSynthesisUtterance.text

获取或者是设置`utterance`需要播放的文本内容。


- SpeechSynthesisUtterance.voice

获得或设定将被用来说话的声音。

- SpeechSynthesisUtterance.volume

获取或者是设置`utterance`的播放音量。

## HTML源码

```html
<div class="wrap">
    <h1>The Voiceinator 6000</h1>
    <select name="lang" id="langs">
      <option value="">Select a Language</option>
    </select>
    <select name="voice" id="voice-select">
      <option value="">Select a Voice</option>
    </select>
    <label for="rate">Rate:</label>
    <input type="range" name="rate" id="rate" min="0.1" max="10" value="1" step="0.1">
    <label for="pitch">Pitch:</label>
    <input type="range" name="pitch" id="pitch" min="0" max="2" value="1" step="0.1">
    <textarea name="text">please type what you want me to say !</textarea>
    <button id="stop">Stop!</button>
    <button id="speak">Speak</button>
  </div>
```

## CSS源码

```css
html {
  box-sizing: border-box;
  background: url("./pictrue.jpg") center no-repeat;
  background-size: cover;
  font-size: 10px;
  font-family: sans-serif;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

html,
body {
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

}

.wrap {
  padding: 2rem;
  width: 50rem;
  margin: 8rem auto;
  background: rgba(255, 255, 255, 0.75);
  border-radius: .5rem;
  position: relative;
  overflow: hidden;

}

h1 {
  font-size: 4rem;
  width: calc(100% + 4rem);
  background-color: #c0a0bc;
  margin: 0;
  margin-left: -2rem;
  margin-top: -2rem;
  padding: 1.2rem 1rem;
  border-bottom: .5rem solid #a05f98;
  font-family: 'Pacifico', cursive;
  text-align: center;

}

.wrap select,
.wrap input,
.wrap textarea,
.wrap button {
  width: 100%;
  display: block;
  margin: 1rem 0;
  padding: .8rem;
  border: 0;
  outline:0;
  border-radius: .2rem;
  font-size: 16px;
  font-family: sans-serif;
  
}

.wrap select{
  width: 66%;
  display: inline-block;
  box-shadow: 0 0 0 1px #74b2db;
  
}

.wrap select:first-of-type{
  width: 33%;
}

textarea{
  height: 15rem;
  box-shadow: 0 0 0 1px #74b2db;
}

label{
  text-align: left;
  font-size: 16px;
}

.wrap button{
  display: inline-block;
  width: 49%;
  background: #c0a0bc;
  padding: 1rem;
  margin: .1rem;
  font-size: 1.5rem;
  border-bottom: .5rem solid #a05f98;
  cursor: pointer;
  font-family: 'Pacifico', cursive;
  position: relative;
}

.wrap button:active{
  /*如果 "position" 属性的值为 "static"，那么设置 "top" 属性不会产生任何效果。*/
  top: .2rem;
}

```

## JS 源码

```js
const voiceDropdown = document.querySelector('[name="voice"]');
const langsDropdown = document.querySelector('[name="lang"]');
const stopButton = document.getElementById('stop');
const speakButton = document.getElementById('speak');
const options = document.querySelectorAll('[type="range"],[name="text"]');
let msg = new SpeechSynthesisUtterance();
let voices = [];

function populateLangs() {

    voices = speechSynthesis.getVoices();

    let langs = voices
        .reduce((arr, voice) => {
            if (!arr.includes(voice.lang) && voice.lang !== 'en') arr.push(voice.lang);
            return arr;
        }, [])
        .sort((a, b) => a > b ? 1 : -1);

    // english list is first, but the rest are alpha
    langs = ['en'].concat(langs);

    langsDropdown.innerHTML = langs
        .map(lang => {
            return `<option value="${lang}">${lang}</option>`;
        }).join('');

    updateVoices();
}

function changeLang() {
    updateVoices(this.value);
};

function changeVoice() {
    msg.voice = voices.find(voice => this.value === voice.name);//当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
    console.log(msg);
    toggle();
};

//切换语音播放还是暂停
function toggle(startOver = true) {
    speechSynthesis.cancel();
    if(startOver){
        speechSynthesis.speak(msg);
    }
};
function updateVoices(lang = 'en') {
    voiceDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes(lang))
        .map((voice) => {
            return `<option value="${voice.name}">${voice.name}(${voice.lang})</option>`
        }).join('');
};

function changeOptions(){
    msg[this.name] = this.value;
    toggle();
}

//voichsynthesis接口的onvoiceschanged属性表示一个事件处理程序，当由speech hsynthesis . getvoices()方法返回的speech合成器对象列表发生更改时(当voiceschanged事件触发时)，这个事件处理程序将运行
if (typeof speechSynthesis.addEventListener === 'function') {
    speechSynthesis.addEventListener('voiceschanged', populateLangs);
}

langsDropdown.addEventListener('change', changeLang);
voiceDropdown.addEventListener('change', changeVoice);
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
options.forEach(option => option.addEventListener('change',changeOptions));

msg.text = options[2].value;

populateLangs();
```


