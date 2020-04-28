import { randomAlphanumeric } from '../randomAlphanumeric';

describe('', () => {
  it('by default should return a lowercase 10-character alphanumeric string', () => {
    const random = randomAlphanumeric();
    expect(random).toHaveLength(10);
    expect(random.toLowerCase()).toBe(random);
  });

  it('can return a string of less than 10 characters', () => {
    const random = randomAlphanumeric(9);
    expect(random).toHaveLength(9);
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

  it('if length > 10, should throw an error', () => {
    expect(() => {
      randomAlphanumeric(11);
    }).toThrow();
  });
});
