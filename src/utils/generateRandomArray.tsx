export function generateRandomArray(length: number): number[] {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * 101));
  }
  return arr;
}
