import { filterLeavesByKey } from '../filterLeavesByKey';

describe('filterLeavesByKey', () => {
  it("given an object & key, should return all values mapped to the key while preserving the object's structure", () => {
    const leafKey = 'a';
    const tree = {
      value1: {
        a: 'value1-a',
        b: 'value1-b',
      },
      value2: {
        a: 'value2-a',
        b: 'value2-b',
      },
      branch: {
        value3: {
          a: 'value3-a',
          b: 'value3-b',
        },
      },
    };
    const filteredBranches = filterLeavesByKey(leafKey, tree);

    const expected = {
      value1: 'value1-a',
      value2: 'value2-a',
      branch: {
        value3: 'value3-a',
      },
    };
    expect(filteredBranches).toStrictEqual(expected);
  });

  it('when a tree has branches without the key, should return undefined for those branches', () => {
    const leafKey = 'a';
    const tree = {
      value1: {
        a: 'value1-a',
        b: 'value1-b',
      },
      value2: {
        b: 'value2-b',
      },
      value3: {
        b: 'value3-b',
      },
      value4: {
        a: 'value4-a',
        b: 'value4-b',
      },
    };

    const filteredBranches = filterLeavesByKey(leafKey, tree);

    const expected = {
      value1: 'value1-a',
      value2: undefined,
      value3: undefined,
      value4: 'value4-a',
    };

    expect(filteredBranches).toStrictEqual(expected);
  });

  it('when the leaf is an array, should return the array', () => {
    const tree = {
      branch: {
        leaf: {
          a: 'leaf-a',
          b: 'leaf-b',
        },
        leafArray: {
          a: ['a0', 'a1'],
        },
      },
    };

    expect(filterLeavesByKey('a', tree)).toStrictEqual({
      branch: {
        leaf: 'leaf-a',
        leafArray: ['a0', 'a1'],
      },
    });

    expect(filterLeavesByKey('b', tree)).toStrictEqual({
      branch: {
        leaf: 'leaf-b',
        leafArray: undefined,
      },
    });
  });

  it('given an empty object, should return undefined', () => {
    const leafKey = 'nonexistent-key';
    const tree = {};

    const filteredBranches = filterLeavesByKey(leafKey, tree);

    const expected = undefined;
    expect(filteredBranches).toStrictEqual(expected);
  });

  it('when `throwOnUndefined: true`, should require every branch to end in a leaf mapped to the key', () => {
    const tree = {
      branch1: {
        value1: {
          a: 'value1-a',
          b: 'value1-b',
        },
        value2: {
          a: 'value2-a',
          b: 'value2-b',
        },
      },
      branch2: {
        value3: {
          a: 'value3-a', // no value for `b`
        },
      },
    };
    const options = { throwOnUndefined: true };

    expect(() => filterLeavesByKey('a', tree, options)).not.toThrow();
    expect(() => filterLeavesByKey('b', tree, options)).toThrow();
  });
});
