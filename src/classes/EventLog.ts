import type { Integer } from '@skypilot/common-types';
import type { JsonObject } from 'type-fest';

import { capitalizeFirstWord, isNull, isUndefined, omitUndefined } from 'src/functions';

interface AddEventOptions {
  id?: Integer | string;
  data?: JsonObject;
}

export interface FilterEventsParams {
  maxLevel?: LogLevel;
  minLevel?: LogLevel;
}

export type LogLevel = typeof EventLog.logLevels[number];

export interface EventMessageOptions {
  omitLevel?: boolean; // if true, don't prepend the level to the message
}

interface Event {
  id?: Integer | string;
  data?: JsonObject;
  level: LogLevel;
  message: string;
}

export class EventLog {
  static readonly logLevels = [
    'debug',
    'info',
    'warn',
    'error',
  ] as const;

  private _events: Event[] = [];

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

    return EventLog.logLevels.indexOf(a) - EventLog.logLevels.indexOf(b);
  }

  /**
   * @description Merge multiple `EventLog` objects into one
   */
  static merge(eventLogs: EventLog[]): EventLog {
    const mergedEventLog = new EventLog();
    eventLogs.forEach(eventLog => {
      mergedEventLog.addEvents(eventLog.getEvents());
    });
    return mergedEventLog;
  }

  private static formatEventMessage(event: Event): string {
    return `${capitalizeFirstWord(event.level)}: ${event.message}`;
  }

  get events(): Record<LogLevel, Event[]> {
    return {
      error: this.getEvents('error'),
      warn: this.getEvents('warn'),
      info: this.getEvents('info'),
      debug: this.getEvents('debug'),
    };
  }

  get highestLevel(): LogLevel | undefined {
    if (!this._events.length) {
      return undefined;
    }

    return this._events
      .sort((a, b) => EventLog.compareLevels(a.level, b.level))
      .reverse()[0].level;
  }

  get messages(): Record<LogLevel, string[]> {
    return {
      error: this.getMessages('error', { omitLevel: true }),
      warn: this.getMessages('warn', { omitLevel: true }),
      info: this.getMessages('info', { omitLevel: true }),
      debug: this.getMessages('debug', { omitLevel: true }),
    };
  }

  get ok(): boolean {
    const { highestLevel } = this;
    return highestLevel === undefined || (EventLog.compareLevels(highestLevel, 'error') < 0);
  }

  addEvent(level: LogLevel, message: string, options: AddEventOptions = {}): Event {
    const { id, data } = options;

    const event = {
      level,
      message,
      ...omitUndefined({ id, data }),
    };
    this._events.push(event);

    return event;
  }

  /**
   * @description Append the events from one or more EventLog instances to this one and return this one
   */
  append(...eventLogs: EventLog[]): EventLog {
    eventLogs.forEach(eventLog => {
      this._events.push(...eventLog.getEvents());
    });
    return this;
  }

  debug(message: string, options: AddEventOptions = {}): EventLog {
    this.addEvent('debug', message, options);
    return this;
  }

  error(message: string, options: AddEventOptions = {}): EventLog {
    this.addEvent('error', message, options);
    return this;
  }

  filterEvents(params: FilterEventsParams): Event[] {
    const { minLevel, maxLevel } = params;

    return this._events.filter(event => (
      (
        isUndefined(minLevel)
        || EventLog.logLevels.indexOf(event.level) >= EventLog.logLevels.indexOf(minLevel)
      ) && (
        isUndefined(maxLevel)
        || EventLog.logLevels.indexOf(event.level) <= EventLog.logLevels.indexOf(maxLevel))
    ));
  }

  filterMessages(params: FilterEventsParams, options: EventMessageOptions = {}): string[] {
    const { omitLevel = false } = options;
    return this.filterEvents(params)
      .map(event => omitLevel ? event.message : EventLog.formatEventMessage(event));
  }

  getEvents(): Array<Event>;
  getEvents<L extends LogLevel>(level: L): Array<Event & { level: L }>;
  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  getEvents(level?: LogLevel | undefined) {
    if (level === undefined) {
      return this._events;
    }
    return this._events.filter(message => message.level === level);
  }

  getMessages(level?: LogLevel, options: EventMessageOptions = {}): string[] {
    const {  omitLevel = false } = options;
    return (level === undefined ? this.getEvents() : this.getEvents(level))
      .map(event => omitLevel ? event.message : EventLog.formatEventMessage(event));
  }

  has(): boolean;
  has(level: LogLevel): boolean;
  has(level?: LogLevel): boolean {
    return (level === undefined ? this.getEvents() : this.getEvents(level)).length > 0;
  }

  info(message: string, options: AddEventOptions = {}): EventLog {
    this.addEvent('info', message, options);
    return this;
  }

  warn(message: string, options: AddEventOptions = {}): EventLog {
    this.addEvent('warn', message, options);
    return this;
  }

  private addEvents(events: Event[]): void {
    this._events.push(...events);
  }
}
