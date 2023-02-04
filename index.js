const startModule = (() => {
  
  let xButton = document.getElementById("player-choiceX")
  let oButton = document.getElementById("player-choiceO")
  let context = {
    playerChoice: undefined
  };
  
  const xoChoice = () => {
    xButton.addEventListener('click', function(e){
      
      document.getElementById("playerChoice").style.display = "none";
      context.playerChoice = false;
      gameModule.startGame()
      console.log(context.playerChoice);
    })

    oButton.addEventListener('click', function(e){
      
      document.getElementById("playerChoice").style.display = "none";
      context.playerChoice = true;
       gameModule.startGame()
      console.log(context.playerChoice);
     
    })
  }

  return {
    xoChoice, context
  };

})();


const gameModule = (() => {
    
    let circleTurn = startModule.context.playerChoice
    const board = document.getElementById("board");
    const X_CLASS = 'x';
    const CIRCLE_CLASS = 'circle';
    const resetButton = document.getElementById("reset");
    const winningMessageElement = document.getElementById("winningMessage");
    const cellElements = document.querySelectorAll("[data-cell]");
    const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
    
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ]
      
    const startGame = () => {
      
        resetButton.addEventListener('click', startGame);

        cellElements.forEach(cell => {
          cell.classList.remove(X_CLASS)
          cell.classList.remove(CIRCLE_CLASS)
          cell.removeEventListener('click', handleClick)
          cell.addEventListener('click', handleClick, {once: true})
        })

        setBoardHoverClass()
        winningMessageElement.classList.remove('show')
    }  
      
    const setBoardHoverClass = ()=> {
      board.classList.remove(X_CLASS)
      board.classList.remove(CIRCLE_CLASS)
      if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
      } else {
        board.classList.add(X_CLASS)
      }
    }

    const handleClick = (e) => {
      
      const cell = e.target
      let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
      placeMark(cell, currentClass) 
      if (checkWin(currentClass)){
        endGame()
      } else if(isDraw()) {
        endGame(true)
      } else {
        swapTurns();
        setBoardHoverClass();
      }
    }

    const placeMark = (cell, currentClass) => {
      cell.classList.add(currentClass)
    }

    const swapTurns = () => {
      circleTurn = !circleTurn
      }
      
    const endGame = (draw) => {
        if(draw){
          winningMessageTextElement.innerText = "It's a draw"
        } else{
          winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} wins!`
        }
        winningMessageElement.classList.add('show')
    }
      
    const isDraw = () => {
        return [...cellElements].every(cell => {
          return cell.classList.contains(X_CLASS) ||
          cell.classList.contains(CIRCLE_CLASS)
        })
    }

    const checkWin = (currentClass) => {
        return WINNING_COMBINATIONS.some(combination => {
          return combination.every(index => {
            return cellElements[index].classList.contains
            (currentClass)
          })
        })
    }
    return {
        startGame, setBoardHoverClass, handleClick, endGame, isDraw, placeMark, swapTurns, setBoardHoverClass, checkWin
    }
  
  })();
 
  startModule.xoChoice()
  
  
  
  
  
  
  
  
  
  
  
  
  