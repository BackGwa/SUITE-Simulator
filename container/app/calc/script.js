window.addEventListener("load", () => {
    parent.app_load();
})

function back_site() {
    parent.app_close();
}

let displayValue = "";

function appendToDisplay(value) {
    displayValue += value;
    document.getElementById("display").value = displayValue;
}

function clearDisplay() {
    displayValue = "";
    document.getElementById("display").value = "";
}

function calculateResult() {
    try {
        result = (Number.isInteger(eval(displayValue))) ? eval(displayValue) : eval(displayValue).toFixed(2);
        if(result == Infinity) {
            document.getElementById("display").value = "0으로 나눌 수 없습니다.";
            displayValue = "";
            return;
        }
        add_history(displayValue, result);
        displayValue = result;

        document.getElementById("display").value = displayValue;
    } catch (error) {
        console.error(error);
        document.getElementById("display").value = "오류";
    }
}

function pm_change() {
    if(parseInt(displayValue) > 0) {
        displayValue = -parseInt(displayValue);
    } else {
        displayValue = Math.abs(parseInt(displayValue));
    }
    document.getElementById("display").value = displayValue;
}

function remove_oneword() {
    displayValue = displayValue.slice(0, -1);
    document.getElementById("display").value = displayValue;
}

const history_list = document.querySelector("history-area");

function add_history(evals, result) {
    history_list.innerHTML = `
    <history-item onclick="change_this(${result})">
        <histroy-value>
            ${evals} = ${result}
        </histroy-value>
    </history-item>` + history_list.innerHTML;
}

function change_this(result) {
    displayValue = result;
    document.getElementById("display").value = displayValue;
}