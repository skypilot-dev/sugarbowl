import { curry } from '../curry';

function add(a: number, b: number, c: number, d: number): number {
  return a + b + c + d;
}

describe('curry(:function, :...args)', () => {
  describe('given a function & arguments, return a function that', () => {
    it('given a function and complete arguments, returns the result of the curried function', () => {
      const sum = curry(add, 1, 2, 3, 4);
      expect(sum).toBe(10);
    });

    it('given a function and no arguments, returns a curried function that accepts all arguments', () => {
      const curriedAdd = curry(add);
      const allAtOnce = curriedAdd(1, 2, 3, 4);
      expect(allAtOnce).toBe(10);

      const oneArgAtATime = curriedAdd(1)(2)(3)(4);
      expect(oneArgAtATime).toBe(10);
    });

    it('given a function and partial arguments, returns a curried function that accepts the missing arguments', () => {
      const curriedAdd = curry(add, 1, 2);
      const sum = curriedAdd(3, 4);
      expect(sum).toBe(10);
    });
  });
});
