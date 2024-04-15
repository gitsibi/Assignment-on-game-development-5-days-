const gameBoardElement = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controlButton = document.querySelectorAll(".controls i");
const startButton = document.getElementById("play-button");

let isGameOver = false;
let foodX, foodY;
let snakePositionX = 5, snakePositionY = 5;
let x = 0, y = 0;
let snakeBody = [];
let gameIntervalId;
let score = 0;

let topScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High score: ${topScore}`;

const backgroundMusic = new Audio();
backgroundMusic.src = "https://github.com/gitsibi/Assignment-on-game-development-5-days-/blob/main/Sounds_start_game_sound.wav";
backgroundMusic.loop = true;

const eatSound = new Audio();
eatSound.src = "https://github.com/gitsibi/Assignment-on-game-development-5-days-/blob/main/Sounds_snake_eat_sound.wav";

const gameOverSound = new Audio();
gameOverSound.src = "https://github.com/gitsibi/Assignment-on-game-development-5-days-/blob/main/Sounds_game_over_sound.mp3";

const playBackgroundMusic = () => {
    backgroundMusic.play().catch(error => {
        console.error("Error playing background music:", error);
    });
};

const playEatSound = () => {
    eatSound.play().catch(error => {
        console.error("Error playing eat sound:", error);
    });
};

const playGameOverSound = () => {
    gameOverSound.play().catch(error => {
        console.error("Error playing game over sound:", error);
    });
};


const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const gameOver = (win) => {
    clearInterval(gameIntervalId);
    playGameOverSound();
    if (win && score >= 20) {
        const winMsg= ["Congratulations! You won!", "Amazing! You beat the game!", "Victory is yours!"];
        const randomIndex = Math.floor(Math.random() * winMsg.length);
        alert(winMsg[randomIndex]);
    } else {
        const loseMsg = ["Game over! Better luck next time!", "Oh no! You lost the game.", "You can do better next time!","Definitely, you can beat the high score next time"];
        const randomIndex = Math.floor(Math.random() * loseMsg.length);
        alert(loseMsg[randomIndex]);
    }
    location.reload();
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && y !== 1) {
        x = 0;
        y = -1;
    } else if(e.key === "ArrowDown" && y !== -1) {
        x = 0;
        y = 1;
    } else if(e.key === "ArrowLeft" && x !== 1) {
        x = -1;
        y = 0;
    } else if(e.key === "ArrowRight" && x !== -1) {
        x = 1;
        y = 0;
    }
};



const initializeGame = () => {
    if(isGameOver) return gameOver();
    
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
    if(snakePositionX === foodX && snakePositionY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++;
        topScore = score >= topScore ? score : topScore;
        localStorage.setItem("high-score", topScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${topScore}`;
        playEatSound();
    }
    
    snakePositionX += x;
    snakePositionY += y;
    
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    
    snakeBody[0] = [snakePositionX, snakePositionY];
    
    if(snakePositionX <= 0 || snakePositionX > 30 || snakePositionY <= 0 || snakePositionY > 30) {
        return isGameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            isGameOver = true;
        }
    }
    
    gameBoardElement.innerHTML = html;
};

controlButton.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));
document.addEventListener("keyup", changeDirection);

updateFoodPosition();
playBackgroundMusic();
gameIntervalId = setInterval(initializeGame, 100);
