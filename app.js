const name = document.querySelector('.name-box');
const nickname = document.querySelector('.nickname-box');

const submitButton = document.getElementById('submitBtn');

name.addEventListener('input', toggleButton);

nickname.addEventListener('input', toggleButton);

function toggleButton() {
    const name = name.value.trim();
    const nickname = nickname.value.trim();

    if (name && nickname) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

submitButton.addEventListener('click', () => {
    const name = name.value.trim();
    const nickname = nickname.value.trim();

    console.log("Name:", name);
    console.log("Nickname:", nickname);

    startGame(name, nickname);
});

function startGame(name, nickname) {
    console.log("Start the game for", name, "with nickname", nickname);
}


document.addEventListener("DOMContentLoaded", function() {
  const playButton = document.getElementById("play-button");
  playButton.addEventListener("click", function() {
      window.location.href = "game.html";
  });
});




