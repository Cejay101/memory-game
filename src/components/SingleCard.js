import React from "react";
import "./SingleCard.css";

export default function Cards({ card, setChoice,flipped,disabled }) {
  const handleClick = () => {
    if(!disabled){
      setChoice(card);
    }
  };
  return (
      <div className={`card ${flipped?"flipped":""}`}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="./img/cover.png"
          alt="card back"
          onClick={handleClick}
        />
      </div>
      
  );
}
