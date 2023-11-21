import React, { useState } from 'react'
import './App.css'
import Game from './components/Game'

const App = () => {
  const [playerScore, setPlayerScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [currentRound, setCurrentRound] = useState(1)
  const [tieCount, setTieCount] = useState(0)

  const handleTieChange = (newTieCount) => {
    setTieCount(newTieCount)
  }
  const handleRoundChange = (newRound) => {
    setCurrentRound(newRound)
  }

  const handleScoreChange = (newPlayerScore, newComputerScore) => {
    setPlayerScore(newPlayerScore)
    setComputerScore(newComputerScore)
  }

  return(
    
    <div className='everything-box'>

        <div className='main-heading'>
          <h1 className='main-header'>Rock Paper Scissors </h1>
          <h1 className='mankind'>Best of 10 Rounds</h1> 
        </div>
        <div className='round'>
          <h1>Round {currentRound - 1}</h1>
          <h1>Ties {tieCount}</h1>
          </div>
        <div className='game'>
          <div className='titles'>
            <h1 className='human'>Human Score</h1>
            <h1 className='computer'>Computer Score</h1>
          </div>
          <div className='result'>
            <h1 className='player-score'>{playerScore}</h1>
            <h1 className='computer-score'>{computerScore}</h1>
          </div>
          <Game 
          onRoundChange={handleRoundChange}
          onScoreChange={handleScoreChange}
          onTieChange={handleTieChange}/>
        </div>
        <div className='footer'></div>
    </div>

    
  )
}
export default App