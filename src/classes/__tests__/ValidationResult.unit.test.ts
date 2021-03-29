import { ValidationResult } from '../ValidationResult';

describe('ValidationResult()', () => {
  describe('add()', () => {
    it('should add the event to the ValidationResult', () => {
      const vr = new ValidationResult();

      vr.add('error', 'An error occurred');

      expect(vr.events).toHaveLength(1);
      expect(vr.events[0]).toMatchObject({
        level: 'error',
        message: 'An error occurred',
      });
    });
  });

  describe('compareLevels(a: LogLevel | null, b: logLevel | null)', () => {
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
  });

  describe('errors', () => {
    it("should be an alias for getEvents('error')", () => {
      const vr = new ValidationResult();
      vr.add('error', 'Error event');

      expect(vr.getEvents('error')).toStrictEqual(vr.errors);
    });
  });

  describe('getEvents()', () => {
    it('should return all events', () => {
      const vr = new ValidationResult();
      vr.add('info', 'Info event');
      vr.add('debug', 'Debug event');

      expect(vr.getEvents()).toHaveLength(2);
    });

    it('if logLevel is given, should return events only of that level', () => {
      const vr = new ValidationResult();
      vr.add('info', 'Info event');
      vr.add('debug', 'Debug event');

      expect(vr.getEvents('debug')).toHaveLength(1);
    });
  });

  describe('getMessages()', () => {
    it('should return the messages from the events', () => {
      const vr = new ValidationResult();
      vr.add('debug', 'Debug event');
      vr.add('error', 'Error event');
      vr.add('info', 'Info event');
      vr.add('warn', 'Warn event');

      expect(vr.getMessages()).toStrictEqual([
        'Debug: Debug event',
        'Error: Error event',
        'Info: Info event',
        'Warning: Warn event',
      ]);
    });

    it('if logLevel is given, should return messages only of that level', () => {
      const vr = new ValidationResult();
      vr.add('warn', 'Warn event');
      vr.add('error', 'Error event');

      expect(vr.getMessages('error')).toStrictEqual([
        'Error: Error event',
      ]);
    });
  });

  describe('errorMessages, warnMessages', () => {
    it('should return the array of corresponding messages', () => {
      const vr = new ValidationResult();
      vr.add('error', 'Error event 1');
      vr.add('warn', 'Warn event');
      vr.add('error', 'Error event 2');

      expect(vr.errorMessages).toStrictEqual([
        'Error: Error event 1',
        'Error: Error event 2',
      ]);
      expect(vr.warningMessages).toStrictEqual([
        'Warning: Warn event',
      ]);
    });

    it('if there are no messages, should return an empty array', () => {
      const vr = new ValidationResult();
      expect(vr.messages).toStrictEqual([]);
    });
  });

  describe('has(:LogLevel)', () => {
    it('should return true if there are any events', () => {
      const vr = new ValidationResult();
      vr.add('info', 'Info event');
      expect(vr.has()).toBe(true);
    });

    it('should return false if there are no events', () => {
      const vr = new ValidationResult();
      expect(vr.has()).toBe(false);
    });

    it('if logLevel is given, should ignore events having a different level', () => {
      const vr = new ValidationResult();
      vr.add('info', 'Info event');

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
      vr.add('info', 'Info event');

      expect(vr.has('info')).toBe(true);
      const absentLogLevels = ['debug', 'error', 'warn'] as const;
      absentLogLevels.forEach(level => {
        expect(vr.has(level)).toBe(false);
      });
    });

    it('if logLevel is given, should return true if there are any events of that level', () => {
      const vr = new ValidationResult();
      vr.add('info', 'Info event');
      vr.add('warn', 'Warn event');

      expect(vr.has('error')).toBe(false);
    });
  });

  describe('highestLevel', () => {
    it('should return the highest level among all events', () => {
      const vr = new ValidationResult();

      vr.add('info', 'Info event');
      vr.add('warn', 'Warn event');
      vr.add('debug', 'Debug event');

      expect(vr.highestLevel).toBe('warn');
    });

    it('if there are no events, should return undefined', () => {
      const vr = new ValidationResult();

      expect(vr.highestLevel).toBeUndefined();
    });
  });

  describe('messages', () => {
    it('should return the array of all messages', () => {
      const vr = new ValidationResult();
      vr.add('error', 'Error event');
      vr.add('debug', 'Debug event');

      expect(vr.messages).toStrictEqual([
        'Error: Error event',
        'Debug: Debug event',
      ]);
    });

    it('if there are no messages, should return an empty array', () => {
      const vr = new ValidationResult();
      expect(vr.messages).toStrictEqual([]);
    });
  });

  describe('success', () => {
    it('should return true if no message were added', () => {
      const vr = new ValidationResult();
      expect(vr.success).toBe(true);
    });

    it('should return true if no errors occurred', () => {
      const vr = new ValidationResult();
      vr.add('debug', 'Debug event');
      vr.add('info', 'Info event');
      vr.add('warn', 'Warn event');

      expect(vr.success).toBe(true);
    });

    it('should return false if any errors occurred', () => {
      const vr = new ValidationResult();
      vr.add('error', 'Error event');

      expect(vr.success).toBe(false);
    });
  });
});
