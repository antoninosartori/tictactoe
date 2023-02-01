import { useEffect, useState } from 'react'
import './App.css'
import Square from './components/Square'
import { TURNS, WINNER_COMBOS } from './assets/logic/constant'




const WinnerModal = ({winner, resetGame}) => {
  return(
    <section className='winnerModal-container'>
      <div>
        {
          winner === false
            ? <h2>¡Empate!</h2>
            : <h2>¡Ha ganado <span>{winner}</span> ! </h2>
        }
        <button onClick={resetGame}>Jugar de nuevo</button>
      </div>
    </section>
  )
}

const checkEndGame = (boardToCheck) => {
  return boardToCheck.every(square => square !== null)
} 

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null) 
  })

  const [turn , setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.x
  })

  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [ a , b , c] = combo
      if(boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]) {
          return boardToCheck[a]
        }
    }
    return null
  }

  const resetGame = () => {
    window.localStorage
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')

  }

  const updateBoard = (idx) => {
    const newBoard = [...board]
    if(newBoard[idx] || winner) return 
    newBoard[idx] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)

    // guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner) { 
      setWinner(newWinner) 
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  //usar useEffect para guardar en localStorage
/*   useEffect(() => {
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
  }, [turn ,board]) */

  return (
    <main>
      <header>
        <h1>tic tac toe</h1>
        <div className="turns-container">
          <Square isTurn={turn === TURNS.x} key={TURNS.x} >{TURNS.x}</Square>
          <Square isTurn={turn === TURNS.o} key={TURNS.o} >{TURNS.o}</Square>
        </div>
      </header>

      <section className="board">
        {
          board.map((_, idx) => {
            return(
              <Square updateBoard={updateBoard} key={idx} idx={idx}>
                { board[idx] } 
              </Square>
            )
          })
        }
        
      </section>
      {
        winner !== null && (< WinnerModal winner={winner} resetGame={resetGame} />)
      }
    </main>
  )
}

export default App
