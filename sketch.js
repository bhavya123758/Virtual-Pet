var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedDog;
//create feed and lastFed variable here
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,700);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  lastFeed=database.ref('FeedTime');
  lastFeed.on("value",function(data){
    lastFed=data.val();
    foodObj.getFedTime(lastFed);
  })
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feeds=createButton("Feed Your Dog");
  feeds.position(700,95);
feeds.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
  textSize(20);
  fill("red");
 
  //write code to display text lastFed time here
if(lastFed<12){
  text("Last Fed :"+ lastFed+"AM",300,95);}
  if(lastFed===12){
    text("Last Fed :"+"12 AM",300,95);}
    if(lastFed>12){
      text("Last Fed :"+ lastFed+"PM",300,95);}
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  food_stock_oo=foodObj.getFoodStock();
  
 

if(food_stock_oo>0){
  foodS=foodS-1;
  dog.addImage(happyDog);}
  database.ref('/').set({
    Food:foodS
  })
  database.ref('/').update({
   
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  dog.addImage(sadDog);
  database.ref('/').update({
    Food:foodS
  })
}
