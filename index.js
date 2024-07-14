// Ensure score object exists in localStorage
let score = JSON.parse(localStorage.getItem('score'));
if (score === null) {
    score = { win: 0, loss: 0, tie: 0 };
}

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'paper';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'scissor';
    }
    return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        document.querySelector('.autoPlay-button').innerHTML = 'Stop AutoPlay';
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        document.querySelector('.autoPlay-button').innerHTML = 'Auto Play';
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissor-button').addEventListener('click', () => {
    playGame('scissor');
});

document.querySelector('.reset-button').addEventListener('click', () => {
    score = { win: 0, loss: 0, tie: 0 };
    localStorage.removeItem('score');
    updateScoreDisplay();
});

document.querySelector('.autoPlay-button').addEventListener('click', autoPlay);

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissor');
    } else if (event.key === 'a') {
        autoPlay();
    } else if (event.key === '/') {
        score = { win: 0, loss: 0, tie: 0 };
        localStorage.removeItem('score');
        updateScoreDisplay();
    }
});

function playGame(playerMove) {
    let result = '';
    const computerMove = pickComputerMove();
    if (playerMove === 'scissor') {
        if (computerMove === 'rock') {
            result = 'loss';
        } else if (computerMove === 'paper') {
            result = 'win';
        } else if (computerMove === 'scissor') {
            result = 'tie';
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'win';
        } else if (computerMove === 'paper') {
            result = 'tie';
        } else if (computerMove === 'scissor') {
            result = 'loss';
        }
    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'tie';
        } else if (computerMove === 'paper') {
            result = 'loss';
        } else if (computerMove === 'scissor') {
            result = 'win';
        }
    }

    if (result === 'win') {
        score.win += 1;
    } else if (result === 'loss') {
        score.loss += 1;
    } else if (result === 'tie') {
        score.tie += 1;
    }
    localStorage.setItem('score', JSON.stringify(score));

    updateScoreDisplay();
    document.querySelector('.js-result').innerHTML = `result: ${result}.`;

    document.querySelector('.js-moves').innerHTML = `You: <img src="images/${playerMove}-emoji.png" class="move-icon"> 
                       <img src="images/${computerMove}-emoji.png" class="move-icon"> :Computer`;
}


function updateScoreDisplay() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.win}, Losses: ${score.loss}, Ties: ${score.tie}`;
}

// Initial call to display the score
updateScoreDisplay();
