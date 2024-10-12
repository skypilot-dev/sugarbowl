export const TypedObject = {
  entries: getObjectEntries,
  fromEntries,
};

function getObjectEntries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

function fromEntries<T extends [PropertyKey, unknown][]>(entries: T): KeyValueTupleToObject<T> {
  return Object.fromEntries(entries) as KeyValueTupleToObject<T>;
}

type KeyValueTupleToObject<T extends [PropertyKey, unknown][]> = {
  [K in T[number][0]]: Extract<T[number], [K, unknown]>[1];
};

interface Person {
  name: string;
}
const p: Person = { name: 'John' };
const p2: Person = TypedObject.fromEntries(TypedObject.entries(p));
console.info(p2);
