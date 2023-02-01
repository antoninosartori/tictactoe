import React from 'react'

const Square = ({ children, updateBoard, idx, isTurn }) => {

    const squareClassName = `square ${isTurn ? 'is-turn' : ''}`

    const handleBoard = () => {
        updateBoard(idx)
    }

    return(
        <div className={squareClassName} onClick={handleBoard}>
            {children}
        </div>
    )
}

export default Square