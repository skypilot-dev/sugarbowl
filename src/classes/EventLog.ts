/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import type { Integer } from '@skypilot/common-types';

import { capitalizeFirstWord, isNull, isUndefined, omitUndefined } from 'src/functions';
import { isDefined } from '../functions/indefinite/isDefined';

export interface AddEventOptions<TData = any> {
  id?: Integer | string;
  data?: TData;
  type?: string;
}

export interface EchoOptions {
  event?: boolean;
  message?: boolean;
  minLevel?: LogLevel;
}

export interface Event<TData = any> {
  id?: Integer | string;
  data?: TData;
  level: LogLevel;
  message: string;
}

export interface EventLogOptions {
  echo?: EchoOptions;
  type?: string; // default type to assign to new events
}

export interface EventMessageOptions {
  omitLevel?: boolean; // if true, don't prepend the level to the message
}

export interface FilterEventsParams {
  maxLevel?: LogLevel;
  minLevel?: LogLevel;
}

export type LogLevel = typeof EventLog.logLevels[number];

export class EventLog {
  static readonly logLevels = [
    'debug',
    'info',
    'warn',
    'error',
  ] as const;

  defaultType?: string;
  echoOptions: EchoOptions;

  private _events: Event[] = [];

  constructor(options: EventLogOptions = {}) {
    const { echo = {}, type } = options;
    const { event = false, message = false, minLevel = 'error' } = echo;
    this.echoOptions = { event, message, minLevel };

    if (isDefined(type)) {
      this.defaultType = type;
    }
  }

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

  get count(): Integer {
    return this._events.length;
  }

  get events(): Record<LogLevel, Event[]> {
    return {
      error: this.getEvents('error'),
      warn: this.getEvents('warn'),
      info: this.getEvents('info'),
      debug: this.getEvents('debug'),
    };
  }

  get hasEvents(): boolean {
    return this._events.length > 0;
  }

  get highestLevel(): LogLevel | undefined {
    if (!this._events.length) {
      return undefined;
    }

    return this._events
      .sort((a, b) => EventLog.compareLevels(a.level, b.level))
      .reverse()[0].level;
  }

  get messages(): Record<Exclude<LogLevel, 'off'>, string[]> {
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

  addEvent<TData>(level: LogLevel, message: string, options: AddEventOptions<TData> = {}): Event {
    const { id, data, type = this.defaultType } = options;

    const event = {
      level,
      message,
      ...omitUndefined({ id, data, type }),
    };
    this._events.push(event);

    if (EventLog.compareLevels(level, this.echoOptions.minLevel) >= 0) {
      if (this.echoOptions.message) {
        console[level](message);
      }
      if (this.echoOptions.event) {
        console[level](event);
      }
    }

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

  debug<TData>(message: string, options: AddEventOptions<TData> = {}): EventLog {
    this.addEvent('debug', message, options);
    return this;
  }

  error<TData>(message: string, options: AddEventOptions<TData> = {}): EventLog {
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

  getEvents<TData>(): Array<Event<TData>>;
  getEvents<TData, L extends LogLevel>(level: L): Array<Event<TData> & { level: L }>;
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

  info<TData>(message: string, options: AddEventOptions<TData> = {}): EventLog {
    this.addEvent<TData>('info', message, options);
    return this;
  }

  warn<TData>(message: string, options: AddEventOptions<TData> = {}): EventLog {
    this.addEvent('warn', message, options);
    return this;
  }

  private addEvents(events: Event[]): void {
    this._events.push(...events);
  }
}
