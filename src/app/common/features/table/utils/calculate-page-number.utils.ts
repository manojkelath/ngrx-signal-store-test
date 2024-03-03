export const calculatePageNumber = (
  symbolPosition: number,
  currentPage: number,
  maxSymbols: number,
  totalPages: number
) => {
  const halfWay = Math.ceil(maxSymbols / 2);

  if (symbolPosition === maxSymbols) {
    return totalPages;
  }

  if (symbolPosition === 1) {
    return 1;
  }

  if (maxSymbols < totalPages) {
    if (totalPages - halfWay < currentPage) {
      return totalPages - maxSymbols + symbolPosition;
    }

    if (halfWay < currentPage) {
      return currentPage - halfWay + symbolPosition;
    }
  }

  return symbolPosition;
};
