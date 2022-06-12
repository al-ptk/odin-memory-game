import './Header.css';

export default function Header(props) {
  return (
    <header className="page-header">
      <h1>I'm the Header!</h1>
      <div className='score-keeper'>
        <p>
          <span>0</span>/12
        </p>
        <p>Best:<span>0</span></p>
      </div>
    </header>
  );
}
