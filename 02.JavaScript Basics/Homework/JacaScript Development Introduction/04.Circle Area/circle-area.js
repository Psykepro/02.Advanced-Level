function calcCircleArea () {
	var radius = document.getElementById('radius').value;
	document.body.innerHTML += "r = " + radius + "; area = " + (Math.PI*Math.pow(radius, 2)) + "<br/>";
}