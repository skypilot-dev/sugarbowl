import { EventLog } from '../EventLog';

describe('EventLog()', () => {
  describe('static compareLevels(a: LogLevel | null, b: logLevel | null)', () => {
    it('should return a negative number if level a < level b', () => {
      const comparison = EventLog.compareLevels('warn', 'error');
      expect(comparison).toBeLessThan(0);
    });

    it('should return a positive number if level a > level b', () => {
      const comparison = EventLog.compareLevels('info', 'debug');
      expect(comparison).toBeGreaterThan(0);
    });

    it('should treat a null value as higher than any log level', () => {
      expect(
        EventLog.compareLevels('error', null)
      ).toBeLessThan(0);
      expect(
        EventLog.compareLevels(null, 'error')
      ).toBeGreaterThan(0);
    });

    it('should treat undefined as lower than any log level', () => {
      expect(
        EventLog.compareLevels('debug', undefined)
      ).toBeGreaterThan(0);
      expect(
        EventLog.compareLevels(undefined, 'debug')
      ).toBeLessThan(0);
    });
  });

  describe('static merge(:EventLog)', () => {
    it('should return a new EventLog containing all events from the EventLog instances in the array', () => {
      const eventLog1 = new EventLog()
        .error('First')
        .warn('Second');
      const eventLog2 = new EventLog()
        .warn('Last');
      const expectedMessages = [
        'Error: First',
        'Warn: Second',
        'Warn: Last',
      ];

      const mergedEventLog = EventLog.merge([eventLog1, eventLog2]);
      expect(mergedEventLog.getMessages()).toStrictEqual(expectedMessages);
    });
  });

  describe('get events.error', () => {
    it("should be an alias for getEvents('error')", () => {
      const eventLog = new EventLog();
      eventLog.error('Error event');
      const expectedMessages = eventLog.getEvents('error');

      const actualMessages = eventLog.events.error;
      expect(actualMessages).toStrictEqual(expectedMessages);
    });
  });

  describe('get messages', () => {
    it('should return a dictionary of messages of all levels', () => {
      // Example of method chaining
      const eventLog = new EventLog()
        .error('Error 1')
        .warn('Warning')
        .error('Error 2');

      expect(eventLog.messages.error).toStrictEqual([
        'Error 1',
        'Error 2',
      ]);
      expect(eventLog.messages.warn).toStrictEqual([
        'Warning',
      ]);
    });

    it('if there are no messages, should return an empty array', () => {
      const eventLog = new EventLog();
      expect(eventLog.messages.error).toStrictEqual([]);
      expect(eventLog.messages.warn).toStrictEqual([]);
      expect(eventLog.messages.info).toStrictEqual([]);
      expect(eventLog.messages.debug).toStrictEqual([]);
    });
  });

  describe('addEvent()', () => {
    it('should add the event to the EventLog', () => {
      const eventLog = new EventLog();

      eventLog.addEvent('error', 'An error occurred');

      expect(eventLog.events.error).toHaveLength(1);
      expect(eventLog.events.error[0]).toMatchObject({
        level: 'error',
        message: 'An error occurred',
      });
    });
  });

  describe('append(...eventLogs: EventLog[])', () => {
    it('should return a new EventLog containing all events from the EventLog arguments', () => {
      const addendumLog = new EventLog()
        .error('Second')
        .warn('Third');
      const expectedMessages = [
        'Warn: First',
        'Error: Second',
        'Warn: Third',
        'Error: Last',
      ];

      const baseLog = new EventLog()
        .warn('First')
        .append(addendumLog)
        .error('Last');
      const actualMessages = baseLog.getMessages();

      expect(actualMessages).toStrictEqual(expectedMessages);
    });
  });

  describe('debug(), error(), info() & warn()', () => {
    it('should be a shorthand for addEvent() but return the instance to allow chaining', () => {
      const eventLog = new EventLog()
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

      const actualMessages = eventLog.getMessages();
      expect(actualMessages).toStrictEqual(expectedMessages);
    });
  });

  describe('filterEvents({ minLevel: LogLevel, maxLevel: LogLevel, omitLevel: boolean )', () => {
    it('should return the events meeting the constraints', () => {
      const eventLog = new EventLog();
      eventLog.debug('Debug event');
      eventLog.info('Info event');
      eventLog.warn('Warn event');
      eventLog.error('Error event');

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
        expect(eventLog.filterEvents(params).map(
          event => event.message
        )).toStrictEqual(expectedMessages);
        expect(
          eventLog.filterMessages(params, { omitLevel: true })
        ).toStrictEqual(expectedMessages);
      });
    });
  });

  describe('getEvents()', () => {
    it('should return all events', () => {
      const eventLog = new EventLog();
      eventLog.info( 'Info event');
      eventLog.debug('Debug event');

      expect(eventLog.getEvents()).toHaveLength(2);
    });

    it('if logLevel is given, should return events only of that level', () => {
      const eventLog = new EventLog();
      eventLog.info('Info event');
      eventLog.debug('Debug event');

      expect(eventLog.getEvents('debug')).toHaveLength(1);
    });
  });

  describe('getMessages()', () => {
    it('should return the messages from the events', () => {
      const eventLog = new EventLog();
      eventLog.debug('Debug event');
      eventLog.error('Error event');
      eventLog.info('Info event');
      eventLog.warn('Warn event');

      expect(eventLog.getMessages()).toStrictEqual([
        'Debug: Debug event',
        'Error: Error event',
        'Info: Info event',
        'Warn: Warn event',
      ]);
    });

    it('if there are no messages, should return an empty array', () => {
      const eventLog = new EventLog();
      expect(eventLog.getMessages()).toStrictEqual([]);
    });

    it('if logLevel is given, should return messages only of that level', () => {
      const eventLog = new EventLog();
      eventLog.warn('Warn event');
      eventLog.error('Error event');

      expect(eventLog.getMessages('error')).toStrictEqual([
        'Error: Error event',
      ]);
    });
  });

  describe('has(:LogLevel)', () => {
    it('should return true if there are any events', () => {
      const eventLog = new EventLog();
      eventLog.info('Info event');
      expect(eventLog.has()).toBe(true);
    });

    it('should return false if there are no events', () => {
      const eventLog = new EventLog();
      expect(eventLog.has()).toBe(false);
    });

    it('if logLevel is given, should ignore events having a different level', () => {
      const eventLog = new EventLog();
      eventLog.info('Info event');

      expect(eventLog.has()).toBe(true);
      expect(eventLog.has('info')).toBe(true);
      expect(eventLog.has('error')).toBe(false);
    });
  });

  describe('has(:LogLevel)', () => {
    it('if there are no events, should return false', () => {
      expect(new EventLog().has()).toBe(false);
    });

    it('if logLevel is given, should return false if there are no events of that level', () => {
      const eventLog = new EventLog();
      eventLog.info('Info event');

      expect(eventLog.has('info')).toBe(true);
      const absentLogLevels = ['debug', 'error', 'warn'] as const;
      absentLogLevels.forEach(level => {
        expect(eventLog.has(level)).toBe(false);
      });
    });

    it('if logLevel is given, should return true if there are any events of that level', () => {
      const eventLog = new EventLog();
      eventLog.info('Info event');
      eventLog.warn('Warn event');

      expect(eventLog.has('error')).toBe(false);
    });
  });

  describe('highestLevel', () => {
    it('should return the highest level among all events', () => {
      const eventLog = new EventLog();

      eventLog.info('Info event');
      eventLog.warn('Warn event');
      eventLog.debug('Debug event');

      expect(eventLog.highestLevel).toBe('warn');
    });

    it('if there are no events, should return undefined', () => {
      const eventLog = new EventLog();

      expect(eventLog.highestLevel).toBeUndefined();
    });
  });

  describe('ok', () => {
    it('should return true if no messages were added', () => {
      const eventLog = new EventLog();
      expect(eventLog.ok).toBe(true);
    });

    it('should return true if no errors occurred', () => {
      const eventLog = new EventLog()
        .debug('Debug event')
        .info('Info event')
        .warn('Warn event');

      expect(eventLog.ok).toBe(true);
    });

    it('should return false if any errors occurred', () => {
      const eventLog = new EventLog()
        .error('Error event');

      expect(eventLog.ok).toBe(false);
    });
  });
});
