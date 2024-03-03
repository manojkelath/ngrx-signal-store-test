import Romit from 'ramda/es/omit';
import Rprop from 'ramda/es/prop';

import { EntityStateModel } from '@shared/entity-state/models';

export const sameStateOrDefault = <TListItem, TState extends EntityStateModel<TListItem>>(state: TState): TState =>
  (state
    ? state
    : {
        items: {},
        order: [],
      }) as TState;

export const createEntityState = <TListItem, TState extends EntityStateModel<TListItem>>(
  arr: TListItem[],
  keyFn: (item: TListItem) => string,
  currentState: TState | undefined = undefined
): TState => ({
  ...currentState,
  ...(arr ?? []).reduce(
    (state, item) => {
      const key = keyFn(item);
      state.items[key] = item;
      state.order.push(key);

      return state;
    },
    {
      items: {},
      order: [],
    } as EntityStateModel<TListItem>
  ),
});

export const createEntityStateByProp = <TListItem, TState extends EntityStateModel<TListItem>>(
  arr: TListItem[],
  keyProp: keyof TListItem,
  currentState: TState | undefined = undefined
): TState => createEntityState(arr, Rprop(keyProp), currentState);

export const createEntityStateById = <TListItem extends { id: string }, TState extends EntityStateModel<TListItem>>(
  arr: TListItem[],
  currentState: TState | undefined = undefined
): TState => createEntityStateByProp(arr, 'id', currentState);

export const addEntities = <TListItem, TState extends EntityStateModel<TListItem>>(
  arr: TListItem[],
  keyFn: (item: TListItem) => string,
  currentState: TState | undefined = undefined
): TState => {
  const newItemsState = createEntityState(arr, keyFn);

  return {
    ...currentState,
    items: {
      ...currentState?.items,
      ...newItemsState.items,
    },
    order: [...(currentState?.order ?? []), ...newItemsState.order],
  };
};

export const addEntitiesByProp = <TListItem, TState extends EntityStateModel<TListItem>>(
  arr: TListItem[],
  keyProp: keyof TListItem,
  currentState: TState | undefined = undefined
): TState => addEntities(arr, Rprop(keyProp), currentState);

export const addEntitiesById = <TListItem extends { id: string }, TState extends EntityStateModel<TListItem>>(
  arr: TListItem[],
  currentState: TState | undefined = undefined
): TState => addEntitiesByProp(arr, 'id', currentState);

export const addEntitiesOnStart = <TListItem, TState extends EntityStateModel<TListItem>>(
  arr: TListItem[],
  keyFn: (item: TListItem) => string,
  currentState: TState | undefined = undefined
): TState => {
  const newItemsState = createEntityState(arr, keyFn);

  return {
    ...currentState,
    items: {
      ...currentState?.items,
      ...newItemsState.items,
    },
    order: [...newItemsState.order, ...(currentState?.order ?? [])],
  };
};

export const addEntity = <TListItem, TState extends EntityStateModel<TListItem>>(
  item: TListItem,
  keyFn: (item: TListItem) => string,
  currentState: TState | undefined = undefined
): TState => addEntities([item], keyFn, currentState);

export const addEntityByProp = <TListItem, TState extends EntityStateModel<TListItem>>(
  item: TListItem,
  keyProp: keyof TListItem,
  currentState: TState | undefined = undefined
): TState => addEntity(item, Rprop(keyProp), currentState);

export const addEntityById = <TListItem extends { id: string }, TState extends EntityStateModel<TListItem>>(
  item: TListItem,
  currentState: TState | undefined = undefined
): TState => addEntityByProp(item, 'id', currentState);

export const addEntityOnStart = <TListItem, TState extends EntityStateModel<TListItem>>(
  item: TListItem,
  keyFn: (item: TListItem) => string,
  currentState: TState | undefined = undefined
): TState => addEntitiesOnStart([item], keyFn, currentState);

