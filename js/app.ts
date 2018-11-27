/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length; let temporaryValue; let
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function cardArrayCreate() {
  let cardSymbols = ['fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-bomb'];
  cardSymbols = cardSymbols.concat(cardSymbols);
  const cardArray = shuffle(cardSymbols);
  return cardArray;
}

function deckFromCardArray() {
  const cardArray = cardArrayCreate();
  const deckFragment = new DocumentFragment();

  cardArray.forEach((element) => {
    const cardIcon = document.createElement('i');
    cardIcon.classList.add('fa', element);

    const newCard = document.createElement('li');
    newCard.classList.add('card');
    newCard.appendChild(cardIcon);

    deckFragment.appendChild(newCard);
  });
  return deckFragment;
}

function genDeckHTML() {
  const cardDeck = document.getElementById('deck');
  while (cardDeck.hasChildNodes()) {
    cardDeck.removeChild(cardDeck.lastChild);
  }

  const cardDeckFragment = deckFromCardArray();
  cardDeck.appendChild(cardDeckFragment);
}


// Set up Event Listener for deck,
//  Open CMD and Use live-server in the parent folder
const cardDeck = document.getElementById('deck');
let moveCounter = 0;
let matchCounter = 0;

let openCards = [];
let openCardSymbols = [];


function moveCounterIncrement() {
  const counterElement = document.getElementsByClassName('moves')[0];
  counterElement.innerHTML = moveCounter.toString();
}

function starCounterIncrement() {
  const stars = document.getElementsByClassName('stars')[0];
  const starList = stars.querySelectorAll('LI');
  const starArray = Array.from(starList);

  if (moveCounter < 20) {
    starArray.map(starItem => starItem.classList.add('glow'));
  } else if (moveCounter < 30) {
    starList[2].classList.remove('glow');
  } else {
    starList[1].classList.remove('glow');
  }
}

function resetGame() {
  genDeckHTML();
  moveCounter = 0;
  matchCounter = 0;
  const screenPage = document.getElementsByClassName('win-screen')[0];
  screenPage.classList.remove('win-screen-visible');

  document.getElementsByClassName('moves')[0].innerHTML = 0;
  const allOpenCards = document.querySelectorAll('.open, .show, .match');
  for (let i = 0; i < allOpenCards.length; i++) {
    allOpenCards[i].classList.remove('open', 'show', 'match');
  }
}

document.addEventListener('load', resetGame());

const resetButton = document.getElementsByClassName('fa-repeat')[0];
resetButton.addEventListener('click', resetGame);


function cardTurn(selectedCard) {
  moveCounter += 1;
  openCards.push(selectedCard);
  const selectedCardSymbol = selectedCard.lastElementChild.className;
  openCardSymbols.push(selectedCardSymbol);
}

function checkAllOpenCards() {
  const allOpenCards = document.querySelectorAll('.open');
  return allOpenCards;
}

// Add Match Class to Matched Cards
function makeMatch(cardNode) {
  cardNode.classList.add('match');
  cardNode.classList.remove('open', 'show');
  return cardNode;
}

function cardMatchTurn(allOpenCards) {
  allOpenCards[0] = makeMatch(allOpenCards[0]);
  allOpenCards[1] = makeMatch(allOpenCards[1]);
}
// Remove Open and Show classes with revealed cards dont match
function makeNotMatch(cardNode) {
  cardNode.classList.remove('open', 'show');
  return cardNode;
}

function cardNotMatchTurn(allOpenCards) {
  allOpenCards[0] = makeNotMatch(allOpenCards[0]);
  allOpenCards[1] = makeNotMatch(allOpenCards[1]);
}

function isCardMatch() {
  const card1 = openCardSymbols[openCardSymbols.length - 1];
  const card2 = openCardSymbols[openCardSymbols.length - 2];
  let matchDetected = false;
  if (card1 === card2) { matchDetected = true; }
  return matchDetected;
}

function winScreen() {
  if (matchCounter === 8) {
    const screenPage = document.getElementsByClassName('win-screen')[0];
    const numWinMoves = document.getElementsByClassName('win-count')[0];

    screenPage.classList.add('win-screen-visible');
    numWinMoves.innerHTML = moveCounter;
  }
}

cardDeck.addEventListener('click', (ev) => {
  debugger;
  if (ev.target.className === 'card' && ev.target.nodeName === 'LI') {
    const selectedCard = ev.target;
    selectedCard.classList.add('open', 'show');

    cardTurn(selectedCard);

    // Check allOpenCards
    const allOpenCards = checkAllOpenCards();
    if (allOpenCards.length === 3) {
      for (let i = 0; i < allOpenCards.length; i++) {
        allOpenCards[i].classList.remove('open', 'show');
      }
    }

    if (allOpenCards.length === 2) {
      if (isCardMatch() === true) { // check if the cards match
        cardMatchTurn(allOpenCards); // if the match switch then to open
        matchCounter += 1;
      } else {
        setTimeout(() => {
          cardNotMatchTurn(allOpenCards);
        }, 500);
      }
      openCardSymbols = [];
      openCards = [];
    }

    moveCounterIncrement();
    starCounterIncrement();
    winScreen();
  }
});
