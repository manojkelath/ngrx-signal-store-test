export const mapDynamicToOptions = (items) =>
  (items ?? []).map((item) => ({
    key: item.code,
    value: item.description,
  }));
