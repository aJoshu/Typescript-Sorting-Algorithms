export function getColorForNumber(number: number): string {
  const colorScale = ["#3182ce", "#2c7a7b", "#90be6d", "#f6e05e", "#f9c74f"];
  const valueScale = [0, 25, 50, 75, 100];
  const index = Math.round((number / 100) * (valueScale.length - 1));
  return colorScale[index];
}
