function clock(){
    const SECOND = document.querySelector(".second-hand");
    const MINUTE = document.querySelector(".min-hand");
    const HOUR = document.querySelector(".hour-hand");
    function update(){
        const now = new Date();
        //秒针旋转
        const seconds = now.getSeconds();
        const secondsDegrees = seconds *6;
        SECOND.style.transform = `rotate(${secondsDegrees}deg)`;
        //分针旋转
        const minutes = now.getMinutes();
        const minutesDegrees = (minutes*6) + (seconds/60)*6;
        MINUTE.style.transform = `rotate(${minutesDegrees}deg)`;
        //时针旋转
        const hours = now.getHours();
        const hoursDegrees = (hours-12)*30 + (minutes/60)*30;
        HOUR.style.transform = `rotate(${hoursDegrees}deg)`;
    }
    setInterval(update,1000);
    update();
}

function date(){
    const DATE = document.querySelector(".date");
    const WEEK = document.querySelector(".week");
    const TIME = document.querySelector(".time");
    function dateAndWeekUpdate(){
        const now = new Date();
        const weekList = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
        const dateStr = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
        DATE.innerHTML = dateStr;
        WEEK.innerHTML = weekList[now.getDay()];
    }
    dateAndWeekUpdate();
    setInterval(dateAndWeekUpdate,24*3600);
    
    function timeUpdate(){
        const now = new Date();
        const timeStr = now.getHours()+":"+zero(now.getMinutes())+":"+zero(now.getSeconds());
        TIME.innerHTML = timeStr;
    }

    function zero(arg){
        if(arg>=10){
            return arg;
        }else{
            return "0"+arg;
        }
    }

    timeUpdate();
    setInterval(timeUpdate,1000);
     
}

clock();
date();