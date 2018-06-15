var flappy; // objeto passaro;
var wall;
var over;
function Bird(){

	this.x = 40; // coord x (horizontal)
	this.y = 200; // coord y (altura)
	this.r = 40; // size
	this.y = constrain(this.y, 0, 400);
	this.gravity = 0.8;
	this.velocity = 0;
	this.lift = -20;

	this.show = function(){
		ellipse(this.x, this.y, this.r, this.r);
	}

	this.update = function(){
		this.velocity += this.gravity;
		this.velocity *= 0.9;
		this.y += this.velocity;
		if(this.y > height){
			this.y = 400;
		}
		else if(this.y < 0){
			this.y = 0;
		}
	}

}


function coincide(bird,wall){

	if(bird.x > wall.x && bird.x < wall.x + wall.thic){
		if(bird.y < wall.top || bird.y > wall.top + wall.opening){
			return true;
		}
	}

	return false;

}

function Wall(){

	this.x = width + 10;
	this.opening = floor(random(100, 200));
	this.velocity = 3;
	this.top = floor(random(10, height - 10 - this.opening));
	this.thic = 40;

	this.show = function(){
		push();
		fill(200);
		rect(this.x, 0, this.thic, this.top);
		rect(this.x, this.top + this.opening, this.thic, height - this.top - this.opening);
		pop();

	}

	this.update = function(){
		this.x -= this.velocity;
	}
}


function keyPressed(){

	if(keyCode == 32){
		flappy.velocity += flappy.lift;
	}

}

function setup(){

	createCanvas(600,400);
	flappy = new Bird();
	wall = [];
	over = 0;

}


function draw(){

	background(70);
	flappy.show();
	if(over == 0){
		flappy.update();
	}

	if(frameCount % 100 == 0){
		wall.push(new Wall());
	}

	for(var i = 0; i < wall.length; i++){
		wall[i].show();
		if(over == 0){
			wall[i].update();
		}
	}

	for(var i = (wall.length)-1; i >= 0; i--){
		if(wall[i].x < -100){
			wall.splice(i,1);
		}
		if(coincide(flappy,wall[i])){
			over = 1;
		}
	}



}