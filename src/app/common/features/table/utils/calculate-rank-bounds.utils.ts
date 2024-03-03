export const calculateRankBounds = (currentPage: number, currentSize: number, amountElement: number) => {
  const showItemStart = currentSize * currentPage - currentSize + 1;
  const showItemEnd = currentSize * currentPage > amountElement ? amountElement : currentSize * currentPage;

  return [showItemStart, showItemEnd];
};
