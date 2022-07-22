/*
 using async and await
*/

/*
URLS:
// brand new deck: 'https://www.deckofcardsapi.com/api/deck/new/';
// new deck, shuffled: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
// draw card: "https://deckofcardsapi.com/api/deck/xzp33w26fu9n/draw/?count=1"
// add to pile: "https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S"
// list pile: "https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/list/"
*/

const totalNeeded = 21;
const newDeckURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
let deck_id = '';
let gameOver= false;

const user = 'user';
const userCardDiv = document.getElementById('userCards');
let userCardImgs = [];
let userCards = [];
let userTotal = 0;
let userPass = false;
const userMessage = '... you!'

const computer = 'computer';
const computerCardDiv = document.getElementById('computerCards');
let computerCardImgs = [];
let computerCards = [];
let computerTotal = 0;
let computerPass = false;
const computerMessage = '... the computer.';

const tiedMessage = '... Well, we tied!';
const playingCardBack = 'https://deckofcardsapi.com/static/img/back.png';
const rulesDiv = document.getElementById('rules');

// event listeners
const startGameBtn = document.querySelector('#startGameBtn');
startGameBtn.addEventListener('click', function () { startGame(newDeckURL); });

const drawBtn = document.querySelector('#drawBtn');
drawBtn.addEventListener('click', function() { drawCard(user); })

const passBtn = document.querySelector('#passBtn');
passBtn.addEventListener('click', passProcess);

const newGameBtn = document.querySelector('#newGameBtn');
newGameBtn.addEventListener('click', function () { startGame(newDeckURL); });

const hideRulesBtn = document.querySelector('#hideRulesBtn');
hideRulesBtn.addEventListener('click', hideRules);

const showRulesBtn = document.querySelector('#showRulesBtn');
showRulesBtn.addEventListener('click', showRules);

async function startGame(url) {      
    startGameBtn.style.display = 'none';
    newGameBtn.style.display = 'none';
    passBtn.style.display = 'none'; // hide pass button til first user card drawn
    drawBtn.style.display = 'inline-block';
    
    if (rulesDiv.style.display === 'block') {
        hideRulesBtn.style.display = 'inline-block';
        showRulesBtn.style.display = 'none';    
    } else if (rulesDiv.style.display === 'none') {
        hideRulesBtn.style.display = 'none';
        showRulesBtn.style.display = 'inline-block';         
    }    
    
    // reset all
    gameOver = false;
    userCardImgs = [];
    userCards = [];
    userTotal = 0;
    userPass = false;
    userCardDiv.innerHTML = '';
    document.getElementById('userTotal').innerHTML = '';

    computerCardImgs = [];
    computerCards = [];
    computerTotal = 0;
    computerPass = false;
    computerCardDiv.innerHTML = '';
    
    document.getElementById('winner').innerHTML = '';

    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            let fetchJson = await response.json();
            //console.log('startGame function: ', fetchJson);
            deck_id = fetchJson.deck_id;
            //console.log('inside function: ', deck_id)

            // games starts with the computer drawing a card
            drawCard(computer);
        }

    } catch (error) {
        console.log('startGame() error: ', error);
    }
} // end of startGame()

function hideRules() {
    rulesDiv.style.display = 'none';
    hideRulesBtn.style.display = 'none';
    showRulesBtn.style.display = 'block';    
}

function showRules() {
    hideRulesBtn.style.display = 'block';
    showRulesBtn.style.display = 'none';
    rulesDiv.style.display = 'block';
}


async function drawCard(player) {
    try {
        if (deck_id) {
            // URL example: "https://deckofcardsapi.com/api/deck/xzp33w26fu9n/draw/?count=1"
            let url = 'https://deckofcardsapi.com/api/deck/' + deck_id + '/draw/?count=1';
            let response = await fetch(url);
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                let fetchJson = await response.json();
                //console.log('drawCard function: ', fetchJson);

                let card = fetchJson.cards[0].value;
                let suit = fetchJson.cards[0].suit;
                let cardImage = fetchJson.cards[0].image;
                
                // append image and card value to player's card image list
                if (player === 'user') {
                    userCardImgs.push(cardImage);
                    userCards.push(card);
                } else if (player === 'computer') {
                    computerCardImgs.push(cardImage);
                    computerCards.push(card);
                }                

                // console.log('computer cards values: ', computerCards);
                // console.log('player cards values: ', userCards);

                // show the pass button once the user has drawn the first card
                if (player === user) {
                    passBtn.style.display = 'inline-block';
                }                
                displayCards(player);
                calculateTotal(player);

                // check if computer needs to draw here
                if (player === 'user' && computerTotal <= 11) {
                    drawCard(computer);
                }

            }
        } else {
            console.log('Wait a second and try again');
        }      
        
    } catch (error) {
        console.log('drawPile() error: ', error);
    }
} // end of drawCard()

