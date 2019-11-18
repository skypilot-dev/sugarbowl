import { digitsOnly } from '../../string';

export function sorterOnDigits(a: string, b: string): number {
  return parseInt(digitsOnly(a), 10) - parseInt(digitsOnly(b), 10);
}
