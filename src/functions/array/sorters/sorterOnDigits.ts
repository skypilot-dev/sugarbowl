import { digitsOnly } from '../../string';

export function sorterOnDigits(a, b) {
  return parseInt(digitsOnly(a), 10) - parseInt(digitsOnly(b), 10);
}