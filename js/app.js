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
const openCardSymbols = [];


cardDeck.addEventListener('click', (ev) => {
  if (ev.target.className === 'card' && ev.target.nodeName === 'LI') {
    const selectedCard = ev.target;
    openCards.push(selectedCard);
    selectedCard.classList.add('open', 'show');

    const selectedCardSymbol = selectedCard.childNodes[1].className;
    openCardSymbols.push(selectedCardSymbol);
    moveCounter += 1;

    allOpen(selectedCard);
    moveCounterIncrement();
    starCounterIncrement();
  }
});


//  cardDeck.addEventListener("click", allOpen)
function makeMatch(cardNode) {
  cardNode.classList.add('match');
  cardNode.classList.remove('open', 'show');
  return cardNode;
}

function notMatch(cardNode) {
  cardNode.classList.remove('open', 'show');
  return cardNode;
}

function allOpen(selectedCard) {
  const allOpenCards = document.querySelectorAll('.open');
  if (allOpenCards.length < 3) {
    if (cardSymbol[0] === cardSymbol[1]) {
      allOpenCards[0] = makeMatch(allOpenCards[0]);
      allOpenCards[1] = makeMatch(allOpenCards[1]);
    } else {
      allOpenCards[0] = notMatch(allOpenCards[0]);
      allOpenCards[1] = notMatch(allOpenCards[1]);
    }
  } else {
    console.log('Only One Open');
  }
}





const resetButton = document.getElementsByClassName("fa-repeat")[0];
resetButton.addEventListener('click', resetGame);

function resetGame() {
  console.log("Clicked");
  const allOpenCards = document.querySelectorAll('.open, .show, .match');
  console.log(allOpenCards);
  for (let i = 0; i < allOpenCards.length; i++) {
    allOpenCards[i].classList.remove('open', 'show', 'match');
  }
}

document.addEventListener("load", resetGame());


function moveCounterIncrement() {
  // eslint-disable-next-line no-undef
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
