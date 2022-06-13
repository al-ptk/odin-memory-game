import { useEffect, useState } from 'react';
import Card from './Card';
import './GameBoard.css';

export default function GameBoard(props) {
  const [images, setImages] = useState([]);
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);

  // On mount, preload images
  useEffect(() => {
    // Generate fetch promises for image urls
    let promises = [];
    for (let i = 0; i < 12; i++) {
      promises.push(fetch(`https://picsum.photos/200/300?random=${i}`));
    }
    // Resolve promises into an array of components with loaded images
    Promise.all(promises)
      .then((data) => data.map((elem) => elem.url))
      .then((urlArray) =>
        urlArray.map((url) => {
          return <img className="card-img" src={url} alt="a pretty lanscape" />;
        })
      )
      .then((imgComponents) => setImages(imgComponents));
  }, []);

  // On images loaded, build cards
  useEffect(() => {
    setCards(
      images.map((img) => (
        <Card
          img={img}
          scoreState={{
            getScore: () => score,
            updateScore: (newScore) => setScore(newScore),
          }}
        />
      ))
    );
  }, [images]);

  // On score change, shuffle cards
  useEffect(() => {
    setCards(getShuffledArray(cards));
  }, [cards, score]);

  // If images aren't loaded
  if (!cards.length) {
    return (
      <div className="load-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <div className="game-board">{cards}</div>;
}

function getShuffledArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
