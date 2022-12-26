const maxAttempts = 3,
    lowestNumber = 5,
    highestNumber = 15;

const response = document.querySelector('#response'),
    guessInput = document.querySelector('#guess'),
    playBtn = document.querySelector('#playBtn'),
    lowest = document.querySelector('#lowest'),
    highest = document.querySelector('#highest');

let guess = '',
    randomNumber = getRandomNum(),
    currentAttempt = 0,
    winFlag = false,
    lossFlag = false;

playBtn.addEventListener('click', play);
initialize();

function initialize() {
    lowest.textContent = lowestNumber;
    highest.textContent = highestNumber;
}

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
    randomNumber = getRandomNum();
    currentAttempt = 0;
}

function getRandomNum() {
    const result = Math.floor(Math.random() * (highestNumber-lowestNumber) + 1) + lowestNumber;
    return result;
}