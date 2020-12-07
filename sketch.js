//Create variables here
var dog,dogImg,happyDogImg,happyDog,dataBase,foodS,foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.1;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();

  //add styles here

  textSize(20);
  fill(255);
  text("Note: Press UP_ARROW Key to Feed Drago Milk",40,25);

  textSize(25);
  fill(255);
  text("Food Remaining: "+foodS,150,200);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if(x<=0) {
    x=0;
  }
  else {
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}