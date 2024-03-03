export const dateFormatter = (value: number) => (value && value <= 9 ? `0${value}` : value);

export const addDaysToDate = (numberOfDays: number, data: Date = new Date()): Date =>
  new Date(data.getFullYear(), data.getMonth(), data.getDate() + numberOfDays);

export const startOfDay = (date: Date) =>
  new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0));

export const isExpiredDate = (date: string) => (date ? new Date(date).getTime() < new Date().getTime() : false);

export const getUTCStartOfDay = (date: Date) =>
  `${date.getFullYear()}-${dateFormatter(date.getMonth() + 1)}-${dateFormatter(date.getDate())}T00:00:00.000Z`;
