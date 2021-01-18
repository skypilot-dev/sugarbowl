// eslint-disable-next-line @typescript-eslint/ban-types
export function hasOwnProperty(obj: object, propertyName: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, propertyName);
}
