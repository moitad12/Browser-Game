// Set global variables
let dealerSum = 0;
let mySum = 0;

// keep track of the aces both you and dealer have since Ace counts as 11 or 1
let dealerAceCount = 0;
let myAceCount = 0;

// keep track of value of dealers hidden card
let hidden;
let deck;

// lets player draw cards while mySum <= 21
let canHit = true;

window.onload = function () {
    buildingDeck();
    shuffleDeck();
    beginGame();
}

// function to build deck
function buildingDeck () {
    let types = ['C', 'H', 'D', 'S'];
    let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K'];
    deck = [];

    // for loop to itterate thru all types and values
    for (let i = 0; i < types.length; i++) {
        for (let k = 0; k < values.length; k++){
            deck.push(values[k] + "-" + types[i])
        }
    }
    // console.log(deck)
}

// function to shuffle deck
function shuffleDeck () {
    for (let i = 0; i < deck.length; i++){
        let k = Math.floor(Math.random() * deck.length)
        let temp = deck[i]
        deck[i] = deck[k]
        deck[k] = temp
    }
    console.log(deck)
}

// function to begin game
function beginGame () {
    hidden = deck.pop()
    dealerSum += getValue(hidden)
    dealerAceCount += checkAce(hidden)
    // console.log(hidden);
    // console.log(dealerSum);
    while (dealerSum < 17){
        let cardImg = document.createElement("img")
        let card = deck.pop()
        cardImg.src = "./cards/" + card + ".png"
        dealerSum += getValue(card)
        dealerAceCount += checkAce(card)
        document.getElementById("dealers-cards").append(cardImg)
    }
    console.log(dealerSum)

    for(let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img")
        let card = deck.pop()
        cardImg.src = "./cards/" + card + ".png"
        mySum += getValue(card)
        myAceCount += checkAce(card)
        document.getElementById("my-cards").append(cardImg)
    }
    console.log(mySum)

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}

// function for hit button
function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img")
    let card = deck.pop()
    cardImg.src = "./cards/" + card + ".png"
    mySum += getValue(card)
    myAceCount += checkAce(card)
    document.getElementById("my-cards").append(cardImg)

    if (reduceAce(mySum, myAceCount) > 21) {
        canHit = false;
    }
}

// function for stay button
function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    mySum = reduceAce(mySum, myAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = ""
    if (mySum > 21) {
        message = "YOU LOSE!"
    }
    else if (dealerSum > 21) {
        message = "YOU WIN!"
    }
    else if (mySum == dealerSum) {
        message = "TIE!"
    }
    else if (mySum > dealerSum) {
        message = "YOU WIN!"
    }
    else if (mySum < dealerSum) {
        message = "YOU LOSE!"
    }

    document.getElementById("dealers-sum").innerText = dealerSum;
    document.getElementById("my-sum").innerText = mySum;
    document.getElementById("results").innerText = message;
}

function getValue (card) {
    let data = card.split("-")
    let value = data[0]

    if (isNaN(value)) {
        if (value == 'A') {
            return 11
        }
        return 10
    }
    return parseInt(value)
}

// function to check dealers ace count
function checkAce(card){
    if (card[0] == 'A') {
        return 1;
    } 
    return 0;
}
// function to reduce ace
function reduceAce(mySum, myAceCount) {
    while (mySum > 21 && myAceCount > 0) {
        mySum -= 10;
        myAceCount -= 1;
    }
    return mySum;
}