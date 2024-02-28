const winningombinations = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7]
]

let playerX = []
let playerO = []

const gridItem = document.querySelectorAll(".grid-item")

gridItem.forEach(item => {
  item.addEventListener("click", () => {
    if (item.textContent == "") {
    item.textContent = "x"
    playerX.push(item.id)
    console.log(playerX)
    }
  })
});