/* eslint-disable @typescript-eslint/no-explicit-any */

/* TODO: Add typings (if possible). */
/* Given a function and arguments, return a function that accepts the arguments and
 *  - if the arguments are complete, returns the result of the curried function
 *  - if the arguments are incomplete, returns a function that accepts the missing arguments. */
export const curry = (fn: Function, ...args: any[]): any => (fn.length <= args.length)
  ? fn(...args)
  : (...rest: any[]) => curry(fn, ...args, ...rest);
