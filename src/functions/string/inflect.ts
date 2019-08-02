/* Given a string and a quantity, return the string that agrees grammatically in number with that
 * quantity; i.e., return
 * - the plural form if the quantity is zero, less than -1, or greater than 1
 * - the singular in all other cases
 * By default, the singular is formed by adding 's', but an irregular plural form can be passed
 * as the third parameter.
 */
export function inflectByNumber(howMany: number, singular: string, plural?: string): string {
  if (howMany === 0 || howMany > 1 || howMany < -1 ) {
    return plural || `${singular}s`;
  }
  return singular;
}

/* Has the same functionality as `inflectByNumber`, but also includes the number in the returned
 * phrase
 */
export function inflectQuantity(howMany: number, singular: string, plural?: string): string {
  return `${howMany.toString()} ${inflectByNumber(howMany, singular, plural)}`
}
