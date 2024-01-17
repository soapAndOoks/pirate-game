'use strict';
let currentlySelectedSidebarId = null;
let gameStarted = false;

let money = 0;
let bank = 0;

let gameGrid = {
  A1:{occupiedBy:null, beenChosen: false},
  B1:{occupiedBy:null, beenChosen: false},
  C1:{occupiedBy:null, beenChosen: false},
  D1:{occupiedBy:null, beenChosen: false},
  E1:{occupiedBy:null, beenChosen: false},
  F1:{occupiedBy:null, beenChosen: false},
  G1:{occupiedBy:null, beenChosen: false},
  A2:{occupiedBy:null, beenChosen: false},
  B2:{occupiedBy:null, beenChosen: false},
  C2:{occupiedBy:null, beenChosen: false},
  D2:{occupiedBy:null, beenChosen: false},
  E2:{occupiedBy:null, beenChosen: false},
  F2:{occupiedBy:null, beenChosen: false},
  G2:{occupiedBy:null, beenChosen: false},
  A3:{occupiedBy:null, beenChosen: false},
  B3:{occupiedBy:null, beenChosen: false},
  C3:{occupiedBy:null, beenChosen: false},
  D3:{occupiedBy:null, beenChosen: false},
  E3:{occupiedBy:null, beenChosen: false},
  F3:{occupiedBy:null, beenChosen: false},
  G3:{occupiedBy:null, beenChosen: false},
  A4:{occupiedBy:null, beenChosen: false},
  B4:{occupiedBy:null, beenChosen: false},
  C4:{occupiedBy:null, beenChosen: false},
  D4:{occupiedBy:null, beenChosen: false},
  E4:{occupiedBy:null, beenChosen: false},
  F4:{occupiedBy:null, beenChosen: false},
  G4:{occupiedBy:null, beenChosen: false},
  A5:{occupiedBy:null, beenChosen: false},
  B5:{occupiedBy:null, beenChosen: false},
  C5:{occupiedBy:null, beenChosen: false},
  D5:{occupiedBy:null, beenChosen: false},
  E5:{occupiedBy:null, beenChosen: false},
  F5:{occupiedBy:null, beenChosen: false},
  G5:{occupiedBy:null, beenChosen: false},
  A6:{occupiedBy:null, beenChosen: false},
  B6:{occupiedBy:null, beenChosen: false},
  C6:{occupiedBy:null, beenChosen: false},
  D6:{occupiedBy:null, beenChosen: false},
  E6:{occupiedBy:null, beenChosen: false},
  F6:{occupiedBy:null, beenChosen: false},
  G6:{occupiedBy:null, beenChosen: false},
  A7:{occupiedBy:null, beenChosen: false},
  B7:{occupiedBy:null, beenChosen: false},
  C7:{occupiedBy:null, beenChosen: false},
  D7:{occupiedBy:null, beenChosen: false},
  E7:{occupiedBy:null, beenChosen: false},
  F7:{occupiedBy:null, beenChosen: false},
  G7:{occupiedBy:null, beenChosen: false},
}


let gamePieceData = {
  rob:{numberLeft:1, rawHTML:"<img class='game-grid-icons' src='./images/gameIcons/rob.png'/>"}, 
  kill:{numberLeft:1, rawHTML:"<img class='game-grid-icons' src='./images/gameIcons/kill.png'/>"},
  present:{numberLeft:1, rawHTML:"<img class='game-grid-icons' src='./images/gameIcons/present.jpg'/>"},
  skull:{numberLeft:1, rawHTML:"<img class='game-grid-icons' src='./images/gameIcons/skull.jpg'/>"},
  swap:{numberLeft:1, rawHTML:"<img class='game-grid-icons' src='./images/gameIcons/swap.png'/>"},
  choose:{numberLeft:1, rawHTML:"<img class='game-grid-icons' src='./images/gameIcons/choose.png'/>"},
  shield:{numberLeft:1, rawHTML:"<img class='game-grid-icons' src='./images/gameIcons/shield.png'/>"},
  mirror:{numberLeft:1, rawHTML:"<img class='game-grid-icons' src='./images/gameIcons/mirror.png'/>"},
  bomb:{numberLeft:1, rawHTML:"<img class='game-grid-icons' src='./images/gameIcons/bomb.png'/>"},
  double:{numberLeft:1, rawHTML:"<img class='game-grid-icons' src='./images/gameIcons/double.jpg'/>"},
  bank:{numberLeft:1, rawHTML:"<img class='game-grid-icons' src='./images/gameIcons/bank.jpg'/>"},
  5000:{numberLeft: 1, rawHTML:"<span class='game-grid-icons'>5000</span>"},
  3000:{numberLeft: 2, rawHTML:"<span class='game-grid-icons'>3000</span>"},
  1000:{numberLeft: 10, rawHTML:"<span class='game-grid-icons'>1000</span>"},
  200:{numberLeft: 25, rawHTML:"<span class='game-grid-icons'>200</span>"}
};

