import { useState } from 'react';
import './Card.css';

export default function Card({img, setScore}) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (!clicked) {
      setClicked(true);
      setScore(i => i + 1)
    } else {
      setScore(0)
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      {img}
      <p>I'm a caption</p>
    </div>
  );
}
