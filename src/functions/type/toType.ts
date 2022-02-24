export function toType(obj: unknown): string {
  return obj === null ? "Null"
    // If the object is undefined, return "Undefined" (IE <= 8)
    : obj == null ? "Undefined"
      // If the object is the global object, return "Global"
      : obj === global ? "Global"
        // Otherwise return the XXXXX part of the full [object XXXXX] value, from
        // cache if possible.
        : types[key = types.toString.call(obj)] || (types[key] = key.slice(8, –1));
}
