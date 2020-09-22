let
    Y = document.getElementById('y-value-select'),
    R = document.getElementById("r-value-select"),
    X_group = document.getElementsByName("x-group")

function checkY() {
    let y = Y.value.trim().replace(",", ".")
    if (y === ""){
        Y.setCustomValidity("Заполните поле");
        return false
    } else if (!isFinite(y) || y === "-0"){
        Y.setCustomValidity("Должно быть числом");
        return false
    } else if (y >= 5 || y <= -3){
        Y.setCustomValidity("Должно быть в диапазоне (-3; 5)");
        return false
    } else return true
}

function checkR() {
    let r = R.value.trim().replace(",", ".")
    if (r === ""){
        R.setCustomValidity("Заполните поле");
        return false
    } else if (!isFinite(r) || r === "-0"){
        R.setCustomValidity("Должно быть числом");
        return false
    } else if (r >= 5 || r <= 2){
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
    formData.append('y_value', Y.value.replace(",", "."));
    formData.append('r_value', R.value.replace(",", "."));

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

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'server/table.php')

    xhr.onreadystatechange = function (){
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("ans").innerHTML = xhr.responseText
        }
    }
    xhr.send()
});