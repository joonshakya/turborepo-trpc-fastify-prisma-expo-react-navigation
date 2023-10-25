export function toTitleCase(str: string) {
  // replace underscores with spaces
  return str
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (txt: string) => txt.toUpperCase());
}
