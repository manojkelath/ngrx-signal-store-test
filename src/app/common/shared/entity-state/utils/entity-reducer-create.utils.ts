import { Action, ActionCreator, createReducer, ReducerTypes } from '@ngrx/store';
import Rprop from 'ramda/es/prop';

import { ActionCreatorsType, EntityStateModel } from '@shared/entity-state/models';

import {
  addAppendActions,
  addCreateItemActions,
  addDeleteItemActions,
  addItemOnStartActions,
  addOverrideActions,
  addReplaceFromIndexActions,
  addReplaceItemActions,
  addResetActions,
  addUpsertItemActions,
} from './entity-reducer.utils';

export interface CreateEntityReducerConfig<TItem> {
  overrideActions?: ActionCreatorsType<{ items: TItem[] }>;
  appendActions?: ActionCreatorsType<{ items: TItem[] }>;
  replaceFromIndexActions?: ActionCreatorsType<{ items: TItem[]; startIndex: number }>;
  resetActions?: ActionCreatorsType<unknown>;
  createActions?: ActionCreatorsType<{ item: TItem }>;
  addItemOnStartActions?: ActionCreatorsType<{ item: TItem }>;
  replaceActions?: ActionCreatorsType<{ item: TItem }>;
  deleteActions?: ActionCreatorsType<{ key: string }>;
  upsertActions?: ActionCreatorsType<{ item: TItem }>;
}

const createByConfig = <TConfigValue, TResult>(
  configValue: TConfigValue,
  createFn: (config: TConfigValue) => TResult
): TResult[] => (configValue ? [createFn(configValue)] : []);

export const createEntityReducer = <TItem, TState extends EntityStateModel<TItem>>(
  defaultState: TState,
  keyFn: (item: TItem) => string,
  config: CreateEntityReducerConfig<TItem>,
  ...additionalHandlers: ReducerTypes<TState, ActionCreator<string>[]>[]
) =>
  createReducer<TState, Action>(
    defaultState,
    ...createByConfig(config.overrideActions, (actions) =>
      addOverrideActions<{ items: TItem[] }, TItem, TState>(actions, ({ items }) => items, keyFn)
    ),
    ...createByConfig(config.appendActions, (actions) =>
      addAppendActions<{ items: TItem[] }, TItem, TState>(actions, ({ items }) => items, keyFn)
    ),
    ...createByConfig(config.replaceFromIndexActions, (actions) =>
      addReplaceFromIndexActions<{ items: TItem[]; startIndex: number }, TItem, TState>(
        actions,
        ({ items }) => items,
        ({ startIndex }) => startIndex,
        keyFn
      )
    ),
    ...createByConfig(config.resetActions, (actions) =>
      addResetActions<{ items: TItem[] }, TItem, TState>(actions, defaultState)
    ),
    ...createByConfig(config.createActions, (actions) =>
      addCreateItemActions<{ item: TItem }, TItem, TState>(actions, ({ item }) => item, keyFn)
    ),
    ...createByConfig(config.addItemOnStartActions, (actions) =>
      addItemOnStartActions<{ item: TItem }, TItem, TState>(actions, ({ item }) => item, keyFn)
    ),
    ...createByConfig(config.replaceActions, (actions) =>
      addReplaceItemActions<{ item: TItem }, TItem, TState>(actions, ({ item }) => item, keyFn)
    ),
    ...createByConfig(config.deleteActions, (actions) =>
      addDeleteItemActions<{ key: string }, TItem, TState>(actions, ({ key }) => key)
    ),
    ...createByConfig(config.upsertActions, (actions) =>
      addUpsertItemActions<{ item: TItem }, TItem, TState>(actions, ({ item }) => item, keyFn)
    ),
    ...(additionalHandlers ? additionalHandlers : [])
  );

export const createEntityReducerWithProp = <TItem, TState extends EntityStateModel<TItem>>(
  defaultState: TState,
  prop: keyof TItem,
  config: CreateEntityReducerConfig<TItem>,
  ...additionalHandlers: ReducerTypes<TState, ActionCreator<string>[]>[]
) => createEntityReducer(defaultState, Rprop(prop), config, ...additionalHandlers);

export const createEntityReducerWithId = <TItem extends { id: string }, TState extends EntityStateModel<TItem>>(
  defaultState: TState,
  config: CreateEntityReducerConfig<TItem>,
  ...additionalHandlers: ReducerTypes<TState, ActionCreator<string>[]>[]
) => createEntityReducerWithProp(defaultState, 'id', config, ...additionalHandlers);
