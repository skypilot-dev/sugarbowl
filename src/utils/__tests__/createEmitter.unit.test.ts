// From `@skypilot-dev/sugarbowl`
import { EventEmitter } from 'node:events';

import { describe, expect, it, vi } from 'vitest';

import { createEmitter } from '../createEmitter.js';

describe('EventEmitter', () => {
  describe('createEmitter()', () => {
    it('returns an event emitter', () => {
      const eventEmitter = createEmitter();
      expect(eventEmitter).toBeInstanceOf(EventEmitter);
    });

    it('if called with an event map, infers event names & arguments from its entries', () => {
      const eventMap = {
        'event-1': [true, false],
        'event-2': ['payload-1', 'payload-2'] as const,
      };
      const eventEmitter = createEmitter(eventMap);
      const receive = vi.fn();
      const payload = 'payload-2';

      eventEmitter.on('event-1', receive);
      eventEmitter.emit('event-1', payload);

      expect(receive).toHaveBeenCalledWith(payload);
    });
  });
  describe('on', () => {
    it('registers a listener that receives events', () => {
      const eventEmitter = createEmitter<{
        'event-1': number;
        'event-2': 'payload1' | 'payload2';
      }>();
      const onEvent1 = vi.fn();
      eventEmitter.on('event-1', onEvent1);
      const event1Payloads = [3, 2];

      const onEvent2 = vi.fn();
      eventEmitter.on('event-2', onEvent2);
      const event2Payload = 'payload1';

      event1Payloads.forEach((payload) => eventEmitter.emit('event-1', payload));
      eventEmitter.emit('event-2', event2Payload);

      expect(onEvent1).toHaveBeenCalledTimes(event1Payloads.length);
      for (const payload of event1Payloads) {
        expect(onEvent1).toHaveBeenCalledWith(payload);
      }
      expect(onEvent2).toHaveBeenCalledTimes(1);
      expect(onEvent2).toHaveBeenCalledWith(event2Payload);
    });
  });
});
