import { isValidDate } from './isValidDate';

describe('isValidDate()', () => {
  it('should report that a newly instantiated Date is a valid date', () => {
    const date = new Date();
    expect(isValidDate(date)).toBe(true);
  });


  it('should report that a newly instantiated Date is a valid date', () => {
    const date = new Date();
    expect(isValidDate(date)).toBe(true);
  });


  it('should report that an object literal is not a date', () => {
    expect(isValidDate({})).toBe(false);
  });


  it('should report that null is not a date', () => {
    expect(isValidDate(null)).toBe(false);
  });


  it('should report that undefined is not a date', () => {
    expect(isValidDate(undefined)).toBe(false);
  });


  it('should report that an invalid Date object is not a date', () => {
    const invalidDate = Date.parse('not a date string');
    expect(isValidDate(invalidDate)).toBe(false);
  });
});
