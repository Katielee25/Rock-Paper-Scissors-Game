// Ensure score object exists in localStorage

let score = JSON.parse(localStorage.getItem('score'));
if (score === null) {
    score = { win: 0, loss: 0, tie: 0 };
};


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
    return computerMove
}
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
        score.win = score.win + 1;
    } else if (result === 'loss') {
        score.loss = score.loss + 1;
    } else if (result === 'tie') {
        score.tie = score.tie + 1;
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