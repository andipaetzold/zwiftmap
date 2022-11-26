export function isSaveDataMode(): boolean {
  return (
    "connection" in navigator &&
    // @ts-expect-error still experimental
    navigator.connection.saveData === true
  );
}
