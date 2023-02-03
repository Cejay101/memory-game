import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/SingleCard";

const card = [
  { src: "/img/helmet-1.png", match: false },
  { src: "/img/ring-1.png", match: false },
  { src: "/img/scroll-1.png", match: false },
  { src: "/img/potion-1.png", match: false },
  { src: "/img/sword-1.png", match: false },
  { src: "/img/shield-1.png", match: false },
];

function App() {
  const [turns, setTurns] = useState(0);
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] =useState(false)
    
  const setChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
       
        setCards((prev) => {
          return prev.map((card) => {
            if (card.src !== choiceOne.src) return card;

            return { ...card, match: true };
          });
        });
        // cards.map(card=>{
        //   return {...card, match:true  }
        // })

        console.log("cards match");
        resetTurn();
      } else {
        console.log("cards do not match");
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  // console.log(matching)
  // console.log(choiceOne)
  console.log(cards);
  // console.log(choiceTwo)
  // console.log(turns)
  const resetTurn = () => {
    setTurns((turn) => turn + 1);
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false)
  };

  const handleNewGame = () => {
    const shuffleCards = [...card, ...card]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() * 0.5 }));
      setChoiceOne(null)
      setChoiceTwo(null)
    setCards(shuffleCards);
    setTurns(0);
  }
 useEffect(()=>{
  handleNewGame()
 },[])
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={handleNewGame}>New Game</button>
      <div className="card-board">
        {cards.map((card) => (
          <Cards
            key={card.id}
            card={card}
            setChoice={setChoice}
            flipped={card === choiceOne || card === choiceTwo || card.match}
            disabled ={disabled}
          />
        ))}
      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}
export default App;
