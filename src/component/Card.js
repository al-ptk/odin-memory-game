import { useState } from 'react';
import './Card.css';

export default function Card(props) {
  const {image} = props.stateProps;

  return (
    <div className={`card`}>
      {image}
      <p>I'm a caption</p>
    </div>
  );
}
