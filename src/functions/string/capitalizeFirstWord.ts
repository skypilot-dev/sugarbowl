/* Given a string, capitalize the first word and return the new string */

export function capitalizeFirstWord(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
