export type ArrayItems<A extends (Array<any> | ReadonlyArray<any>)> =
  A extends Array<infer Item> ? Item :
    A extends ReadonlyArray<infer Item> ? Item :
      never;
