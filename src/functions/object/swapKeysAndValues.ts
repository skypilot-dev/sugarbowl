type StringMap = {
  [key: string]: string | number;
};

export function swapKeysAndValues(obj: StringMap): StringMap {
  return Object
    .entries(obj)
    .reduce((swappedObj, [key, value]) => {
      if (Object.prototype.hasOwnProperty.call(swappedObj, value)) {
        throw new Error(`Swap cannot be performed; object has non-unique value '${value}'`);
      }
      return {
        ...swappedObj,
        [value]: key,
      };
    }, {} as StringMap);
}
