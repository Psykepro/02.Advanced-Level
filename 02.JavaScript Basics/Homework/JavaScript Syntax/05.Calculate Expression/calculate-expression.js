function calc(expression) {
    if (expression != 0) {
        expression = expression.replace(/[^0-9\-+*/()%|&^><!~]/g, '');
        document.getElementById('result').innerHTML = eval(expression);
    } else {
        document.getElementById('result').innerHTML = 'There is no expression.';
    }

}