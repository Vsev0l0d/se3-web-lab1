let
    Y = document.getElementById('y-value-select'),
    R = document.getElementById("r-value-select"),
    X_group = document.getElementsByName("x-group")

function checkY() {
    Y = document.getElementById('y-value-select')
    if (Y.value.trim() === ""){
        Y.setCustomValidity("Заполните поле");
        return false
    } else if (!isFinite(Y.value)){
        Y.setCustomValidity("Должно быть числом");
        return false
    } else if (Y.value >= 5 || Y.value <= -3){
        Y.setCustomValidity("Должно быть в диапазоне (-3; 5)");
        return false
    } else return true
}

function checkR() {
    R = document.getElementById("r-value-select")
    if (R.value.trim() === ""){
        R.setCustomValidity("Заполните поле");
        return false
    } else if (!isFinite(R.value)){
        R.setCustomValidity("Должно быть числом");
        return false
    } else if (R.value >= 5 || R.value <= 2){
        R.setCustomValidity("Должно быть в диапазоне (2; 5)");
        return false
    } else return true
}

const submit = function(e) {
    if (!(checkR() && checkY())) return
    e.preventDefault();

    const formData = new FormData();
    let xValue;
    for ( let i = 0; i < X_group.length; i++) {
        if(X_group[i].checked) {
            xValue = X_group[i].value
            break;
        }
    }
    formData.append("x_value", xValue);
    formData.append('y_value', Y.value);
    formData.append('r_value', R.value);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'server/check.php')

    xhr.onreadystatechange = function (){
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("ans").innerHTML = xhr.responseText
        }
    }
    xhr.send(formData)
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('submitButton').addEventListener('click', submit);
});

const clear = function(e) {
    e.preventDefault();

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'server/clear.php')

    xhr.onreadystatechange = function (){
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("ans").innerHTML = xhr.responseText
        }
    }
    xhr.send()
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('clearButton').addEventListener('click', clear);
});