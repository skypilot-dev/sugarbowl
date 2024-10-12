interface LargeObject {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
}

function getByKey(largeObject: LargeObject, key: keyof LargeObject): number {
  return largeObject[key];
}

describe('myParser', () => {
  it('should return the value mapped to the key', () => {
    const a = { a: 1 } as LargeObject;
    const value = getByKey(
      { a: 1 } as LargeObject, 'a'
    );
    getByKey({ a: '1', b: 1, c: 2, d: 3, e: 4 } as LargeObject, 'a');
    expect(value).toBe(1);
  });
  it('should return the value mapped to the key', () => {
    const value = getByKey(
      { a: 1 } as LargeObject, 'a'
    );
    expect(value).toBe(1);
  });
});
