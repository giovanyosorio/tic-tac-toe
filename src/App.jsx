import { useState } from 'react'
import './App.css'
const TURNS = {
  X: 'X',
  O: 'O'
}


const Square=({children,isSelected,updateBoard,index}) => {
  const clasNames=`square ${isSelected ? 'is-selected ' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick}className={clasNames}>
      {children}
    </div>
  )
}

const WINNER_COMBINATIONS = [
  // horizontal
  [0,1,2],
  [3,4,5],
  [6,7,8],
  // vertical
  [0,3,6],
  [1,4,7],
  [2,5,8],
  // diagonal
  [0,4,8],
  [2,4,6]
]
function App() {
  const [board,setBoard]= useState(Array(9).fill(null))
  
  const [turn,setTurn]= useState(TURNS.X)
  const [winner,setWinner]= useState(null) // null no hay ganador, false empate

  const checkWinner = (boardtoCheck) => {
    // recorrer las combinaciones ganadoras
    for(const combo of WINNER_COMBINATIONS){
      const[a,b,c]=combo
      // si las casillas de la combinacion actual tienen el mismo valor
      if(boardtoCheck[a]  &&
         boardtoCheck[a] === boardtoCheck[b] && 
         boardtoCheck[a] === boardtoCheck[c]){
        // retornar el valor del ganador
        return boardtoCheck[a]
      }
    }
    // si no hay ganador
    return null
  }

  const resetGame=()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

    const updateBoard = (index) => {
      // si la casilla ya esta ocupada no hacer nada
      if(board[index] || winner){
        return
      }
      // actualizar el tablero
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
      // cambiar el turno
      const newTurn= turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn)
      // verificar si hay ganador
      const newWinner = checkWinner(newBoard)
      if(newWinner){
        //alert(`El ganador es ${newWinner}`)
        setWinner(newWinner)
        console.log('El ganador es', newWinner);
      }

  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square key={index}
               index={index} 
               updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn===TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn===TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      {
        winner!==null &&(
          <section className='winner'>
            <div className='text'>
              <h2>
                  {
                    winner===false ?"Emapte": "Gano"
                  }
              </h2>
              <header className='win'>
                  {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>

  )
}

export default App
