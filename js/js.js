var total_qs = 18;
var min_num = 1;
var min_num2 = 1;
var max_num = 10;
var max_num2 = 10;
var add = true;
var minus = true;
var div = false;
var mult = false;
var setTimer;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function setup (qs){
	document.getElementById("flexContainer").innerHTML = "";
	clearInterval(setTimer);
	var tog_on = 0;
	var tog_ops = [];
	if (add == true){
		tog_on++;
		tog_ops.push(" + ");
	}
	if (minus == true){
		tog_on++;
		tog_ops.push(" - ");
	}
	if (div == true){
		tog_on++;
		tog_ops.push("\\( \\div\\) ");
	}
	if (mult == true){
		tog_on++;
		tog_ops.push("\\( \\times\\) ");
	}
	if (tog_on == 0){
		plusTog.classList.toggle("selected");
		add = !add;
		tog_on++;
		tog_ops.push(" + ");
	}
	var max_q = Math.ceil(qs/tog_on);
	//console.log(max_q);
	var add_total = 0;
	var minus_total = 0;
	var div_total = 0;
	var mult_total = 0;
	
	for (let i = 1; i < qs+1; i++) {
		//Randomly get a question type and keep track of total question types for balance
		var q_type = "";
		do{
			q_type = tog_ops[getRndInteger(0,tog_ops.length-1)];
			//console.log(q_type);
		} 
		while ((add_total >= max_q) && (minus_total >= max_q) && (div_total >= max_q) && (mult_total >= max_q));
		//Create a question with that question type
		var ans = 0;
		var b = 0;
		var a = 0;
		if (q_type == "\\( \\div\\) "){
			div_total++;
			ans = getRndInteger(2,12);
			b = getRndInteger(min_num2,max_num2);
			a = b * ans;
		}
		else if(q_type == "\\( \\times\\) "){
			a = getRndInteger(min_num2,max_num2);
			b = getRndInteger(min_num2,max_num2);
		}
		else{
			b = getRndInteger(min_num,max_num);
			a = getRndInteger(min_num,max_num);
		}
		if (q_type == " + "){
			add_total++;
			ans = a + b;
		}
		else if (q_type == " - "){
			minus_total++;
			ans = a - b;
		}
		else if (q_type == "\\( \\times\\) "){
			mult_total++;
			ans = a * b;
		}
		
		//Create the div elements with the corresponding text
		var new_q = document.createElement("div");
		new_q.setAttribute("id", i);
		new_q.setAttribute("class", "q-item")
		new_q.innerHTML = '<div class="q-number">' + i +')</div><div class="q"><span id="rand' + i + '-1">'+ a +'</span><span id="sym'+ i +' "> '+q_type+'</span><span id="rand'+i+'-2">'+b+'</span> = </div> <div class="a">'+ans+'</div>';
		document.getElementById("flexContainer").append(new_q);
	}
	MathJax.Hub.Typeset()
	document.getElementById("flexContainer").style.opacity = '100%';
	document.getElementById("startRow").style.width = 22*8.3 + 'px';
	var max_time = 61;
	var current_time = max_time;
	setTimer = setInterval(function() {
		current_time--;
		document.getElementById("timer_p").innerHTML = current_time;
		if (current_time == 0){
			clearInterval(setTimer);	
			answers = document.getElementsByClassName("a");
			//console.log(answers[1]);
			//console.log(document.getElementById("timer"))
			for (var i = 0; i < answers.length; i++){
				answers[i].classList.add("visible");
			}
		}
	}, 1000);//end setTimer
}//end setup

document.getElementById("start").onclick = function() {setup(total_qs)};

var plusTog = document.getElementById("plusTog");
var minusTog = document.getElementById("minusTog");
var timesTog = document.getElementById("timesTog");
var divideTog = document.getElementById("divideTog");
var mild = document.getElementById("mild");
var med = document.getElementById("med");
var spicy = document.getElementById("spicy");

plusTog.onclick = function(){
	plusTog.classList.toggle("selected");
	add = !add;
}

minusTog.onclick = function(){
	minusTog.classList.toggle("selected");
	minus = !minus;
}

timesTog.onclick = function(){
	timesTog.classList.toggle("selected");
	mult = !mult;
}

divideTog.onclick = function(){
	divideTog.classList.toggle("selected");
	div = !div;
}

mild.onclick = function(){
	mild.classList.remove("selected");
	med.classList.remove("selected");
	spicy.classList.remove("selected");
	mild.classList.add("selected")
	total_qs = 18;
	min_num = 1;
	min_num2 = 1;
	max_num = 10;
	max_num2 = 5;
}

med.onclick = function(){
	mild.classList.remove("selected");
	med.classList.remove("selected");
	spicy.classList.remove("selected");
	med.classList.add("selected")
	total_qs = 24;
	min_num = 1;
	min_num2 = 1;
	max_num = 20;
	max_num2 = 12;
}

spicy.onclick = function(){
	mild.classList.remove("selected");
	med.classList.remove("selected");
	spicy.classList.remove("selected");
	spicy.classList.add("selected")
	total_qs = 30;
	min_num = 1;
	min_num2 = 1;
	max_num = 40;
	max_num2 = 30;
	//console.log(max_num2);
}

document.getElementById("timer").onclick = function(){
	clearInterval(setTimer);
	document.getElementById("timer_p").innerHTML = 0;
	answers = document.getElementsByClassName("a");
			for (var i = 0; i < answers.length; i++){
				answers[i].classList.add("visible");
			}
}
