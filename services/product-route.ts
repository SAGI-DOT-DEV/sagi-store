// Route values can retain URL escaping. Decode once before building the API query.
export function decodeProductRoute(value: string): string {
  try { return decodeURIComponent(value); }
  catch { return value; }
}
