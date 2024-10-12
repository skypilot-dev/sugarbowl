/* eslint-disable @typescript-eslint/ban-ts-comment */

// Uncomment the text line to enable typechecking
// @ts-nocheck

import { describe, it } from 'vitest';

import type { PlainObject } from '../isPlainObject';

function takesPlainObject(_plainObject: PlainObject): void {
  /* do nothing */
}

describe('PlainObject', () => {
  it('should accept any object that is not an array, function, or class instance', () => {
    interface MyObj {
      a: string;
    }
    const typedObj: MyObj = { a: 'value' };

    takesPlainObject({});
    takesPlainObject({ a: 1 });
    takesPlainObject(typedObj);
    takesPlainObject(new Object());
  });

  it('should reject any primitive value', () => {
    takesPlainObject(true);
    takesPlainObject(0);
    takesPlainObject('');
  });

  it('should reject a function', () => {
    const fn = (): void => void 0;
    takesPlainObject(fn);
  });

  it('should reject any array', () => {
    takesPlainObject([]);
    takesPlainObject([1]);
  });

  it('should reject any instance of a class other than Object', () => {
    class MyClass {
      constructor(public prop?: unknown) {}
    }

    takesPlainObject(MyClass);
    takesPlainObject(new Date());
    takesPlainObject(new Map());
    takesPlainObject(new MyClass());
    takesPlainObject(new Set());
    takesPlainObject(new WeakMap());
  });
});
