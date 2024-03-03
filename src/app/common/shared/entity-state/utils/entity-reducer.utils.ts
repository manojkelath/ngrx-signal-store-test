import { ActionCreator, on } from '@ngrx/store';
import Rprop from 'ramda/es/prop';

import {
  ActionCreatorsType,
  ActionCreatorType,
  ActionToItemFunctionType,
  ActionToListFunctionType,
  EntityKeyFunction,
  EntityStateModel,
} from '@shared/entity-state/models';

import {
  addEntities,
  addEntity,
  addEntityOnStart,
  createEntityState,
  deleteEntity,
  partialUpdateEntity,
  replaceEntitiesFromIndex,
  replaceEntity,
  upsertEntity,
} from './entity.utils';

const getListArg = <T>(actions: T | T[]) => (Array.isArray(actions) ? actions : [actions]);

/* Create new state from list of items */
export const addOverrideActions = <TActionProps, TListItem, TState extends EntityStateModel<TListItem>>(
  actions: ActionCreatorsType<TActionProps>,
  getListFn: ActionToListFunctionType<TActionProps, TListItem>,
  keyFn: EntityKeyFunction<TListItem>
) =>
  on<TState, ActionCreatorType<TActionProps>[]>(...getListArg(actions), (_, action) =>
    createEntityState(getListFn(action), keyFn)
  );

export const addOverrideActionsByProp = <TActionProps, TListItem, TState extends EntityStateModel<TListItem>>(
  actions: ActionCreatorsType<TActionProps>,
  getListFn: ActionToListFunctionType<TActionProps, TListItem>,
  prop: keyof TListItem
) => addOverrideActions<TActionProps, TListItem, TState>(actions, getListFn, Rprop(prop));

export const addOverrideActionsById = <
  TActionProps,
  TListItem extends { id: string },
  TState extends EntityStateModel<TListItem>
>(
  actions: ActionCreatorsType<TActionProps>,
  getListFn: ActionToListFunctionType<TActionProps, TListItem>
) => addOverrideActionsByProp<TActionProps, TListItem, TState>(actions, getListFn, 'id');

/* Add items from list to state */

export const addAppendActions = <TActionProps, TListItem, TState extends EntityStateModel<TListItem>>(
  actions: ActionCreatorsType<TActionProps>,
  getListFn: ActionToListFunctionType<TActionProps, TListItem>,
  keyFn: EntityKeyFunction<TListItem>
) =>
  on<TState, ActionCreatorType<TActionProps>[]>(...getListArg(actions), (state, action) =>
    addEntities(getListFn(action), keyFn, state)
  );

export const addAppendActionsByProp = <TActionProps, TListItem, TState extends EntityStateModel<TListItem>>(
  actions: ActionCreatorsType<TActionProps>,
  getListFn: ActionToListFunctionType<TActionProps, TListItem>,
  prop: keyof TListItem
) => addAppendActions<TActionProps, TListItem, TState>(actions, getListFn, Rprop(prop));

export const addAppendActionsById = <
  TActionProps,
  TListItem extends { id: string },
  TState extends EntityStateModel<TListItem>
>(
  actions: ActionCreatorsType<TActionProps>,
  getListFn: ActionToListFunctionType<TActionProps, TListItem>
) => addAppendActionsByProp<TActionProps, TListItem, TState>(actions, getListFn, 'id');

/* Replace items in state  from start index*/

export const addReplaceFromIndexActions = <TActionProps, TListItem, TState extends EntityStateModel<TListItem>>(
  actions: ActionCreatorsType<TActionProps>,
  getListFn: ActionToListFunctionType<TActionProps, TListItem>,
  getStartIndexFn: (action: TActionProps) => number,
  keyFn: EntityKeyFunction<TListItem>
) =>
  on<TState, ActionCreatorType<TActionProps>[]>(...getListArg(actions), (state, action) =>
    replaceEntitiesFromIndex(getListFn(action), getStartIndexFn(action), keyFn, state)
  );

export const addReplaceFromIndexActionsByProp = <TActionProps, TListItem, TState extends EntityStateModel<TListItem>>(
  actions: ActionCreatorsType<TActionProps>,
  getListFn: ActionToListFunctionType<TActionProps, TListItem>,
  getStartIndexFn: (action: TActionProps) => number,
  prop: keyof TListItem
) => addReplaceFromIndexActions<TActionProps, TListItem, TState>(actions, getListFn, getStartIndexFn, Rprop(prop));

export const addReplaceFromIndexActionsById = <
  TActionProps,
  TListItem extends { id: string },
  TState extends EntityStateModel<TListItem>
>(
  actions: ActionCreatorsType<TActionProps>,
  getListFn: ActionToListFunctionType<TActionProps, TListItem>,
  getStartIndexFn: (action: TActionProps) => number
) => addReplaceFromIndexActionsByProp<TActionProps, TListItem, TState>(actions, getListFn, getStartIndexFn, 'id');

/* Return default provided state */

export const addResetActions = <TActionProps, TListItem, TState extends EntityStateModel<TListItem>>(
  actions: ActionCreatorsType<TActionProps> | ActionCreator<string> | ActionCreator<string>[],
  state: TState
) => on<TState, ActionCreator<string>[]>(...getListArg(actions), () => state as any);

/* Add items to state */

