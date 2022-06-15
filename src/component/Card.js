import './Card.css';

export default function Card(props) {
  const { image, picked, caption, handleClick } = props.stateProps;
  return (
    <div
      className={`card${picked ? ' card-clicked' : ''}`}
      onClick={handleClick}
    >
      {image}
      <p>{caption}</p>
    </div>
  );
}
