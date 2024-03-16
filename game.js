const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");
const playButton = document.getElementById("play-button");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// Getting high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High score: ${highScore}`;

// Audio elements
const backgroundMusic = new Audio();
backgroundMusic.src = "https://github.com/gitsibi/Assignment-on-game-development-5-days-/blob/main/Sounds_start_game_sound.wav";
backgroundMusic.loop = true;

const eatSound = new Audio();
eatSound.src = "https://github.com/gitsibi/Assignment-on-game-development-5-days-/blob/main/Sounds_snake_eat_sound.wav";

const gameOverSound = new Audio();
gameOverSound.src = "https://github.com/gitsibi/Assignment-on-game-development-5-days-/blob/main/Sounds_game_over_sound.mp3";

// Function to play background music
const playBackgroundMusic = () => {
    backgroundMusic.play().catch(error => {
        console.error("Error playing background music:", error);
    });
};

// Function to play eat sound
const playEatSound = () => {
    eatSound.play().catch(error => {
        console.error("Error playing eat sound:", error);
    });
};

// Function to play game over sound
const playGameOverSound = () => {
    gameOverSound.play().catch(error => {
        console.error("Error playing game over sound:", error);
    });
};

// Function to update food position
const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = (win) => {
    // Clearing the timer
    clearInterval(setIntervalId);
    playGameOverSound();
    // Display game over message based on win condition
    if (win && score >= 20) {
        const winPhrases = ["Congratulations! You won!", "Amazing! You beat the game!", "Victory is yours!"];
        const randomIndex = Math.floor(Math.random() * winPhrases.length);
        alert(winPhrases[randomIndex]);
    } else {
        const losePhrases = ["Game over! Better luck next time!", "Oh no! You lost the game.", "You can do better next time!","Definitely, you can beat the high score next time"];
        const randomIndex = Math.floor(Math.random() * losePhrases.length);
        alert(losePhrases[randomIndex]);
    }
    
    // Reload the page after showing the message
    location.reload();
}

// Function to change direction
const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
};

// Function to initialize game
const initGame = () => {
    if(gameOver) return handleGameOver();
    
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
    if(snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `SCORE: ${score}`;
        highScoreElement.innerText = `HIGH SCORE: ${highScore}`;
        playEatSound();
    }
    
    snakeX += velocityX;
    snakeY += velocityY;
    
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    
    snakeBody[0] = [snakeX, snakeY];
    
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    
    playBoard.innerHTML = html;
};

// Event listeners
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));
document.addEventListener("keyup", changeDirection);

// Initializations
updateFoodPosition();
playBackgroundMusic();
setIntervalId = setInterval(initGame, 100);
