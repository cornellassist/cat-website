export function convertDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US");
}
