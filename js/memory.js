let firstPick = "";
let secondPick = "";
let cardMatchCount = 0;

/**
 * Changes clicked cards to matched cards, border color
 * and increments found carts count by 1.
 */
function matchCards() {
    let clickedCards = document.querySelectorAll('.clicked');
    let matchedColor = document.querySelector('#card-match').value;
    let pairs = document.querySelector('#pair-count').innerHTML;
    document.querySelector('#pair-count').innerHTML = `${parseInt(pairs)+1}`;

    clickedCards.forEach(element => {
        element.classList.replace('clicked', 'matched');
        element.style.border = `3px solid ${matchedColor}`;
    })
}

/**
 * It flips the card to its front.
 * @param card - The card that must be flipped
 */
function flipCard(card) {
    let openCardColor = document.querySelector('#card-open').value;
    card.childNodes[1].style.display = 'block';
    card.childNodes[1].style.border = `3px solid ${openCardColor}`;
}

/**
 * If player found all cards a congratulations pop up will show.
 * @param {number} numberOfMatchedCards - The number of matched cards
 */
function checkWin(numberOfMatchedCards) {
    console.log(numberOfMatchedCards);
    if (numberOfMatchedCards === (gameBoard.childElementCount/2)) {
        let popUp = document.querySelector('.pop-up');
        disableScroll();
        popUp.style.display = 'block';
    }
}

/**
 * Removes the clicked class from the clicked cards and resets picks and count.
 */
function resetCards() {
    firstPick = "";
    secondPick = "";
    cardMatchCount = 0;

    let clickedCards = document.querySelectorAll('.clicked');

    clickedCards.forEach(card => {
        card.classList.remove('clicked');
        card.parentNode.childNodes.forEach(item => {
            if (!item.classList.contains('front')) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        })
    });
}

/**
 * Hides the cover of the card element.
 * @param {HTMLElement} target - The cover that must be hidden.
 */
function coverVisibility(target) {
    target.childNodes[0].style.display = 'none';
}

/**
 * Adds clicked class to given card.
 * @param {HTMLElement} card - The card that must be changed.
 */
function changeCardState(card) {
    card.childNodes[1].classList.add('clicked');
    coverVisibility(card);
    flipCard(card);
}

/**
 * The game-loop.
 */
gameBoard.addEventListener('click', (event) => {
    let clickedCard = event.target;

    if (clickedCard.classList.contains('clicked') || clickedCard.classList.contains('matched')) {
        console.log("can't");
        return;
    }

    cardMatchCount++;

    switch (cardMatchCount) {
        case 1:
            firstPick = clickedCard.dataset.name;
            changeCardState(clickedCard);
            break;
        case 2:
            secondPick = clickedCard.dataset.name;
            changeCardState(clickedCard);
            break;
        case 3:
            resetCards();
            firstPick = clickedCard.dataset.name;
            changeCardState(clickedCard);
            cardMatchCount++;
    }

    if (firstPick && secondPick) {
        if(firstPick === secondPick) {
            matchCards();
        }
    }

    let numberOfMatchedCards = document.querySelector('#pair-count').innerHTML;
    checkWin(parseInt(numberOfMatchedCards));
})