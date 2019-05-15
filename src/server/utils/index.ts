export function convertCamelCaseToSnakeCase(array: Array<string>) : Array<string> {
  return array.map(v => v.replace(/\.?([A-Z])/g, (x: string, y: string) => `_${y.toLowerCase()}`).replace(/^_/, ''));
}
