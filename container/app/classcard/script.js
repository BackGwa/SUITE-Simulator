window.addEventListener("load", () => {
    parent.app_load();
})

function back_site() {
    parent.app_close();
}

function home() {
    const ifrm = document.querySelector("iframe");
    ifrm.src = "https://www.classcard.net/Main";
}