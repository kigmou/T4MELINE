import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import logo from "../assets/Bleu_canard.png";
import './acceuil.css'


function acceuil() {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState<string[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [numCards, setNumCards] = useState(10)
  const [maxPoints, setMaxPoints] = useState(5)
  const navigate = useNavigate();

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      const truncatedName = inputValue.trim().slice(0, 17); // Limite à 17 caractères
      setItems([...items, truncatedName]);
      setInputValue("");
    }
  };

  const handlePlay = () => {
    if (items.length > 0) {
      const players = items.map((name) => ({ name, score: 0 }));
      navigate("/partie", { state: { players, numCards, maxPoints } }); // Redirige vers la page Partie
    }
  }

  const handleSaveSettings = () => {
    setShowSettings(false)
    alert(`Partie configurée : ${numCards} cartes, ${maxPoints} points maximum.`)
  }

  return (
    <div className={`app-container ${showSettings ? 'sidebar-open' : ''}`}>
      <div className="top-bar">
        <button
          className="settings-button"
          onClick={() => setShowSettings(!showSettings)}
        >
          Configurer la page
        </button>
      </div>

      {/* Barre latérale pour les paramètres */}
      {showSettings && (
        <div className="sidebar">
          <h2>Paramètres de la partie</h2>
          <div className="slider-container">
            <label>
              Nombre de cartes :
              <input
                type="range"
                min="2"
                max={items.length > 0 ? items.length : 100}
                value={numCards}
                onChange={(e) => setNumCards(Number(e.target.value))}
              />
              <input
                type="number"
                value={numCards}
                onChange={(e) => setNumCards(Number(e.target.value))}
                min={2}
                max={100}
              />
            </label>
          </div>
          <div className="slider-container">
            <label>
              Points maximum :
              <input
                type="range"
                min="1"
                max="10"
                value={maxPoints}
                onChange={(e) => setMaxPoints(Number(e.target.value))}
              />
              <input
                type="number"
                value={maxPoints}
                onChange={(e) => setMaxPoints(Number(e.target.value))}
                min={1}
                max={10}
              />
            </label>
          </div>
          <div className="modal-buttons">
            <button onClick={handleSaveSettings}>Sauvegarder</button>
            <button onClick={() => setShowSettings(false)}>
              Annuler
            </button>
          </div>
          <p className="sidebar-description">
      Bienvenue dans T4meline ! Ce jeu consiste à organiser des événements ou des éléments dans le bon ordre chronologique. 
      Configurez les paramètres de la partie ci-dessus, ajoutez des joueurs, et commencez à jouer !
    </p>
        </div>
      )}

      <div className="main-content">
        <div className="input-section">
        <img src={logo}  alt="T4meline Logo" className="logo-image" />
          <div className="input- boutton">
            <input
              type="text"
              placeholder="Enter your name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="boutton_plus" onClick={handleAddItem}>+</button>
          </div>

        </div>

        <ul className="items-list">
  {items.map((item, index) => (
    <li key={index} className="items-list__item">
      {item}
      <button
        className="delete-button"
        onClick={() => {
          const updatedItems = items.filter((_, i) => i !== index);
          setItems(updatedItems);
        }}
      >
        ❌
      </button>
    </li>
  ))}
</ul>
      </div>
      <div className="bottom-bar">
        <div className="play-button">
          <button onClick={handlePlay}>Play</button>
        </div>
      </div>
    </div>
  )
}

export default acceuil
