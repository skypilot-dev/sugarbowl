/* Given a string, capitalize all words and return the new string */

export function capitalizeAllWords(str: string): string {
  return str.replace(/\w\S*/g, (text) => {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
  });
}
