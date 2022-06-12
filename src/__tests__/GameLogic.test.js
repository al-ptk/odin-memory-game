import Game from '../GameLogic.js';

const game = new Game();

describe('createCollection', () => {
  it('should return an object with keys from 0 to size', () => {
    expect(Object.keys(game.createCollection(5))).toStrictEqual([
      '0',
      '1',
      '2',
      '3',
      '4',
    ]);
  });
});

describe('pickImg', () => {
  it('should throw if input is NaN', () => {
    expect(() => game.pickImg(null)).toThrow('Error: Input is not a number');
  });
});

describe('isImgPicked', () => {
  it('should return false for when image is not picked', () => {
    expect(game.isImgPicked(0)).toBe(false);
  });

  it('should return true for when image is not picked', () => {
    game.pickImg(0);
    expect(game.isImgPicked(0)).toBe(true);
  });
});

describe('getRandomOrder', () => {
  it('should not throw errors', () => {
    expect(() => game.getRandomOrder()).not.toThrow();
  });
});
