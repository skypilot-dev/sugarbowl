import { Literal } from '@skypilot/common-types';

interface Branch {
  [key: string]: Branch | Literal | undefined;
}

interface FilterLeavesByKeyOptions {
  throwOnUndefined?: boolean;
}

/* Given an object and a key, get all values mapped to that key and return them on an object
   with the same structure. */
export function filterLeavesByKey<B extends Branch>(
  leafKey: string,
  tree: B,
  options: FilterLeavesByKeyOptions = {},
): Literal | Branch | undefined {
  const { throwOnUndefined } = options;

  const keys = Object.keys(tree);
  /* If the key is mapped to a non-object value, return it. Otherwise, continue the recursion. */
  if (keys.includes(leafKey) && typeof tree[leafKey] !== 'object') {
    return tree[leafKey];
  }

  /* If the mapping is missing and the entry is not an object, throw an error if `undefined`
     is disallowed. */
  if (Object.values(tree).some(value => typeof value !== 'object')) {
    if (throwOnUndefined) {
      throw new Error(`Invalid tree: A value is missing for '${leafKey}'`);
    }
  }

  const map = Object.entries(tree).reduce((accBranches, [key, value]) => {
    if (typeof value !== 'object') {
      if (throwOnUndefined) {
        throw new Error('Invalid tree!');
      }
      return accBranches;
    }
    return {
      ...accBranches,
      [key]: filterLeavesByKey(leafKey, value, { throwOnUndefined }),
    };
  }, {} as Branch);

  return Object.keys(map).length < 1 ? undefined : map;
}
