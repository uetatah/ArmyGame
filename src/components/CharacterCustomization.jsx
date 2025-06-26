import React, { useState } from 'react';

const CharacterCustomization = ({ onStartGame }) => {
  const [name, setName] = useState('');
  const [outfit, setOutfit] = useState("default");
  const [hair, setHair] = useState("long");
  const [hairColor, setHairColor] = useState("#000000");
  const [makeup, setMakeup] = useState("none");

  const outfits = [
    { id: "default", name: "Padrão", image: "https://via.placeholder.com/100?text=Outfit+Padrão" },
    { id: "cute", name: "Fofo", image: "https://via.placeholder.com/100?text=Outfit+Fofo" },
    { id: "sparkly", name: "Brilhante", image: "https://via.placeholder.com/100?text=Outfit+Brilhante" },
    { id: "barbie", name: "Barbie", image: "https://via.placeholder.com/100?text=Outfit+Barbie" },
    { id: "hellokitty", name: "Hello Kitty", image: "https://via.placeholder.com/100?text=Outfit+Hello+Kitty" },
    { id: "unicornpj", name: "Pijama Unicórnio", image: "https://via.placeholder.com/100?text=Pijama+Unicórnio" },
  ];

  const hairs = [
    { id: "long", name: "Longo", image: "https://via.placeholder.com/100?text=Cabelo+Longo" },
    { id: "short", name: "Curto", image: "https://via.placeholder.com/100?text=Cabelo+Curto" },
    { id: "braid", name: "Trança", image: "https://via.placeholder.com/100?text=Trança" },
  ];

  const makeups = [
    { id: "none", name: "Nenhum", image: "https://via.placeholder.com/100?text=Sem+Make" },
    { id: "light", name: "Leve", image: "https://via.placeholder.com/100?text=Make+Leve" },
    { id: "glam", name: "Glamour", image: "https://via.placeholder.com/100?text=Make+Glamour" },
  ];

  const hairColors = [
    "#000000", "#FFFFFF", "#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#FF00FF", "#00FFFF",
  ];

  const handleStart = ( ) => {
    if (name.trim() === '') {
      alert('Por favor, digite o nome da sua personagem!');
      return;
    }
    onStartGame({
      name,
      outfit,
      hair,
      hairColor,
      makeup,
    });
  };

  return (
    <div className="character-customization-section">
      <h2>Crie sua Personagem</h2>
      <div className="character-preview-area" style={{ backgroundColor: hairColor }}>
        {/* Placeholder for character image based on customization */}
        <img src="https://via.placeholder.com/150?text=Sua+Personagem" alt="Sua Personagem" />
      </div>

      <div className="customization-section">
        <h3>Nome da Personagem:</h3>
        <input
          type="text"
          value={name}
          onChange={(e ) => setName(e.target.value)}
          placeholder="Digite o nome"
        />
      </div>

      <div className="customization-section">
        <h3>Roupas:</h3>
        <div className="customization-options-grid">
          {outfits.map((item) => (
            <div
              key={item.id}
              className={`customization-option-card ${outfit === item.id ? 'selected' : ''}`}
              onClick={() => setOutfit(item.id)}
            >
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="customization-section">
        <h3>Cabelo:</h3>
        <div className="customization-options-grid">
          {hairs.map((item) => (
            <div
              key={item.id}
              className={`customization-option-card ${hair === item.id ? 'selected' : ''}`}
              onClick={() => setHair(item.id)}
            >
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
        <div className="color-picker-grid">
          {hairColors.map((color) => (
            <div
              key={color}
              className={`color-box ${hairColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setHairColor(color)}
            ></div>
          ))}
        </div>
      </div>

      <div className="customization-section">
        <h3>Maquiagem:</h3>
        <div className="customization-options-grid">
          {makeups.map((item) => (
            <div
              key={item.id}
              className={`customization-option-card ${makeup === item.id ? 'selected' : ''}`}
              onClick={() => setMakeup(item.id)}
            >
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="start-game-button-container">
        <button onClick={handleStart}>Começar Aventura</button>
      </div>
    </div>
  );
};

export default CharacterCustomization;
