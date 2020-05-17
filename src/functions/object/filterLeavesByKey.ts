/* eslint-disable-next-line import/no-extraneous-dependencies */
import { Literal } from '@skypilot/common-types';

interface Branch {
  [key: string]: Branch | Literal | Array<Literal> | undefined;
}

interface FilterLeavesByKeyOptions {
  throwOnUndefined?: boolean;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function isObject(value: any): boolean {
  return typeof value === 'object' && !Array.isArray(value);
}

/* Given an object and a key, get all values mapped to that key and return them on an object
   with the same structure. */
export function filterLeavesByKey<B extends Branch>(
  leafKey: string,
  tree: B,
  options: FilterLeavesByKeyOptions = {},
): Branch | Literal | Literal[] | undefined {
  const { throwOnUndefined } = options;

  const keys = Object.keys(tree);
  /* FIXME: Guard against the possibility that a branch has the same name as a locale code. */
  if (keys.includes(leafKey)) {
    return tree[leafKey];
  }

  /* If the mapping is missing and any sibling is not an object, this branch is a dead end
     for the locale code, with no defined value for it. Throw an error if `undefined`
     is disallowed. */
  if (Object.values(tree).some(value => !isObject(value))) {
    if (throwOnUndefined) {
      throw new Error(`Invalid tree: A value is missing for '${leafKey}'`);
    }
  }

  const map = Object.entries(tree).reduce((accBranches, [key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      return {
        ...accBranches,
        [key]: filterLeavesByKey(leafKey, value, { throwOnUndefined }),
      };
    }
    if (throwOnUndefined) {
      throw new Error('Invalid tree!');
    }
    return accBranches;
  }, {} as Branch);

  return Object.keys(map).length < 1 ? undefined : map;
}
