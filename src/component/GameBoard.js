import { Component, useEffect, useState } from 'react';
import Card from './Card';
import './GameBoard.css';
import { getImages, getCaptions } from '../fetchYeMemories';

export default function GameBoard(props) {
  const IMAGE_NUMBER = 12;
  const [captions, setCaptions] = useState([]);
  const [images, setImages] = useState([]);
  const [clicked, setClicked] = useState(Array(IMAGE_NUMBER).fill(false));
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    getCaptions(IMAGE_NUMBER, setCaptions);
    getImages(IMAGE_NUMBER, setImages);
  }, []);

  useEffect(() => {
    props.updateScore(currentScore);
    if (props.bestScore < currentScore) {
      props.updateBestScore(currentScore);
    }
  }, [props, currentScore]);

  function updateState(index) {
    index = parseInt(index);
    if (clicked[index]) {
      setCurrentScore(0);
      setClicked(Array(IMAGE_NUMBER).fill(false));
      return;
    }
    setCurrentScore(currentScore + 1);
    setClicked(
      clicked.map((elem, subIdx) => {
        if (index === subIdx) {
          return true;
        }
        return elem;
      })
    );
    console.log(clicked);
  }

  if (!images.length || !captions.length)
    return <div className="load-screen">Loading...</div>;

  return (
    <div className="game-board">
      {randomRange(IMAGE_NUMBER).map((randomIndex) => {
        return (
          <Card
            stateProps={{
              image: images[randomIndex],
              caption: captions[randomIndex] + ' — West, Kanye',
              picked: clicked[randomIndex],
              handleClick: (e) => updateState(randomIndex),
            }}
          />
        );
      })}
    </div>
  );
}

function randomRange(number) {
  return getShuffledArray(Object.keys(Array(number).fill(null)));
}

/**
 * It returns a shuffled array
 * @param {Array} array
 * @returns array
 */
function getShuffledArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
