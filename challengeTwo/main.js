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

const brandNewDeckURL = 'https://www.deckofcardsapi.com/api/deck/new/';

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


