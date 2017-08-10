var oBox = document.getElementById('box');
var oMark = document.getElementById('mark');
var speedId = document.getElementById('speed');
var highScore = document.getElementById('high');
var allTds = [];//用于保存所有方格
var ck = 17;//方格数
var cd = 29;
var k = 3;//蛇的初始长度
var snakes = [];//初始化蛇
var x = 0,y = k-1;//蛇头坐标
var dir = 3;//蛇行动的方向
var dirLin = 1;//临时方向，防止逆行
var body = document.getElementsByTagName('body')[0];
var ji = null;//控制游戏进程
var mark = 0;//分数
var maxScore = 0;
var light = null;//控制食物闪烁
var m,n;//食物坐标
var speed = 1;
var oStart = true;
var oStop = false;
var oSpeed = true;
var ooSpeed = true;

window.onload = function(){
	for(var i=0;i<ck;i++){
		var tr = document.createElement('tr');
		var trs = [];//创建二维数组
		for(var j=0;j<cd;j++){
			var td = document.createElement('td');
			trs[j] = td;
			tr.appendChild(td);
		}
		oBox.appendChild(tr);
		allTds[i] = trs;//二维数组创建完成
	}
	for(var g=0;g<k;g++){//蛇身初始化
		snakes[g] = allTds[0][g];
		allTds[0][g].className = 'black';
	}
	snakes[snakes.length-1].className = 'head';
}

function keyDown(event){
	console.log('k')
	switch(event.keyCode){
		case 37://左键
		case 65:
			dirLin = 1;
			if(dirLin === dir){
				speed = speed + 1;
			}
			break;
		case 38://上键
		case 87:
			dirLin = 2;
			if(dirLin === dir){
				speed = speed + 1;
			}
			break;
		case 39://右键
		case 68:
			dirLin = 3;
			if(dirLin === dir){
				speed = speed + 1;
			}
			break;
		case 40://下键
		case 83:
			dirLin = 4;
			if(dirLin === dir){
				speed = speed + 1;
			}
			break;
		case 32:
			if(oStart){
				moveStart();
				food();
			}else if(oStop){
				oStop = false;
				moveStart();
			}else{
				oStop = true;
				clearTimeout(ji);
				gameStop();
			}
			break;
		case 13:
			document.location.reload();
	}
	speedId.innerHTML = 'speed: ' + parseInt(speed);
}
function snakeHidden(obj){//隐藏蛇尾，即蛇身数组的第一个
	obj[0].className = '';
}
function snakeBlock(obj){//蛇头移动
	obj[obj.length-1].className = 'head';
}
function moveStart(){
	for(var j=0;j<snakes.length;j++){
		snakes[j].className = 'black';
	}
	if(dir ===1 && dirLin != 3){
		dir = dirLin;
	}
	if(dir === 2 && dirLin != 4){
		dir = dirLin;
	}
	if(dir === 3 && dirLin != 1){
		dir = dirLin;
	}
	if(dir === 4 && dirLin != 2){
		dir = dirLin;
	}
	if(snakes.length>=10 && oSpeed){
		oSpeed = false;
		speed = speed + 1;
	}
	if(snakes.length>=20 && ooSpeed){
		ooSpeed = false;
		speed = speed + 1;
	}
	if(dir === 1){//向左
		if(y-1>=0){//如果没撞墙
			if(eatSelf(allTds[x][y])){//如果没吃到自己
				snakeHidden(snakes);
				if(x===m&&y-1===n){//如果吃到了虫子
					eatFood();
				}else{
					for(var i=0;i<snakes.length-1;i++){
						snakes[i] = snakes[i+1];
					}
					snakes[k-1] = allTds[x][y-1];//蛇头向左一步
				}
				snakeBlock(snakes);
				y--;//改变蛇头坐标
				ji = setTimeout('moveStart()',500 / speed);
			}else{
				overGameB();
			}
		}else{
			overGameA();
		}
	}
	if(dir === 2){//向上
		if(x-1>=0){
			if(eatSelf(allTds[x][y])){
				snakeHidden(snakes);
				if(x-1===m&&y===n){
					eatFood();
				}else{
					for(var i=0;i<snakes.length-1;i++){
						snakes[i] = snakes[i+1];
					}
					snakes[k-1] = allTds[x-1][y];
				}
				snakeBlock(snakes);
				x--;
				ji = setTimeout('moveStart()',500 / speed);
			}else{
				overGameB();
			}
		}else{
			overGameA();
		}
	}
	if(dir === 3){//向右
		if(y+1<cd){
			if(eatSelf(allTds[x][y])){
				snakeHidden(snakes);
				if(x===m&&y+1===n){
					eatFood();
				}else{
					for(var i=0;i<snakes.length-1;i++){
						snakes[i] = snakes[i+1];
					}
					snakes[k-1] = allTds[x][y+1]
				}
				snakeBlock(snakes);
				y++;
				ji = setTimeout('moveStart()',500 / speed);
			}else{
				overGameB();
			}
		}else{
			overGameA();
		}
	}
	if(dir === 4){
		if(x+1<ck){
			if(eatSelf(allTds[x][y])){
				snakeHidden(snakes);
				if(x+1===m&&y===n){
					snakeHidden(snakes);
					eatFood();
				}else{
					for(var i=0;i<snakes.length-1;i++){
						snakes[i] = snakes[i+1];
					}
					snakes[k-1] = allTds[x+1][y];
				}
				snakeBlock(snakes);
				x++;
				ji = setTimeout('moveStart()',500 / speed);
			}else{
				overGameB();
			}
		}else{
			overGameA();
		}
	}
}
function gameStop(){
	if(ji!=null){
		clearTimeout(ji);
	}
	snakes[snakes.length-1].className = 'head';
	if(maxScore < mark){
		maxScore = mark;
	}
	highScore.innerHTML = '最高分 ' + maxScore;
}
function overGameA(){
	gameStop();
	alert('撞墙了！最终得分：'+mark);
}
function overGameB(){
	gameStop();
	alert('吃自己了！最终得分：'+mark);
}
function eatFood(){//吃到食物
	snakes[snakes.length] = allTds[m][n];
	k++;
	mark++;
	oMark.innerHTML = 'score: ' + mark;//得分
	food();
}
function eatSelf(eat){
	var self = true;
	for(var i=0;i<snakes.length-1;i++){
		if(snakes[i] === eat){
			self = false;
		}
	}
	return self;
}
function food(){
	oStart = false;
	m = Math.floor(Math.random()*ck);//随机取0-ck-1
	n = Math.floor(Math.random()*ck);
	if(allTds[m][n].className.indexOf('black')>=0){//如果取到了黑色背景说明是蛇身要重新取
		food();
	}else{
		allTds[m][n].className = 'head';
	}
}

