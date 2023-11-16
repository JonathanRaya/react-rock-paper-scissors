
import React, { useState } from "react";
import '../App.css'



const Game = ({ onRoundChange, onScoreChange }) => {
    // useState variables
    const [playerScore, setPlayerScore] = useState(0)
    const [computerScore, setComputerScore] = useState(0)
    const [round, setRound] = useState(1)
    const [resultMessage, setResultMessage] = useState('Click your choice')

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
        const tie = `It's a tie try again.`

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
            winner = tie
        } else {
            winner = error
        }
        return winner
    }


    const handleRound = (playerSelection) => {
        if(round < 10){
        const computerSelection = getComputerChoice()
        const result = playRound(playerSelection, computerSelection)

        if (result.includes('win!')) {
            setPlayerScore((prevScore) => prevScore + 1)
        } else if (result.includes('lose')) {
            setComputerScore((prevScore) => prevScore + 1)
        }

        onScoreChange(playerScore +1 ,computerScore +1 )

        setRound((prevRound) => {
            const newRound = prevRound + 1
        // Passing round  and score values to App.js
        onRoundChange(newRound)
        return newRound
        })
        // Passing result value to App.js
        setResultMessage(result)

        // Checking if game reached 10 rounds. Return the winner or tie.

    } else {
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