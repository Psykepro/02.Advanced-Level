var body = document.body;

sessionVisitsCount();
localVisitsCount();

if(!localStorage.name){
    var label = document.createElement('label'),
        input = document.createElement('input');

    label.setAttribute('for', 'name');
    label.innerText = 'Name:';
    input.setAttribute('id', 'name');
    input.setAttribute('type', 'text');
    input.addEventListener('change', addNameToLocalStorage);

    body.appendChild(label);
    body.appendChild(input);
}else{
    var greetingHeader = document.createElement('h1');
    greetingHeader.innerText = 'Welcome back ' + localStorage.name + '!';

    body.appendChild(greetingHeader);
}


function addNameToLocalStorage(){
    localStorage.setItem('name', this.value);
}

function sessionVisitsCount() {
    if (!sessionStorage.counter) {
        sessionStorage.setItem("counter", 0);
    }

    var currentCount = parseInt(sessionStorage.getItem("counter"));
    currentCount++;
    sessionStorage.setItem("counter", currentCount);
    document.getElementById("session-count").innerText = currentCount.toString();
}

function localVisitsCount() {
    if (!localStorage.counter) {
        localStorage.setItem("counter", 0);
    }

    var currentCount = parseInt(localStorage.getItem("counter"));
    currentCount++;
    localStorage.setItem("counter", currentCount);
    document.getElementById("local-count").innerText = currentCount.toString();
}