export const replaceEntity = <TListItem, TState extends EntityStateModel<TListItem>>(
  item: TListItem,
  keyFn: (item: TListItem) => string,
  currentState: TState | undefined = undefined
): TState => {
  const key = keyFn(item);
  const existingItem = currentState?.items[key];

  return existingItem
    ? {
        ...currentState,
        items: {
          ...currentState.items,
          [key]: item,
        },
      }
    : sameStateOrDefault(currentState);
};

export const replaceEntityByProp = <TListItem, TState extends EntityStateModel<TListItem>>(
  item: TListItem,
  keyProp: keyof TListItem,
  currentState: TState | undefined = undefined
): TState => replaceEntity(item, Rprop(keyProp), currentState);

export const replaceEntityById = <TListItem extends { id: string }, TState extends EntityStateModel<TListItem>>(
  item: TListItem,
  currentState: TState | undefined = undefined
): TState => replaceEntityByProp(item, 'id', currentState);

export const deleteEntity = <TListItem, TState extends EntityStateModel<TListItem>>(
  key: string,
  currentState: TState | undefined = undefined
): TState =>
  currentState
    ? {
        ...currentState,
        items: Romit([key])(currentState.items),
        order: currentState.order.filter((orderKey) => orderKey !== key),
      }
    : sameStateOrDefault(currentState);

export const upsertEntity = <TListItem, TState extends EntityStateModel<TListItem>>(
  item: TListItem,
  keyFn: (item: TListItem) => string,
  currentState: TState | undefined = undefined
): TState =>
  currentState?.[keyFn(item)] ? replaceEntity(item, keyFn, currentState) : addEntity(item, keyFn, currentState);

export const upsertEntityByProp = <TListItem, TState extends EntityStateModel<TListItem>>(
  item: TListItem,
  keyProp: keyof TListItem,
  currentState: TState | undefined = undefined
): TState => upsertEntity(item, Rprop(keyProp), currentState);

export const upsertEntityById = <TListItem extends { id: string }, TState extends EntityStateModel<TListItem>>(
  item: TListItem,
  currentState: TState | undefined = undefined
): TState => upsertEntityByProp(item, 'id', currentState);

export const replaceEntitiesFromIndex = <TListItem, TState extends EntityStateModel<TListItem>>(
  newItems: TListItem[],
  startIndex: number,
  keyFn: (item: TListItem) => string,
  currentState: TState | undefined = undefined
): TState => {
  if (!newItems?.length) {
    return currentState;
  }

  const newItemsState = createEntityState(newItems, keyFn);
  const currentOrder = currentState?.order ?? [];

  return {
    ...currentState,
    items: {
      ...currentState?.items,
      ...newItemsState.items,
    },
    order: [
      ...currentOrder.slice(0, Math.min(startIndex, currentOrder.length)),
      ...new Array(Math.max(startIndex - currentOrder.length, 0)),
      ...newItemsState.order,
      ...currentOrder.slice(
        Math.min(currentOrder.length, startIndex + newItemsState.order.length),
        currentOrder.length
      ),
    ],
  };
};

export const replaceEntitiesFromIndexByProp = <TListItem, TState extends EntityStateModel<TListItem>>(
  newItems: TListItem[],
  startIndex: number,
  keyProp: keyof TListItem,
  currentState: TState | undefined = undefined
): TState => replaceEntitiesFromIndex(newItems, startIndex, Rprop(keyProp), currentState);

export const replaceEntitiesFromIndexById = <
  TListItem extends { id: string },
  TState extends EntityStateModel<TListItem>
>(
  newItems: TListItem[],
  startIndex: number,
  currentState: TState | undefined = undefined
): TState => replaceEntitiesFromIndexByProp(newItems, startIndex, 'id', currentState);

export const partialUpdateEntity = <TListItem, TState extends EntityStateModel<TListItem>>(
  matchFn: () => string,
  updateFn: (existingItem: TListItem) => Partial<TListItem>,
  currentState: TState | undefined = undefined
): TState => {
  const key = matchFn();
  const existingItem = currentState?.items[key];

  return existingItem
    ? {
        ...currentState,
        items: {
          ...currentState.items,
          [key]: {
            ...existingItem,
            ...updateFn(existingItem),
          },
        },
      }
    : sameStateOrDefault(currentState);
};
