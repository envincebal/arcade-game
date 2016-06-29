//Global variable that define the starting score
var score = 0;

// Defines Enemy class
var Enemy = function(){
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = -100;
  this.getSpeed();
  this.getPositionY();
};

// Returns random speed for Enemy instances
Enemy.prototype.getSpeed = function(){
  var enemySpeed = [150, 200, 250, 300, 350, 400];
  return this.speed = enemySpeed[Math.floor(Math.random() * enemySpeed.length)];
};

// Returns random Y axis position for Enemy instances
Enemy.prototype.getPositionY = function(){
  var enemyPositionY = [61, 144, 227];
  return this.y = enemyPositionY[Math.floor(Math.random() * enemyPositionY.length)]; 
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt){
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + (this.speed * dt);
  if (this.x > 505){
    this.reset();
  }
    
  // This defines the collision detection. If player
  // collides with enemy, game and score resets.
  if (this.x + 50 >= player.x && 
    this.x < player.x + 50 && 
    this.y + 50 >= player.y && 
    this.y < player.y + 50){
      player.reset();
      score = 0;
      document.getElementById("score").innerHTML = score;
  }
};

// When each Enemy instances reach end of screen, it
// resets with a random Y axis position and speed
Enemy.prototype.reset = function(){
  this.x = -100;
  this.y = this.y + 83;
  if (this.y > 227) {
    this.y = 61;
  }
  this.getSpeed();
};

// Draw the enemy on the screen
Enemy.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Defines Player class
var Player = function(){
  this.sprite = "images/char-boy.png";
  this.x = 202;
  this.y = 301;
};

// If the player reaches the water, the player position
// resets and the score is incremented by one 
Player.prototype.update = function(){
  if (this.y < 50){
    score++;
    document.getElementById("score").innerHTML = score;
    this.reset();
  }
};

// This function defines coordinates when player returns
// to starting position
Player.prototype.reset = function(){
  this.x = 202;
  this.y = 301;
};

// Defines the distances the player moves when keys
// are pressed
Player.prototype.handleInput = function(key){
  if (key === "left" && this.x > 0){
    this.x -= 101;
  } else if (key === "right" && this.x < 400){
    this.x += 101;
  } else if (key === "up" && this.y > 2){
    this.y -= 83;
  } else if (key === "down" && this.y < 350){
    this.y += 83;
  }
};

// Renders the player on the screen
Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instances of the Enemy class
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();

// Places all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

// Instance of Player class
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e){
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// Prevents key presses from scrolling up and down window
window.addEventListener('keydown', function(e){
  if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);