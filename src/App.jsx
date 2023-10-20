import { useState } from 'react'
import './App.css'

import confetti from 'canvas-confetti'
import { Square } from "./components/Square";
import {  TURNS} from "./constants";
import { checkWinnerFrom } from './logic/board';
import { WinnerModal } from './components/WinnerModal';
function App() {
  const [board,setBoard]= useState(Array(9).fill(null))
  
  const [turn,setTurn]= useState(TURNS.X)
  const [winner,setWinner]= useState(null) // null no hay ganador, false empate


  const resetGame=()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const CheckEndGame=(newBoard)=>{
    //revisamos si hay un empate
    //si no hay mas espacios vacios en el tablero
    return newBoard.every((square)=>square!==null)
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
      const newWinner = checkWinnerFrom(newBoard)
      if(newWinner){
        //alert(`El ganador es ${newWinner}`)
        confetti()
        setWinner(newWinner)
        console.log('El ganador es', newWinner);
      } else if(CheckEndGame(newBoard)){
        setWinner(false)
      }

  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>
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
        <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>

  )
}

export default App
