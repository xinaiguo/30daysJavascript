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