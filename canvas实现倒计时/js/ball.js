var ball = {x:512 , y:100 , r:20 , g:2 , vx:-4 , vy:0 , color: '#005588'};
window.onload = function(){
	var canvas = document.getElementById('canvas');

	canvas.width = 1024;
	canvas.height = 768;

	var context = canvas.getContext('2d');

	setInterval(function(){
		render(context);
		update();
	},50)
}
function update(){
	ball.x += ball.vx;
	ball.y += ball.vy;
	ball.vy += ball.g;
}
function render(){
	cxt.clearRect(0,0,cxt,canvas.width,cxt,canvas.height);

	cxt.fillStyle = ball.color;
	cxt.beginPath();
	cxt.arc(ball.x,ball.y,ball.r,0,2*Math.PI);
	cxt.closePath();

	cxt.fill();
}