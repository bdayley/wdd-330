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

const dealerCardDiv = document.getElementById('dealerCards');
const dealerPile = 'dealer';
let dealerCardImgs = [];
let dealerCards = [];

// event listeners
const startGameButton = document.querySelector('#startGame');
startGameButton.addEventListener('click', function () { startGame(newDeckURL); });

const drawAgainButton = document.querySelector('#drawAgain');
drawAgainButton.addEventListener('click', function() { drawCard(userPile); })

async function startGame(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            let fetchJson = await response.json();
            console.log('startGame function: ', fetchJson);
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
                console.log('drawCard function: ', fetchJson);

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

                console.log('dealer card imgs: ', dealerCardImgs);
                console.log('dealer cards values: ', dealerCards);
                console.log('player card imgs: ', userCardImgs);
                console.log('player cards values: ', userCards);                         
                
                //console.log('card value: ', card);
                //console.log('card suit: ', suit);
                //console.log('card img: ', cardImage)

                addToPile(player, card, suit);

                displayCards(player);

                // TODO: 
                // calculateTotal()
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
            console.log('addToPile function: ', fetchJson);
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

function calculateTotal(player) {

    // how will I handle Aces - they can be worth 1 or 11
    // if player total > 21, game ends and dealer wins
    // if player total = 21, game ends and player wins
    // logic for whether or not dealer draws
    // after dealer draws, same checks as above
    // if gameOver, displayCards('dealer')

}

function displayCards(player) { 
    console.log('inside displayCards function')   ;
    if (player === 'user') {
        const userCardDiv = document.getElementById('userCards');
        userCardDiv.innerHTML = ''; // clear out display first
        if (userCardImgs > 0) {
            userCardImgs.forEach( cardImg => {
                const imgItem = document.createElement('img');
                imgItem.src = cardImg;
                userCardDiv.append(imgItem);
            })
        }        
    } else if (player === 'dealer') {
        // clear out display first
        // if (!gameOver) { for each item in list, show image of a back of card }
        // else { show cards }
    }

    //cardImg.src = JSONdata.cards[0].image;
}

/*
https://stackoverflow.com/questions/23815294/why-does-addeventlistener-fire-before-the-event-if-at-all

https://stackoverflow.com/questions/2373995/javascript-addeventlistener-event-fires-on-page-load
*/
