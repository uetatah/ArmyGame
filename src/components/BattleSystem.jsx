import React, { useState, useEffect } from 'react';

const BattleSystem = ({ playerStats, onBattleClose }) => {
  const [opponent, setOpponent] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [battleResult, setBattleResult] = useState(null); // null, 'win', 'lose'
  const [selectedAction, setSelectedAction] = useState(null);

  const opponents = [
    { id: 'jungkook', name: 'Jungkook', type: 'vocal', skill: 80, image: 'https://via.placeholder.com/150?text=Jungkook' },
    { id: 'jimin', name: 'Jimin', type: 'dance', skill: 85, image: 'https://via.placeholder.com/150?text=Jimin' },
    { id: 'suga', name: 'Suga', type: 'instrument', skill: 75, image: 'https://via.placeholder.com/150?text=Suga' },
    { id: 'rivalGirl', name: 'Garota Rival', type: 'dance', skill: 70, image: 'https://via.placeholder.com/150?text=Rival' },
    { id: 'commonGuy', name: 'Rapaz Comum', type: 'vocal', skill: 60, image: 'https://via.placeholder.com/150?text=Comum' },
  ];

  const battleActions = [
    { id: 'vocalBattle', name: 'Batalha Vocal', skillType: 'vocal' },
    { id: 'danceBattle', name: 'Batalha de Dança', skillType: 'dance' },
    { id: 'instrumentBattle', name: 'Batalha de Instrumentos', skillType: 'instrument' },
  ];

  useEffect(( ) => {
    // Select a random opponent when component mounts
    const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
    setOpponent(randomOpponent);
    setBattleLog([]);
    setBattleResult(null);
    setSelectedAction(null);
  }, []);

  const handleBattle = () => {
    if (!selectedAction) {
      setMessage('Por favor, selecione uma ação de batalha!');
      return;
    }

    const playerSkill = playerStats[selectedAction.skillType] || 0;
    const opponentSkill = opponent.skill;

    let resultMessage = '';
    let win = false;

    if (playerSkill >= opponentSkill) {
      win = true;
      resultMessage = `Você venceu a batalha de ${selectedAction.name.toLowerCase()} contra ${opponent.name}!`;
      setBattleLog(prev => [...prev, `Sua habilidade (${playerSkill}) vs ${opponent.name} (${opponentSkill}). Você VENCEU!`]);
    } else {
      resultMessage = `Você perdeu a batalha de ${selectedAction.name.toLowerCase()} contra ${opponent.name}.`;
      setBattleLog(prev => [...prev, `Sua habilidade (${playerSkill}) vs ${opponent.name} (${opponentSkill}). Você PERDEU!`]);
    }

    setBattleResult(win ? 'win' : 'lose');
    setMessage(resultMessage);

    // Update player stats based on battle result
    const updatedStats = { ...playerStats };
    if (win) {
      updatedStats.popularity = (updatedStats.popularity || 0) + 10;
      updatedStats.money = (updatedStats.money || 0) + 50;
    } else {
      updatedStats.mood = (updatedStats.mood || 0) - 10;
    }
    onBattleClose(updatedStats);
  };

  const handleCloseModal = () => {
    onBattleClose(playerStats); // Pass current stats back to GameWorld
  };

  return (
    <div className="battle-container">
      <h2>Arena de Batalha</h2>
      {opponent && (
        <div className="battle-arena">
          <h3>Oponente: {opponent.name}</h3>
          <img src={opponent.image} alt={opponent.name} className="battle-opponent-image" />
          <p>Habilidade de {opponent.type}: {opponent.skill}</p>

          <h4>Suas Habilidades:</h4>
          <p>Vocal: {playerStats.vocal} | Dança: {playerStats.dance} | Inglês: {playerStats.english}</p>

          <h4>Escolha sua Ação:</h4>
          <div className="battle-options-grid">
            {battleActions.map(action => (
              <div
                key={action.id}
                className={`battle-option-card ${selectedAction && selectedAction.id === action.id ? 'selected' : ''}`}
                onClick={() => setSelectedAction(action)}
              >
                <h4>{action.name}</h4>
                <p>Requer: {action.skillType}</p>
              </div>
            ))}
          </div>

          <button onClick={handleBattle} disabled={!selectedAction}>Lutar!</button>

          <div className="battle-log">
            {battleLog.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>

          {battleResult && (
            <div className={`battle-result-modal ${battleResult}`}> 
              <div className="battle-result-content">
                <h2>{battleResult === 'win' ? 'Vitória!' : 'Derrota!'}</h2>
                <p>{message}</p>
                <button onClick={handleCloseModal}>Continuar</button>
              </div>
            </div>
          )}
        </div>
      )}
      {!opponent && <p>Carregando oponente...</p>}
      <button onClick={handleCloseModal}>Voltar</button>
    </div>
  );
};

export default BattleSystem;
