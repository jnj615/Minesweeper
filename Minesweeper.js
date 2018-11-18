$(document).ready(() => {
var width;
var height;
var mineNum;
var mineArray = [];
var highscore = 100000;
var bombCount;
var time;
var t;
var started;
var winAmount;
var amount;
var promptWin = "You win! Press restart to play again.";
var promptLose = "You Lose! Press restart to play again.";
var lost;
var win;

initial();


function initial(){
	lost = false;
	win = false;
	document.getElementById("status").innerHTML = "";
	t=0;
	document.getElementById("timer").innerHTML = "timer: "+t;	
	started=0;
	promptWidth();
	promptHeight();
	promptMines();
	makeArray();
}

function makeArray(){
	for(var y=0; y< height; y++){
		mineArray[y] = [];
		for(var x=0; x<width; x++){
			mineArray[y][x] = 0;
		}
	}
	generateMines();
}

function makeBoard(){
	for(var y=0; y<height; y++){
		var row = "<div class='row'><p>";
		for(var x=0; x<width; x++){
			var id = x+" "+y;
       var button = "<button type='button' id='"+id+"' c=0 f=0 x="+x+" y="+y+"></button>";
			row +=button;
		}
		row += "</p></div>";
		$('.board').append(row);
	}
	addUnderlay();
}

function generateMines(){
	i=0
	while(i<mineNum){
		var x = Math.floor(Math.random()*width);
		var y = Math.floor(Math.random()*height);
		if(mineArray[y][x] != -1){
			mineArray[y][x]= -1;
			i++;
			increment(x,y);
		}
	}
	bombCount = mineNum;
	document.getElementById("bombCount").innerHTML = "Bomb Count: "+bombCount;
	makeBoard();
}

function validate(x,y){
	if(x<0||x>=width||y<0||y>=height||mineArray[y][x]==-1){
		return false;
	}else{
		return true;
	}
}

function increment(x,y){
	//add 1 to all surrounding areas
	if(validate(x,y-1)){mineArray[y-1][x]++;}
	if(validate(x,y+1)){mineArray[y+1][x]++;}
	if(validate(x-1,y)){mineArray[y][x-1]++;}
	if(validate(x+1,y)){mineArray[y][x+1]++;}
	if(validate(x-1,y-1)){mineArray[y-1][x-1]++;}
	if(validate(x+1,y-1)){mineArray[y-1][x+1]++;}
	if(validate(x-1,y+1)){mineArray[y+1][x-1]++;}
	if(validate(x+1,y+1)){mineArray[y+1][x+1]++;}
}

function addUnderlay(){
	for(var y=0; y<height; y++){
		for(var x=0; x<width; x++){
			var id = x+" "+y;
			var button = document.getElementById(id);
			button.value = mineArray[y][x];

		}
	}
}

function clearBoard(){
	$('.board').empty();
	mineArray = [];
	initial();	
}


function spread(xx,yy){
	var x = parseInt(xx);
	var y = parseInt(yy);
	var btn = document.getElementById(x+" "+y);

	if((btn!=null)&&($(btn).attr('c')!=1)&&($(btn).attr('f')!=1)&&($(btn).val()!=-1)){
		amount++;
		$(btn).attr('c',1);
		$(btn).text($(btn).val());
		
		if($(btn).val()==0){
		$(btn).text("");
		$(btn).addClass('showing');
		spread(x,y-1);
		spread(x,y+1);
		spread(x-1,y);
		spread(x+1,y);
		spread(x-1,y-1);
		spread(x+1,y-1);
		spread(x-1,y+1);
		spread(x+1,y+1);
		}
	}
}


$('.board').on('click','button', function(e){
	if(!win&&!lost){

	if(started==0){
		time = setInterval(myTimer, 1000);
		started=1;
	}

	if(e.shiftKey && $(this).attr('c')==0){
		if($(this).attr('f')==0){
			this.setAttribute("f",1);
			$(this).text("X");
			bombCount--;
			document.getElementById("bombCount").innerHTML = "Bomb Count: "+bombCount;
		}else{
			this.setAttribute("f",0);
			$(this).text("");
			bombCount++;
			document.getElementById("bombCount").innerHTML = "Bomb Count: "+bombCount;
		}
	}else if($(this).attr('c')==0){
		if($(this).attr('f')==0){
		$(this).text($(this).val());
		if($(this).val()==-1){
			$(this).text("B");
			document.getElementById("status").innerHTML = promptLose;
			lost=true;
			clearInterval(time);
			document.getElementById("timer").innerHTML = "timer: "+t;
			t=0;
		}else if($(this).val()==0){
			var x = $(this).attr('x');
			var y = $(this).attr('y');
			spread(x,y);
		}else{
			this.setAttribute("c",1);
			amount++;}	
		}
	}else if($(this).val()!=0){
		var adajBombs = $(this).val();
		var flagged = 0;
		var x = parseInt($(this).attr('x'));
		var y = parseInt($(this).attr('y'));
	
		var btn1 = $(document.getElementById((x)+" "+(y-1)));
		var btn2 = $(document.getElementById((x)+" "+(y+1)));
		var btn3 = $(document.getElementById((x-1)+" "+(y)));
		var btn4 = $(document.getElementById((x+1)+" "+(y)));
		var btn5 = $(document.getElementById((x+1)+" "+(y-1)));
		var btn6 = $(document.getElementById((x+1)+" "+(y+1)));
		var btn7 = $(document.getElementById((x-1)+" "+(y-1)));
		var btn8 = $(document.getElementById((x-1)+" "+(y+1)));


		if(btn1!=null&&btn1.attr('f')==1){flagged++;}
		if(btn2!=null&&btn2.attr('f')==1){flagged++;}
		if(btn3!=null&&btn3.attr('f')==1){flagged++;}
		if(btn4!=null&&btn4.attr('f')==1){flagged++;}
		if(btn5!=null&&btn5.attr('f')==1){flagged++;}
		if(btn6!=null&&btn6.attr('f')==1){flagged++;}
		if(btn7!=null&&btn7.attr('f')==1){flagged++;}
		if(btn8!=null&&btn8.attr('f')==1){flagged++;}



		if(adajBombs==flagged){
			queue = [];
			queue.push(btn1);
			queue.push(btn2);
			queue.push(btn3);
			queue.push(btn4);
			queue.push(btn5);
			queue.push(btn6);
			queue.push(btn7);
			queue.push(btn8);
			var hit = false;
		
		while(queue.length > 0){
			next = queue.shift();
		
			if(next!=null){
			if(next.attr('f')==0&&next.attr('c')==0){
				next.attr('c',1);
				amount++;
				next.text(next.val());
				if(next.val()==-1){
					next.text('B');
					hit=true;
				}
			}
			}
		}

		if(hit){
			document.getElementById("status").innerHTML = promptLose;
			lost=true;
			clearInterval(time);
			document.getElementById("timer").innerHTML = "timer: "+t;
			t=0;
		}
		}
	}


	if((winAmount==amount)&&(bombCount>-1)&&(!lost)){
		if(t<highscore){
			highscore = t;
			document.getElementById("highscore").innerHTML = "Highscore: "+highscore+" seconds";
		}
		
		clearInterval(time);
		document.getElementById("timer").innerHTML = "timer: "+t;
		t=0;
		document.getElementById("status").innerHTML = promptWin;
		win = true;
	}


	}
});


function myTimer(){
	t++;
	document.getElementById("timer").innerHTML = "timer: "+t;
}



$('.restart').on('click',function(e){
	clearBoard();
});



//****************************Prompts***********************************************************************************************
function promptWidth(){
	var widthPrompt = prompt("Enter a width (min 8, max 40)");
	widthPrompt = parseInt(widthPrompt);
	if(widthPrompt>=8 && widthPrompt<=40){
		width = widthPrompt;
	}else{
		width = 8;
	}	
}

function promptHeight(){
	var heightPrompt = prompt("Enter a height (min 8, max 30)");
	heightPrompt = parseInt(heightPrompt, 10);
	if(heightPrompt>=8 && heightPrompt<=30){
		height = heightPrompt;
	}else{
		height = 8;
	}
}

function promptMines(){
	var maxMines = (width*height)-1;
	var mineNumPrompt = prompt("Enter the number of mines (min 1, max "+maxMines+")");
	mineNumPrompt = parseInt(mineNumPrompt);
	if(mineNumPrompt>0 && mineNumPrompt<=maxMines){
		mineNum = mineNumPrompt;
	}else{
		mineNum = 1;
	}	
	bombCount = mineNum;
	winAmount = (width*height)-mineNum;
	amount=0;
}

});