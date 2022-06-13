import { Component } from 'react';
import Card from './Card';
import './GameBoard.css';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.IMAGE_NUMBER = 12;

    this.state = {
      cards: {},
    };
  }

  componentDidMount() {
    const promises = getFetchPromises(this.IMAGE_NUMBER);
    Promise.all(promises)
      .then(extractUrls)
      .then(createCardPropsColelction)
      .then((data) => this.setState({ cards: data }));
  }

  render() {
    const { cards } = this.state;

    if (!Object.keys(cards).length)
      return <div className="load-screen">Loading...</div>;

    return (
      <div className="game-board">
        {Object.keys(cards).map((id) => {
          return <Card stateProps={cards[id]} />;
        })}
      </div>
    );
  }
}

/**
 * It serves for sending requests necessary for preloading images
 * @param {int} IMAGE_NUMBER
 * @returns List of fetch promisses
 */
function getFetchPromises(IMAGE_NUMBER) {
  let promises = [];
  for (let i = 0; i < IMAGE_NUMBER; i++) {
    promises.push(fetch(`https://picsum.photos/200/300?random=${i}`));
  }
  return promises;
}

/**
 * Used for handling urls fetched from REST api
 * @param {Array} responseArray
 * @returns Array of url strings
 */
function extractUrls(responseArray) {
  return responseArray.map((res) => res.url);
}

/**
 * @param {string} url
 * @returns Image element
 */
function createImg(url) {
  return <img className="card-img" src={url} alt="a pretty landscape" />;
}

/**
 * It generates the state object which will be passed as props
 * for Card components
 * @param {string} url
 * @returns cardProps object
 */
function createCardProps(url) {
  return {
    image: createImg(url),
    caption: "I'm a caption",
    clicked: false,
  };
}

/**
 * It generates an object to hold the state object of all cards
 * @param {Array} urlArray
 * @returns Collection of cardProps objects
 */
function createCardPropsColelction(urlArray) {
  const entries = [];
  for (let i = 0; i < urlArray.length; i++) {
    entries.push([i, createCardProps(urlArray[i])]);
  }
  return Object.fromEntries(entries);
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
