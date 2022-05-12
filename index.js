// timer
let second = 0;
let minute = 0;
let hour = 0;

// retrieve elements
let timer = document.getElementById('timer');
let cards = document.getElementsByClassName('card');

window.onload = function() {
    setInterval(startTimer, 1000);
    onCardClick();
    countPairs(); // can be deleted here when the real game is implemented
}

window.onchange = function() {
    countPairs();
}

function onCardClick() {
    for(let i = 0; i < cards.length; i++) {
        let card = document.getElementsByClassName('card')[i];
        card.addEventListener('click', function() {
            if(card.classList.contains("found-card")) {
                console.log("card pair already complete");
            } else {
                card.style.backgroundColor = changeOpenCardCover();
            }
        });
    }
}

function startTimer() {
    second = parseInt(second);
    minute = parseInt(minute);
    hour = parseInt(hour);

    second++;
    if(second === 60) {
        minute++;
        second = 0;
    }
    if(minute === 60) {
        hour++;
        minute = 0;
    }

    //concatenate last number if smaller then 10
    if (second < 10 || second === 0) {
        second = '0' + second;
    }
    if (minute < 10 || minute === 0) {
        minute = '0' + minute;
    }
    if (hour < 10 || hour === 0) {
        hour = '0' + hour;
    }

    timer.innerHTML = "<p>Verlopen tijd: " + hour + ':' + minute + ':' + second + "</p>";
}

function changeOpenCardCover() {
    return document.getElementById('card-open').value;
}

function changeCardCover() {
    let currentColor = document.getElementById('card-cover').value;
    console.log(currentColor);

    for(let i = 0; i < cards.length; i++) {
        let cardCover = document.getElementsByClassName('card')[i];
        if(cardCover.classList.contains("found-card")) {
            console.log("card pair already complete");
        } else {
            cardCover.style.backgroundColor = currentColor;
        }
    }
}

function changeFoundedCardCover() {
    let currentColor = document.getElementById('card-complete').value;
    console.log(currentColor);

    for(let i = 0; i < cards.length; i++) {
        let cardFoundCover = document.getElementsByClassName('card')[i];
        if(cardFoundCover.classList.contains("found-card")) {
            cardFoundCover.style.backgroundColor = currentColor;
        } else {
            console.log("don't change not founded cards");
        }
    }
}

function changeCardSymbol() {
    let symbol = document.getElementById('card-symbol');
    let symbolValue = symbol.options[symbol.selectedIndex].value;
    console.log(symbolValue);

    for(let i = 0; i < cards.length; i++) {
        let cardText = document.getElementsByClassName('card')[i];
        cardText.innerHTML = symbolValue;
    }
}

function countPairs() {
    let foundCard = document.getElementsByClassName('found-card');
    let pairs = document.getElementById('found-pairs');
    let count = 0;

    for(let i = 0; i < foundCard.length; i++) {
        if(foundCard) {
            count++;
        }
    }

    pairs.innerHTML = "<p>Gevonden kaart-paren: " + count / 2 + "</p>";
}

function refreshPage() {
    window.location.reload();
}