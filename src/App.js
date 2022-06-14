import './App.css';
import Header from './component/Header';
import GameBoard from './component/GameBoard';
import { useState } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <div className="App">
      <Header score={score} bestScore={bestScore} />
      <GameBoard updateScore={setScore} updateBestScore={setBestScore} bestScore={bestScore} />
    </div>
  );
}

export default App;
