const body = document.querySelector("body");
const command_t = document.getElementById("command_toggle");
const command_s = document.getElementById("command_stat");
const command_m = document.getElementById("command_more");

const loweyes_t = document.getElementById("loweyes_toggle");
const loweyes_s = document.getElementById("loweyes_stat");

const alert_feedback = document.getElementById("alert_feedback")

const share_box = document.getElementById("share_box");

let textarea;
let use_command = false;
let use_loweyes = false;

let shotcut = [
    ["", "", "", ""],
    ["", "", "", ""]
];

function setCookie(key, value) {
    let expire = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    value = encodeURIComponent(value);
    document.cookie = `${key}=${value}; expires=${expire}; path=/`;
}

function Italic() {

    if (textarea.style.fontStyle) {
        textarea.style.fontStyle = '';
        setCookie('italic', textarea.style.fontStyle);
        call_alert("기울임꼴 해제");
    } else {
        textarea.style.fontStyle = 'italic';
        setCookie('italic', textarea.style.fontStyle);
        call_alert("기울임꼴 사용");
    }
    Sync_icon('italic', textarea.style.fontStyle);
    playSE();
}

function Bold() {
    if (textarea.style.fontWeight) {
        textarea.style.fontWeight = '';
        setCookie('bold', textarea.style.fontWeight);
        call_alert("강조체 해제");
    } else {
        textarea.style.fontWeight = 'bold';
        setCookie('bold', textarea.style.fontWeight);
        call_alert("강조체 사용");
    }
    Sync_icon('bold', textarea.style.fontWeight);
    playSE();
}

function Underline() {
    if (textarea.style.textDecoration) {
        textarea.style.textDecoration = '';
        setCookie('underline', textarea.style.textDecoration);
        call_alert("강조선 해제");
    } else {
        textarea.style.textDecoration = 'underline';
        setCookie('underline', textarea.style.textDecoration);
        call_alert("강조선 사용");
    }
    Sync_icon('underline', textarea.style.textDecoration);
    playSE();
}

function alignLeft() {
    textarea.style.textAlign = 'left';
}

function alignCenter() {
    textarea.style.textAlign = 'center';
}

function alignRight() {
    textarea.style.textAlign = 'right';
}

const functions = [alignLeft, alignCenter, alignRight];
let currentIndex = 0;

function Align(user = false) {
    setCookie('align', currentIndex);
    if(user) {
        align_kr = ["왼쪽", "가운데", "오른쪽"]
        call_alert(`${align_kr[currentIndex]} 정렬`);
    }
    Align_icon();
    functions[currentIndex]();
    currentIndex = (currentIndex + 1) % functions.length;
    playSE();
}

function Align_icon() {
    document.getElementById("align-img").src = `./res/align${currentIndex}.png`
}

function Sync_icon(key, value) {
    if(value) {
        document.getElementById(`${key}-img`).src = `./res/${key}_enable.png`
    } else {
        document.getElementById(`${key}-img`).src = `./res/${key}_disable.png`
    }
}

function onload() {
    parent.app_load();
    textarea = document.querySelector('textarea');

    document.cookie.split('; ').forEach(cookie => {
        let [key, value] = cookie.split('=');

        value = decodeURIComponent(value);
        if (key === 'key') {
            recovery_charlist(value);
        } else if (key === 'italic') {
            textarea.style.fontStyle = value;
            Sync_icon(key, value)
        } else if (key === 'bold') {
            textarea.style.fontWeight = value;
            Sync_icon(key, value)
        } else if (key === 'underline') {
            textarea.style.textDecoration = value;
            Sync_icon(key, value)
        } else if (key === 'align') {
            currentIndex = value;
            Align();
        } else if (key === 'font') {
            sync_font(value)
        } else if (key === 'command') {
            if (parseInt(value)) use_command = true;
        } else if (key === 'loweyes') {
            if (parseInt(value)) use_loweyes = true;
        } else if (key === 'shotcut0_target') {
            shotcut[0][0] = value;
        } else if (key === 'shotcut1_target') {
            shotcut[0][1] = value;
        } else if (key === 'shotcut2_target') {
            shotcut[0][2] = value;
        } else if (key === 'shotcut3_target') {
            shotcut[0][3] = value;
        } else if (key === 'shotcut0_convert') {
            shotcut[1][0] = value;
        } else if (key === 'shotcut1_convert') {
            shotcut[1][1] = value;
        } else if (key === 'shotcut2_convert') {
            shotcut[1][2] = value;
        } else if (key === 'shotcut3_convert') {
            shotcut[1][3] = value;
        } else if (key === 'size') {
            sync_size(value);
        }
        sync_shotcut();
        sync_toggle();
    });
}

