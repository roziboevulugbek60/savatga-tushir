const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


canvas.width = 800;
canvas.height = 550;



const scoreText = document.getElementById("score");
const lifeText = document.getElementById("life");
const bestText = document.getElementById("best");

const restartBtn = document.getElementById("restart");
const againBtn = document.getElementById("again");

const gameOverBox = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");


const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");





let score = 0;
let life = 3;

let best =
localStorage.getItem("basketBest") || 0;


bestText.innerText = best;


let running = true;


let level = 1;







// SAVAT


let basket = {

x:350,

y:480,

width:120,

height:45,

speed:8

};







let fruits=[];


let keys={};







// BOSHQARUV


document.addEventListener(
"keydown",
e=>{

keys[e.key]=true;

});



document.addEventListener(
"keyup",
e=>{

keys[e.key]=false;

});






leftBtn.onclick=()=>{

basket.x-=60;

};


rightBtn.onclick=()=>{

basket.x+=60;

};








// MEVALAR


const fruitTypes=[

"🍎",
"🍊",
"🍒",
"🍓",
"🍇"

];





function createFruit(){


fruits.push({

x:Math.random()*740,

y:-40,

size:35,

speed:3+level,

type:
fruitTypes[
Math.floor(
Math.random()*fruitTypes.length
)
]


});


}








// CHIZISH


function drawBasket(){


ctx.font="70px Arial";


ctx.fillText(

"🧺",

basket.x,

basket.y

);


}







function drawFruits(){


fruits.forEach(
(f,i)=>{


ctx.font =
f.size+"px Arial";


ctx.fillText(

f.type,

f.x,

f.y

);



f.y += f.speed;



if(f.y>550){


fruits.splice(i,1);


life--;


lifeText.innerText=life;



if(life<=0){

endGame();

}


}



});


}









// URILISH


function checkCatch(){


fruits.forEach(
(f,i)=>{


if(

f.x < basket.x+basket.width &&

f.x+35 > basket.x &&

f.y > basket.y-40

){



score+=10;


scoreText.innerText=score;


fruits.splice(i,1);




if(score>best){


best=score;


bestText.innerText=best;


localStorage.setItem(

"basketBest",

best

);


}


}



});


}









// FON


function drawBackground(){


let gradient =
ctx.createLinearGradient(
0,
0,
0,
550
);



gradient.addColorStop(
0,
"#38bdf8"
);


gradient.addColorStop(
1,
"#86efac"
);



ctx.fillStyle=gradient;


ctx.fillRect(
0,
0,
800,
550
);



}





// O'YIN LOOP


function gameLoop(){


if(!running)
return;



drawBackground();



if(keys["ArrowLeft"])

basket.x-=basket.speed;



if(keys["ArrowRight"])

basket.x+=basket.speed;



if(basket.x<0)

basket.x=0;



if(basket.x>680)

basket.x=680;





drawBasket();


drawFruits();


checkCatch();





level =
Math.floor(score/100)+1;



requestAnimationFrame(
gameLoop
);


}









// YANGI MEVA


setInterval(()=>{


if(running)

createFruit();


},900);









// GAME OVER


function endGame(){


running=false;


gameOverBox.style.display="block";


finalScore.innerText=score;


}








// RESTART


function restartGame(){


score=0;

life=3;

level=1;


scoreText.innerText=0;

lifeText.innerText=3;


fruits=[];


basket.x=350;


running=true;


gameOverBox.style.display="none";


gameLoop();


}




restartBtn.onclick=restartGame;

againBtn.onclick=restartGame;






gameLoop();