import "./App.css";
import Die from "./components/Die";
import React from "react";
import Confetti from "react-confetti";

function App() {
  const allNewDice = () => {
    const randomDiceArray = [];
    for (let i = 0; i < 10; i++) {
      randomDiceArray.push({
        id: i,
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return randomDiceArray;
  };

  const [dice, setDice] = React.useState(allNewDice());

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.ceil(Math.random() * 6) };
      })
    );
  }

  function startNewGame() {
    setDice(allNewDice());
    setTenzies(false);
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSame = dice.every((die) => die.value === dice[0].value);
    allHeld && allSame && setTenzies(true);
  }, [dice]);

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dies-container">{diceElements}</div>
      <button
        onClick={tenzies ? startNewGame : rollDice}
        className="game-button"
      >
        {tenzies ? "New Game " : "Roll"}
      </button>
    </main>
  );
}

export default App;
