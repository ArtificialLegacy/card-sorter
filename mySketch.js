let cards = {
	"A": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	"10": 10,
	"J": 11,
	"Q": 12,
	"K": 13,
};

let scramCounter = 0;
let inOrder = false;

let correctCount = 0;

let sorCounter = 0;

let cardsS = [];
let cardsZ = [];

let stage = 1;

let update = 0;

function setup() {
	createCanvas(1000, 500);
	background(0);
	for(z in cards){
		cardsS.push(z);
		cardsZ.push(z);
	}
	textSize(20);
}

function draw(){
	clear();
	fill(100);
	rect(0, 0, 1000, 500);
	rect(0, 400, 1000, 100);
	
	update++;
	if(update >= 1){
		update = 0;
		if(stage == 1){
			if(scramCounter < 13){
				let pick = floor(random(0, cardsS.length));
				cardsZ[scramCounter] = cardsS[pick];
				cardsS.splice(pick, 1);
				scramCounter++;
			} else {
				stage = 2;	
			}
		} else {
			if(sorCounter < 12){
				i = sorCounter;
				if(cards[cardsZ[i]] > cards[cardsZ[i+1]]){
					let temp = cardsZ[i];
					cardsZ[i] = cardsZ[i+1];
					cardsZ[i+1] = temp;
				} else {
					correctCount++;
				}
				sorCounter++;
			} else {
				sorCounter = 0;
				correctCount = 0;
			}
			if(correctCount == 12){
				inOrder = true;
				stage = 3;
			}
		}
	}
	
	for(i = 0; i < cardsZ.length; i++){
		fill(0);
		text(cardsZ[i], 40*i+20, 50);
		if(stage == 1){
			text("Scrambling...", 20, 75);
		} else if(stage == 2) {
			text("Sorting...", 20, 75);
		} else {
			text("Completed!", 20, 75);	
		}
	}
	textAlign(CENTER);
	text("Scramble", 500, 450);
	textAlign(LEFT);
}

function mousePressed(){
	if(mouseY > 400){
		scramCounter = 0;
		sorCounter = 0;
		cardsS = [];
		cardsZ = [];
		for(z in cards){
			cardsS.push(z);
			cardsZ.push(z);
		}
		stage = 1;	
	}
}
