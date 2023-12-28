
/* 타겟 입력 */
const input = document.getElementById("textfd");

const keyboardzone = document.getElementById("keyboardzone");
const keyboard_move = document.querySelector("keyboard-move");

/* 가상 키보드 등록 */
const keyboard = new customKeyboard(
        keyboardzone,
        input,  /* 입력 대상 */
        function() {
            save_input();
            if(use_command) shotcut_event();
        },
        function() {
            newline();
        }
);

let is_move = false;
let pageX = 0;
let pageY = 0;

function move_start() {
    is_move = true;
    keyboardzone.classList.add("selected");
}

function move_stop() {
    is_move = false;
    keyboardzone.classList.remove("selected");
}

keyboard_move.addEventListener("mousedown", move_start);
keyboard_move.addEventListener("mouseup", move_stop);
keyboard_move.addEventListener("touchstart", move_start);
keyboard_move.addEventListener("touchend", move_stop);

function handleMove(e) {
    if (!is_move) return;
    
    if (e.type === "mousemove") {
        pageX = Math.abs(e.pageX) - 225;
        pageY = Math.abs(e.pageY) - 320;
    } else if (e.type === "touchmove") {
        pageX = e.changedTouches[0].pageX - 225;
        pageY = e.changedTouches[0].pageY - 225;
    }
    
    keyboardzone.style.left = `${pageX}px`;
    keyboardzone.style.top = `${pageY}px`;
}

function keyboard_open() {
    if(keyboardzone.classList.contains("hidden")) {

        keyboardzone.style.left = `605px`;
        keyboardzone.style.top = `100px`;

        document.getElementById(`keyboard-img`).src = `./res/keyboard_enable.png`
        keyboardzone.classList.remove("hidden");

        setTimeout(() => {
            keyboardzone.classList.remove("close-animation");
        }, 1);
    
        setTimeout(() => {
            keyboardzone.classList.remove("keyboard-close-animation");
        }, 250);
    } else {
        document.getElementById(`keyboard-img`).src = `./res/keyboard_disable.png`
        keyboardzone.classList.add("keyboard-close-animation");

        setTimeout(() => {
            keyboardzone.classList.add("close-animation");
        }, 1);
    
        setTimeout(() => {
            keyboardzone.classList.add("hidden");
        }, 250);
    }
    playSE();
}

document.addEventListener("mousemove", handleMove);
document.addEventListener("touchmove", handleMove);