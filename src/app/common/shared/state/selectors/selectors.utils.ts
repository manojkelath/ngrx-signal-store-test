import { EntityStateModel } from '@shared/entity-state/models';

export const getOrderedItemsFromState = <TListItem>(state: EntityStateModel<TListItem> | undefined): TListItem[] =>
  (state?.order ?? []).map((key) => state.items[key]);
