import './Header.css';

export default function Header(props) {
  const { score, bestScore } = props;
  return (
    <header className="page-header">
      <h1>I'm the Header!</h1>
      <div className="score-keeper">
        <p>
          <span>{score}</span>/12
        </p>
        <p>
          Best:<span>{bestScore}</span>
        </p>
      </div>
    </header>
  );
}
