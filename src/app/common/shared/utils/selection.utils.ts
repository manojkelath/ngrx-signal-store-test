export const getSelectedIds = (items: Record<string, boolean>): string[] =>
  Object.keys(items).filter((key) => items[key]);
