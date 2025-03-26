/**
 * Compares two string arrays for equality.
 * @param a - First string array or undefined.
 * @param b - Second string array or undefined.
 * @returns Boolean indicating if arrays are equal.
 */
export const areArraysEqual = (a?: string[], b?: string[]) => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
}; 