/* Given a value, return true if the value is a valid Date object */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function isValidDate(date: any): boolean {
  return !!(date
    && Object.prototype.toString.call(date) === '[object Date]'
    && !isNaN(date)
  );
}
