import { randomAlphanumeric } from '../randomAlphanumeric';

describe('', () => {
  it('by default should return a lowercase 8-character alphanumeric string', () => {
    const random = randomAlphanumeric();
    expect(random).toHaveLength(8);
    expect(random.toLowerCase()).toBe(random);
  });

  it('can return a string of less than 8 characters', () => {
    const random = randomAlphanumeric(7);
    expect(random).toHaveLength(7);
    expect(random.toLowerCase()).toBe(random);
  });

  it('if length = 0, should return an empty string', () => {
    const random = randomAlphanumeric(0);
    expect(random).toBe('');
  });

  it('if length < 0, should throw an error', () => {
    expect(() => {
      randomAlphanumeric(-1);
    }).toThrow();
  });

  it('if length > 8, should throw an error', () => {
    expect(() => {
      randomAlphanumeric(9);
    }).toThrow();
  });
});
