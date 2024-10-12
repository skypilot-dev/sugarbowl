export type ArrayItems<A extends (Array<unknown> | ReadonlyArray<unknown>)> = A extends Array<infer Item> ? Item
  : A extends ReadonlyArray<infer Item> ? Item
  : never;
