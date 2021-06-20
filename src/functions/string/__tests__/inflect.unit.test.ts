import { inflectByNumber, inflectQuantity } from '../inflect';

describe('inflectByNumber() and inflectQuantity()', () => {
  describe('zero', () => {
    it("inflectByNumber(0, 'item') should return 'items'", () => {
      const agreedForm = inflectByNumber(0, 'item');
      const expectedForm = 'items';

      expect(agreedForm).toBe(expectedForm);
    });

    it("inflectQuantity(0, 'item') should return '0 items'", () => {
      const agreedCount = inflectQuantity(0, 'item');
      const expectedCount = '0 items';
      expect(agreedCount).toBe(expectedCount);
    });
  });

  describe('singular', () => {
    [-1, -0.5, 0.5, 1].forEach((howMany) => {
      it(`inflectByNumber(${howMany}, 'item') should return 'item'`, () => {
        const agreedForm = inflectByNumber(howMany, 'item');
        const expectedForm = 'item';
        expect(agreedForm).toBe(expectedForm);
      });

      it(`inflectQuantity(${howMany}, 'item') should return '${howMany} item'`, () => {
        const agreedCount = inflectQuantity(howMany, 'item');
        const expectedCount = `${howMany} item`;

        expect(agreedCount).toBe(expectedCount);
      });
    });
  });

  describe('plural', () => {
    [-2, -1.5, 1.5, 2].forEach((howMany) => {
      it(`inflectByNumber(${howMany}, 'item') should return 'items'`, () => {
        const agreedForm = inflectByNumber(howMany, 'item');
        const expectedForm = 'items';
        expect(agreedForm).toBe(expectedForm);
      });

      it(`inflectQuantity(${howMany}, 'item') should return '${howMany} items'`, () => {
        const agreedCount = inflectQuantity(howMany, 'item');
        const expectedCount = `${howMany} items`;

        expect(agreedCount).toBe(expectedCount);
      });
    });
  });

  describe('irregular plural', () => {
    it("inflectByNumber(2, 'child', 'children') should return 'children'", () => {
      const agreedForm = inflectByNumber(2, 'child', 'children');
      const expectedForm = 'children';
      expect(agreedForm).toBe(expectedForm);
    });

    it("inflectQuantity(2, 'child', 'children') should return '2 children'", () => {
      const agreedCount = inflectQuantity(2, 'child', 'children');
      const expectedCount = '2 children';

      expect(agreedCount).toBe(expectedCount);
    });
  });
});
