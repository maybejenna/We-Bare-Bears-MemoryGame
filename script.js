const tilesContainer = document.querySelector(".tiles");
const COLORS = ["#CC644B", "#81c0c5", "#698d5d", "#b4acdc", "#f9b401"]; 

const colorPick = [...COLORS, ...COLORS]; 
const tileCount = colorPick.length; 

let revealCount = 0; 
let activeTile = null; 
let awaitingEndOfMove = false; 

run()

function buildTile(color){
  const element = document.createElement("div"); 
  element.classList.add("tile"); 
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed"); 
    if (awaitingEndOfMove || revealed === "true" || element == activeTile) {
      return;
    }

    element.style.backgroundColor = color; 

    if (!activeTile) {
      activeTile = element; 

      return; 
    } 
    const colorMatch = activeTile.getAttribute("data-color"); 

    if (colorMatch === color) {
      activeTile.setAttribute("data-revealed", "true"); 
      element.setAttribute("data-revealed", "true"); 

      setTimeout(() => {
        activeTile.style.visibility = 'hidden';
        element.style.visibility = 'hidden';
    
        // Update game state after the tiles are hidden
        awaitingEndOfMove = false; 
        activeTile = null; 
        revealCount += 2; 
    
        if (revealCount === tileCount) {
          showModal();

        }
      }, 300); 
      return; 
    }

    awaitingEndOfMove = true; 

    setTimeout(() => {
      element.style.backgroundColor = null; 
      activeTile.style.backgroundColor = null; 

      awaitingEndOfMove = false; 
      activeTile = null; 
    }, 500); 

  });

  return element;
}

function run() {
  // Clear existing tiles before repopulating
  tilesContainer.innerHTML = '';

  // Create a local copy of colorPick for this game
  let colorPick = [...COLORS, ...COLORS]; // Reset colorPick to initial state

  for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorPick.length); 
    const color = colorPick[randomIndex]; 
    const tile = buildTile(color);
    colorPick.splice(randomIndex, 1); 
    tilesContainer.appendChild(tile); 
  }
}

function resetGame() {
  revealCount = 0;
  activeTile = null;
  awaitingEndOfMove = false;

  // Reset each tile's state (if needed)
  const tiles = tilesContainer.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.style.backgroundColor = null;
    tile.setAttribute('data-revealed', 'false');
  });

  // Re-run the game setup to recreate tiles with new colors
  run(); 
}

// Add event listener to reset button
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);


function showModal() {
  document.getElementById('winModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('winModal').style.display = 'none';
}