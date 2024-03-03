import { calculatePageNumber } from './calculate-page-number.utils';

export const createPageRange = (
  currentPage: number,
  pageSize: number,
  length: number,
  maxSymbols: number = 7
): any[] => {
  const pages: any[] = [];

  const totalPages = Math.ceil(length / pageSize);
  const halfWay = Math.ceil(maxSymbols / 2);

  const isStart = currentPage <= halfWay;
  const isEnd = totalPages - halfWay < currentPage;
  const isMiddle = !isStart && !isEnd;

  const isEllipsisNeeded = maxSymbols < totalPages;

  for (let symbolPosition = 1; symbolPosition <= totalPages && symbolPosition <= maxSymbols; symbolPosition++) {
    const pageNumber = calculatePageNumber(symbolPosition, currentPage, maxSymbols, totalPages);
    const openingEllipsesNeeded = symbolPosition === 2 && (isMiddle || isEnd);
    const closingEllipsesNeeded = symbolPosition === maxSymbols - 1 && (isMiddle || isStart);

    const label =
      maxSymbols > 5 && isEllipsisNeeded && (openingEllipsesNeeded || closingEllipsesNeeded) ? '...' : `${pageNumber}`;

    pages.push({ label, value: pageNumber });
  }

  return pages;
};
