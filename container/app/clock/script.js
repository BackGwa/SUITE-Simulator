window.addEventListener("load", () => {
    parent.app_load();
})

function back_site() {
    parent.app_close();
}

const mini_slider = document.querySelectorAll("slider-item");
const clock_text = document.querySelector("clock-text");
const left = document.querySelector("mini-button-left");
const right = document.querySelector("mini-button-right");

const left_text = document.getElementById("left-text");
const right_text = document.getElementById("right-text");

const hours_input = document.getElementById("hours-input");
const minutes_input = document.getElementById("minutes-input");
const seconds_input = document.getElementById("seconds-input");

let now_function = 0;

for (let i = 0; i <= 24; i++) {
    hours_input.innerHTML = hours_input.innerHTML + `<option value="${i}">${String(i).padStart(2, "0")}</option>`;
}

for (let i = 0; i <= 59; i++) {
    minutes_input.innerHTML = minutes_input.innerHTML + `<option value="${i}">${String(i).padStart(2, "0")}</option>`;
    seconds_input.innerHTML = seconds_input.innerHTML + `<option value="${i}">${String(i).padStart(2, "0")}</option>`;
}


function sync_slider(index) {
    mini_slider.forEach((slider) => {
        slider.classList.remove("slider-active");
    });
    mini_slider[index].classList.add("slider-active");
    now_function = index;
    sync_active_function();
}

function sync_active_function(){
    try {
        reset_stopwatch();
    } catch {}
    try {
        reset_timer();
    } catch {}
    if (now_function == 0) {
        sync_time();
        function_time();
        hidden_button();
        document.querySelector("clock-input").classList.remove("input-active");
    } else if (now_function == 1) {
        show_button();
        document.querySelector("clock-input").classList.add("input-active");
        clock_text.innerHTML = "00:00:00"
    } else if (now_function == 2) {
        show_button();
        document.querySelector("clock-input").classList.remove("input-active");
        clock_text.innerHTML = "00:00:00"
    }
}

function function_time() {
    time = setInterval(() => {
        if(now_function == 0) {
            sync_time()
        }
    }, 500);
}

function sync_time() {
    const now = new Date();
    const hh = now.getHours();
    const mm = now.getMinutes();
    const ss = now.getSeconds();
    clock_text.innerHTML = hh.toString().padStart(2, "0") + ":" + mm.toString().padStart(2, "0") + ":" + ss.toString().padStart(2, "0");
}

function show_button() {
    left.classList.remove("hidden-button");
    right.classList.remove("hidden-button");
}
function hidden_button() {
    left.classList.add("hidden-button");
    right.classList.add("hidden-button");
}

sync_active_function()

let stopwatch_running = false;
let hours = 0;
let minutes = 0;
let seconds = 0;

let timer_running = false;

function left_button() {
    if(now_function == 1) {
        reset_timer()
    } else if (now_function == 2) {
        reset_stopwatch()
    }
}

function reset_stopwatch() {
    clearInterval(StopwatchInterval);
    hours = 0;
    minutes = 0;
    seconds = 0;

    if(stopwatch_running) {
        stopwatch_running = false;
        right_text.innerHTML = "시작";
        right.classList.remove("stopred");
    }
    clock_text.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function right_button() {
    if(now_function == 1) {
        if(!timer_running) {
            timer_running = true;
            timer();
        } else {
            timer_running = false;
            timer();
        }
    } else if (now_function == 2) {
        if(!stopwatch_running) {
            stopwatch_running = true;
            stopwatch();
        } else {
            stopwatch_running = false;
            stopwatch();
        }
    }
}

function stopwatch() {
    if(stopwatch_running) {
        StopwatchInterval = setInterval(updateStopwatch, 1000);
        right_text.innerHTML = "중지";
        right.classList.add("stopred");
    } else {
        clearInterval(StopwatchInterval);
        right_text.innerHTML = "재개";
        right.classList.remove("stopred");
    }
}

function updateStopwatch() {
    seconds++;

    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
  
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }

    clock_text.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

let totalSeconds = 0;

function timer() {
    if(timer_running) {
        tmp_hours = hours_input.value;
        tmp_minutes = minutes_input.value;
        tmp_seconds = seconds_input.value;

        totalSeconds = (tmp_hours * 3600) + (tmp_minutes * 60) + parseInt(tmp_seconds);

        TimerInterval = setInterval(updateTimer, 1000);
        
        right_text.innerHTML = "중지";
        right.classList.add("stopred");
    } else {
        clearInterval(TimerInterval);
        right_text.innerHTML = "재개";
        right.classList.remove("stopred");
    }
    document.querySelector("clock-input").classList.remove("input-active");
}

function sync_input_time() {
    const hour = hours_input.value;
    const minute = minutes_input.value;
    const second = seconds_input.value;

    clock_text.innerHTML = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
}

function updateTimer() {
    if (totalSeconds <= 0) {
        document.getElementById("alarm_sound").play();
        reset_timer();
    } else {
        totalSeconds--;

        tmp_hours = Math.floor(totalSeconds / 3600);
        tmp_minutes = Math.floor((totalSeconds % 3600) / 60);
        tmp_seconds = Math.floor(totalSeconds % 60);

        clock_text.innerHTML = `${tmp_hours.toString().padStart(2, '0')}:${tmp_minutes.toString().padStart(2, '0')}:${tmp_seconds.toString().padStart(2, '0')}`;
    }

    hours_input.value = tmp_hours;
    minutes_input.value = tmp_minutes;
    seconds_input.value = tmp_seconds;
}

function reset_timer() {
    clearInterval(TimerInterval);
    totalSeconds = 0;

    if(timer_running) {
        right_text.innerHTML = "시작";
        right.classList.remove("stopred");
        timer_running = false;
    }
    clock_text.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.querySelector("clock-input").classList.add("input-active");

    hours_input.value = 0;
    minutes_input.value = 0;
    seconds_input.value = 0;
}