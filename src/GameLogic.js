export default class Game {
  constructor() {
    this.collection = this.createCollection(12);
  }

  /**
   * It generates a collection of image data objects, each having a url, a picked boolean and a caption.
   * @param {int} size
   * @returns collection
   */
  createCollection(size) {
    const collection = {};
    for (let i = 0; i < size; i++) {
      collection[i] = { url: '', picked: false, caption: '' };
    }
    return collection;
  }

  isImgPicked(picId) {
    return this.collection[picId].picked;
  }

  pickImg(picId) {
    if (isNaN(parseInt(picId))) throw new Error('Error: Input is not a number');
    if (!this.isImgPicked(picId)) {
      this.collection[picId].picked = true;
    } else {
      // call updateBestScore and resetScore
    }
  }

  /**
   * It returns a randomized list of ids found in the game's image collection.
   */
  getRandomOrder() {
    const keys = [...Object.keys(this.collection)];

    // For last..first, shrink currentLength
    for (let i = keys.length - 1; i > 0; i--) {

      // Get random number 0..currentLength
      const j = Math.floor(Math.random() * (i + 1));

      // swap the random postion with the last of current length
      [keys[i], keys[j]] = [keys[j], keys[i]];
    }
    return keys;
  }
}
