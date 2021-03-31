import type { Integer } from '@skypilot/common-types';

import { toUniqueArray } from 'src/functions/array';
import { isUndefined } from 'src/functions/indefinite';

interface Comparison {
  symbol: string;
  compare: (a: Integer, b: Integer) => boolean;
}

export type ComparisonKey = typeof comparisonKeys[number];

interface ComparisonFlags {
  equal: boolean;
  greaterThan: boolean;
  greaterThanOrEqual: boolean;
  lessThan: boolean;
  lessThanOrEqual: boolean;
}

type MatchDigest = MatchCount & ComparisonFlags;

type PatternTarget = readonly [pattern: string | RegExp, value: Integer];

export interface MatchCount {
  pattern: string | RegExp;
  target: Integer;
  actual: Integer;
}

const comparisonKeys = [
  'equal',
  'greaterThan',
  'greaterThanOrEqual',
  'lessThan',
  'lessThanOrEqual',
] as const;

const comparisons: Record<ComparisonKey, Comparison> = {
  equal: {
    symbol: '=',
    compare: (a, b): boolean => a === b,
  },
  greaterThan: { symbol: '>', compare: (a, b) => a > b },
  greaterThanOrEqual: { symbol: '>=', compare: (a, b) => a >= b },
  lessThan: { symbol: '<', compare: (a, b) => a < b },
  lessThanOrEqual: { symbol: '<=', compare: (a, b) => a <= b },
} as const;

export class StringCounter {
  constructor(public values: string[] = [], public patternTargets: ReadonlyArray<PatternTarget> = []) {}

  static message(key: ComparisonKey, count: MatchCount): string {
    const { pattern, actual, target } = count;
    const { compare, symbol } = comparisons[key];
    const isValid = compare(actual, target);
    return `${pattern.toString()}: ${actual} ${isValid ? '' : '!'}${symbol} ${target}`;
  }

  // TODO: Add a method that optionally sorts by value or frequency, ascending or descending
  get counts(): Record<string, Integer> {
    const uniqueValues = toUniqueArray(this.values).sort((a, b) => a.localeCompare(b));
    return uniqueValues.reduce((acc, uniqueValue) => ({
      ...acc,
      [uniqueValue]: this.values.filter(value => value === uniqueValue).length,
    }), {});
  }

  get digests(): MatchDigest[] {
    return this.patternTargets
      .slice(0)
      .sort(([aPattern], [bPattern]) => aPattern.toString().localeCompare(bPattern.toString()))
      .map(patternTarget => {
        const [pattern, target] = patternTarget;
        const actual = this.countOccurrences(pattern);
        // const flags: CountFlags = Object.fromEntries(Object.entries(comparisons).map(
        //   ([key, { compare }]) => [key, compare(actual, target)]
        // ));
        return {
          pattern,
          target,
          actual,
          // ...flags,
          equal: actual === target,
          greaterThanOrEqual: actual >= target,
          lessThanOrEqual: actual <= target,
          lessThan: actual < target,
          greaterThan: actual > target,
        };
      });
  }

  // Return a dictionary of messages by comparison
  get messages(): Record<ComparisonKey, string[]> {
    return comparisonKeys.reduce((acc, key) => ({
      ...acc,
      [key]: this.messagesByKey(key),
    }), {} as Record<ComparisonKey, string[]>);
  }

  addValues(values: string | string[]): void {
    if (Array.isArray(values)) {
      this.values.push(...values);
    } else {
      this.values.push(values);
    }
  }

  countOccurrences(pattern: RegExp | string): Integer {
    return this.values.filter(value => pattern instanceof RegExp
      ? pattern.test(value)
      : value === pattern).length;
  }

  messagesByKey(comparisonKey: ComparisonKey, pattern?: RegExp | string): string[] {
    if (pattern && !this.patternTargets.some(([knownPattern]) => knownPattern === pattern)) {
      throw new Error(`Unrecognized pattern: ${pattern}`);
    }
    return this.digests
      .filter(digest => (isUndefined(pattern) || (digest.pattern === pattern)) && digest[comparisonKey])
      .map(digest => StringCounter.message(comparisonKey, digest));
  }

  meetsTarget(comparisonKey: ComparisonKey, pattern?: string): boolean {
    if (pattern && !this.patternTargets.some(([knownPattern]) => knownPattern === pattern)) {
      throw new Error(`Unrecognized pattern: ${pattern}`);
    }
    return this.messagesByKey(comparisonKey, pattern).length > 0;
  }
}
