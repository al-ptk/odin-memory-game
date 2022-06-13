import { useState } from 'react';
import './Card.css';

export default function Card({ img, setScore }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    if (!clicked) {
      setClicked(true);
      setScore((i) => i + 1);
    } else {
      console.log('already clicked');
      setScore((i) => 0);
    }
  };

  return (
    <div
      className={`card ${clicked ? 'card-clicked' : null}`}
      onClick={handleClick}
    >
      {img}
      <p>I'm a caption</p>
    </div>
  );
}
