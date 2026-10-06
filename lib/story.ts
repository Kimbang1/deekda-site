// The story step whose text crosses the middle of the viewport is the active one; with none in the band keep the last.
export function pickActive(visible: readonly boolean[], previous: number): number {
  const first = visible.indexOf(true);
  return first === -1 ? previous : first;
}
