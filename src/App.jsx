import { useState } from 'react'
import GameWorld from './components/GameWorld'
import CharacterCustomization from './components/CharacterCustomization'

function App() {
  const [gameState, setGameState] = useState("customization") // "customization" or "playing"
  const [playerCharacter, setPlayerCharacter] = useState(null)

  const handleStartGame = (character) => {
    setPlayerCharacter(character)
    setGameState("playing")
  }

  return (
    <div className="App">
      {gameState === "customization" && (
        <CharacterCustomization onStartGame={handleStartGame} />
      )}
      {gameState === "playing" && playerCharacter && (
        <GameWorld playerCharacter={playerCharacter} />
      )}
    </div>
  )
}

export default App
