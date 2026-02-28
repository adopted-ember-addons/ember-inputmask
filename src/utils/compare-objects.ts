export function areDifferent(obj1: object, obj2: object) {
  return JSON.stringify(obj1) !== JSON.stringify(obj2);
}
