/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
const playGround = document.querySelector('.deck'); //reference to the deck of cards
let openedCards = []; // array to hold cards that we have opened.
let matchingCards = []; // array to hold cards that match.
const moveCounter = document.querySelector('.moves');
const restartButton = document.querySelector('.restart');
const scores = document.querySelector('.stars');

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
    shuffle(icons); // call the shuffle function on the array with icons.
    
    for (let i = 0; i < icons.length; i++) {    //looping over the cards.
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `<i class='${icons[i]}'></i>`;
        playGround.appendChild(card);
        card.addEventListener('click', click);
    };
}

function click(e) {
    let card = e.target;
    let previousCard = openedCards[0];

    if (openedCards.length === 1) { //we have an open card
        
        card.classList.add('open', 'show');
        playGround.classList.add('disable');
        setTimeout(() => {
            playGround.classList.remove('disable');
        }, 1000);

        if (card.innerHTML === previousCard.innerHTML) { //the cards match
            
            card.classList.add('match');
            previousCard.classList.add('match');
            matchingCards.push(card, previousCard);
            openedCards = [];
            console.log(matchingCards.length);

            if (matchingCards.lenght === icons.length) {
                gameOver;
            }

        } else { // the cards don't match

            openedCards = [];
            setTimeout(() => {
                card.classList.remove('open', 'show');
                previousCard.classList.remove('open', 'show');
            }, 1000);
        }


    } else { // we don't have an open card
        card.classList.add('open', 'show');
        openedCards.push(card);
    } 
}
function gameOver() {
    alert('Game Over');
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
