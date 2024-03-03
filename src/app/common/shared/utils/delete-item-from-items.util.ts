import Romit from 'ramda/es/omit';

export const deleteItemFromItems = <T>(items: { [id: string]: T }, removeId: string): { [id: string]: T } =>
  Romit([removeId])(items);
