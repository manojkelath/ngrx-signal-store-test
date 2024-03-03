export const removeJWTTokenUrl = (str: string) => {
  const start = str.indexOf('?$jwt=');
  const end = str.indexOf('#');

  if (start !== -1 && end !== -1) {
    return str.substring(0, start) + str.substring(end);
  } else if (start !== -1) {
    return str.substring(0, start);
  } else return str;
};
