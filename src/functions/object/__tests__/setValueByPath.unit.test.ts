import { setValueByPath } from '../setValueByPath';

describe('setValueByPath(path: string | string[], value, target: object)', () => {
  it('should set the value on the object at the path, creating the path if necessary', () => {
    const path = 'a.b.c';
    const target = {};
    const value = 0;

    const changedObj = setValueByPath(path, value, target);

    const expected = {
      a: {
        b: { c: 0 },
      },
    };
    expect(changedObj).toStrictEqual(expected);
  });

  it('should not overwrite sibling values', () => {
    const path = 'a.b1.c1';
    const target = { a: { b2: { c2: 2 } } };
    const value = 1;

    const changedObj = setValueByPath(path, value, target);

    const expected = {
      a: {
        b1: { c1: 1 },
        b2: { c2: 2 },
      },
    };
    expect(changedObj).toStrictEqual(expected);
  });

  it('by default should overwrite an existing value', () => {
    const path = 'a.b1.c1';
    const target = { a: { b1: { c1: 0 } } };
    const value = 1;

    const changedObj = setValueByPath(path, value, target);

    const expected = {
      a: {
        b1: { c1: 1 },
      },
    };
    expect(changedObj).toStrictEqual(expected);
  });

  it('when `noOverwrite: true`, should throw an error if an attempt is made to overwrite an existing value', () => {
    const path = 'a.b1.c1';
    const target = { a: { b1: { c1: 0 } } };
    const value = 1;
    const options = { noOverwrite: true };

    expect(() => {
      setValueByPath(path, value, target, options);
    }).toThrow();
  });
});
