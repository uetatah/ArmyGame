import React, { useState } from 'react';

const Shop = ({ playerStats, onShopClose }) => {
  const [activeTab, setActiveTab] = useState('items');
  const [message, setMessage] = useState('');

  const items = [
    { id: 'outfit1', name: 'Roupa Estilosa', price: 50, type: 'outfit', image: 'https://via.placeholder.com/100?text=Roupa1' },
    { id: 'shoes1', name: 'Sapatos Fofos', price: 20, type: 'shoes', image: 'https://via.placeholder.com/100?text=Sapatos1' },
    { id: 'hat1', name: 'Chapéu Legal', price: 15, type: 'hat', image: 'https://via.placeholder.com/100?text=Chapeu1' },
    { id: 'glove1', name: 'Luvas de Seda', price: 25, type: 'gloves', image: 'https://via.placeholder.com/100?text=Luvas1' },
    { id: 'makeup1', name: 'Kit Maquiagem', price: 30, type: 'makeup', image: 'https://via.placeholder.com/100?text=Maquiagem1' },
    { id: 'energydrink', name: 'Bebida Energética', price: 10, type: 'consumable', effect: { energy: 30 }, image: 'https://via.placeholder.com/100?text=Energia' },
    { id: 'moodbooster', name: 'Pílula do Humor', price: 8, type: 'consumable', effect: { mood: 20 }, image: 'https://via.placeholder.com/100?text=Humor' },
  ];

  const goldPacks = [
    { id: 'gold1', name: 'Pequeno Pacote de Ouro', amount: 100, realPrice: 'R$ 5,00' },
    { id: 'gold2', name: 'Médio Pacote de Ouro', amount: 500, realPrice: 'R$ 20,00' },
    { id: 'gold3', name: 'Grande Pacote de Ouro', amount: 1200, realPrice: 'R$ 40,00' },
  ];

  const handleBuyItem = (item ) => {
    if (playerStats.money >= item.price) {
      const updatedStats = { ...playerStats, money: playerStats.money - item.price };
      if (item.effect) {
        for (const key in item.effect) {
          updatedStats[key] = (updatedStats[key] || 0) + item.effect[key];
        }
      }
      // In a real game, you'd add the item to inventory
      onShopClose(updatedStats);
      setMessage(`Você comprou ${item.name}!`);
    } else {
      setMessage('Dinheiro insuficiente!');
    }
  };

  const handleWatchAd = () => {
    setMessage('Assistindo anúncio... (simulação)');
    setTimeout(() => {
      const updatedStats = { ...playerStats, money: playerStats.money + 20, energy: playerStats.energy + 10 };
      onShopClose(updatedStats);
      setMessage('Você ganhou 20 moedas e 10 de energia!');
    }, 3000); // Simulate ad watching time
  };

  const handleBuyGold = (pack) => {
    setMessage(`Comprando ${pack.amount} ouro por ${pack.realPrice}... (simulação)`);
    setTimeout(() => {
      const updatedStats = { ...playerStats, gold: playerStats.gold + pack.amount };
      onShopClose(updatedStats);
      setMessage(`Você comprou ${pack.amount} ouro!`);
    }, 2000);
  };

  return (
    <div className="shop-container">
      <h2>Loja</h2>
      {message && <p>{message}</p>}
      <div className="shop-tabs">
        <button className={activeTab === 'items' ? 'shop-tab-button active' : 'shop-tab-button'} onClick={() => setActiveTab('items')}>Itens</button>
        <button className={activeTab === 'gold' ? 'shop-tab-button active' : 'shop-tab-button'} onClick={() => setActiveTab('gold')}>Comprar Ouro</button>
        <button className={activeTab === 'free' ? 'shop-tab-button active' : 'shop-tab-button'} onClick={() => setActiveTab('free')}>Recompensas Grátis</button>
      </div>

      <div className="shop-content">
        {activeTab === 'items' && (
          <div className="shop-grid">
            {items.map(item => (
              <div key={item.id} className="shop-item-card">
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <p>Preço: ${item.price}</p>
                <button onClick={() => handleBuyItem(item)}>Comprar</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'gold' && (
          <div className="gold-purchase-options">
            {goldPacks.map(pack => (
              <div key={pack.id} className="gold-pack-card">
                <h4>{pack.name}</h4>
                <p>{pack.amount} Ouro</p>
                <p>{pack.realPrice}</p>
                <button onClick={() => handleBuyGold(pack)}>Comprar</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'free' && (
          <div className="free-rewards-section">
            <h3>Ganhe Recompensas Grátis!</h3>
            <p>Assista a um vídeo para ganhar moedas e energia.</p>
            <button onClick={handleWatchAd}>Assistir Anúncio</button>
            <div className="vip-section">
              <h3>Assinatura VIP</h3>
              <p>Desbloqueie benefícios exclusivos e remova anúncios!</p>
              <ul className="vip-benefits">
                <li>Moedas e Ouro bônus diários</li>
                <li>Acesso a itens exclusivos</li>
                <li>Sem anúncios</li>
                <li>Energia ilimitada</li>
              </ul>
              <button>Assinar VIP (R$ 9,99/mês)</button>
            </div>
          </div>
        )}
      </div>

      <button onClick={() => onShopClose(playerStats)}>Fechar Loja</button>
    </div>
  );
};

export default Shop;
