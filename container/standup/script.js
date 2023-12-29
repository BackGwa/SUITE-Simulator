
function standup() {
    document.querySelector('stand-up-modal').classList.add('modal-open')
    document.getElementById('reminder').play();

    setTimeout(() => {
        document.querySelector('stand-up-text').innerHTML = "자리에서 일어나세요.";
        document.querySelector('stand-up-textdec').innerHTML = "3초 후 다음 동작";
    }, 3000);

    setTimeout(() => {
        document.querySelector('stand-up-textdec').innerHTML = "2초 후 다음 동작";
    }, 4000);

    setTimeout(() => {
        document.querySelector('stand-up-textdec').innerHTML = "1초 후 다음 동작";
    }, 5000);

    setTimeout(() => {
        document.querySelector('stand-up-text').innerHTML = "위쪽으로 기지개를 펴세요.";
        document.querySelector('stand-up-textdec').innerHTML = "3초 후 다음 동작";
    }, 6000);

    setTimeout(() => {
        document.querySelector('stand-up-textdec').innerHTML = "2초 후 다음 동작";
    }, 7000);

    setTimeout(() => {
        document.querySelector('stand-up-textdec').innerHTML = "1초 후 다음 동작";
    }, 8000);
    
    setTimeout(() => {
        document.querySelector('stand-up-text').innerHTML = "왼쪽으로 기울이세요.";
        document.querySelector('stand-up-textdec').innerHTML = "3초 후 다음 동작";
    }, 9000);
    
    setTimeout(() => {
        document.querySelector('stand-up-textdec').innerHTML = "2초 후 다음 동작";
    }, 10000);
        
    setTimeout(() => {
        document.querySelector('stand-up-textdec').innerHTML = "1초 후 다음 동작";
    }, 11000);

    setTimeout(() => {
        document.querySelector('stand-up-text').innerHTML = "오른쪽으로 기울이세요.";
        document.querySelector('stand-up-textdec').innerHTML = "3초 후 다음 동작";
    }, 12000);

    setTimeout(() => {
        document.querySelector('stand-up-textdec').innerHTML = "2초 후 다음 동작";
    }, 13000);

    setTimeout(() => {
        document.querySelector('stand-up-textdec').innerHTML = "1초 후 다음 동작";
    }, 14000);

    setTimeout(() => {
        document.querySelector('stand-up-text').innerHTML = "좋습니다!";
        document.querySelector('stand-up-textdec').innerHTML = "원래 자세로 돌아오세요.";
    }, 15000);

    setTimeout(() => {
        document.querySelector('stand-up-modal').classList.remove('modal-open');
    }, 17000);

    setTimeout(() => {
        document.querySelector('stand-up-text').innerHTML = "스트레칭 알림";
        document.querySelector('stand-up-textdec').innerHTML = "장시간 앉아있는 것은 좋지않습니다.";
    }, 18000)
}

setInterval(standup, (1000 * 60) * 30);