export interface EntityStateModel<T> {
  items: Record<string, T>;
  order: string[];
}
