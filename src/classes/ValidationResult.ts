import type { Integer } from '@skypilot/common-types';
import type { JsonObject } from 'type-fest';

import { capitalizeFirstWord, isNull, isUndefined, omitUndefined } from 'src/functions';

interface AddValidationResultOptions {
  id?: Integer | string;
  data?: JsonObject;
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
  data?: JsonObject;
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

  get ok(): boolean {
    const { highestLevel } = this;
    return highestLevel === undefined || (ValidationResult.compareLevels(highestLevel, 'error') < 0);
  }

  /**
   * @deprecated Use `ok`
   */
  get success(): boolean {
    return this.ok;
  }

  get warningMessages(): string[] {
    return this.getMessages('warn');
  }

  get warnings(): Array<ValidationEvent & { level: 'warn' }> {
    return this.getEvents('warn');
  }

  /**
   * @deprecated Use `addEvent` or `error`, `warn`, `info`, `debug`
   */
  add(level: LogLevel, message: string, options: AddValidationResultOptions = {}): ValidationEvent {
    return this.addEvent(level, message, options);
  }

  addEvent(level: LogLevel, message: string, options: AddValidationResultOptions = {}): ValidationEvent {
    const { id, data } = options;

    const validationMessage = {
      level,
      message,
      ...omitUndefined({ id, data }),
    };
    this.events.push(validationMessage);

    return validationMessage;
  }

  debug(message: string, options: AddValidationResultOptions = {}): ValidationEvent {
    return this.addEvent('debug', message, options);
  }

  error(message: string, options: AddValidationResultOptions = {}): ValidationEvent {
    return this.addEvent('error', message, options);
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

  info(message: string, options: AddValidationResultOptions = {}): ValidationEvent {
    return this.addEvent('info', message, options);
  }

  warn(message: string, options: AddValidationResultOptions = {}): ValidationEvent {
    return this.addEvent('warn', message, options);
  }
}
