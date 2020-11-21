/*
Aethetic Simulation of a sunset and Aurora Borealis.

- Dhriti Verma [Tech Syndicate @Amity International School Sec-46]
*/

let sunset;
let stars;
let x_star = [];
let y_star = [];
let size = []; 

function setup() {
  createCanvas(400, 400);
  
  stars = createSlider(20, 150, 75, 5)
  stars.position(278, 350);
  stars.style('width', '100px');
  
  sunset = createSlider(0, 100, 0, 1);
  sunset.position(285, 330)
  sunset.style('width', '100px');
  
  //so that stars do not move around crazily on every frame change
  for (let i=0; i<175; i++){
    x_star.push(random(width));
    y_star.push(random(280));
    size.push(random(0.1, 4));
  }
}


function draw() {
  
  //background gradient
  let rgb_change = sunset.value();
  udGradient(
    color(255-(rgb_change*2.55), 200-(rgb_change*1.5), 100-(rgb_change*0.6)), 
    color(240-(rgb_change*1.8), 100+(rgb_change*0), 150+(rgb_change*0.5))
  );
  

  let starval = stars.value();
  
  //mountains baseline variable
  let baseline = 260;
  let base2 = 320;
  
  //sun related value
  let ysun = baseline-50;
  
  //stars
  fill(255, 255, 255, 80+(rgb_change*2));
  for (let i=0; i< starval; i++){
    noStroke()
    circle(x_star[i], y_star[i], size[i]);
  }

  //sun
  for (let i = 0; i<100; i++){
    fill(255, 255, 250+rgb_change, 200 - (i*2));
    circle(220-(rgb_change/2), ysun+(rgb_change*2), 100);
  }
  
  //making opacity change easier
  let auroraStartBlue1 = (rgb_change-50)*3.5;
  let auroraStartBlue2 = (rgb_change-50)*2;
  //the actual stuff - northern lights
  if (rgb_change>50){
  for (let i = 0; i<400; i++){
    noFill()

    stroke(60+(i/3), 255+(i/3), 190+(i/3), auroraStartBlue1 - (i));
    bezier(0, 120-(i/1.2)+(rgb_change/10), 150-(rgb_change), 95-(i/2), 260, 135-(i/2)-(rgb_change/4), 90-(rgb_change/10), 145-(i/5));
    
    stroke(35+(i/3), 255+(i/3), 130+(i/3), auroraStartBlue2 - (i/3));
    bezier(90-(rgb_change/10), 145-(i/8), 300-(rgb_change/10), 150-(i/2)+(rgb_change/10), 340+(rgb_change/10), 40-(i/2)+(rgb_change/4), 400, 110-(i/2));
    
  }  
  
  //bg shading
  let no = 0;
  let opacity = (rgb_change-50)*3.5;
  while (opacity>0){
    stroke(100, 255, 170, opacity);
    line(0, 111+no, width, 111+no);
    line(0, 110-no, width, 110-no);
    no++;
    opacity-=2;
    }
  }
  
  //moon
  fill(255, 255, 255);
  circle(400-(rgb_change), -130+(rgb_change*2), 50);
  
  noStroke();
  //ground for the sun to sink behind
  fill(240-(rgb_change*1.8), 100+(rgb_change*0), 150+(rgb_change*0.5));
  rect(0, baseline, width, height-baseline);
  
  //mountains
  fill(40-(rgb_change/3), 50-(rgb_change/3), 70-(rgb_change/3));
    //mountain up left
  quad(0, baseline-70, 50, baseline-90, 140, baseline, 0, baseline);
  quad(50, baseline-55, 140, baseline-40, 240, baseline, 0, baseline);
    //mountain up right
  quad(width, baseline-22, 260, baseline-25, 200, baseline, width, baseline);
  quad(width, baseline-50, 340, baseline-40, 280, baseline, width, baseline);
  
  fill(40, 40, 60, 100);
    //mountain up left shadow
  quad(0, baseline+60, 50, baseline+75, 140, baseline, 0, baseline);
  quad(50, baseline+55, 140, baseline+40, 240, baseline, 0, baseline);
    //mountain up right shadow
  quad(width, baseline+22, 260, baseline+25, 200, baseline, width, baseline);
  quad(width, baseline+50, 340, baseline+40, 280, baseline, width, baseline);
    //mountain down left shadow
  quad(0, base2+75, 45, base2+85, 135, base2, 0, base2);
  triangle(100, base2+50, 260, base2, 0, base2);
    
  //clouds
  cloud1(180-(rgb_change/2), baseline-110, 190);
  cloud1(-80+(rgb_change*7), baseline-63, 230);
  cloud2(355-(rgb_change*5), baseline-39, 160, 60);
  
  cloud2(1100-(rgb_change*8), baseline-60, 140, 80);
  cloud1(0+(rgb_change/4), baseline-15, 220);
  
  //ice aesthetics
  iceStrokes(-60, 370, 2, 100, 0.01, 0.5);
  iceStrokes(60, 340, 0.5, 150, 0.002, 0.5);
  iceStrokesRev(70, 270, 1.75, 100, 0.003, 0.4);
  iceStrokesRev(160, 385, 3, 50, 0.01, 0.5);
  iceStrokes(230, 295, 1.5, 150, 0.007, 0.5);
  

  //mountains - contd.
  fill(0, 0, 20-(rgb_change/3));
  //mountain down left
  quad(0, base2-75, 45, base2-85, 140, base2, 0, base2);
  triangle(100, base2-50, 260, base2, 0, base2);
  //mountain down right
  quad(width, base2-50, 290, base2-20, 230, height, width, height);
  
  //just some text
  fill(155+rgb_change);
  textSize(16);
  textStyle(BOLD);
  textFont('Helvetica');
  text('No. of stars', 286, 383);
  text('Sunset', 310, 328);
   
  textStyle(NORMAL);
  textFont('Georgia')
  textSize(18);
  text('Juneau (Capital of Alaska)', 10, 20);
  textSize(15);
  text('[58.3019° N, 134.4197° W]', 24, 40);
  
}

//ice aesthetics
function iceStrokes(x, y, i, o, diffthick, diffx){
  fill(255, 255, 255, o)
  noStroke()
  let thickness = 0;
  while(thickness<i){
    ellipse(x, y, thickness, thickness)
    x+=diffx;
    thickness+=diffthick;
  }
}

function iceStrokesRev(x, y, i, o, diffthick, diffx){
  fill(255, 255, 255, o)
  noStroke()
  let thickness = i;
  while(thickness>0){
    ellipse(x, y, thickness, thickness)
    x+=diffx;
    thickness-=diffthick;
  }
}

//background gradient
function udGradient(color1, color2){
  let h = 0;
  
  for (let i=0; i<height*4; i++){
    let l = lerpColor(color1, color2, i/800);
    stroke(l);
    line(0, h, width, h);
    h += height/1100;
  }
}

//clouds
function cloud1(x, y, t){
  noStroke();
  fill(255, 255, 255, t);
  rect(x, y, 150, 6, 100);
  rect(x+60, y-12, 110, 6, 100);
  rect(x-20, y-12, 70, 6, 100);
  rect(x+25, y-24, 100, 6, 100);
}

function cloud2(x, y, t, l){
  noStroke();
  fill(255, 255, 255, t);
  rect(x, y, l*10/6, 6, 100);
  rect(x-l*2.5/6, y-12, l*17/6, 6, 100);
  rect(x+l, y-24, l, 6, 100);
}