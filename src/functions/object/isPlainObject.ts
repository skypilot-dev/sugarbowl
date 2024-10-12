export type PlainObject = { [key: string]: unknown } & ({ bind?: never } | { call?: never });

export function isPlainObject(value: PlainObject | unknown): value is PlainObject {
  return value instanceof Object && Object.getPrototypeOf(value) === Object.prototype;
}
