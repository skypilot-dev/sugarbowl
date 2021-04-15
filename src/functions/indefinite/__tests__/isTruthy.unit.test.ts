import { isTruthy } from '../isTruthy';

describe('isTruthy(value: unknown)', () => {
  it('should return true if the value is any truthy value', () => {
    const truthyValues = [1, 'a', {}, [], () => true, true];
    truthyValues.forEach(value => {
      expect(isTruthy(value)).toBe(true);
    });
  });

  it('should return false if the value is any falsy value', () => {
    const falsyValues = [false, 0, null, undefined, '', NaN];
    falsyValues.forEach(value => {
      expect(isTruthy(value)).toBe(false);
    });
  });
});
