import { useState } from 'react';
import './Card.css';

export default function Card(props) {
  const { getScore, updateScore } = props.scoreState;
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (!clicked) {
      setClicked(true);
      updateScore(getScore() + 1)
    } else {
      updateScore(0)
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      {props.img}
      <p>I'm a caption</p>
    </div>
  );
}
