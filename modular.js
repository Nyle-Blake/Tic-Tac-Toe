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
const symbolBtnX = document.querySelector(".choiceX")
const symbolBtnO = document.querySelector(".choiceO")


let playerSymbol = ""

let playerXCount = []
let playerOCount = []

let gameOver = false

// function for the player to pick a square to mark
const getPlayerChoice = (item) => {

  if (gameOver == true) {
    ;
  } else if (item.textContent == "") {

    if (playerSymbol == "x") {
      item.textContent = "x"
      playerXCount.push(item.id)

      checkForWin()

      if (gameOver !== true) {
        getComputerChoice()
      }

      checkForWin()
      console.log(playerXCount)

    } else if (playerSymbol == "o") {
      item.textContent = "o"
      playerOCount.push(item.id)

      checkForWin()
      
      if (gameOver !== true) {
        getComputerChoice()
      }

      checkForWin()
      console.log(playerOCount)
    }
  }

}

// function for the computer to pick a square to mark
const getComputerChoice = () => {
  
  let computerChoice = ["1", "2", "3", "4", "5", "6", "7", "8", "9",][Math.floor(Math.random() * 9)]

  let chosenSquare = document.getElementById(computerChoice)

  console.log(chosenSquare.textContent)

  if (gameOver == true) {
    ;
  } else if (chosenSquare.textContent == "") {
    if (playerSymbol == "x") {
      chosenSquare.textContent = "o"
      playerOCount.push(computerChoice)
    } else if (playerSymbol == "o") {
      chosenSquare.textContent = "x"
      playerXCount.push(computerChoice)
    }
  } else {
    getComputerChoice()
  }

}

const clearGrid = () => {
  gridItems.forEach(item => {
    item.textContent = ""
  })
}

// click event listener to allow player to choose x and reset the grid
symbolBtnX.addEventListener("click", () => {
  playerSymbol = "x"
  clearGrid()
  playerXCount = []
  playerOCount = []
  result.textContent = ""
  gameOver = false
  console.log(playerXCount)
})

// click event listener to allow player to choose o and reset the grid
symbolBtnO.addEventListener("click", () => {
  playerSymbol = "o"
  clearGrid()
  playerOCount = []
  playerXCount = []
  result.textContent = ""
  gameOver = false
  getComputerChoice()
  console.log(playerOCount)
})

// grid square click event listener
gridItems.forEach(item => {
  item.addEventListener("click", () => {
    console.log(playerSymbol)
    getPlayerChoice(item)
  })
});

// function to check wether a winning combination has been made
const checkForWin = () => {

  let matchesX = winningCombinations.some(combination => {
    return combination.every(elem => playerXCount.includes(elem))
  })

  let matchesO = winningCombinations.some(combination => {
    return combination.every(elem => playerOCount.includes(elem))
  })

  if (matchesX == true) {
    result.textContent = "X wins!"
    gameOver = true;
  } else if (matchesO == true) {
    result.textContent = "O wins";
    gameOver = true;
  } else {

    let gridItemsArr = [...gridItems]
    console.log(gridItemsArr)

    let tieStatus = gridItemsArr.every(item => {
      return item.textContent !== ""
    })

    console.log(tieStatus)

    if (tieStatus == true && gameOver == false) {
      result.textContent = "It is a tie!"
    }
  }

}