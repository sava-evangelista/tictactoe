// create classes
const CROSS = 'cross'
const CIRCLE = 'circle'

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// create variables for elements
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winMsg = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winMsgTxt = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

// clears screen & class
function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(CROSS)
    cell.classList.remove(CIRCLE)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winMsg.classList.remove('show')
  const p2Icon = document.getElementById('p2-turn-dot')
  p2Icon.classList.remove('circle')

  updatePlayerDisplay();
}

// updates classes and turn display
function updatePlayerDisplay() {
  const p1Icon = document.getElementById('p1-turn-cross')
  const p2Icon = document.getElementById('p2-turn-dot')

  if (circleTurn) {
    p1Icon.classList.remove('cross')
    p2Icon.classList.add('circle')
  } else {
    p1Icon.classList.add('cross')
    p2Icon.classList.remove('circle')
  }
  }

// displays end screen or switches turn
function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE : CROSS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

// implements ending screen
function endGame(draw) {
  if (draw) {
    winMsgTxt.innerText = 'Draw!'
  } else {
    winMsgTxt.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winMsg.classList.add('show')
}

// checks if all cells are filled
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(CROSS) || cell.classList.contains(CIRCLE)
  })
}

// places cross or circle on board
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

// switches player turn display
function swapTurns() {
  const p1Icon = document.getElementById('p1-turn-cross');
  const p2Icon = document.getElementById('p2-turn-dot');

  if (!circleTurn) {
    p1Icon.style.visibility = 'hidden'; 
    p2Icon.style.visibility = 'visible'; 
  } else {
    p1Icon.style.visibility = 'visible'; 
    p2Icon.style.visibility = 'hidden'; 
  }
  circleTurn = !circleTurn
}

// implement transparent icons during hovering
function setBoardHoverClass() {
  board.classList.remove(CROSS)
  board.classList.remove(CIRCLE)
  if (circleTurn) {
    board.classList.add(CIRCLE)
  } else {
    board.classList.add(CROSS)
  }
}

// loops through all winning combinations to find possible match
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}