function save_input() {
    setCookie('key', return_charlist());
}

const context = document.querySelector("context-menu");
const menu = document.querySelector("menu-area");

function expand() {
    if (document.getElementById("more_expand").classList.contains("hidden-expand")) {
        tab_change();
    }
    else if(menu.classList.contains("context-expand")) {
        textarea.classList.remove("small-textarea");
        menu.classList.remove("context-expand");
        context.classList.remove("expand");
    } else {
        textarea.classList.add("small-textarea");
        menu.classList.add("context-expand");
        context.classList.add("expand");
    }
    playSE();
}

const size_item = document.querySelectorAll("size-setting-item");
const sizelist = ["small-font", "normal-font", "big-font"]
const sizelist_kr = ["작게", "보통", "크게"];

function size_change(index) {
    size_item.forEach(i => {
        i.classList.remove("selected-font");
    });

    textarea.classList.remove('small-font');
    textarea.classList.remove('normal-font');
    textarea.classList.remove('big-font');

    size_item[index].classList.add("selected-font");
    textarea.classList.add(sizelist[index]);

    call_alert(`서체 크기 : ${sizelist_kr[index]}`)

    setCookie('size', index);
    playSE();
}

function sync_size(value) {
    size_item.forEach(i => {
        i.classList.remove("selected-font");
    });

    textarea.classList.remove('normal-font');
    textarea.classList.add(sizelist[value]);
    size_item[value].classList.add("selected-font");
}

const font_item = document.querySelectorAll("font-setting-item");
const fontlist = ["sans-serif", "serif", "monospaced"]
const fontlist_kr = ["일반", "명조", "고정폭"]

function font_change(index) {
    font_item.forEach(i => {
        i.classList.remove("selected-font");
    });

    textarea.classList.remove('sans-serif');
    textarea.classList.remove('serif');
    textarea.classList.remove('monospaced');

    font_item[index].classList.add("selected-font");
    textarea.classList.add(fontlist[index]);

    call_alert(`서체 스타일 : ${fontlist_kr[index]}`)

    setCookie('font', index);
    playSE();
}

function sync_font(value) {
    font_item.forEach(i => {
        i.classList.remove("selected-font");
    });

    textarea.classList.remove('sans-serif');
    textarea.classList.add(fontlist[value]);
    font_item[value].classList.add("selected-font");
}

function command_toggle() {
    if(command_t.classList.contains("toggle-on")) {
        setCookie('command', 0);
        command_t.classList.remove("toggle-on");
        use_command = false;
        call_alert("단축어 해제");
    } else {
        setCookie('command', 1);
        command_t.classList.add("toggle-on");
        use_command = true;
        call_alert("단축어 사용");
    }
    sync_toggle_text()
}

function loweyes_toggle() {
    if(loweyes_t.classList.contains("toggle-on")) {
        setCookie('loweyes', 0);
        loweyes_t.classList.remove("toggle-on");
        use_loweyes = false;
        call_alert("고대비 모드 해제");
    } else {
        setCookie('loweyes', 1);
        loweyes_t.classList.add("toggle-on");
        use_loweyes = true;
        call_alert("고대비 모드 사용");
    }
    sync_toggle_text()
}

function sync_toggle() {
    if (use_command) {
        command_t.classList.add("toggle-on");
    }
    if (use_loweyes) {
        loweyes_t.classList.add("toggle-on");
    }
    sync_toggle_text()
}

function sync_toggle_text() {
    if (use_command) {
        command_s.innerHTML = "사용 중";
        command_m.classList.remove("toggle-hidden");
    } else {
        command_s.innerHTML = "사용 안 함";
        command_m.classList.add("toggle-hidden");
    }

    if (use_loweyes) {
        loweyes_s.innerHTML = "사용 중";
        body.classList.add("loweyes-enable");
    } else {
        loweyes_s.innerHTML = "사용 안 함";
        body.classList.remove("loweyes-enable");
    }
    playSE()
}

function tab_change() {
    document.getElementById("more_expand").classList.remove("hidden-expand");
    document.querySelector("context-menu").classList.remove("inside_tab");

    document.getElementById("reset_expand").classList.add("hidden-expand");
    document.getElementById("command_expand").classList.add("hidden-expand");
    document.getElementById("contributor_expand").classList.add("hidden-expand");
    document.getElementById("license_expand").classList.add("hidden-expand");
    document.getElementById("version_expand").classList.add("hidden-expand");
}

function tab_reset() {
    playSE();
    document.querySelector("context-menu").classList.add("inside_tab");
    document.getElementById("more_expand").classList.add("hidden-expand");
    document.getElementById("reset_expand").classList.remove("hidden-expand");
}

