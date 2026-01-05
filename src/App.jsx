import { useState, useEffect } from 'react';
import {
  initialGameState,
  calculateNextTurn,
  buyCows,
  sellCows,
  buyGrain,
  sellGrain,
  improveDairy,
  improveFarm,
  hireBull,
  sowGrain,
  getDairyCost,
  getFarmCost,
  getMaxGrainToSow,
} from './gameLogic';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(initialGameState);
  const [currentMenu, setCurrentMenu] = useState('main');
  const [inputValue, setInputValue] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(5);

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return Math.floor(num).toLocaleString();
  };

  const handleEndTurn = () => {
    const newState = calculateNextTurn(gameState);
    setGameState(newState);
    setTimeRemaining(5);
  };

  // Auto-end turn after 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleEndTurn();
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const handleBuyCows = () => {
    const quantity = parseInt(inputValue) || 0;
    if (quantity > 0) {
      const newState = buyCows(gameState, quantity);
      setGameState(newState);
      setInputValue('');
    }
  };

  const handleSellCows = () => {
    const quantity = parseInt(inputValue) || 0;
    if (quantity > 0 && quantity <= gameState.cows) {
      const newState = sellCows(gameState, quantity);
      setGameState(newState);
      setInputValue('');
    }
  };

  const handleBuyGrain = () => {
    const quantity = parseInt(inputValue) || 0;
    if (quantity > 0) {
      const newState = buyGrain(gameState, quantity);
      setGameState(newState);
      setInputValue('');
    }
  };

  const handleSellGrain = () => {
    const quantity = parseInt(inputValue) || 0;
    if (quantity > 0 && quantity <= gameState.grain) {
      const newState = sellGrain(gameState, quantity);
      setGameState(newState);
      setInputValue('');
    }
  };

  const handleImproveDairy = () => {
    const newState = improveDairy(gameState);
    setGameState(newState);
  };

  const handleImproveFarm = () => {
    const newState = improveFarm(gameState);
    setGameState(newState);
  };

  const handleHireBull = () => {
    const newState = hireBull(gameState);
    setGameState(newState);
  };

  const handleSowGrain = () => {
    const quantity = parseInt(inputValue) || 0;
    if (quantity >= 0) {
      const newState = sowGrain(gameState, quantity);
      setGameState(newState);
      setInputValue('');
    }
  };

  const resetGame = () => {
    setGameState(initialGameState);
    setCurrentMenu('main');
    setInputValue('');
    setTimeRemaining(5);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🐄 FOFT Farm 🌾</h1>
        <p className="subtitle">Farming Simulation Game</p>
        <div className="timer">Next turn in: {timeRemaining}s</div>
      </header>

      <div className="game-container">
        <div className="status-panel">
          <h2>Farm Status - Turn {gameState.turn}</h2>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">💰 Money</div>
              <div className={`stat-value ${gameState.money < 0 ? 'negative' : ''}`}>
                {formatMoney(gameState.money)}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-label">🐄 Cows</div>
              <div className="stat-value">{formatNumber(gameState.cows)}</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">🌾 Grain</div>
              <div className="stat-value">{formatNumber(gameState.grain)} tons</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">🥛 Last Milk Sales</div>
              <div className="stat-value">{formatMoney(gameState.milk)}</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">🌱 Grain Planted</div>
              <div className="stat-value">{formatNumber(gameState.grainPlanted)} tons</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">🏭 Dairy Level</div>
              <div className="stat-value">{gameState.dairy}</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">🚜 Farm Level</div>
              <div className="stat-value">{gameState.farm}</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">📊 Cow Price</div>
              <div className="stat-value">{formatMoney(gameState.cowPrice)}</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">📊 Grain Price</div>
              <div className="stat-value">{formatMoney(gameState.grainPrice)}/ton</div>
            </div>
          </div>

          {gameState.eventLog.length > 0 && (
            <div className="event-log">
              <h3>Recent Events</h3>
              {gameState.eventLog.map((event, index) => (
                <div key={index} className="event-item">
                  {event}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="menu-panel">
          {currentMenu === 'main' && (
            <div className="menu">
              <h2>Main Menu</h2>
              <button onClick={() => setCurrentMenu('trade')} className="menu-btn">
                💵 Buy or Sell
              </button>
              <button onClick={() => setCurrentMenu('improvements')} className="menu-btn">
                🔨 Improvements
              </button>
              <button onClick={() => setCurrentMenu('farmlife')} className="menu-btn">
                🌱 Farm Life
              </button>
              <button onClick={handleEndTurn} className="menu-btn end-turn">
                ⏭️ End Turn
              </button>
              <button onClick={resetGame} className="menu-btn reset">
                🔄 Reset Game
              </button>
            </div>
          )}

          {currentMenu === 'trade' && (
            <div className="menu">
              <h2>Buy or Sell</h2>
              
              <div className="trade-section">
                <h3>Cows (Price: {formatMoney(gameState.cowPrice)})</h3>
                <div className="input-group">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Quantity"
                    min="0"
                  />
                  <button onClick={handleBuyCows} className="action-btn buy">
                    Buy Cows
                  </button>
                  <button onClick={handleSellCows} className="action-btn sell">
                    Sell Cows
                  </button>
                </div>
              </div>

              <div className="trade-section">
                <h3>Grain (Buy: {formatMoney(gameState.grainPrice)}/ton | Sell: $5/ton)</h3>
                <div className="input-group">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Quantity (tons)"
                    min="0"
                  />
                  <button onClick={handleBuyGrain} className="action-btn buy">
                    Buy Grain
                  </button>
                  <button onClick={handleSellGrain} className="action-btn sell">
                    Sell Grain
                  </button>
                </div>
              </div>

              <button onClick={() => setCurrentMenu('main')} className="menu-btn back">
                ⬅️ Back to Main Menu
              </button>
            </div>
          )}

          {currentMenu === 'improvements' && (
            <div className="menu">
              <h2>Improvements</h2>
              
              <div className="improvement-section">
                <h3>🏭 Dairy (Level {gameState.dairy})</h3>
                <p>Increases milk production per cow</p>
                <p className="cost">Cost: {formatMoney(getDairyCost(gameState.dairy))}</p>
                <button
                  onClick={handleImproveDairy}
                  className="action-btn"
                  disabled={gameState.money < getDairyCost(gameState.dairy)}
                >
                  Improve Dairy
                </button>
              </div>

              <div className="improvement-section">
                <h3>🚜 Farm (Level {gameState.farm})</h3>
                <p>Increases grain yield and storage capacity</p>
                {gameState.farm >= 7 ? (
                  <p className="max-level">Maximum level reached!</p>
                ) : (
                  <>
                    <p className="cost">Cost: {formatMoney(getFarmCost(gameState.farm))}</p>
                    <button
                      onClick={handleImproveFarm}
                      className="action-btn"
                      disabled={gameState.money < getFarmCost(gameState.farm)}
                    >
                      Improve Farm
                    </button>
                  </>
                )}
              </div>

              <button onClick={() => setCurrentMenu('main')} className="menu-btn back">
                ⬅️ Back to Main Menu
              </button>
            </div>
          )}

          {currentMenu === 'farmlife' && (
            <div className="menu">
              <h2>Farm Life</h2>
              
              <div className="farmlife-section">
                <h3>🐂 Hire Bull</h3>
                <p>Breed your cows to increase herd size</p>
                <p className="cost">
                  Cost: {formatMoney(Math.max(200, 10 * gameState.cows))}
                </p>
                <button
                  onClick={handleHireBull}
                  className="action-btn"
                  disabled={gameState.cows <= 20 || gameState.money < 200}
                >
                  Hire Bull
                </button>
                {gameState.cows <= 20 && (
                  <p className="requirement">Need at least 20 cows</p>
                )}
              </div>

              <div className="farmlife-section">
                <h3>🌱 Sow Grain</h3>
                <p>Plant grain for next harvest</p>
                <p className="info">
                  Max: {formatNumber(getMaxGrainToSow(gameState))} tons
                </p>
                <div className="input-group">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Tons to plant"
                    min="0"
                    max={getMaxGrainToSow(gameState)}
                  />
                  <button onClick={handleSowGrain} className="action-btn">
                    Sow Grain
                  </button>
                </div>
              </div>

              <button onClick={() => setCurrentMenu('main')} className="menu-btn back">
                ⬅️ Back to Main Menu
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>Original BASIC game recreated in React</p>
        <p className="warning">⚠️ Beware: Rats eat grain, BSE happens, and banks are greedy!</p>
      </footer>
    </div>
  );
}

export default App;
