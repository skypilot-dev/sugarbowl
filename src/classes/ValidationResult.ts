import type { Integer } from '@skypilot/common-types';

import { capitalizeFirstWord, omitUndefinedEntries } from 'src/functions';

const logLevels = [
  'debug',
  'info',
  'warn',
  'error',
] as const;

type LogLevel = typeof logLevels[number];

interface AddValidationResultOptions {
  id?: Integer | string;
  data?: unknown;
}

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
  events: ValidationEvent[] = [];

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

    const highestLogLevel = this.events.sort(
      (a, b) => indexOfLevel(b.level)  - indexOfLevel(a.level)
    )[0].level;

    return logLevels[indexOfLevel(highestLogLevel)];
  }

  get messages(): string[] {
    return this.getMessages();
  }

  get success(): boolean {
    const { highestLevel } = this;
    return highestLevel === undefined || (indexOfLevel(highestLevel) < indexOfLevel('error'));
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

function indexOfLevel(logLevel: LogLevel): Integer {
  return logLevels.indexOf(logLevel);
}
