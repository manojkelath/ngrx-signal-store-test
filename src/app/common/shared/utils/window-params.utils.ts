import { RouteQueryParamsEnum } from '@shared/enums';

export const getQueryParamsFromWindow = (key: RouteQueryParamsEnum) =>
  new URLSearchParams(window.location.search).get(key);

export const getHashQueryParamsFromWindow = (key: RouteQueryParamsEnum) => {
  const hashParamsSubstring = window.location.hash.substring(1);
  const paramsStartIndex = hashParamsSubstring.indexOf('?');
  const paramsEndIndex = hashParamsSubstring.indexOf('#');

  return new URLSearchParams(
    hashParamsSubstring.slice(
      paramsStartIndex,
      paramsEndIndex > paramsStartIndex ? paramsEndIndex : hashParamsSubstring.length
    )
  ).get(key);
};

export const removeQueryAndHashQueryParamsFromWindow = (url: string, key: RouteQueryParamsEnum) => {
  const urlObj = new URL(url);
  const hashParamsSubstring = urlObj.hash.substring(1);
  const paramsStartIndex = hashParamsSubstring.indexOf('?');
  const paramsEndIndex = hashParamsSubstring.indexOf('#');

  const searchParams = new URLSearchParams(urlObj.search);
  const hashParams = new URLSearchParams(
    hashParamsSubstring.slice(
      paramsStartIndex,
      paramsEndIndex > paramsStartIndex ? paramsEndIndex : hashParamsSubstring.length
    )
  );

  searchParams.delete(key);
  hashParams.delete(key);

  urlObj.search = searchParams.toString();
  urlObj.hash =
    hashParamsSubstring.slice(0, paramsStartIndex) +
    (hashParams.toString()?.length ? `?${hashParams.toString()}` : '') +
    (paramsEndIndex > 0 ? hashParamsSubstring.slice(paramsEndIndex) : '');

  return urlObj.toString();
};

export const removeQueryParamsFromWindow = (url: string, key: RouteQueryParamsEnum) => {
  const urlObj = new URL(url);
  const searchParams = new URLSearchParams(urlObj.search);

  searchParams.delete(key);
  urlObj.search = searchParams.toString();

  return urlObj.toString();
};
