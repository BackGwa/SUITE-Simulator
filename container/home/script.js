
const bootloader = document.getElementById('loader-frame');
const loader = document.querySelector('loading-effect');
const loading_icon = document.querySelector('loading-icon');
const time_text =  document.querySelector("time-text");
const day_text =  document.querySelector("day-text");
const dayx_text = document.querySelector("dayx-text");

function app_boot(app_name, icon = null) {
    bootloader.src = `../app/${app_name}/index.html`;
    loader.classList.remove('loading-hidden');
    try{
        loading_icon.classList.remove(loading_icon.classList[0]);
    } catch {}
    loading_icon.classList.add(icon);
}

function app_load() {
    setTimeout(() => {
        bootloader.style.opacity = '1.0';
        bootloader.style.transform = 'translateY(0%) scale(100%)';
        bootloader.style.pointerEvents = 'all';
        loader.classList.add('loading-hidden');
    }, 400);
}

function app_close() {
    bootloader.style.opacity = '0.0';
    bootloader.style.transform = 'translateY(100%) scale(0%)';
    bootloader.style.pointerEvents = 'none';
    setTimeout(() => {
        bootloader.src = ``;
    }, 250);
}

function goto_aod() {
    parent.aod_activate();
    parent.aod_show();
}

document.oncontextmenu = function() {
    return false;
}

function getTodayLabel() {
    
    var week = new Array('일', '월', '화', '수', '목', '금', '토');
    
    var today = new Date().getDay();
    var todayLabel = week[today];
    
    return todayLabel;
}

function sync_time() {
    today = new Date();
    time_text.innerHTML = `${(today.getHours() < 10) ? "0" + today.getHours():today.getHours()}:${(today.getMinutes() < 10) ? "0" + today.getMinutes():today.getMinutes()}`;
    day_text.innerHTML = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${(today.getDate()).toString().padStart(2, '0')}`;
    dayx_text.innerHTML = getTodayLabel() + "요일";
}

setInterval(sync_time, 500);