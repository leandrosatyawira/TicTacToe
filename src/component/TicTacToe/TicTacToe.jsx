import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(Array(9).fill("")); // State for game data
  const titleRef = useRef(null);
  const boxRefs = useRef(Array.from({ length: 9 }, () => React.createRef())); // Create an array of refs

  const toggle = (num) => {
    if (lock || data[num] !== "") {
      return;
    }

    const currentPlayer = count % 2 === 0 ? "x" : "o";
    const newData = [...data]; // Create a copy of the current data
    newData[num] = currentPlayer; // Update the copied data
    setData(newData); // Update the state with the new data
    setCount(count + 1);

    checkWin(newData);
  };

  const checkWin = (currentData) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of winningCombinations) {
      if (currentData[a] && currentData[a] === currentData[b] && currentData[a] === currentData[c]) {
        won(currentData[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulations: <img src="${winner === "x" ? cross_icon : circle_icon}" alt="${winner}"/>`;
  };

  const reset = () => {
    setLock(false);
    setCount(0);
    setData(Array(9).fill("")); // Reset the game data to its initial state
    titleRef.current.innerHTML = 'Tic Tac Toe In <span>React.js</span>';
  };

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic Tac Toe Game In <span>React.js</span></h1>
      <div className="board">
        {boxRefs.current.map((ref, index) => (
          <div
            key={index}
            className="boxes"
            ref={ref}
            onClick={() => toggle(index)}
          >
            {data[index] === "x" && <img src={cross_icon} alt="x" />}
            {data[index] === "o" && <img src={circle_icon} alt="o" />}
          </div>
        ))}
      </div>
      <button className='reset' onClick={reset}>Reset</button>
    </div>
  );
};

export default TicTacToe;
