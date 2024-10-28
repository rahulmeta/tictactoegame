import React, { useState } from 'react'

const inititalBoard = () => Array(9).fill(null)

const Game = () => {

    const [board, setBoard] = useState(inititalBoard())
    const [isXNext, setIsXNext] = useState(true)

    const WINNING_PATTERNS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    const calculateWinner = (currentBoard) => {
        for (let i = 0; i < WINNING_PATTERNS.length; i++) {
            const [a, b, c] = WINNING_PATTERNS[i]
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] && currentBoard[c]) {
                return currentBoard[a]
            }
        }
        return null;
    }

    const handleClick = (index) => {
        // check winner
        const winner = calculateWinner(board)
        if (winner || board[index]) return;

        const newBoard = [...board]
        newBoard[index] = isXNext ? "X" : "O"
        setBoard(newBoard)
        setIsXNext(!isXNext)
    }

    const getStatusMessage = () => {
        const winner = calculateWinner(board)
        if (winner) return `Player ${winner} is winner`;
        if (!board.includes(null)) return `It's a draw`;
        return `Player ${isXNext ? "X" : "O"}'s turn`;
    }

    const resetGameLogic = () => {
        setBoard(inititalBoard())
        setIsXNext(true)
    }


    return (
        <div className='game max-w-[calc(3*100px)] m-[0 auto] text-center p-[20px]'>
            <div className="status text-[20px] flex justify-between mb-[20px]">
                {getStatusMessage()}
                <button className='bg-white text-black px-2' onClick={resetGameLogic}>Reset</button>
            </div>
            <div className="board grid grid-cols-[repeat(3,1fr)]">
                {
                    board.map((b, index) => {
                        return <button
                            className='cell
             w-[100px] 
             h-[100px]
             text-[30px]
             border-[2px]
             border-white
             pointer
             hover:bg-white
             hover:text-black'
                            key={index}
                            onClick={() => handleClick(index)}
                            disabled={b !== null}
                        >
                            {b}
                        </button>
                    })
                }
            </div>
        </div>
    )
}

export default Game
