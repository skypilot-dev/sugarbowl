export class LooseMap<K extends Exclude<object, null>, V> {
  private map: Map<string, V>;

  constructor(entries: [K, V][] = []) {
    this.map = new Map(entries.map(([key, value]) => [this.serialize(key), value]));
  }

  get size(): number {
    return this.map.size;
  }

  clear(): void {
    this.map.clear();
  }

  delete(key: K): boolean {
    return this.map.delete(this.serialize(key));
  }

  get(key: K): V | undefined {
    return this.map.get(this.serialize(key));
  }

  has(key: K): boolean {
    return this.map.has(this.serialize(key));
  }

  set(key: K, value: V): this {
    this.map.set(this.serialize(key), value);
    return this;
  }

  // private deserialize(key: string): K {
  //   return JSON.parse(key) as K;
  // }

  private shallowSort(key: K): K {
    return Object.fromEntries(
      Object.entries(key).sort((a, b) => a[0].localeCompare(b[0]))
    ) as K;
  }

  private serialize(key: K): string {
    return JSON.stringify(this.shallowSort(key));
  }
}