export const addCreateItemActions = <TActionProps, TListItem, TState extends EntityStateModel<TListItem>>(
  actions: ActionCreatorsType<TActionProps>,
  getItemFn: ActionToItemFunctionType<TActionProps, TListItem>,
  keyFn: EntityKeyFunction<TListItem>
) =>
  on<TState, ActionCreatorType<TActionProps>[]>(...getListArg(actions), (state, action) =>
    addEntity(getItemFn(action), keyFn, state)
  );

export const addItemOnStartActions = <TActionProps, TListItem, TState extends EntityStateModel<TListItem>>(
  actions: ActionCreatorsType<TActionProps>,
  getItemFn: ActionToItemFunctionType<TActionProps, TListItem>,
  keyFn: EntityKeyFunction<TListItem>
) =>
  on<TState, ActionCreatorType<TActionProps>[]>(...getListArg(actions), (state, action) =>
    addEntityOnStart(getItemFn(action), keyFn, state)
  );

export const addCreateItemActionsByProp = <TActionProps, TListItem, TState extends EntityStateModel<TListItem>>(
  actions: ActionCreatorsType<TActionProps>,
  getItemFn: ActionToItemFunctionType<TActionProps, TListItem>,
  prop: keyof TListItem
) => addCreateItemActions<TActionProps, TListItem, TState>(actions, getItemFn, Rprop(prop));

export const addCreateItemActionsById = <
  TActionProps,
  TListItem extends { id: string },
  TState extends EntityStateModel<TListItem>
>(
  actions: ActionCreatorsType<TActionProps>,
  getItemFn: ActionToItemFunctionType<TActionProps, TListItem>
) => addCreateItemActionsByProp<TActionProps, TListItem, TState>(actions, getItemFn, 'id');

/* Replace existing item in state */

export const addReplaceItemActions = <TActionProps, TListItem, TState extends EntityStateModel<TListItem>>(
  actions: ActionCreatorsType<TActionProps>,
  getItemFn: ActionToItemFunctionType<TActionProps, TListItem>,
  keyFn: EntityKeyFunction<TListItem>
) =>
  on<TState, ActionCreatorType<TActionProps>[]>(...getListArg(actions), (state, action) =>
    replaceEntity(getItemFn(action), keyFn, state)
  );

export const addReplaceItemActionsByProp = <TActionProps, TListItem, TState extends EntityStateModel<TListItem>>(
  actions: ActionCreatorsType<TActionProps>,
  getItemFn: ActionToItemFunctionType<TActionProps, TListItem>,
  prop: keyof TListItem
) => addReplaceItemActions<TActionProps, TListItem, TState>(actions, getItemFn, Rprop(prop));

export const addReplaceItemActionsById = <
  TActionProps,
  TListItem extends { id: string },
  TState extends EntityStateModel<TListItem>
>(
  actions: ActionCreatorsType<TActionProps>,
  getItemFn: ActionToItemFunctionType<TActionProps, TListItem>
) => addReplaceItemActionsByProp<TActionProps, TListItem, TState>(actions, getItemFn, 'id');

/* Delete existing item in state */

export const addDeleteItemActions = <TActionProps, TListItem, TState extends EntityStateModel<TListItem>>(
  actions: ActionCreatorsType<TActionProps>,
  idFn: (action: TActionProps) => string
) =>
  on<TState, ActionCreatorType<TActionProps>[]>(...getListArg(actions), (state, action) =>
    deleteEntity(idFn(action), state)
  );

/* Add or update existing item in state */

export const addUpsertItemActions = <TActionProps, TListItem, TState extends EntityStateModel<TListItem>>(
  actions: ActionCreatorsType<TActionProps>,
  getItemFn: ActionToItemFunctionType<TActionProps, TListItem>,
  keyFn: EntityKeyFunction<TListItem>
) =>
  on<TState, ActionCreatorType<TActionProps>[]>(...getListArg(actions), (state, action) =>
    upsertEntity(getItemFn(action), keyFn, state)
  );

export const addUpsertItemActionsByProp = <TActionProps, TListItem, TState extends EntityStateModel<TListItem>>(
  actions: ActionCreatorsType<TActionProps>,
  getItemFn: ActionToItemFunctionType<TActionProps, TListItem>,
  prop: keyof TListItem
) => addUpsertItemActions<TActionProps, TListItem, TState>(actions, getItemFn, Rprop(prop));

export const addUpsertItemActionsById = <
  TActionProps,
  TListItem extends { id: string },
  TState extends EntityStateModel<TListItem>
>(
  actions: ActionCreatorsType<TActionProps>,
  getItemFn: ActionToItemFunctionType<TActionProps, TListItem>
) => addUpsertItemActionsByProp<TActionProps, TListItem, TState>(actions, getItemFn, 'id');

/* Partial update of the existing item in state */

export const addPartialUpdateItemActions = <TActionProps, TListItem, TState extends EntityStateModel<TListItem>>(
  actions: ActionCreatorsType<TActionProps>,
  matchFn: (action: TActionProps) => string,
  updateFn: (action: TActionProps, current: TListItem) => Partial<TListItem>
) =>
  on<TState, ActionCreatorType<TActionProps>[]>(...getListArg(actions), (state, action) =>
    partialUpdateEntity(
      () => matchFn(action),
      (current: TListItem) => updateFn(action, current),
      state
    )
  );
