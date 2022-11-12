export function groupBy<T>(
  array: Iterable<T>,
  keySelector: (item: T) => string
): Map<string, T[]> {
  return Array.from(array).reduce((map: Map<string, T[]>, item: T) => {
    const key = keySelector(item);
    if (map.has(key)) {
      map.set(key, [...map.get(key)!, item]);
    } else {
      map.set(key, [item]);
    }

    return map;
  }, new Map<string, T[]>());
}
