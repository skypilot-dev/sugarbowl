/* eslint-disable @typescript-eslint/ban-types */

/* Given two functions, return a function that returns the result of the two functions. */
function doExtendFunction(fnToExtend: Function, extendingFn: Function): Function {
  /* Identify how many additional arguments the second function expects. */
  const additionalArgCount = extendingFn.length - 1;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return ((...args: any[]) => {
    const argsToFn1 = args.splice(0, args.length - additionalArgCount);
    const argsToFn2 = args.splice(-additionalArgCount);
    const firstResult = fnToExtend(...argsToFn1);
    return extendingFn(firstResult, ...argsToFn2);
  });
}


/* Given two or more functions, return a function that returns the result of all the functions. */
export function extendFunction(fnToExtend: Function, ...extendingFns: Function[]): Function {
  let extendedFn = fnToExtend;
  extendingFns.forEach((extendingFn) => {
    const existingFn = extendedFn;
    extendedFn = doExtendFunction(existingFn, extendingFn);
  });
  return extendedFn;
}
