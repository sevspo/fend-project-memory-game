/*
 * Create a list that holds all of your cards
 */
// the array that holds the cards. 
const icons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb",];
const doubleIcons = icons.concat(icons);
const playGround = document.querySelector('.deck'); //reference to the deck of cards
let openedCards = []; // array to hold cards that we have opened.
let matchingCards = []; // array to hold cards that match.
const moveCounter = document.querySelector('.moves');
const restartButton = document.querySelector('.restart');
const scoresPanel = document.querySelector('.stars');
const timer = document.querySelector('.timer');
let time = 0;
let h = 0;
let m = 0;
let s = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex; 

    while (currentIndex !== 0) {  // While there remain elements to shuffle...
        randomIndex = Math.floor(Math.random() * currentIndex); // Pick a remaining element
        currentIndex -= 1;
        temporaryValue = array[currentIndex]; // And swap it with the current element.
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

createCards();// call it to initialize the gameboard.

function createCards(){ // create the cards function.
    
    shuffle(doubleIcons); // call the shuffle function on the array with icons.
    
    for (let i = 0; i < doubleIcons.length; i++) {    //looping over the cards.
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `<i class='${doubleIcons[i]}'></i>`;
        playGround.appendChild(card);
        card.addEventListener('click', click);
    };
}

function click(e) { // the click function with the main functionality of the game.
    let card = e.target;
    let previousCard = openedCards[0];
    
    if (openedCards.length === 1) { //we have an open card
        
        addMove(); // call the the addMove Function. Here is the right place, because 2 draws count as one move.
        
        card.classList.add('open', 'show', 'disable');
        playGround.classList.add('disable'); // this disables all cards for contiunous clicks before the move as ended.
        setTimeout(() => { // this enables input again after the cards are covered up again and the player can make the next move
            playGround.classList.remove('disable');
        }, 1000);
        
        if (card.innerHTML === previousCard.innerHTML) { //the cards match
            
            card.classList.add('match');
            previousCard.classList.add('match');
            matchingCards.push(card, previousCard);
            openedCards = [];
            
            if (matchingCards.length === doubleIcons.length) { // checking wether we have matched all cards
                setTimeout(() => {
                    gameOver();    
                }, 500);
            }
            
        } else { // the cards don't match
        
        openedCards = [];
        setTimeout(() => {
            card.classList.remove('open', 'show', 'disable');
            previousCard.classList.remove('open', 'show', 'disable');
        }, 1000);
    }
    
    
} else { // we don't have an open card
card.classList.add('open', 'show', 'disable');
openedCards.push(card);
} 
}

function gameOver() { // When the Game is over
    stopTimer();
    alert(`GAME OVER!
    You beat the Game with ${moves} Moves.
    That gives you a rating of ${numberOfStars} Stars.
    Your time: ${h} hours, ${m} minutes and ${s} seconds.
    Would you like to play again?`); // this is the game over message.
}

let numberOfStars = 3;
let moves = 0;
moveCounter.textContent = 0;
function addMove() { // increse the movecounter and set the score
    moves++;
    moveCounter.textContent = moves;
    const stars = scoresPanel.firstElementChild; // get a reference to the child element of the Score Panel, the Stars.
    if (moves === 13) {
        scoresPanel.removeChild(stars); // remove a star
        numberOfStars = 2;
    }
    if (moves === 18) {
        scoresPanel.removeChild(stars);
        numberOfStars = 1;
    }
    if (moves === 25) {
        scoresPanel.removeChild(stars);
        numberOfStars = 0;
    }
}

restartButton.addEventListener('click', function() { // the reset funcionality the easy way!
location.reload();
})

let setTimer = setInterval(stopwatch, 1000);
timer.textContent = '0:0:0';
function stopwatch() {
    time++;
    h = Math.floor(time / 3600);
    m = Math.floor((time - h * 3600) / 60);
    s = time - (h * 3600  + m * 60);
    timer.textContent = `${h}:${m}:${s}`;
}

function stopTimer() {
    clearInterval(setTimer);
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
