import { ValidationResult } from '../ValidationResult';

describe('ValidationResult()', () => {
  describe('static compareLevels(a: LogLevel | null, b: logLevel | null)', () => {
    it('should return a negative number if level a < level b', () => {
      const comparison = ValidationResult.compareLevels('warn', 'error');
      expect(comparison).toBeLessThan(0);
    });

    it('should return a positive number if level a > level b', () => {
      const comparison = ValidationResult.compareLevels('info', 'debug');
      expect(comparison).toBeGreaterThan(0);
    });

    it('should treat a null value as higher than any log level', () => {
      expect(
        ValidationResult.compareLevels('error', null)
      ).toBeLessThan(0);
      expect(
        ValidationResult.compareLevels(null, 'error')
      ).toBeGreaterThan(0);
    });

    it('should treat undefined as lower than any log level', () => {
      expect(
        ValidationResult.compareLevels('debug', undefined)
      ).toBeGreaterThan(0);
      expect(
        ValidationResult.compareLevels(undefined, 'debug')
      ).toBeLessThan(0);
    });
  });

  describe('get events.error', () => {
    it("should be an alias for getEvents('error')", () => {
      const vr = new ValidationResult();
      vr.error('Error event');

      expect(vr.getEvents('error')).toStrictEqual(vr.events.error);
    });
  });

  describe('get messages', () => {
    it('should return a dictionary of messages of all levels', () => {
      // Example of method chaining
      const vr = new ValidationResult()
        .error('Error event 1')
        .warn('Warn event')
        .error('Error event 2');

      expect(vr.messages.error).toStrictEqual([
        'Error event 1',
        'Error event 2',
      ]);
      expect(vr.messages.warn).toStrictEqual([
        'Warn event',
      ]);
    });

    it('if there are no messages, should return an empty array', () => {
      const vr = new ValidationResult();
      expect(vr.messages.error).toStrictEqual([]);
      expect(vr.messages.warn).toStrictEqual([]);
      expect(vr.messages.info).toStrictEqual([]);
      expect(vr.messages.debug).toStrictEqual([]);
    });
  });

  describe('addEvent()', () => {
    it('should add the event to the ValidationResult', () => {
      const vr = new ValidationResult();

      vr.addEvent('error', 'An error occurred');

      expect(vr.events.error).toHaveLength(1);
      expect(vr.events.error[0]).toMatchObject({
        level: 'error',
        message: 'An error occurred',
      });
    });
  });

  describe('debug(), error(), info() & warn()', () => {
    it('should be a shorthand for addEvent() but return the instance to allow chaining', () => {
      const vr = new ValidationResult()
        .debug('Chained debug')
        .error('Chained error')
        .info('Chained info')
        .warn('Chained warning');
      const expectedMessages = [
        'Debug: Chained debug',
        'Error: Chained error',
        'Info: Chained info',
        'Warn: Chained warning',
      ];

      const actualMessages = vr.getMessages();
      expect(actualMessages).toStrictEqual(expectedMessages);
    });
  });

  describe('filterEvents({ minLevel: LogLevel, maxLevel: LogLevel, omitLevel: boolean )', () => {
    it('should return the events meeting the constraints', () => {
      const vr = new ValidationResult();
      vr.debug('Debug event');
      vr.info('Info event');
      vr.warn('Warn event');
      vr.error('Error event');

      const sets = [
        {
          params: { minLevel: 'warn' } as const,
          expectedMessages : ['Warn event', 'Error event'],
        },
        {
          params: { minLevel: 'debug', maxLevel: 'info' } as const,
          expectedMessages : ['Debug event', 'Info event'],
        },
        {
          params: { maxLevel: 'debug' } as const,
          expectedMessages : ['Debug event'],
        },
      ];
      sets.forEach(( { params, expectedMessages }) => {
        expect(vr.filterEvents(params).map(
          event => event.message
        )).toStrictEqual(expectedMessages);
        expect(
          vr.filterMessages(params, { omitLevel: true })
        ).toStrictEqual(expectedMessages);
      });
    });
  });

  describe('getEvents()', () => {
    it('should return all events', () => {
      const vr = new ValidationResult();
      vr.info( 'Info event');
      vr.debug('Debug event');

      expect(vr.getEvents()).toHaveLength(2);
    });

    it('if logLevel is given, should return events only of that level', () => {
      const vr = new ValidationResult();
      vr.info('Info event');
      vr.debug('Debug event');

      expect(vr.getEvents('debug')).toHaveLength(1);
    });
  });

  describe('getMessages()', () => {
    it('should return the messages from the events', () => {
      const vr = new ValidationResult();
      vr.debug('Debug event');
      vr.error('Error event');
      vr.info('Info event');
      vr.warn('Warn event');

      expect(vr.getMessages()).toStrictEqual([
        'Debug: Debug event',
        'Error: Error event',
        'Info: Info event',
        'Warn: Warn event',
      ]);
    });

    it('if there are no messages, should return an empty array', () => {
      const vr = new ValidationResult();
      expect(vr.getMessages()).toStrictEqual([]);
    });

    it('if logLevel is given, should return messages only of that level', () => {
      const vr = new ValidationResult();
      vr.warn('Warn event');
      vr.error('Error event');

      expect(vr.getMessages('error')).toStrictEqual([
        'Error: Error event',
      ]);
    });
  });

  describe('has(:LogLevel)', () => {
    it('should return true if there are any events', () => {
      const vr = new ValidationResult();
      vr.info('Info event');
      expect(vr.has()).toBe(true);
    });

    it('should return false if there are no events', () => {
      const vr = new ValidationResult();
      expect(vr.has()).toBe(false);
    });

    it('if logLevel is given, should ignore events having a different level', () => {
      const vr = new ValidationResult();
      vr.info('Info event');

      expect(vr.has()).toBe(true);
      expect(vr.has('info')).toBe(true);
      expect(vr.has('error')).toBe(false);
    });
  });

  describe('has(:LogLevel)', () => {
    it('if there are no events, should return false', () => {
      expect(new ValidationResult().has()).toBe(false);
    });

    it('if logLevel is given, should return false if there are no events of that level', () => {
      const vr = new ValidationResult();
      vr.info('Info event');

      expect(vr.has('info')).toBe(true);
      const absentLogLevels = ['debug', 'error', 'warn'] as const;
      absentLogLevels.forEach(level => {
        expect(vr.has(level)).toBe(false);
      });
    });

    it('if logLevel is given, should return true if there are any events of that level', () => {
      const vr = new ValidationResult();
      vr.info('Info event');
      vr.warn('Warn event');

      expect(vr.has('error')).toBe(false);
    });
  });

  describe('highestLevel', () => {
    it('should return the highest level among all events', () => {
      const vr = new ValidationResult();

      vr.info('Info event');
      vr.warn('Warn event');
      vr.debug('Debug event');

      expect(vr.highestLevel).toBe('warn');
    });

    it('if there are no events, should return undefined', () => {
      const vr = new ValidationResult();

      expect(vr.highestLevel).toBeUndefined();
    });
  });

  describe('ok', () => {
    it('should return true if no messages were added', () => {
      const vr = new ValidationResult();
      expect(vr.ok).toBe(true);
    });

    it('should return true if no errors occurred', () => {
      const vr = new ValidationResult();
      vr.debug('Debug event');
      vr.info('Info event');
      vr.warn('Warn event');

      expect(vr.ok).toBe(true);
    });

    it('should return false if any errors occurred', () => {
      const vr = new ValidationResult();
      vr.error('Error event');

      expect(vr.ok).toBe(false);
    });
  });
});
