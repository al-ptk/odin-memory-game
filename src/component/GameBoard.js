import { Component } from 'react';
import Card from './Card';
import './GameBoard.css';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.IMAGE_NUMBER = 12;

    this.state = {
      cardProps: {},
      currentScore: 0,
    };

    this._setClicked = this._setClicked.bind(this);
  }

  componentDidMount() {
    const promises = getFetchPromises(this.IMAGE_NUMBER);
    Promise.all(promises)
      .then(extractUrls)
      .then(createCardPropsColelction)
      .then((data) => this.setState({ cardProps: data }));
  }

  componentDidUpdate() {
    this.props.updateScore(this.state.currentScore);
    if (this.props.bestScore < this.state.currentScore) {
      this.props.updateBestScore(this.state.currentScore);
    }
  }

  cardHandleClick(id) {
    if (this.state.cardProps[id].clicked) {
      return this._resetGame();
    }
    this._setClicked(id);
  }

  _setClicked(id) {
    const update = Object.fromEntries([
      [id, { ...this.state.cardProps[id], clicked: true }],
    ]);
    const newState = {
      ...this.state,
      cardProps: { ...this.state.cardProps, ...update },
      currentScore: this.state.currentScore + 1,
    };
    this.setState(newState);
  }

  _resetGame() {
    this.setState({
      ...this.state,
      cardProps: {
        ...this.state.cardProps,
        ...this._getCardsReset(),
      },
      currentScore: 0,
    });
  }

  _getCardsReset() {
    const cardReset = [];
    for (const id of Object.keys(this.state.cardProps)) {
      cardReset.push([id, { ...this.state.cardProps[id], clicked: false }]);
    }
    const update = Object.fromEntries(cardReset);
    return update;
  }

  /**
   * It changes the card order on each re-render
   * @returns Array of ids
   */
  getRandomizedCards() {
    const randomOrder = getShuffledArray(Object.keys(this.state.cardProps));
    return randomOrder.map((id) => {
      return (
        <Card
          stateProps={this.state.cardProps[id]}
          handleClick={() => this.cardHandleClick(id)}
        />
      );
    });
  }

  render() {
    if (!Object.keys(this.state.cardProps).length)
      return <div className="load-screen">Loading...</div>;

    return <div className="game-board">{this.getRandomizedCards()}</div>;
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
    caption: "I'm a new caption",
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
