type TypePredicate<T> = (value: unknown) => value is T;

export function safeJsonParse<T>(isOfType: TypePredicate<T>) {
  return function parse(stringifiedObj: string): T | undefined {
    const parsed: unknown = JSON.parse(stringifiedObj);
    return isOfType(parsed) ? parsed : undefined;
  };
}
