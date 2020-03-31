// Main object for the game giving easy access to everything needed
let blackjackGame = {
   'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
   'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
   'cards': ['2', '3', '4', '5', '6', '7', '8', '9', 'K', 'Q', 'J', 'A'],
   'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11]},
};

 // Players
const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

// HIT, WIN and LOSS sounds
const hitSound = new Audio('../blackjack_assets/sounds/swish.m4a');

// HIT, STAND and DEAL event listeners
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

// Functionality for the 'HIT' button
function blackjackHit() {
   let card = randomCard();
   showCard(card, YOU);
   updateScore(card, YOU);
   showScore(YOU);
};

// Selecting a random card
function randomCard() {
   let randomIndex = Math.floor(Math.random() * 13);
   return blackjackGame['cards'][randomIndex];
};

// Retrieves the randomCard chosen and displays it only if scores is less or equal to 21
function showCard(card, activePlayer) {
   if (activePlayer['score'] <= 21) {
      let cardImage = document.createElement('img');
      cardImage.src = `../blackjack_assets/images/${card}.png`;
      document.querySelector(activePlayer['div']).appendChild(cardImage);
      hitSound.play();
   } 
};

// Removes the images/scores within both players divs and resets styling
function blackjackDeal() {
   let yourImages = document.querySelector('#your-box').querySelectorAll('img');
   let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

   for (i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
   }

   for (i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
   }

   YOU['score'] = 0;
   DEALER['score'] = 0;

   document.querySelector('#your-blackjack-result').textContent = 0;
   document.querySelector('#your-blackjack-result').style.color = 'white';

   document.querySelector('#dealer-blackjack-result').textContent = 0;
   document.querySelector('#dealer-blackjack-result').style.color = 'white';

};

// Gets the activePlayers score by taking in the card key and getting its value from cardsMap
function updateScore(card, activePlayer) {
   // 'A' card logic: If adding 11 keeps me below 21, add 11 otherwise add 1
   if (card === 'A') {
      if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
         activePlayer['score'] += blackjackGame['cardsMap'][card][1];
      } else {
         activePlayer['score'] += blackjackGame['cardsMap'][card][0];
      }
   } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card];
   }
};

// Changes the activePlayers score from 0 to their current score / BUST if over 21
function showScore(activePlayer) {
   if (activePlayer['score'] > 21) {
      document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
      document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
   } else {
      document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
   }
}