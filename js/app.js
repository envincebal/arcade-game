// Enemies our player must avoid
var score = 0;
var enemyPositionY = [61, 144, 227];
var enemySpeed = [150, 200, 250, 300, 350, 400];
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = -100;
  this.y = enemyPositionY[Math.floor(Math.random() * enemyPositionY.length)];
  this.speed = enemySpeed[Math.floor(Math.random() * enemySpeed.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + (this.speed * dt);
  if (this.x > 505){
    this.reset();
  }
    
  if (this.x + 0 >= player.x && 
      this.x < player.x + 50 && 
      this.y + 0 >= player.y && 
      this.y < player.y + 50){
        player.reset();
        score = 0;
      }
};

Enemy.prototype.reset = function(){
    this.x = -100;
    this.y = this.y + 83;
    if (this.y > 227) {
      this.y = 61;
    }
    this.speed = enemySpeed[Math.floor(Math.random() * enemySpeed.length)];
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
  this.sprite = "images/char-boy.png";
  this.x = 202;
  this.y = 301;
}

Player.prototype.update = function(){
  if (this.y < 50){
    score++;
    document.getElementById("score").innerHTML = score;
    this.reset();
  }
}

Player.prototype.reset = function(){
  this.x = 202;
  this.y = 301;
}

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
   console.log(this.x, this.y);
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4];


// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});