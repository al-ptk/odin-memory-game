import { useState } from 'react';
import './Card.css';

export default function Card(props) {
  const { image, clicked, caption } = props.stateProps;

  return (
    <div
      className={`card${clicked ? ' card-clicked' : ''}`}
      onClick={props.handleClick}
    >
      {image}
      <p>{caption}</p>
    </div>
  );
}
