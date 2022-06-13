import './Card.css';

export default function Card(props) {
  return (
    <div className="card">
      <img className="card-img" src={props.url} alt="Shows a landscape." />
      <p>I'm a caption</p>
    </div>
  );
}
