const clockContainer = document.querySelector('.js-clock'),
clockTitle = clockContainer.querySelector('.clock__title');
clockSec = clockContainer.querySelector('.clock__sec');


function getTime(){
    const date = new Date;
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    clockSec.innerText = `${sec < 10 ? `0${sec}` : sec}`
    clockTitle.innerText = `${hour < 10 ? `0${hour}` : hour}:${
        min < 10 ? `0${min}` : min}`;
}

function init(){
    getTime();
    setInterval(getTime,1000);
}

init();