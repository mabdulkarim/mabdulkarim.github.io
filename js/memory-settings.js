const gameBoard = document.querySelector("#game-board");
const selectBoardSize = document.querySelector("#board-size");
const selectSymbol = document.querySelector('#card-symbol');
const selectImage = document.querySelector('#card-image');
const inputCoverColor = document.querySelector('#card-cover');
const inputCardOpenColor = document.querySelector('#card-open');
const inputMatchCard = document.querySelector('#card-match');
const newGame = document.querySelectorAll('.new-game');

window.onload = createBoard;

/**
 * Event listeners for the memory settings.
 */
selectBoardSize.addEventListener('change', createBoard);
selectImage.addEventListener('change', createBoard);
selectSymbol.addEventListener('change', () => {
    let symbol = selectSymbol.options[selectSymbol.selectedIndex].value;
    let cover = document.querySelectorAll('.cover');
    cover.forEach(element => element.innerHTML = symbol);
});

inputCoverColor.addEventListener('change', () => {
    let color = inputCoverColor.value;
    gameBoard.childNodes.forEach(card => card.style.background = color);
});
inputCardOpenColor.addEventListener('change', () => {
    let color = inputCardOpenColor.value;
    let openCard = document.querySelectorAll('.clicked');
    openCard.forEach(card => card.style.border = `3px solid ${color}`);
});
inputMatchCard.addEventListener('change', () => {
    let color = inputMatchCard.value;
    let matchCard = document.querySelectorAll('.matched');
    matchCard.forEach(card => card.style.border = `3px solid ${color}`)
});

newGame.forEach(button => button.addEventListener('click', () => window.location.reload()));

/**
 * Creates the memory board with the proper settings and images.
 */
function createBoard() {
    if (gameBoard.childElementCount) {
        removeElementChildren(gameBoard);
    }

    let boardSize = parseInt(selectBoardSize.options[selectBoardSize.selectedIndex].value);
    let imageType = document.querySelector('#card-image').value;

    gameBoard.style.gridTemplateColumns = `repeat(${boardSize},  1fr)`;

    setImages(boardSize, imageType);
}

/**
 * Removes the children of given parent element.
 * @param {HTMLElement} parent - The parent element from which the children should be removed.
 */
function removeElementChildren(parent) {
    let child = parent.lastElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}

/**
 * Creates card elements with two children: front and cover element.
 * @param {string} name - Dataset value.
 * @param {string} img - Url source to image.
 * @param {number} cardLabelNumber - The card aria-label number
 * @returns {HTMLDivElement} - Returns a new card element.
 */
function createCard(name, img, cardLabelNumber) {
    let card = document.createElement('div');
    card.className = "card";
    card.ariaLabel = "Card " + cardLabelNumber;
    card.dataset.name = name;

    let front = document.createElement('img');
    front.className = "front";
    front.style.backgroundImage = `url(${img})`;

    let cover = document.createElement('div');
    cover.className = 'cover';
    cover.innerHTML = "?";

    card.appendChild(cover);
    card.appendChild(front);
    return card;
}

/**
 * Shuffles the given array.
 * @param {array} array - Array that must be shuffled.
 */
function shuffleArray(array) {
    array.sort(() => 0.5 - Math.random());
}

/**
 * Disables the option to scroll on the webpage.
 */
function disableScroll() {
    document.body.style.overflow = 'hidden';
}

/**
 * Makes a API call to fetch images and puts the images on the right cards.
 * @param {number} boardSize - The memory board-size.
 * @param {string} imageType - The kind of photo that must be fetched.
 */
function setImages(boardSize, imageType) {
    let amountOfCards = (boardSize*boardSize)/2;

    fetch(`https://api.unsplash.com/search/photos/?query=${imageType}&per_page=${amountOfCards}&client_id=mSxWWCr9MkhGK6zUnKbt_bPcTy9UCEh2-9vRRJUr0UI`)
    .then(response => {return response.json()})
    .then(data => {
        let cardsArray = [];
        let count = 0;
        data.results.forEach(item => {
            count++;
            cardsArray.push({name: count, img: item.urls.regular});
        })
        return cardsArray.concat(cardsArray);
    })
    .then(cardsInfo => {
        shuffleArray(cardsInfo);
        for (let i = 0; i < cardsInfo.length; i++) {
            let card = createCard(cardsInfo[i].name, cardsInfo[i].img, i);
            gameBoard.appendChild(card);
        }
    });
}