import React, { useState, useEffect } from "react";
import '../App.css'



const Game = ({ onRoundChange, onScoreChange, onTieChange }) => {
    // useState variables
    const [tieCount, setTieCount] = useState (0)
    const [playerScore, setPlayerScore] = useState(0)
    const [computerScore, setComputerScore] = useState(0)
    const [round, setRound] = useState(1)
    const [resultMessage, setResultMessage] = useState('Click your choice')


    // ASK for help on getting result on round 10
    // useEffect(() => {
    // }, [resultMessage])

    // getting random choice for computer
    const getComputerChoice = () => {
        const randomChoice = ['rock', 'paper', 'scissors']
        const compChoice = randomChoice[Math.floor(Math.random() * randomChoice.length)]
        return compChoice
    }
    
    // comparing the two answers to determine the winner
    const playRound = (player, computer) => {
        let winner = 0
        const error = 'Please enter: Rock, Paper, or Scissors.'
        const playerWins = `You win! ${player} beats ${computer}.`
        const computerWins = `You lose, ${computer} beats ${player}`
        const tieMessage = `It's a tie try again.`

        if (
            (player === 'rock' && computer === 'paper') ||
            (player === 'paper' && computer === 'scissors') ||
            (player === 'scissors' && computer === 'rock')
        ) {
            winner = computerWins
        } else if (
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper') ||
            (player === 'rock' && computer === 'scissors')
        ) {
            winner = playerWins
        } else if ( player === computer) {
            winner = tieMessage
        } else {
            winner = error
        }
        return winner
    }


    const handleRound = (playerSelection) => {
        if (round < 11) {
            const computerSelection = getComputerChoice();
            const result = playRound(playerSelection, computerSelection);
    
            if (result.includes('win!')) {
                setPlayerScore((prevPlayerScore) => {
                    const newPlayerScore = prevPlayerScore + 1;
                    onScoreChange(newPlayerScore, computerScore);
                    return newPlayerScore;
                });
            } else if (result.includes('lose')) {
                setComputerScore((prevComputerScore) => {
                    const newComputerScore = prevComputerScore + 1;
                    onScoreChange(playerScore, newComputerScore);
                    return newComputerScore;
                });
            } else {
                setTieCount((prevTieCount) => {
                    const newTieCount = prevTieCount + 1;
                    onTieChange(newTieCount);
                    return newTieCount;
                });
            }
    
            setRound((prevRound) => {
                const newRound = prevRound + 1;
                onRoundChange(newRound);
                return newRound;
            })


        // Passing result value to App.js
        setResultMessage(result)

        // Checking if game reached 10 rounds. Return the winner or tie.

    }
    else {
        if (playerScore > computerScore) {
            setResultMessage('You win! You have a higher score than the computer.')
        } else if (playerScore < computerScore) {
            setResultMessage('You lose. The computer got a higher score than you.')
        } else {
            setResultMessage('The total score is the same, you tied.')
        }
    }
}
    return (
        <div className='game-return-box'>
            
            <div className='result-2'>
                    <p>{resultMessage}</p>
            </div>
            <div className="buttons-box">
                <button className='options' onClick={() => handleRound('rock')}>Rock</button>
                <button className='options' onClick={() => handleRound('paper')}>Paper</button>
                <button className='options' onClick={() => handleRound('scissors')}>Scissors</button>
        </div>
        </div>
        )
}

export default Game
