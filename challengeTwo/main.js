/*

// const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

// TODO need new deck
const newDeck = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
//const url = "https://deckofcardsapi.com/api/deck/xzp33w26fu9n/draw/?count=1"

const output = document.getElementById("output");
const cardImg = document.getElementById("img1");
const newCardButton = document.getElementById("newCard");

newCardButton.addEventListener('click', getJSON);

const url = "https://deckofcardsapi.com/api/deck/n6bir2uz1zsf/draw/?count=1"

function getJSON() {
    //console.log('button clicked');    
    return fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .then(data => {
            const JSONdata = data;
            console.log('JSONdata: ', JSONdata);
            cardImg.src = JSONdata.cards[0].image;
            console.log('deck id: ', JSONdata.deck_id)
            console.log('card value: ', JSONdata.cards[0].value)
            console.log('card suit: ', JSONdata.cards[0].suit)
        })
        .catch(function(error) {
            console.log(error);
        });
}

*/

/*
const brandNewDeckURL = 'https://www.deckofcardsapi.com/api/deck/new/';
let deck_id = '';

function getJSON(url) {
    return fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .then(data => {
            const JSONdata = data;
            return JSONdata;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function brandNewDeck(url) {
    deckData = getJSON(url);
    return deckData;
}

// let deckInfo = brandNewDeck(brandNewDeckURL);
// console.log('deckInfo: ', deckInfo);
// console.log('deck id: ', deckInfo.deck_id) // undefined, need to use async and await??
*/



// async and await


const brandNewDeckURL = 'https://www.deckofcardsapi.com/api/deck/new/';
let deck_id = '';

// draw card URL example: "https://deckofcardsapi.com/api/deck/xzp33w26fu9n/draw/?count=1"
let drawCardUrlStart = 'https://deckofcardsapi.com/api/deck/';
let drawCardUrlEnd = '/draw/?count=1';

// add to pile URL exampe: "https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S"
const playerPile = 'player'
const dealerPile = 'dealer'
let addToPilePart1 = 'https://www.deckofcardsapi.com/api/deck/';
let addToPilePart2 = '/pile/';
let addToPilePart3 = '/add/?cards=';
let addToPilePart4 = '';

// list piles URL example: "https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/list/"


// event listeners
const startGameButton = document.querySelector('#startGame');
startGameButton.addEventListener('click', function () { startGame(brandNewDeckURL); });
// TODO: when game is started, each player will start with one card drawn

const drawAgainButton = document.querySelector('#drawAgain');
drawAgainButton.addEventListener('click', function() { drawCard(drawCardUrlStart, drawCardUrlEnd); })

async function startGame(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            let fetchJson = await response.json();
            console.log('get info: ', fetchJson);
            deck_id = fetchJson.deck_id;
            console.log('inside function: ', deck_id)
        }

    } catch (error) {
        console.log(error);
    }
}

async function drawCard(urlStart, urlEnd) {
    try {
        if (deck_id) {
            let url = urlStart + deck_id + urlEnd;
            let response = await fetch(url);
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                let fetchJson = await response.json();
                console.log('draw card: ', fetchJson);

                let card = fetchJson.cards[0].value;
                let suit = fetchJson.cards[0].suit;
                console.log('card value: ', card);
                console.log('card suit: ', suit);

                addToPile(card, suit);

            }
        } else {
            console.log('Wait and second and try again');
        }      
        
    } catch (error) {
        console.log(error);
    }
}

async function addToPile(card, suit) {
    // TODO: add logic for who is current player (ie which pile to add to)
       
    try {
        // NOTE: if url isn't going to change, I don't need to put the parts into variables above, I could just put the strings here...
        let url = addToPilePart1 + deck_id + addToPilePart2 + playerPile + addToPilePart3 + card[0] + suit[0];
        let response = await fetch(url);
        if(!response.ok) {
            throw Error(response.statusText);            
        } else {
            let fetchJson = await response.json();
            console.log('add to pile: ', fetchJson);
        }
    } catch (error) {
        console.log(error);        
    }

}

console.log('outside function: ', deck_id) // this prints before getInfo() finishes


/*
https://stackoverflow.com/questions/23815294/why-does-addeventlistener-fire-before-the-event-if-at-all

https://stackoverflow.com/questions/2373995/javascript-addeventlistener-event-fires-on-page-load
*/
