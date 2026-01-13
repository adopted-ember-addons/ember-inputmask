export function areDifferent(obj1, obj2) {
  return JSON.stringify(obj1) !== JSON.stringify(obj2);
}
