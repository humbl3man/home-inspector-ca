export function mergeClasses<T extends { [s: string]: unknown }>(
  classObj: T
): string {
  const merged = Object.keys(classObj).filter((key: string) => {
    return Boolean(classObj[key]);
  });

  return merged.join(' ').trimEnd();
}
