import { dequal as dequalImpl } from 'dequal/lite'
import isObject from 'isobject'
import _omit from 'lodash.omit'

/**
 * Deeply compares two JS values, optionally omitting certain object keys.
 */
export function dequal(
  a: any,
  b: any,
  { omit }: { omit?: string[] } = {
    omit: ['createdAt', 'updatedAt']
  }
): boolean {
  if (omit && isObject(a)) {
    a = _omit(a, omit)
  }

  if (omit && isObject(b)) {
    b = _omit(b, omit)
  }

  return dequalImpl(a, b)
}
