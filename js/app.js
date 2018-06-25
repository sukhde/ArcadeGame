const levelCount = document.querySelector("#levels");

//function to count levels
function count() {
    player.level++;
    levelCount.textContent = player.level;
};
// enemy object
var Enemy = function (x, y , speed) {
    //  variables of our instances 
    this.x = x
    this.y = y
    this.speed = speed
    this.sprite = 'images/enemy-bug.png';

};

// enemy position updated 
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x++;
    this.x = this.x + 170 * dt

    if (this.x >= 505) {
        this.x = -110;

    }
    if (this.x + 50 > player.x && this.x < player.x + 50 && this.y + 50 > player.y && this.y < player.y + 50) {
        player.x = 200;
        player.y = 400;

        if (player.level > 1) {
            player.level = 1
            levelCount.textContent = player.level;
        }
    }
};
// display enemy on the screen
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//player class has update ,render and handleinput methods
const Player = function (x, y) {
    this.x = x,
        this.y = y,
        this.sprite = 'images/char-boy.png';
    this.player = 1;
}
Player.prototype.update = function (dt) {
    if (player.y < 10) {
        count();
        player.x = 200;
        player.y = 400;
    }
}
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function (movement) {
    if (movement == "left" && this.x > 0) {
        this.x = this.x - 100;
    } else if (movement == "right" && this.x < 400) {
        this.x = this.x + 100;
    } else if (movement == "up" && this.y > 0) {
        this.y = this.y - 90;
    } else if (movement == "down" && this.y < 400) {
        this.y = this.y + 90;
    }
}

//created new instance of enemy object
const enemy1 = new Enemy(-800, 60);
const enemy2 = new Enemy(-250, 230);
const enemy3 = new Enemy(-3, 230);
const enemy4 = new Enemy(-600, 140);
const enemy5 = new Enemy(-70, 60);

//enemy objects are placed in allEnemies array
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5]

//player object 
const player = new Player(200, 400);
player.level = 1;

// Player.handleInput() method. 
// This listens for key presses and sends the keys
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//speed increses
enemy1.speed += 2;
enemy2.speed += 2;
enemy3.speed += 2;
enemy4.speed += 2;
enemy5.speed += 2;


//function highscore
function highscore() {
    if (currentLevel > highscore)
        player.level = highscore;
}