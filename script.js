const queries = (() => {
  const result = document.querySelector(".result")
  const gridItems = document.querySelectorAll(".grid-item")
  const symbolBtnX = document.querySelector(".choiceX")
  const symbolBtnO = document.querySelector(".choiceO")

  return {result, gridItems, symbolBtnX, symbolBtnO}
})();

const counts = (() => {
  let playerSymbol = ""
  let playerXCount = []
  let playerOCount = []
  let gameOver = false

  return {playerSymbol, playerXCount, playerOCount, gameOver}
})()

// function for the player to pick a square to mark
const getPlayerChoice = (item) => {

  if (counts.gameOver == true) {
    ;
  } else if (item.textContent == "") {

    if (counts.playerSymbol == "x") {
      item.textContent = "x"
      counts.playerXCount.push(item.id)

      checkForWin()

      if (counts.gameOver !== true) {
        getComputerChoice()
      }

      checkForWin()
      console.log(counts.playerXCount)

    } else if (counts.playerSymbol == "o") {
      item.textContent = "o"
      counts.playerOCount.push(item.id)

      checkForWin()
      
      if (counts.gameOver !== true) {
        getComputerChoice()
      }

      checkForWin()
      console.log(counts.playerOCount)
    }
  }

}

// function for the computer to pick a square to mark
const getComputerChoice = () => {
  
  let computerChoice = ["1", "2", "3", "4", "5", "6", "7", "8", "9",][Math.floor(Math.random() * 9)]

  let chosenSquare = document.getElementById(computerChoice)

  console.log(chosenSquare.textContent)

  if (counts.gameOver == true) {
    ;
  } else if (chosenSquare.textContent == "") {
    if (counts.playerSymbol == "x") {
      chosenSquare.textContent = "o"
      counts.playerOCount.push(computerChoice)
    } else if (counts.playerSymbol == "o") {
      chosenSquare.textContent = "x"
      counts.playerXCount.push(computerChoice)
    }
  } else {
    getComputerChoice()
  }

}

const clearGrid = () => {
  queries.gridItems.forEach(item => {
    item.textContent = ""
  })
}

// click event listener to allow player to choose x and reset the grid
queries.symbolBtnX.addEventListener("click", () => {
  counts.playerSymbol = "x"
  clearGrid()
  counts.playerXCount = []
  counts.playerOCount = []
  queries.result.textContent = ""
  counts.gameOver = false
  console.log(counts.playerXCount)
})

// click event listener to allow player to choose o and reset the grid
queries.symbolBtnO.addEventListener("click", () => {
  counts.playerSymbol = "o"
  clearGrid()
  counts.playerOCount = []
  counts.playerXCount = []
  queries.result.textContent = ""
  counts.gameOver = false
  getComputerChoice()
  console.log(counts.playerOCount)
})

// grid square click event listener
queries.gridItems.forEach(item => {
  item.addEventListener("click", () => {
    console.log(counts.playerSymbol)
    getPlayerChoice(item)
  })
});

// function to check wether a winning combination has been made
const checkForWin = () => {

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

  let matchesX = winningCombinations.some(combination => {
    return combination.every(elem => counts.playerXCount.includes(elem))
  })

  let matchesO = winningCombinations.some(combination => {
    return combination.every(elem => counts.playerOCount.includes(elem))
  })

  if (matchesX == true) {
    queries.result.textContent = "X wins!"
    counts.gameOver = true;
  } else if (matchesO == true) {
    queries.result.textContent = "O wins";
    counts.gameOver = true;
  } else {

    let gridItemsArr = [...queries.gridItems]
    console.log(gridItemsArr)

    let tieStatus = gridItemsArr.every(item => {
      return item.textContent !== ""
    })

    console.log(tieStatus)

    if (tieStatus == true && counts.gameOver == false) {
      queries.result.textContent = "It is a tie!"
    }
  }

}