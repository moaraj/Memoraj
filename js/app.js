/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// Set up Event Listener for deck,
//  Open CMD and Use live-server in the parent folder
const cardDeck = document.getElementById('deck');
let moveCounter = 0;
const openCards = [];
let openCardSymbols = [];

function moveCounterIncrement() {
  const counterElement = document.getElementsByClassName('moves')[0];
  counterElement.innerHTML = moveCounter;
}

function starCounterIncrement() {
  const stars = document.getElementsByClassName('stars')[0];
  const starList = stars.querySelectorAll('LI');
  const starArray = Array.from(starList);

  if (moveCounter < 4) {
    starArray.map(starItem => starItem.classList.add('glow'));
  } else if (moveCounter < 8) {
    starList[2].classList.remove('glow');
  } else {
    starList[1].classList.remove('glow');
  }
}


function resetGame() {
  document.getElementsByClassName('moves')[0].innerHTML = 0;
  const allOpenCards = document.querySelectorAll('.open, .show, .match');
  for (let i = 0; i < allOpenCards.length; i++) {
    allOpenCards[i].classList.remove('open', 'show', 'match');
  }
}

document.addEventListener('load', resetGame());
const resetButton = document.getElementsByClassName('fa-repeat')[0];
resetButton.addEventListener('click', resetGame);


function getCardSymbol(selectedCard) {
  const selectedCardSymbol = selectedCard.childNodes[1].className;
  return selectedCardSymbol;
}

function cardTurn(selectedCard) {
  moveCounter += 1;
  openCards.push(selectedCard);
  openCardSymbols.push(getCardSymbol(selectedCard));
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
  const card1 = openCardSymbols[0];
  const card2 = openCardSymbols[1];
  let matchDetected = false;
  if (card1 === card2) { matchDetected = true; }
  return matchDetected;
}

cardDeck.addEventListener('click', (ev) => {
  debugger;
  if (ev.target.className === 'card' && ev.target.nodeName === 'LI') {
    const selectedCard = ev.target;
    selectedCard.classList.add('open', 'show');
    cardTurn(selectedCard);

    // Check allOpenCards
    const allOpenCards = checkAllOpenCards();
    if (allOpenCards.length == 3) {
      for (let i = 0; i < allOpenCards.length; i++) {
        allOpenCards[i].classList.remove('open', 'show');
      }
    }

    if (allOpenCards.length == 2) {
      if (isCardMatch() === true) { // check if the cards match
        cardMatchTurn(allOpenCards); // if the match switch then to open
      } else {
        setTimeout(() => {
          cardNotMatchTurn(allOpenCards);
        }, 500);
      }
      openCardSymbols = [];
    }

    moveCounterIncrement();
    starCounterIncrement();
  }
});
