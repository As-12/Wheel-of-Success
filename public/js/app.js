/* Gameshow.JS 
   @Auhtor: Thanaphon Chavengsaksongkram
*/

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then(res => console.log('service worker registered'))
      .catch(err => console.log('service worker not registered', err));
  });
}

window.addEventListener('DOMContentLoaded', event => {
  /* ----- Shared Selectors ----- */

  const qwerty = document.querySelector('#qwerty');
  const phrase = document.querySelector('#phrase');
  const overlay = document.querySelector('#overlay');

  /* ----- Game State & Variables ----- */
  let missed = 0;
  const maxHearts = document.querySelector('#scoreboard').firstElementChild.children.length;
  const phrases = ['Hello World', 'Web Development', 'HTML', 'Javascript', 'CSS'];
  /* ----- Functions related to Creating , Starting and Restarting game ------ */
  function getRandomPhraseAsArray(arr) {
    const index = Math.round(Math.random() * (arr.length - 1));
    return arr[index].toUpperCase();
  }
  function resetHearts() {
    const scoreboard = document.querySelector('#scoreboard');
    const hearts = Array.from(scoreboard.firstElementChild.children);

    hearts.forEach(heart => {
      heart.firstElementChild.src = 'images/liveHeart.png';
    });
  }
  function resetKeyboard() {
    qwerty.querySelectorAll('.chosen').forEach(chosenKey => {
      chosenKey.classList.remove('chosen');
    });
  }
  function clearDisplay() {
    while (phrase.firstChild) {
      phrase.removeChild(phrase.lastChild);
    }
    phrase.appendChild(document.createElement('ul'));
  }
  function addPhraseToDisplay(text) {
    /* Aux functions specifically for addPharseToDisplay */
    function createLetter(character) {
      let li = document.createElement('li');
      li.textContent = character;
      if (character !== ' ') {
        li.className = 'letter';
      } else {
        li.className = 'space';
      }
      return li;
    }
    /* addPhraseToDisplay Function starts here */
    clearDisplay();
    [...text].forEach(character => {
      let item = createLetter(character);
      phrase.firstElementChild.appendChild(item);
    });
  }

  function startGame() {
    const phraseString = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseString);
    resetKeyboard();
    resetHearts();
    missed = 0;
    overlay.classList.add('hide');
  }

  /* ------ Functions related to running of the game  ------ */
  function checkLetter(buttonClicked) {
    if (buttonClicked.classList.contains('chosen')) {
      return buttonClicked;
    }
    buttonText = buttonClicked.textContent;
    buttonClicked.classList.add('chosen');
    const listOfLetters = phrase.firstElementChild.querySelectorAll('.letter');
    let correctGuess = false;
    for (let i = 0; i != listOfLetters.length; i += 1) {
      const letter = listOfLetters[i];
      if (buttonText.toString().toLowerCase() === letter.textContent.toString().toLowerCase()) {
        letter.classList.add('show');
        correctGuess = true;
      }
    }
    if (correctGuess) {
      return buttonClicked;
    } else {
      return null;
    }
  }

  function showWinScreen() {
    const title = overlay.querySelector('.title');
    const button = overlay.querySelector('a');
    button.textContent = 'Play Again';
    title.textContent = `Winner chicken dinner!`;

    overlay.classList.remove('hide');
    overlay.classList.add('win');
    button.classList.add('win');
    overlay.classList.remove('lose');
    button.classList.remove('lose');
  }
  function showLoseScreen() {
    const title = overlay.querySelector('.title');
    const button = overlay.querySelector('a');
    button.textContent = 'Try Again';
    title.textContent = 'Better luck next time!';
    overlay.classList.remove('hide');
    overlay.classList.add('lose');
    button.classList.add('lose');
    overlay.classList.remove('win');
    button.classList.remove('win');
  }
  function checkWin() {
    if (
      phrase.firstElementChild.querySelectorAll('.letter').length ===
      phrase.firstElementChild.querySelectorAll('.show').length
    ) {
      showWinScreen();
    } else if (missed >= maxHearts) {
      showLoseScreen();
    }
  }

  function updateLife() {
    const scoreboard = document.querySelector('#scoreboard');
    const hearts = scoreboard.firstElementChild.children;

    let count = missed;
    let i = hearts.length - 1;

    while (count > 0 && i >= 0) {
      hearts[i].firstElementChild.src = 'images/lostHeart.png';
      count -= 1;
      i -= 1;
    }
  }

  /* ---- Event Handlings ---- */
  overlay.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      startGame();
    }
  });

  qwerty.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      if (checkLetter(e.target) === null) {
        missed += 1;
        updateLife();
      }
      checkWin();
    }
  });
});
