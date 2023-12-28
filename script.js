const aod_frame = document.getElementById("aod-frame");
const home_frame = document.getElementById("home-frame");

function aod_show() {
    home_frame.classList.add("home-deactive");
    aod_frame.classList.remove("aod-hidden-animate");
}

function aod_hide() {
    home_frame.classList.remove("home-deactive");
    aod_frame.classList.add("aod-hidden-animate");
}

function aod_deactivate() {
    aod_frame.classList.add("aod-hidden");
}

function aod_activate() {
    aod_frame.classList.remove("aod-hidden");
}

document.oncontextmenu = function() {
    return false;
}