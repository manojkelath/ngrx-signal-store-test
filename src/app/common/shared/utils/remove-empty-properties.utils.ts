export const removeEmptyProperties = (obj: { [key: string]: any }) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});
