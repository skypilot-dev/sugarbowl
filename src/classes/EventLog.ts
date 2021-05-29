/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import type { Integer } from '@skypilot/common-types';

import { capitalizeFirstWord, isUndefined, mergeIf, omitUndefined } from 'src/functions';
import { isDefined } from '../functions/indefinite/isDefined';
import { isPlainObject } from '../functions/object/isPlainObject';

export interface AddEventOptions<TData = any> {
  id?: Integer | string;
  data?: TData;
  echoLevel?: EchoLevel;
  indentLevel?: Integer;
  type?: string;
}

export type EchoLevel = LogLevel | 'off';

export type EchoDetail = 'message' | 'event';

export interface Event<TData = any> {
  id?: Integer | string;
  data?: TData;
  indentLevel?: Integer;
  level: LogLevel;
  message: string;
}

export interface EventLogOptions {
  echoDetail?: EchoDetail;
  echoLevel?: EchoLevel;
  baseIndentLevel?: Integer;
  logLevel?: LogLevel;
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

  baseIndentLevel: Integer;
  defaultType?: string;
  echoDetail: 'message' | 'event';
  echoLevel: EchoLevel;
  indentLevel: Integer | undefined = undefined;

  private _events: Event[] = [];

  constructor(options: EventLogOptions = {}) {
    const { baseIndentLevel = 0, echoLevel = 'off', echoDetail = 'message', type } = options;

    this.baseIndentLevel = baseIndentLevel;
    this.echoDetail = echoDetail;
    this.echoLevel = echoLevel;

    if (isDefined(type)) {
      this.defaultType = type;
    }
  }

  static meetsThreshold(logLevel: LogLevel | undefined, threshold: EchoLevel | undefined): boolean {
    if (isUndefined(logLevel) || isUndefined(threshold) || threshold === 'off') {
      return false;
    }
    return this.compareLevels(logLevel, threshold) >= 0;
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

  // Return a positive number if a > b; a negative number if a < b, or a 0 if they are equal. Higher = more severe
  private static compareLevels(a: LogLevel, b: LogLevel): Integer {
    if (isUndefined(a)) {
      return -1;
    }

    if (a === b) {
      return 0;
    }

    return EventLog.logLevels.indexOf(a) - EventLog.logLevels.indexOf(b);
  }

  private static formatEventMessage(event: Event): string {
    return `${capitalizeFirstWord(event.level)}: ${event.message}`;
  }

  private static formatEvent(event: Event): string {
    function formatEntry(key: string, value: any, indentLevel = event.indentLevel || 0): string | string[] {
      if (isUndefined(value)) {
        return '';
      }
      if (isPlainObject(value)) {
        return [
          EventLog.indent(`${key}:`, indentLevel + 1),
          ...Object.entries(value).map(
            ([key, value]) => formatEntry(key, value, indentLevel + 1)
          ).flat(),
        ];
      }
      return EventLog.indent(
        `${key}: ${JSON.stringify(value)}`, indentLevel + 1
      );
    }
    return [
      EventLog.indent(this.formatEventMessage(event), event.indentLevel),
      formatEntry('id', event.id),
      formatEntry('data', event.data),
    ].flat().filter(Boolean).join('\n');
  }

  private static indent(text: string, indentLevel: Integer | undefined = 0): string {
    return ['  '.repeat(indentLevel || 0), text].join('');
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
    const { id, data, echoLevel = this.echoLevel, indentLevel = this.indentLevel, type = this.defaultType } = options;

    const event = {
      ...mergeIf(
        isDefined(indentLevel) || this.baseIndentLevel,
        { indentLevel: (indentLevel || 0) + this.baseIndentLevel }
      ),
      level,
      message,
      ...omitUndefined({ id, data, type }),
    };
    this._events.push(event);

    if (EventLog.meetsThreshold(level, echoLevel)) {
      if (this.echoDetail === 'event') {
        console[level](EventLog.formatEvent(event)); // TODO: Improve formatting; also allow a custom formatter
      } else {
        console[level](EventLog.formatEventMessage(event));
      }
    }

    return event;
  }

  /**
   * @description Append the events from one or more EventLog instances to this one and return this one
   */
  append(...eventLogs: EventLog[]): EventLog {
    eventLogs.forEach(eventLog => {
      eventLog.getEvents().forEach(event => {
        const { level, message, ...options } = event;
        // Echo only if the message is below the eventLog's threshold but at or above this log's threshold
        const echoLevel = this.echoDetail === 'event' && eventLog.echoDetail === 'message' || (
          !EventLog.meetsThreshold(level, eventLog.echoLevel)
            && EventLog.meetsThreshold(level, this.echoLevel)
        ) ? this.echoLevel : 'off';
        this.addEvent(level, message, { ...options, echoLevel });
      });
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
