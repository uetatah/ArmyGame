import React, { useState, useEffect } from 'react';
import Shop from './Shop';
import BattleSystem from './BattleSystem';

const locations = {
  dorm: {
    name: 'Dormitório',
    image: 'https://via.placeholder.com/600x400?text=Dormitorio',
    actions: [
      { name: 'Descansar', effect: { energy: 20, mood: 5 } },
      { name: 'Estudar Inglês', effect: { english: 5, mood: -2 } },
      { name: 'Interagir com Colegas', effect: { popularity: 3, mood: 5 } },
    ],
  },
  danceStudio: {
    name: 'Estúdio de Dança',
    image: 'https://via.placeholder.com/600x400?text=Estudio+de+Danca',
    actions: [
      { name: 'Aula de Ballet', effect: { dance: 10, energy: -10 } },
      { name: 'Aula de Street Dance', effect: { dance: 10, energy: -10 } },
      { name: 'Praticar Sozinha', effect: { dance: 5, energy: -5 } },
    ],
  },
  vocalStudio: {
    name: 'Estúdio Vocal',
    image: 'https://via.placeholder.com/600x400?text=Estudio+Vocal',
    actions: [
      { name: 'Aula de Canto', effect: { vocal: 10, energy: -10 } },
      { name: 'Praticar Canto', effect: { vocal: 5, energy: -5 } },
      { name: 'Gravar Demo', effect: { popularity: 5, mood: 3 } },
    ],
  },
  gym: {
    name: 'Academia',
    image: 'https://via.placeholder.com/600x400?text=Academia',
    actions: [
      { name: 'Treino Leve', effect: { energy: 10, mood: 2 } },
      { name: 'Treino Intenso', effect: { energy: -15, mood: 5 } },
    ],
  },
  cafeteria: {
    name: 'Cafeteria',
    image: 'https://via.placeholder.com/600x400?text=Cafeteria',
    actions: [
      { name: 'Comer', effect: { energy: 15, mood: 5 } },
      { name: 'Conversar com Staff', effect: { popularity: 2 } },
    ],
  },
  shop: {
    name: 'Loja',
    image: 'https://via.placeholder.com/600x400?text=Loja',
    actions: [], // Actions handled by the Shop component
  },
  battleArena: {
    name: 'Arena de Batalha',
    image: 'https://via.placeholder.com/600x400?text=Arena+de+Batalha',
    actions: [], // Actions handled by the BattleSystem component
  },
};

const GameWorld = ({ playerCharacter } ) => {
  const [currentLocation, setCurrentLocation] = useState('dorm');
  const [playerStats, setPlayerStats] = useState({
    energy: 100,
    mood: 100,
    vocal: 0,
    dance: 0,
    english: 0,
    popularity: 0,
    money: 100,
    gold: 0,
    day: 1,
    hour: 9,
  });
  const [message, setMessage] = useState('');
  const [showShop, setShowShop] = useState(false);
  const [showBattle, setShowBattle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerStats(prevStats => {
        let newHour = prevStats.hour + 1;
        let newDay = prevStats.day;
        if (newHour >= 24) {
          newHour = 0;
          newDay = prevStats.day + 1;
        }
        return { ...prevStats, hour: newHour, day: newDay, energy: Math.max(0, prevStats.energy - 2) };
      });
    }, 60000); // Advance every minute (for simulation purposes)
    return () => clearInterval(interval);
  }, []);

  const handleAction = (action) => {
    setPlayerStats(prevStats => {
      const newStats = { ...prevStats };
      for (const key in action.effect) {
        newStats[key] = (newStats[key] || 0) + action.effect[key];
      }
      newStats.energy = Math.min(100, Math.max(0, newStats.energy));
      newStats.mood = Math.min(100, Math.max(0, newStats.mood));
      setMessage(`Você ${action.name.toLowerCase()}!`);
      return newStats;
    });
  };

  const handleShopClose = (updatedStats) => {
    setShowShop(false);
    if (updatedStats) {
      setPlayerStats(updatedStats);
    }
  };

  const handleBattleClose = (updatedStats) => {
    setShowBattle(false);
    if (updatedStats) {
      setPlayerStats(updatedStats);
    }
  };

  return (
    <div className="game-screen">
      <div className="game-header">
        <div>Dia: <span>{playerStats.day}</span></div>
        <div>Hora: <span>{playerStats.hour}:00</span></div>
        <div>Energia: <span>{playerStats.energy}%</span></div>
        <div>Humor: <span>{playerStats.mood}%</span></div>
        <div>Dinheiro: <span>${playerStats.money}</span></div>
        <div>Ouro: <span>{playerStats.gold}</span></div>
      </div>

      <div className="game-content">
        {showShop ? (
          <Shop playerStats={playerStats} onShopClose={handleShopClose} />
        ) : showBattle ? (
          <BattleSystem playerStats={playerStats} onBattleClose={handleBattleClose} />
        ) : (
          <>
            <img src={locations[currentLocation].image} alt={locations[currentLocation].name} className="location-image-display" />
            <h2>{locations[currentLocation].name}</h2>
            {message && <p className="game-message">{message}</p>}
            <div className="location-actions">
              {locations[currentLocation].actions.map((action, index) => (
                <button key={index} onClick={() => handleAction(action)}>
                  {action.name}
                </button>
              ))}
              {currentLocation !== 'shop' && (
                <button onClick={() => setShowShop(true)}>Ir para Loja</button>
              )}
              {currentLocation !== 'battleArena' && (
                <button onClick={() => setShowBattle(true)}>Ir para Arena de Batalha</button>
              )}
            </div>
          </>
        )}
      </div>

      <div className="game-footer">
        {Object.keys(locations).map((key) => (
          <button key={key} onClick={() => setCurrentLocation(key)}>
            {locations[key].name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameWorld;
