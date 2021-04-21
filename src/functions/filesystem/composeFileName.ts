/*
  Desired elements
  - base name
  - ISO date string
  - identifier
  - any text elements
 */

import { includeIf } from '../array';

interface ComposeFileNameOptions {
  separator?: string;
}

type ElementFn = () => string | null | undefined;

function resolveElement(element: string | ElementFn | null | undefined): string {
  if (typeof element === 'function') {
    return element() || '';
  }
  return element || '';
}

export function composeFileName(
  elements: Array<string | ElementFn>,
  options: ComposeFileNameOptions = {}
): string {
  const { separator = '_' } = options;
  return elements.reduce((acc, element) => {
    if (!element) {
      return acc;
    }
    if (typeof element === 'string') {
      return element.startsWith('.')
        ? [...acc, element]
        : [...acc, ...includeIf(acc.length, separator), element];
    }

    const resolvedElement = resolveElement(element);
    if (!resolvedElement) {
      return acc;
    }
    return [...acc, ...includeIf(acc.length, separator), resolvedElement];
  }, [] as string[]).join('');
}
