export function hasOwnProperty<T extends object, P extends PropertyKey>(
  target: T,
  property: P,
): target is T extends T & Record<P, infer V> ? T & Record<P, V> : never {
  return Object.prototype.hasOwnProperty.call(target, property);
}

/* Non-erroring version
export function hasOwnProperty<T, P extends PropertyKey>(
  target: T,
  property: P
): target is T extends T & Record<P, infer V> ? T & Record<P, V> : never {
  if (typeof target !== 'object' || target === null) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(target, property);
}
 */

function getA<T extends { a: V }, V>(value: T): V {
  return value.a;
}

for (const value of [{ a: undefined }, { b: 'b' }]) {
  if (hasOwnProperty(value, 'a')) {
    console.info(getA(value));
  }
}
