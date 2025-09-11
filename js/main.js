// Settings game Name
let gameName = 'Guess The Word';
document.title = gameName;
document.querySelector('h1').textContent = gameName;
document.querySelector(
  'footer',
).textContent = `${gameName} game <i>Coded Mood60S</i> Inspired <p>Osama</p>`;
//Settings game Options..
let numberOfTries = 6;
let numbersOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;
let randomWord = '';
const words = [
  'Create',
  'Update',
  'Delete',
  'Master',
  'Branch',
  'Mainly',
  'Mood60',
  'LvCode',
];
randomWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector('.message');
//Manage Hints
document.querySelector('.hint span').innerHTML = numberOfHints;
const getHintButton = document.querySelector('.hint');
getHintButton.addEventListener('click', getHint);
// function
//
function generateInput() {
  // Want inputs Container
  let inputsContainer = document.querySelector('.inputs');
  CreateDiv: for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement('div');
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>try ${i}</span>`;
    if (i !== 1) tryDiv.classList.add('Hidden'); // Add class to Divs Hold Input Not Except first One
    ChildForInput: for (let j = 1; j <= numbersOfLetters; j++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute('maxlength', '1');
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();
  // Disable ALL inputs except first One
  const inputsInHiddenDiv = document.querySelectorAll('.Hidden input');
  inputsInHiddenDiv.forEach((e) => (e.disabled = true));
  // Navigations
  const inputsNav = document.querySelectorAll('input');
  inputsNav.forEach((e, index) => {
    // Convert Input to Upper Case DownBelow
    e.addEventListener('input', function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputsNav[index + 1];
      if (nextInput) nextInput.focus();
    });
    // Secound Event Listener For Keyboard Nav
    e.addEventListener('keydown', function (event) {
      const CurrentIndex = Array.from(inputsNav).indexOf(event.target);
      //   console.log(CurrentIndex);
      if (event.key === 'ArrowRight') {
        const NextInput = CurrentIndex + 1;
        if (NextInput < inputsNav.length) inputsNav[NextInput].focus();
      }
      if (event.key === 'ArrowLeft') {
        const prevInput = CurrentIndex - 1;
        if (prevInput >= 0) inputsNav[prevInput].focus();
      }
    });
  });
}
const guessButton = document.querySelector('.check');
guessButton.addEventListener('click', handleGuesses);
function handleGuesses() {
  let successGuess = true;
  // Check Letter
  for (let i = 1; i <= numbersOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`,
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = randomWord[i - 1];
    //Game Logic,
    if (letter === actualLetter) {
      inputField.classList.add('yes-in-place');
    } else if (randomWord.includes(letter) && letter !== '') {
      // Letter is Correct and not in place
      inputField.classList.add('not-in-place');
      successGuess = false;
    } else {
      inputField.classList.add('no');
      successGuess = false;
    }
  }
  // Lets Out Of Loop Check User Win Or Lose,
  if (successGuess === true) {
    messageArea.innerHTML = `You win The Word IS:<span>${randomWord}</span>`;
    if (numberOfHints === 2) {
      messageArea.innerHTML = `<p>congratulations You Didn't Use Hints</p>`;
    }
    let alltries = document.querySelectorAll('.inputs > div');
    alltries.forEach((tryDiv) => tryDiv.classList.add('Hidden'));
    guessButton.disabled = true;
    getHintButton.disabled = true;
  } else {
    document.querySelector(`.try-${currentTry}`).classList.add('Hidden');
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`,
    );
    currentTryInputs.forEach((e) => (e.disabled = true));
    currentTry++;
    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((e) => (e.disabled = false));
    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document.querySelector(`.try-${currentTry}`).classList.remove('Hidden');
      el.children[1].focus();
    } else {
      guessButton.disabled = true;
      getHintButton.disabled = true;
      messageArea.innerHTML = `You Lose The Word Is <p>${randomWord}</p>`;
    }
  }
}
function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector('.hint span').innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    getHintButton.disabled = true;
  }

  const enabledInputs = document.querySelectorAll('input:not([disabled])');
  const emptyEnabledInputs = Array.from(enabledInputs).filter(
    (e) => e.value === '',
  );
  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    if (indexToFill !== -1) {
      randomInput.value = randomWord[indexToFill].toUpperCase();
    }
  }
}
function handleBackSpace(event) {
  if (event.key === 'Backspace') {
    const inputs = document.querySelectorAll('input:not([disabled])');
    const CurrentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (CurrentIndex > 0) {
      const currentInput = inputs[CurrentIndex];
      const previnput = inputs[CurrentIndex - 1];
      currentInput.value = '';
      previnput.value = '';
      previnput.focus();
    }
  }
}
document.addEventListener('keydown', handleBackSpace);
window.onload = (_) => {
  generateInput();
};

