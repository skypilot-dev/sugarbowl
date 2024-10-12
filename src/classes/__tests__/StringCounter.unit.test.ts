import { describe, expect, it } from 'vitest';

import type { ComparisonKey, MatchCount } from '../StringCounter.js';
import { StringCounter } from '../StringCounter.js';

describe('StringCounter class', () => {
  describe('counts', () => {
    it('should return a dict of all values and their number of occurrences', () => {
      const values = ['b', 'a', 'b'];
      const expectedCounts = {
        a: 1,
        b: 2,
      };

      const counts = new StringCounter(values).counts;

      expect(counts).toStrictEqual(expectedCounts);
    });
  });

  describe('digests', () => {
    it('should return a digest of all counts & matches', () => {
      const targets = [
        ['/^CreateEvent', 5],
        ['CreateEvent:OK', 2],
        ['CreateEvent:Failed', 2],
      ] as const;
      const values = ['CreateEvent:OK', 'CreateEvent:OK', 'CreateEvent:OK', 'CreateEvent:OK', 'CreateEvent:Failed'];
      const expectedDigests = [
        {
          'pattern': '/^CreateEvent',
          'target': 5,
          'actual': 0,
          'equal': false,
          'greaterThan': false,
          'greaterThanOrEqual': false,
          'lessThan': true,
          'lessThanOrEqual': true,
        },
        {
          'pattern': 'CreateEvent:Failed',
          'actual': 1,
          'target': 2,

          'equal': false,
          'greaterThan': false,
          'greaterThanOrEqual': false,
          'lessThan': true,
          'lessThanOrEqual': true,
        },
        {
          'pattern': 'CreateEvent:OK',
          'target': 2,
          'actual': 4,

          'equal': false,
          'greaterThan': true,
          'greaterThanOrEqual': true,
          'lessThan': false,
          'lessThanOrEqual': false,
        },
      ];

      const digests = new StringCounter(values, targets).digests;

      expect(digests).toStrictEqual(expectedDigests);
    });
  });

  describe('message', () => {
    it("should return a message describing the comparison, prepending a '!' to false statements", () => {
      const pairs: [comparison: ComparisonKey, count: MatchCount, expected: string][] = [
        ['equal', { pattern: 'abc', actual: 0, target: 1 }, 'abc: 0 != 1'],
        ['equal', { pattern: 'abc', actual: 1, target: 1 }, 'abc: 1 = 1'],
        ['greaterThan', { pattern: 'abc', actual: 1, target: 1 }, 'abc: 1 !> 1'],
        ['greaterThan', { pattern: 'abc', actual: 2, target: 1 }, 'abc: 2 > 1'],
        ['greaterThanOrEqual', { pattern: 'abc', actual: 0, target: 1 }, 'abc: 0 !>= 1'],
        ['greaterThanOrEqual', { pattern: 'abc', actual: 1, target: 1 }, 'abc: 1 >= 1'],
        ['greaterThanOrEqual', { pattern: 'abc', actual: 2, target: 1 }, 'abc: 2 >= 1'],
        ['lessThan', { pattern: 'abc', actual: 0, target: 1 }, 'abc: 0 < 1'],
        ['lessThan', { pattern: 'abc', actual: 1, target: 1 }, 'abc: 1 !< 1'],
        ['lessThan', { pattern: 'abc', actual: 2, target: 1 }, 'abc: 2 !< 1'],
        ['lessThan', { pattern: 'abc', actual: 1, target: 1 }, 'abc: 1 !< 1'],
        ['lessThanOrEqual', { pattern: 'abc', actual: 0, target: 1 }, 'abc: 0 <= 1'],
        ['lessThanOrEqual', { pattern: 'abc', actual: 1, target: 1 }, 'abc: 1 <= 1'],
        ['lessThanOrEqual', { pattern: 'abc', actual: 2, target: 1 }, 'abc: 2 !<= 1'],
      ];

      pairs.forEach(([comparison, matchCount, expected]) => {
        const message = StringCounter.message(comparison, matchCount);
        expect(message).toBe(expected);
      });
    });

    it('should render regular expressions', () => {
      const count = { pattern: /^abc\.ef$/, actual: 1, target: 1 };
      const expected = '/^abc\\.ef$/: 1 = 1';

      const message = StringCounter.message('equal', count);

      expect(message).toBe(expected);
    });
  });

  describe('messages', () => {
    it('should return a dictionary of comparisons and their respective valid messages', () => {
      const targets = [
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ] as const;
      const values = ['a', 'b', 'a'];
      const expectedDict = {
        equal: [],
        greaterThan: ['a: 2 > 1'],
        greaterThanOrEqual: ['a: 2 >= 1'],
        lessThan: ['b: 1 < 2', 'c: 0 < 3'],
        lessThanOrEqual: ['b: 1 <= 2', 'c: 0 <= 3'],
      };

      const dict = new StringCounter(values, targets).messages;
      expect(dict).toStrictEqual(expectedDict);
    });

    it('should make selected messages available on the the messages dict', () => {
      const targets = [
        [/^CreateEvent/, 5],
        ['CreateEvent:OK', 2],
        ['CreateEvent:Failed', 2],
      ] as const;
      const values = ['CreateEvent:OK', 'CreateEvent:OK', 'CreateEvent:OK', 'CreateEvent:OK', 'CreateEvent:Failed'];
      const limitChecker = new StringCounter(values, targets);
      const expectedMessages = ['/^CreateEvent/: 5 >= 5', 'CreateEvent:OK: 4 >= 2'];

      const messages = limitChecker.messages.greaterThanOrEqual;

      expect(messages).toStrictEqual(expectedMessages);
    });
  });

  describe('messagesByKey(:ComparisonKey)', () => {
    it('should return all valid messages for the comparison key', () => {
      const targets = [
        ['a', 2],
        ['b', 1],
        ['c', 0],
      ] as const;
      const values = ['a', 'b', 'c', 'a'];
      const expectedMessages = ['a: 2 <= 2', 'b: 1 <= 1'];

      const messages = new StringCounter(values, targets).messagesByKey('lessThanOrEqual');
      expect(messages).toStrictEqual(expectedMessages);
    });

    it('if the pattern is specified, should check only that pattern', () => {
      const targets = [
        ['a', 2],
        ['b', 1],
      ] as const;
      const values = ['a', 'a', 'b', 'b', 'c'];
      const expectedMessages: string[] = ['a: 2 = 2'];

      const messages = new StringCounter(values, targets).messagesByKey('equal', 'a');

      expect(messages).toStrictEqual(expectedMessages);
    });
  });

  describe('meetsTarget(:ComparisonKey, value?: string)', () => {
    it('if the comparison is true for any value, should return true', () => {
      const targets = [
        ['a', 2],
        ['b', 1],
        ['c', 0],
      ] as const;
      const values = ['a', 'b', 'c', 'a'];
      const counter = new StringCounter(values, targets);

      expect(counter.meetsTarget('greaterThan')).toBe(true);
      expect(counter.meetsTarget('lessThan')).toBe(false);
      expect(counter.meetsTarget('equal')).toBe(true);
    });

    it('if the pattern is specified, should check only that pattern', () => {
      const targets = [
        ['a', 2],
        ['b', 1],
        ['c', 0],
        ['d', 5],
      ] as const;
      const values = ['a', 'a', 'b', 'b', 'c'];
      const counter = new StringCounter(values, targets);

      expect(counter.meetsTarget('equal', 'a')).toBe(true);
      expect(counter.meetsTarget('greaterThan', 'a')).toBe(false);
      expect(counter.meetsTarget('greaterThanOrEqual', 'a')).toBe(true);
      expect(counter.meetsTarget('lessThan', 'a')).toBe(false);
      expect(counter.meetsTarget('lessThanOrEqual', 'a')).toBe(true);
    });
  });
});
