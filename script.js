const winningCombinations = [
  ["1","2","3"],
  ["4","5","6"],
  ["7","8","9"],
  ["1","4","7"],
  ["2","5","8"],
  ["3","6","9"],
  ["1","5","9"],
  ["3","5","7"]
]

const result = document.querySelector(".result")
const gridItems = document.querySelectorAll(".grid-item")

let playerSymbol = "x"

let playerX = []
let playerO = []

// function for player to select square they want marked
const getPlayerChoice = (item) => {

  if (item.textContent == "") {
    item.textContent = "x"
    playerX.push(item.id)
    console.log(playerX)
  }

}

// function to get the computer to pick a square to mark
const getComputerChoice = () => {
  let computerChoice = ["1", "2", "3", "4", "5", "6", "7", "8", "9",][Math.floor(Math.random() * 9)]

  let chosenSquare = document.getElementById(computerChoice)

  if (chosenSquare.textContent == "") {
    chosenSquare.textContent = "o"
    playerO.push(computerChoice)
  } else {
    getComputerChoice()
  }

}

// grid square event listener
gridItems.forEach(item => {
  item.addEventListener("click", () => {
    getPlayerChoice(item)
    getComputerChoice()
    checkForWin()
  })
});

// function to check wether a winning combination has been made
const checkForWin = () => {

  let matches = winningCombinations.some(combination => {
    return combination.every(elem => playerX.includes(elem))
  })

  if (matches == true) {
    result.textContent = "You win!"
  }

}