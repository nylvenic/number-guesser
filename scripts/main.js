const playBtn = document.querySelector('#playBtn');
const maxAttempts = 3;
const highestNumber = 10;
const response = document.querySelector('#response');
const guessInput = document.querySelector('#guess');
let guess = '';
let randomNumber = Math.floor(Math.random() * highestNumber) + 1;
let currentAttempt = 0;
let winFlag = false;
let lossFlag = false;

playBtn.addEventListener('click', play);

function play() {
    if(winFlag || lossFlag) {
        resetGame();
        return;
    }

    const guessInput = document.querySelector('#guess');
    guess = guessInput.value;
    guessInput.value = '';

    if(guess > highestNumber) {
        changeResponse('That number is too high!');
        return;
    }

    if(guess < 1) {
        changeResponse('That number is too low!');
        return;
    }

    if(guess == randomNumber) {
        guessInput.className = 'success';
        changeResponse('You win!');
        endState();
        winFlag = true;
        return;
    };

    if(currentAttempt >= maxAttempts-1) {
        guessInput.className = 'alert';
        changeResponse(`You can't play any more. The correct number is ${randomNumber}!`);
        endState();
        lossFlag = true;
        return;
    }

    if(guess != randomNumber) {
        guessInput.className = 'warn';
        changeResponse('Not quite! Try again?');
    }

    currentAttempt++;
}

function endState() {
    guessInput.disabled = true;
    playBtn.textContent = 'Play Again';
}

function changeResponse(msg) {
    response.textContent = msg;
}

function resetGame() {
    winFlag = false;
    lossFlag = false;
    playBtn.textContent = 'Submit';
    response.textContent = '';
    guessInput.classList = '';
    guessInput.disabled = false;
    guess = '';
    randomNumber = Math.floor(Math.random() * highestNumber);
    currentAttempt = 0;
}