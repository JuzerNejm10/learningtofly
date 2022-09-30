const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let radius = Math.round(Math.random() * (180 - 80) + 80);

let xMax = canvas.width-100, xMin = 100;
let yMax = canvas.height-100, yMin = 100;

let x = Math.round((Math.random() * (xMax - xMin) + xMin));
let y = Math.round((Math.random() * (yMax - yMin) + yMin));

ctx.shadowBlur = 10;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;

let r, g, b;
let bx, by, cx, cy;

let pavlovXmax=0, pavlovYmax=0, pavlovXmin=0, pavlovYmin = 0;
let reflexXmax = false, reflexYmax = false, reflexXmin = false, reflexYmin = false;
let courseXmax = "shrink", courseXmin = "shrink", courseYmax = "shrink", courseYmin = "shrink";

function draw() {
	r = Math.round(Math.random() * (255 - 20) + 20);
	g = Math.round(Math.random() * (255 - 20) + 20);
	b = Math.round(Math.random() * (255 - 20) + 20);

	ctx.fillStyle = 'rgb('+r+','+g+','+b+',0.073)';
	ctx.shadowColor = 'rgb('+r+','+g+','+b+',1)';

	rndbxby = Math.round((Math.random() * (160 - 20) + 20));
	rndcxcy = Math.round((Math.random() * (160 - 20) + 20));

	bx = x + (radius * Math.cos(rndbxby));
	by = y + (radius * Math.sin(rndbxby));
	cx = x + (radius * Math.cos(rndcxcy));
	cy = y + (radius * Math.sin(rndcxcy));
}


function pavlov() {
	if (x>xMax+100) {
		x-=radius/2;
		pavlovXmax++;
		reflexXmax = true;
	}
	else if (y>yMax+100){
		y-=radius/2;
		pavlovYmax++;
		reflexYmax = true;
	}
	else if (x<xMin-100) {
		x+=radius/2;
		pavlovXmin++;
		reflexXmin = true;
	}
	else if (y<yMin-100) {
		y+=radius/2;
		pavlovYmin++;
		reflexYmin = true;
	}
	else {
		ctx.moveTo(x, y);
	    ctx.lineTo(bx, by);
	    ctx.lineTo(cx, cy);
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
	}	

	if (reflexXmax==true) {
		if (xMax>xMin&&courseXmax=="shrink") {
			xMax--;
		}
		else {
			xMax++;
			if (xMax<=canvas.width-100&&xMax>=100) {
				courseXmax="expand";
			}
			else {
				courseXmax="shrink";
			}
		}	
		reflexXmax = false;
	}	

	if (reflexYmax==true) {
		if (yMax>yMin&&courseYmax=="shrink") {
			yMax--;
		}
		else {
			yMax++;
			if (yMax<=canvas.height-100&&yMax>=100) {
					courseYmax="expand";
				}
				else {
					courseYmax="shrink";
				}
		}
		reflexYmax = false;
	}		

	if (reflexXmin==true) {
		if (xMax>xMin&&courseXmin=="shrink") {
			xMin++;
		}
		else {
			xMin--;
			if (xMin<=canvas.width-100&&xMin>=100) {
					courseXmin="expand";
				}
				else {
					courseXmin="shrink";
				}
		}
		reflexXmin = false;
	}	

	if (reflexYmin==true) {
			if (yMax>yMin&&courseYmin=="shrink") {
				yMin++;
			}
			else {
				yMin--;
				if (yMin<=canvas.height-100&&yMin>=100) {
					courseYmin="expand";
				}
				else {
					courseYmin="shrink";
				}
			}

		reflexYmin = false;
	}	
}

let rndIf;

function update() {
	ctx.clearRect(0,0,canvas.width,canvas.height);

	draw();

	rndIf = Math.random() * (1.5 - 0.1) + 0.1;

	if (rndIf<0.7) {
		x+=Math.random() * (1.5 - 0.5) + 0.5;
		y-=Math.round(Math.random() * (1.9 - 0.3) + 0.3)*15.72;
		pavlov();
	}
	else if (rndIf>=0.7 && rndIf<1) {
		x-=(Math.random() * (1.5 - 0.5) + 0.5)*10;
		y+=Math.random() * (1.9 - 0.5) + 0.5;
		pavlov();
	}
	else if (rndIf>=1 && rndIf<1.2) {
		y-=Math.random() * (1.9 - 0.3) + 0.3;
		pavlov();
	}
	else if (rndIf>=1.2 && rndIf<=1.4) {
		x+=(Math.round(Math.random() * (1.5 - 0.1) + 0.1))*15.5;
		y+=(Math.random() * (1.9 - 0.3) + 0.3)*30;
		pavlov();
	}
	else {
		x+=(Math.random() * (1.5 - 0.1) + 0.1)*5;
		pavlov();
	}

	requestAnimationFrame(update);
}

update();
