import Card from './Card';
import './GameBoard.css';

export default function GameBoard(props) {
  return (
    <div className="game-board">
      {Array(12).fill(<Card / >)}
    </div>
  );
}
