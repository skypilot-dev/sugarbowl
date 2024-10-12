import { describe, expect, it } from 'vitest';

import { LooseMap } from '../LooseMap.js';

describe('LooseMap class', () => {
  describe('has', () => {
    it('returns true if the key is mapped', () => {
      const map = new LooseMap();
      map.set({ a: 1 }, 'value');

      expect(map.has({ a: 1 })).toBe(true);
    });

    it('returns false if the key is not mapped', () => {
      const map = new LooseMap();
      map.set({ a: 1 }, 'value');

      expect(map.has({ a: 2 })).toBe(false);
    });
  });
});