function greyOutId(id){
  document.getElementById(id).style.color = 'grey';
}
function unGreyOutId(id){
  document.getElementById(id).style.color = 'black';
}

function boardIsFilledOut(){
  for (const id of Object.keys(gameGrid)){
    if (gameGrid[id].occupiedBy == null){
      return false;
    }
  }
  return true;
}

function updateSidebar(){
  for (const id of Object.keys(gamePieceData)){
    const numberLeft = gamePieceData[id].numberLeft;
    if (numberLeft <= 0){
      greyOutId(id);
    } else {
      unGreyOutId(id);
    }
  }  
}



function sidebarSelected(id){
  if (gameStarted == true){return;}
  if (currentlySelectedSidebarId == null){
    currentlySelectedSidebarId = id;
  }
  if (gamePieceData[id].numberLeft > 0){
    document.getElementById(currentlySelectedSidebarId).style.textDecoration = 'none';
    document.getElementById(id).style.textDecoration = 'underline';
    currentlySelectedSidebarId = id;
  } 
  updateSidebar();
}


function gridClickedChooseMenu(id){
  if (currentlySelectedSidebarId == null){return}
  if (gameGrid[id].occupiedBy == currentlySelectedSidebarId){return}
  if (gamePieceData[currentlySelectedSidebarId].numberLeft <= 0){return}
  if (gameGrid[id].occupiedBy != null){
    const currentOccupyingId = gameGrid[id].occupiedBy;
    //we will soon delete the thing away so we have to increase its count
    gamePieceData[currentOccupyingId].numberLeft += 1;
  }
  document.getElementById(id).innerHTML = gamePieceData[currentlySelectedSidebarId].rawHTML;
  gamePieceData[currentlySelectedSidebarId].numberLeft -= 1;
  gameGrid[id].occupiedBy = currentlySelectedSidebarId;
  if (boardIsFilledOut()){gameStarted = true;}
  updateSidebar();
}


function loadCashFromPage(){
  const text = document.getElementById('cash').value.split('\n');
  const tmpMoney = Number(text[0].split(':')[1])
  const tmpBank = Number(text[1].split(':')[1])
  return tmpMoney, tmpBank;
}

function addToCashLog(money, bank){
  document.getElementById('cash').value = 'MONEY: ' + money + '\nBANK: ' + bank;
}

//id of the square
function handleChooseSquare(id){
  money, bank = loadCashFromPage();
  const sqaureEffect = gameGrid[id].occupiedBy;
  console.log(sqaureEffect)
  switch (sqaureEffect){
    case '200':
      money += 200;
      break;
    case '1000':
      money += 1000;
      break;
    case '3000':
      money += 3000;
      break;
    case '5000':
      money += 5000;
      break;
    case 'rob':
      money += Number(window.prompt('How much did you rob?'));
      break;
    case 'kill':
      break;
    case 'present':
      money -= 1000;
      if (money < 0){money = 0;}
    case 'skull':
      break;
    case 'swap':
      money += Number(window.prompt('How much did you get?'));
      break;
    case 'choose':
      break;
    case 'shield':
      break;
    case 'mirror':
      break;
    case 'bomb':
      money = 0;
    case 'double':
      money *= 2;
    case 'bank':
      bank = money;
      money = 0;
    default:
      console.error('The board is empty when the game has started');
  }
  addToCashLog(money, bank);
}


function gameGridSelected(id){
  if (!gameStarted){gridClickedChooseMenu(id);return;}
  if (gameGrid[id].beenChosen == true){return}
  else {
    document.getElementById(id).style.backgroundColor = 'grey';
    handleChooseSquare(id);
    gameGrid[id].beenChosen == true;
  }
}


const xAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const yAxis = ['1', '2', '3', '4', '5', '6', '7'];
for (const y of yAxis){
  let xAxisArray = [];
  for (const x of xAxis){
    const coordinate = x + y;
    document.getElementById(coordinate).addEventListener('click', function(){gameGridSelected(this.id)})
  }
}

for (const id of Object.keys(gamePieceData)){
  document.getElementById(id).addEventListener('click', ()=>{sidebarSelected(id)});
}


document.getElementById('shieldEffect').addEventListener('click', function(){this.innerHTML = (this.innerHTML=='✔' ? '☓':'✔')});
document.getElementById('mirrorEffect').addEventListener('click', function(){this.innerHTML = (this.innerHTML=='✔' ? '☓':'✔')});