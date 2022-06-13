import { useEffect, useState } from 'react';
import Card from './Card';
import './GameBoard.css';

export default function GameBoard(props) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    let promises = [];
    for (let i = 0; i < 12; i++) {
      promises.push(fetch(`https://picsum.photos/200/300?random=${i}`));
    }
    Promise.all(promises)
      .then((data) => data.map((elem) => elem.url))
      .then(imgArray => setImages(imgArray.map(elem => {
        return <Card url={elem}/>
      })))
  }, []);

  if (!images.length) {
    return <div>Loading</div>;
  }

  return <div className="game-board">{images}</div>;
}
