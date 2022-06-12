import './GameBoard.css';

export default function GameBoard(props) {
  return (
    <div className="game-board">
      {Array(12).fill(<p>hey, i'm a cell</p>)}
    </div>
  );
}
