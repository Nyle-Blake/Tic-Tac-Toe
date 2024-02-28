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
const playGame = () => {

  let playerX = []
  let playerO = []

  const result = document.querySelector(".result")
  const gridItems = document.querySelectorAll(".grid-item")

  let tester = winningCombinations.some(combination => {
    return combination.every(elem => playerX.includes(elem))
  })

  gridItems.forEach(item => {
    item.addEventListener("click", () => {
      if (item.textContent == "") {
        item.textContent = "x"
        playerX.push(item.id)
        console.log(playerX)
      }

      let matches = winningCombinations.some(combination => {
        return combination.every(elem => playerX.includes(elem))
      })

      if (matches == true) {
        result.textContent = "You win!"
      }

      console.log(matches)
    })
  });


}

playGame()
