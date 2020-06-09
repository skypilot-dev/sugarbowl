/* Given a value, return true if the value is a valid Date object */
export function isValidDate(date: unknown): boolean {
  return !!(date
    && Object.prototype.toString.call(date) === '[object Date]'
    && !(typeof(date) === 'number' && isNaN(date))
  );
}
