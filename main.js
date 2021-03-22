let score = 0;
let paddle;
let ball;
let bricks = [];
let brickCheck;
let playingGame = false;
let win = false;
let start;
let timer = 90;
let winnerSound;
let loserSound;
let hitSound;
let breakSound;


function preload() {
    winnerSound = loadSound("./sound/applause8.mp3");
    loserSound = loadSound("./sound/boo3.mp3");
    hitSound = loadSound("./sound/caughtball.mp3");
    breakSound = loadSound("./sound/Scissor1.mp3");
}

function convertTimer(timer) {
    let min = floor(timer / 60);
    let sec = timer % 60;
    textSize(32);
    text(`Timer:${min}:${sec}`, width / 2, 50);
}

function setup() {
    start = false;
    createCanvas(1000, 800);

    paddle = new Paddle();
    ball = new Ball();
    //brick = new Brick();
    // for (let i = 0; i < 30; i++) {
    //     bricks.push(new Brick());
    // }
    let protection = 0;
    while (bricks.length < 50) {
        brickCheck = new Brick();

        let overlapping = false;
        for (var z = 0; z < bricks.length; z++) {
            let other = bricks[z];
            let d = dist(brickCheck.position.x, other.position.y, other.position.x, other.position.y);
            if (d < brickCheck.r + other.r) {
                overlapping = true;
            }
        }
        if (!overlapping) {
            bricks.push(brickCheck);
        }
        protection++;
        if (protection > 1000) {
            break;
        }
    }
}

function draw() {
    clear();
    if (start === false) {
        background(0);
        for (var j = 0; j < bricks.length; j++) {
            bricks[j].display();
        }
        textSize(32);
        textAlign(CENTER);
        fill(255);
        text('PRESS SPACEBAR TO START!', width / 2, height / 2);
    }
    //timer there 

    //timer there
    if (start === true) {
        background(0);
        textSize(32);
        text(`Score:${score}`, width - 150, 50);
        fill(255);
        convertTimer(timer);


        if (frameCount % 60 == 0 && timer > 0) {
            timer--;
        }
        if (timer == 0) {
            background(0);
            fill(255, 80, 80);
            text("TIME OVER!", width / 2, height / 2);
            playingGame = false;
        }

        paddle.display();
        if (playingGame) paddle.update();
        if (playingGame) paddle.checkEdges();

        ball.display();
        if (playingGame) ball.update();
        if (playingGame) ball.checkEdges();



        if (ball.meets(paddle) && ball.direction.y > 0) {
            ball.direction.y *= -1;
            hitSound.play();
        }


        for (let j = 0; j < bricks.length; j++) {
            bricks[j].display();
            if (ball.hits(bricks[j])) {
                bricks.splice(j, 1);
                ball.direction.y *= -1;
                breakSound.play();
                return score += 10;
            }

            bricks[j].display();
            fill(255);
        }

        if (ball.position.y > height) {
            playingGame = false;
            //ball.position = crateVector(width / 2, height / 2);
            loserText();
            reset();
        }
        if (bricks.length === 0) {
            win = true;
            playingGame = false;
        }
        if (win) {
            winnerText();
            reset();
        }
    }

}

function keyPressed() {
    if (keyCode === 37) {
        paddle.isMovingLeft = true;
    } else if (keyCode === 39) {
        paddle.isMovingRight = true;
    } else if (keyCode === 32) {
        start = true;
        playingGame = true;
        win = false;
        if (bricks.length === 0) {
            for (let i = 0; i < 30; i++) {
                bricks.push(new Brick());
            }
        }
    }
}

function keyReleased() {
    paddle.isMovingLeft = false;
    paddle.isMovingRight = false;
}

function winnerText() {
    textSize(32);
    textAlign(CENTER);
    fill(255, 80, 80);
    text('YOU WON!!!!', width / 2, height / 2);
    winnerSound.play();
}

function loserText() {
    background(0);
    textSize(32);
    textAlign(CENTER);
    fill(255, 80, 80);
    text('GAME OVER!!', width / 2, height / 2);
    loserSound.play();
}