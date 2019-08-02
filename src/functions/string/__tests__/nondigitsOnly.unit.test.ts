import { nondigitsOnly } from '../nondigitsOnly';

describe('nondigitsOnly()', () => {
  it(`should return only 'AB' from 'A1B2'`, () => {
    const nondigits = nondigitsOnly('A1B2');
    expect(nondigits).toEqual('AB');
  });
});