function tab_command() {
    playSE();
    document.querySelector("context-menu").classList.add("inside_tab");
    document.getElementById("more_expand").classList.add("hidden-expand");
    document.getElementById("command_expand").classList.remove("hidden-expand");
}

function tab_contributor() {
    playSE();
    document.querySelector("context-menu").classList.add("inside_tab");
    document.getElementById("more_expand").classList.add("hidden-expand");
    document.getElementById("contributor_expand").classList.remove("hidden-expand");
}

function tab_license() {
    playSE();
    document.querySelector("context-menu").classList.add("inside_tab");
    document.getElementById("more_expand").classList.add("hidden-expand");
    document.getElementById("license_expand").classList.remove("hidden-expand");
}

function tab_version() {
    playSE();
    document.querySelector("context-menu").classList.add("inside_tab");
    document.getElementById("more_expand").classList.add("hidden-expand");
    document.getElementById("version_expand").classList.remove("hidden-expand");
}

function call_alert(content) {
    try {
        clearTimeout(cutalert);
    } catch {}

    document.querySelector("alert-content").innerHTML = content;
    document.querySelector("alert-box").classList.remove("alert-hidden");

    cutalert = setTimeout(() => {
        document.querySelector("alert-box").classList.add("alert-hidden");
    }, 1000);
}

function clear_note() {
    playSE();
    setCookie("key", "");
    clear_charlist();
    textarea.value = "";
    call_alert("모든 노트의 내용을 비웠습니다.");
}

function clear_setting() {
    playSE();
    setCookie("italic", "");
    setCookie("bold", "");
    setCookie("underline", "");
    setCookie("align", "0");
    setCookie("font", "0");
    setCookie("command", "");
    setCookie("loweyes", "");
    setCookie("size", "1");
    setCookie("shotcut0_target", "");
    setCookie("shotcut1_target", "");
    setCookie("shotcut2_target", "");
    setCookie("shotcut3_target", "");
    setCookie("shotcut0_covert", "");
    setCookie("shotcut1_covert", "");
    setCookie("shotcut2_covert", "");
    setCookie("shotcut3_covert", "");
    location.reload();
}

function clear_all() {
    playSE();
    setCookie("key", "");
    setCookie("italic", "");
    setCookie("bold", "");
    setCookie("underline", "");
    setCookie("align", "0");
    setCookie("font", "0");
    setCookie("command", "");
    setCookie("loweyes", "");
    setCookie("size", "1");
    setCookie("shotcut0_target", "");
    setCookie("shotcut1_target", "");
    setCookie("shotcut2_target", "");
    setCookie("shotcut3_target", "");
    setCookie("shotcut0_covert", "");
    setCookie("shotcut1_covert", "");
    setCookie("shotcut2_covert", "");
    setCookie("shotcut3_covert", "");
    location.reload();
}

function register_shotcut(index, target, convert) {
    shotcut[0][index] = target;
    shotcut[1][index] = convert;
    cookie_register_shotcut(index);
    sync_shotcut();
}

function cookie_register_shotcut(index) {
    setCookie(`shotcut${index}_target`, shotcut[0][index]);
    setCookie(`shotcut${index}_convert`, shotcut[1][index]);
}

function sync_shotcut() {
    useslot = 0;
    [0, 1, 2, 3].forEach(i => {
        if(shotcut[0][i] === "" || shotcut[1][i] === "") document.getElementById(`slot${i}`).innerHTML = "비어있음";
        else {
            useslot += 1;
            document.getElementById(`slot${i}`).innerHTML = `${shotcut[0][i]} -> ${shotcut[1][i]}`;
        }
    });
    if(useslot) {
        document.getElementById(`shotcut_stat`).innerHTML = `${useslot}개의 단축어를 사용 중 입니다.`;
    }
    
}

function shotcut_event() {
    [0, 1, 2, 3].forEach(i => {
        if (textarea.value.endsWith(`${shotcut[0][i]}`) && shotcut[0][i] != "") {
            textarea.value = textarea.value.slice(0, -shotcut[0][i].length);
            textarea.value = textarea.value + shotcut[1][i];

            charlist = Hangul.disassemble(textarea.value);
            setCookie('key', return_charlist());
            call_alert(`${i + 1}번 단축어로 대치하였습니다.`);
        }
    });
}

function test_register_shotcut(id) {
    st = prompt("shotcut_target");
    sc = prompt("shotcut_covert");

    register_shotcut(id, st, sc);
}

function app_exit() {
    parent.app_close();
}

function share() {
    share_box.innerHTML = '<img class="qrcode" src="https://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=' + textarea.value + '">';
    share_box.classList.add("expand-share-box");
}