function displayCards(player) { 
    //console.log('inside displayCards function')   ;
    if (player === 'user') {                
        userCardDiv.innerHTML = ''; // clear out display first
        if (userCardImgs) { // userCardImgs.length > 0
            //console.log('in userCardImgs if');
            userCardImgs.forEach( cardImg => {
                //console.log('in foreach');
                const imgItem = document.createElement('img');
                imgItem.src = cardImg;
                userCardDiv.append(imgItem);
            })
        }        
    } else if (player === 'computer') {        
        computerCardDiv.innerHTML = '';
        if (computerCardImgs) { // userCardImgs.length > 0            
            computerCardImgs.forEach( cardImg => {                
                const imgItem = document.createElement('img');
                if (!gameOver) {
                    imgItem.src = playingCardBack;                    
                } else {                    
                    imgItem.src = cardImg;
                }
                computerCardDiv.append(imgItem);                
            })
        }
    }    
} // end of displayCards()

function calculateTotal(player) {
    // console.log('player in calculate total: ', player)
    let list;    
    if (player === 'user') {
        list = userCards;
    } else if (player === 'computer') {
        list = computerCards;
    }

    let total = 0;
    let aceCount = 0;
    for (i in list) {        
        if (list[i] === 'ACE') {
            aceCount += 1;
        } else if (list[i] === 'KING' || list[i] === 'QUEEN' || list[i] === 'JACK' || list[i] === 0) {
            total += 10;                        
        } else {
            total += Number(list[i]);            
        }
    } // end of for loop
    
    // take care of aceCount
    while (aceCount != 0) {
        if (aceCount >= 1 && total > 10) {
            total += 1; // ace is 1 point
            aceCount -= 1;
        } else if (aceCount === 1 && total === 10) {
            total += 11; // ace is 11 points -> total = 21
            aceCount -= 1;
        } else if (aceCount === 2 && total === 9) {
            total += 12; // first ace is 11 points, second ace 1 point -> total = 21
            aceCount = 0;
        } else if (aceCount === 3 && total === 8) {
            total += 13; // first ace is 11 points, second and third ace 1 point each -> total = 21
            aceCount = 0;
        }  else if (aceCount === 4 && total === 7) {
            total += 14; // first ace is 11 points, second, third, fourth ace 1 point each -> total = 21
            aceCount = 0;
        } else if (total < 10) {
            total += 11; // ace is 11 points
            aceCount -= 1;
        }
    } // end of while loop

    // display total
    if (player === 'user') {
        userTotal = total;
        document.getElementById('userTotal').innerHTML = total;        
    } 
    if (player === 'computer') {
        computerTotal = total;
        if (computerTotal > 11) {
            computerPass = true; // put this here? allow player to keep going if needed
        }
        if (!gameOver) {
            document.getElementById('computerTotal').innerHTML = '?';
            // console.log('computer Total: ', total);
        } else if (gameOver) {            
            document.getElementById('computerTotal').innerHTML = total;
        }        
    }

    if (!gameOver) {
        if (total >= totalNeeded) {
            if (userPass || userTotal >= 21) { // allows user to keep going if dealer gets 21
                endGame();
            }            
        }        
    }     
    // console.log('Game Over: ', gameOver);
}  // end of calculateTotal()

function passProcess() {
    userPass = true;
    // check if computer should continue to draw
    while (computerTotal <= 11) {
        drawCard(computer);
    }
    endGame();
} // end of passProcess()

function endGame() {
    gameOver = true;
    drawBtn.style.display = 'none';
    passBtn.style.display = 'none';

    calculateTotal(user);
    calculateTotal(computer);
    displayCards(user);
    displayCards(computer);

    // determine winner    
    let winner = '';
    if (userTotal === totalNeeded && computerTotal === totalNeeded) {
        winner = tiedMessage;
    } else if (userTotal === totalNeeded) {
        winner = userMessage;
    } else if (computerTotal === totalNeeded) {
        winner = computerMessage;
    } else if (userTotal > totalNeeded) {
        winner = computerMessage;
    } else if (userTotal < totalNeeded && computerTotal < totalNeeded) {
        let userDiff = totalNeeded - userTotal;
        let computerDiff = totalNeeded - computerTotal;
        if (userDiff === computerDiff) {
            winner = tiedMessage;
        } else if (userDiff < computerDiff) {
            winner = userMessage;            
        } else {
            winner = computerMessage;
        }
    }

    document.getElementById('winner').innerHTML = 'The winner is: ' + winner;

    newGameBtn.style.display = 'block';     
} // end of endGame()




/*
https://github.com/crobertsbmw/deckofcards

https://stackoverflow.com/questions/23815294/why-does-addeventlistener-fire-before-the-event-if-at-all

https://stackoverflow.com/questions/2373995/javascript-addeventlistener-event-fires-on-page-load
*/
