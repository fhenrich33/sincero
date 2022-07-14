/**
 * Get an key from first entry on an object.
 */
export const getKey = (obj: Record<any, any>) => Object.keys(obj)[0]

/**
 * Get a value from first entry on an object.
 */
export function getVal<T>(obj: Record<any, T>): T {
  return Object.values(obj)[0]
}
