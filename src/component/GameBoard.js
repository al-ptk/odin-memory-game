import { Component, useEffect, useState } from 'react';
import Card from './Card';
import './GameBoard.css';
import { getImages, getCaptions } from '../fetchYeMemories';

export default function GameBoard(props) {
  const IMAGE_NUMBER = 12;
  const [captions, setCaptions] = useState([]);
  const [images, setImages] = useState([]);
  const [clicked, _setClicked] = useState(Array(IMAGE_NUMBER).fill(false));

  useEffect(() => {
    getCaptions(IMAGE_NUMBER, setCaptions);
    getImages(IMAGE_NUMBER, setImages);
  }, []);

  if (!images.length || !captions.length)
    return <div className="load-screen">Loading...</div>;

  return (
    <div className="game-board">
      {clicked.map((clkState, index) => {
        return (
          <Card
            stateProps={{
              image: images[index],
              caption: captions[index],
              clicked: clkState,
            }}
          />
        );
      })}
    </div>
  );
}

//   componentDidUpdate() {
//     this.props.updateScore(this.state.currentScore);
//     if (this.props.bestScore < this.state.currentScore) {
//       this.props.updateBestScore(this.state.currentScore);
//     }
//   }

//   cardHandleClick(id) {
//     if (this.state.cardProps[id].clicked) {
//       return this._resetGame();
//     }
//     this._setClicked(id);
//   }

//   _setClicked(id) {
//     const update = Object.fromEntries([
//       [id, { ...this.state.cardProps[id], clicked: true }],
//     ]);
//     const newState = {
//       ...this.state,
//       cardProps: { ...this.state.cardProps, ...update },
//       currentScore: this.state.currentScore + 1,
//     };
//     this.setState(newState);
//   }

//   _resetGame() {
//     this.setState({
//       ...this.state,
//       cardProps: {
//         ...this.state.cardProps,
//         ...this._getCardsReset(),
//       },
//       currentScore: 0,
//     });
//   }

//   _getCardsReset() {
//     const cardReset = [];
//     for (const id of Object.keys(this.state.cardProps)) {
//       cardReset.push([id, { ...this.state.cardProps[id], clicked: false }]);
//     }
//     const update = Object.fromEntries(cardReset);
//     return update;
//   }

//   /**
//    * It changes the card order on each re-render  render() {
//     if (!Object.keys(this.state.cardProps).length)
//       return <div className="load-screen">Loading...</div>;

//     return <div className="game-board">{this.getRandomizedCards()}</div>;
//   }
// }
//       return (
//         <Card
//           stateProps={this.state.cardProps[id]}
//           handleClick={() => this.cardHandleClick(id)}
//         />
//       );
//     });
//   }

// /**
//  * It generates the state object which will be passed as props
//  * for Card components
//  * @param {string} url
//  * @returns cardProps object
//  */
// function createCardProps(image, caption) {
//   return {
//     image: image,
//     caption: caption,
//     clicked: false,
//   };
// }

// /**
//  * It returns a shuffled array
//  * @param {Array} array
//  * @returns array
//  */
// function getShuffledArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }
