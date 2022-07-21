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

const newDeckURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
let deck_id = '';
let gameOver= false;

//const userCardDiv = document.getElementById('userCards');
const userPile = 'user';
let userCardImgs = [];
let userCards = [];
let userTotal = 0;

const dealerCardDiv = document.getElementById('dealerCards');
const dealerPile = 'dealer';
let dealerCardImgs = [];
let dealerCards = [];
let dealerTotal = 0;

const playingCardBack = '/images/playing-cards-back-delta-vector-2848246-2.jpg'

// event listeners
const startGameBtn = document.querySelector('#startGameBtn');
startGameBtn.addEventListener('click', function () { startGame(newDeckURL); });

const drawBtn = document.querySelector('#drawBtn');
drawBtn.addEventListener('click', function() { drawCard(userPile); })

const passBtn = document.querySelector('#passBtn');
//passBtn.addEventListener('click', endGame);
// TODO implement endGame function (or however the game will end...)

async function startGame(url) {
    // hide startGameBtn, show draw and pass buttons    
    startGameBtn.style.display = 'none';
    drawBtn.style.display = 'inline-block';
    passBtn.style.display = 'inline-block';

    // reset totals
    userTotal = 0;
    dealerTotal = 0;

    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            let fetchJson = await response.json();
            //console.log('startGame function: ', fetchJson);
            deck_id = fetchJson.deck_id;
            //console.log('inside function: ', deck_id)

            // games starts with the dealer drawing a card
            drawCard(dealerPile);
        }

    } catch (error) {
        console.log('startGame() error: ', error);
    }
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
                } else if (player === 'dealer') {
                    dealerCardImgs.push(cardImage);
                    dealerCards.push(card);
                }                

                console.log('dealer cards values: ', dealerCards);
                // console.log('player cards values: ', userCards);                         
                
                addToPile(player, card, suit); // might not use this
                displayCards(player);
                calculateTotal(player);

                // check if dealer needs to draw here??

            }
        } else {
            console.log('Wait a second and try again');
        }      
        
    } catch (error) {
        console.log('drawPile() error: ', error);
    }
}

// might not use this
async function addToPile(player, card, suit) {
    // TODO: add logic for who is current player (ie which pile to add to)
       
    try {
        // URL exampe: "https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S"
        let url = 'https://www.deckofcardsapi.com/api/deck/' + deck_id + '/pile/' + player + '/add/?cards=' + card[0] + suit[0];
        let response = await fetch(url);
        if(!response.ok) {
            throw Error(response.statusText);            
        } else {
            let fetchJson = await response.json();
            //console.log('addToPile function: ', fetchJson);
            //console.log('pile: ', fetchJson.piles);
            //listPile(player);
        }
    } catch (error) {
        console.log('addToPile() error: ', error);        
    }

}

// Maybe won't use this? If so, probably don't need addToPile function either
async function listPile(pileName) {
    try {
        // URL example: "https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/list/"
        let url = 'https://www.deckofcardsapi.com/api/deck/' + deck_id + '/pile/' + pileName + '/list/';
        let response = await fetch(url);
        if(!response.ok) {
            throw Error(response.statusText);
        } else {
            let fetchJson = await response.json();
            console.log('listPile function: ', pileName + ' ' + fetchJson);
            console.log('piles: ', fetchJson.piles);
            console.log('player pile: ', fetchJson.piles.player);
            console.log('player cards: ', fetchJson.piles.player.cards);


        }

    } catch (error) {
        console.log('listPile() error:', error)

    }
}

function displayCards(player) { 
    //console.log('inside displayCards function')   ;
    if (player === 'user') {        
        const userCardDiv = document.getElementById('userCards');
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
    } else if (player === 'dealer') {
        const dealerCardDiv = document.getElementById('dealerCards');
        dealerCardDiv.innerHTML = '';
        if (dealerCardImgs) { // userCardImgs.length > 0            
            dealerCardImgs.forEach( cardImg => {                
                const imgItem = document.createElement('img');
                imgItem.src = playingCardBack;
                dealerCardDiv.append(imgItem);
            })
        }      

        
        // if (!gameOver) { for each item in list, show image of a back of card }
        // else { show cards }
    }    
}

function calculateTotal(player) {
    // console.log('player in calculate total: ', player)
    let list;    
    if (player === 'user') {
        list = userCards;
    } else if (player === 'dealer') {
        list = dealerCards;
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
        } // end of for loop    

    // display total
    if (player === 'user') {
        userTotal = total; // is this where I want this?
        document.getElementById('userTotal').innerHTML = total;        
    } else if (player === 'dealer') {
        dealerTotal = total; // is this what I want this?
        if (!gameOver) {
            document.getElementById('dealerTotal').innerHTML = '?';
            console.log('Dealer Total: ', total);
        } else if (gameOver) {
            document.getElementById('dealerTotal').innerHTML = total;
        }        
    }

    if (total >= 21) {
        gameOver = true;
    } // call gameEnd function?
    console.log('Game Over: ', gameOver);


}  // end of calculateTotal()

    // how will I handle Aces - they can be worth 1 or 11
    // if player total > 21, game ends and dealer wins
    // if player total = 21, game ends and player wins
    // logic for whether or not dealer draws
    // after dealer draws, same checks as above
    // if player passes, check who is closer to 21
    // if gameOver, displayCards('dealer')




/*
https://stackoverflow.com/questions/23815294/why-does-addeventlistener-fire-before-the-event-if-at-all

https://stackoverflow.com/questions/2373995/javascript-addeventlistener-event-fires-on-page-load
*/
