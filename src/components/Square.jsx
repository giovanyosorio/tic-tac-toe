export const Square=({children,isSelected,updateBoard,index}) => {
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