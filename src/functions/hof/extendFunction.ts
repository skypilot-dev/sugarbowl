/* Given two functions, return a function that returns the result of the two functions. */
export function extendFunction(fnToExtend: Function, extendingFn: Function): Function {
  /* Identify how many additional arguments the second function expects. */
  const additionalArgCount = extendingFn.length - 1;
  return ((...args) => {
    const argsToFn1 = args.splice(0, args.length - additionalArgCount);
    const argsToFn2 = args.splice(-additionalArgCount);
    const firstResult = fnToExtend(...argsToFn1);
    return extendingFn(firstResult, ...argsToFn2);
  });
}
