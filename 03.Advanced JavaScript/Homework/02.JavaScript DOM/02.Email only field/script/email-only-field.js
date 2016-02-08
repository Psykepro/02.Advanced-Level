function validateTheEmail(){
    var pattern = /[a-zA-Z\d]+@{1}[a-zA-Z]+.{1}[a-z]+/g;
    var inputElement = document.getElementById('input');
    var outputElement = document.getElementById('output');
    var input = inputElement.value;
    var match = pattern.exec(input);

    if(match){
        outputElement.style.backgroundColor = 'lightgreen';
        outputElement.innerText = input;
    }else{
        outputElement.style.backgroundColor = 'red';
        outputElement.innerText = input;
    }
}