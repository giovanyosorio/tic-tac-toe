
import { WINNER_COMBINATIONS } from "../constants"
export const checkWinnerFrom = (boardtoCheck) => {
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

  export const CheckEndGame=(newBoard)=>{
    //revisamos si hay un empate
    //si no hay mas espacios vacios en el tablero
    return newBoard.every((square)=>square!==null)
  }