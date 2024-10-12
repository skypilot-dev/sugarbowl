/* eslint-disable @typescript-eslint/no-explicit-any */

import { EventEmitter } from 'node:events';

import type { ArrayItems, Integer } from './lib.types.js';

export type EventDict = Record<string, any>;
type EventKey<TEventDict extends EventDict> = string & keyof TEventDict;
type EventReceiver<TParams> = (params: TParams) => void;
export type EventExamplesDict = Record<string, Array<any> | ReadonlyArray<any>>;

type EventDictFromExamples<TEventMap extends EventExamplesDict> = Record<
  keyof TEventMap,
  ArrayItems<TEventMap[keyof TEventMap]>
>;

// TODO: Expand interface to support other properties and methods of `EventEmitter`
/**
 */
export interface Emitter<TEventDict extends EventDict> {
  emit<TEventKey extends EventKey<TEventDict>>(eventName: TEventKey, params: TEventDict[TEventKey]): void;

  listenerCount<TEventKey extends EventKey<TEventDict>>(eventName: TEventKey): Integer;

  off<TEventKey extends EventKey<TEventDict>>(eventName: TEventKey, fn: EventReceiver<TEventDict[TEventKey]>): void;

  on<TEventKey extends EventKey<TEventDict>>(eventName: TEventKey, fn: EventReceiver<TEventDict[TEventKey]>): void;
}

/**
 * Returns an EventEmitter with type-safe events
 * Source: `skypilot-dev/sugarbowl`
 */
export function createEmitter<TEventExamplesDict extends EventExamplesDict>(
  eventMap: TEventExamplesDict
): Emitter<EventDictFromExamples<TEventExamplesDict>>;
export function createEmitter<TEventDict extends EventDict>(): Emitter<TEventDict>;
export function createEmitter<T extends EventDict | EventExamplesDict>(
  _eventMap?: T
): Emitter<T> | Emitter<EventDictFromExamples<T>> {
  return new EventEmitter();
}
