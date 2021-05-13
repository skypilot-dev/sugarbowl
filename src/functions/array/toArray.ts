import { isNull, isUndefined } from 'src/functions';

export type ToArrayOptions = {
  emptyIfIndefinite?: boolean;
  emptyIfNull?: boolean;
  emptyIfUndefined?: never;
} | {
  emptyIfIndefinite?: never;
  emptyIfNull?: never;
  emptyIfUndefined?: boolean;
}

export function toArray<T>(
  value: T | ReadonlyArray<T>, options: ToArrayOptions = {}
): Array<T> {
  const { emptyIfIndefinite, emptyIfNull, emptyIfUndefined } = options;
  if (value instanceof Array) {
    return [...value];
  }
  if (value) {
    return [value];
  }
  const empty = (emptyIfIndefinite || emptyIfUndefined) && isUndefined((value))
    || (emptyIfIndefinite || emptyIfNull) && isNull((value));

  return empty ? [] : [value];
}
