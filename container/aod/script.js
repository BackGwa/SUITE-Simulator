const TAG_HH = document.querySelector('clock-hh');
const TAG_SS = document.querySelector('clock-ss');
const TAG_MM = document.querySelector('clock-mm');

let clock_time_blink = false;

function updateClock() {
    const now = new Date();
    const hh = now.getHours();
    const mm = now.getMinutes();

    if(clock_time_blink) {
        clock_time_blink = false;
        TAG_SS.classList.add('blink');
    } else {
        clock_time_blink = true;
        TAG_SS.classList.remove('blink');
    }

    TAG_HH.innerHTML = String(hh).padStart(2, "0");
    TAG_MM.innerHTML = String(mm).padStart(2, "0");
}

let aod_deactivated = false;

document.addEventListener('touchstart', () => {
    parent.aod_hide();
    aod_in = setTimeout(() => {
        parent.aod_deactivate()
        aod_deactivated = true;
    }, 750);
});

document.addEventListener('mousedown', () => {
    parent.aod_hide();
    aod_in = setTimeout(() => {
        parent.aod_deactivate()
        aod_deactivated = true;
    }, 750);
});


document.addEventListener('touchend', () => {
    clearTimeout(aod_in);
    if(!aod_deactivated) {
        parent.aod_show()
        aod_in = false;
    }
});

document.addEventListener('mouseup', () => {
    clearTimeout(aod_in);
    if(!aod_deactivated) {
        parent.aod_show()
        aod_in = false;
    }
});


document.oncontextmenu = function() {
    return false;
}

setInterval(updateClock, 500);