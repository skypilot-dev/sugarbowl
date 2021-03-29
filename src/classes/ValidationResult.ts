import type { Integer } from '@skypilot/common-types';

import { capitalizeFirstWord, isNull, isUndefined, omitUndefinedEntries } from 'src/functions';

interface AddValidationResultOptions {
  id?: Integer | string;
  data?: unknown;
}

export type LogLevel = typeof ValidationResult.logLevels[number];

/*
interface ValidationResultInput extends AddValidationResultOptions {
  level?: LogLevel;
  message: string;
}
 */

interface ValidationEvent {
  id?: Integer | string;
  data?: unknown;
  level: LogLevel;
  message: string;
}

export class ValidationResult {
  static readonly logLevels = [
    'debug',
    'info',
    'warn',
    'error',
  ] as const;

  events: ValidationEvent[] = [];

  static compareLevels(a: LogLevel | null | undefined, b: LogLevel | null | undefined): Integer {
    if (a === b) {
      return 0;
    }

    // Always consider `null` to have the highest index
    if (isNull(a)) {
      return 1; // a > b
    } else if (isNull(b)) {
      return -1; // a < b
    }

    // Always consider `undefined` to have the lowest index
    if (isUndefined(a)) {
      return -1; // a > b
    } else if (isUndefined(b)) {
      return 1; // a < b
    }

    return ValidationResult.logLevels.indexOf(a) - ValidationResult.logLevels.indexOf(b);
  }

  get errorMessages(): string[] {
    return this.getMessages('error');
  }

  get errors(): Array<ValidationEvent & { level: 'error' }> {
    return this.getEvents('error');
  }

  get highestLevel(): LogLevel | undefined {
    if (!this.events.length) {
      return undefined;
    }

    return this.events
      .sort((a, b) => ValidationResult.compareLevels(a.level, b.level))
      .reverse()[0].level;
  }

  get messages(): string[] {
    return this.getMessages();
  }

  get success(): boolean {
    const { highestLevel } = this;
    return highestLevel === undefined || (ValidationResult.compareLevels(highestLevel, 'error') < 0);
  }

  get warningMessages(): string[] {
    return this.getMessages('warn');
  }

  get warnings(): Array<ValidationEvent & { level: 'warn' }> {
    return this.getEvents('warn');
  }

  add(level: LogLevel, message: string, options: AddValidationResultOptions = {}): ValidationEvent {
    const { id, data } = options;

    const validationMessage = {
      level,
      message,
      ...omitUndefinedEntries({ id, data }),
    };
    this.events.push(validationMessage);

    return validationMessage;
  }

  getEvents(): Array<ValidationEvent>;
  getEvents<L extends LogLevel>(level: L): Array<ValidationEvent & { level: L }>;
  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  getEvents(level?: LogLevel | undefined) {
    if (level === undefined) {
      return this.events;
    }
    return this.events.filter(message => message.level === level);
  }

  getMessages(level?: LogLevel): string[] {
    return (level === undefined ? this.getEvents() : this.getEvents(level))
      .map(event => [
        event.level === 'warn' ? 'Warning' : capitalizeFirstWord(event.level),
        event.message,
      ].join(': '));
  }

  has(): boolean;
  has(level: LogLevel): boolean;
  has(level?: LogLevel): boolean {
    return (level === undefined ? this.getEvents() : this.getEvents(level)).length > 0;
  }
}
