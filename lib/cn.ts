// Tiny class-name joiner. Filters out falsy values so conditional classes read
// cleanly at call sites without pulling in an extra dependency.
export function cn(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}
