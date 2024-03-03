import {
  addEntities,
  addEntitiesById,
  addEntitiesByProp,
  addEntitiesOnStart,
  addEntity,
  addEntityById,
  addEntityByProp,
  addEntityOnStart,
  createEntityState,
  createEntityStateById,
  createEntityStateByProp,
  deleteEntity,
  partialUpdateEntity,
  replaceEntity,
  replaceEntityById,
  replaceEntityByProp,
  upsertEntity,
  upsertEntityById,
  upsertEntityByProp,
} from './entity.utils';

describe('Entity utils', () => {
  const getList = <T>(generator: (index: number) => T, count: number): T[] =>
    Array(count)
      .fill(undefined)
      .map((_, index) => generator(index));

  describe('Create entity state => ', () => {
    it('should create entity state by custom key function', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        3
      );

      const result = createEntityState(list, (item) => `${item.prop1}_${item.prop3}_custom`);

      expect(result).toMatchSnapshot();
    });

    it('should create entity state by prop', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        3
      );

      const result = createEntityStateByProp(list, 'prop2');

      expect(result).toMatchSnapshot();
    });

    it('should create entity state by id', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        3
      );

      const result = createEntityStateById(list);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Add records to state => ', () => {
    it('should add records by custom key function', () => {
      const listGenerator = (prefix: string) => (index: number) => ({
        prop1: `${prefix}_Prop1_${index}`,
        prop2: `${prefix}_Prop2_${index}`,
        prop3: `${prefix}_Prop3_${index}`,
      });

      const keyFn = <T extends { prop1: string; prop3: string }>(item: T) => `${item.prop1}_${item.prop3}_custom`;

      const initialState = createEntityState(getList(listGenerator('Initial'), 2), keyFn);

      const result = addEntities(getList(listGenerator('New'), 2), keyFn, initialState);

      expect(result).toMatchSnapshot();
    });

    it('should add records by prop', () => {
      const listGenerator = (prefix: string) => (index: number) => ({
        prop1: `${prefix}_Prop1_${index}`,
        prop2: `${prefix}_Prop2_${index}`,
        prop3: `${prefix}_Prop3_${index}`,
      });

      const initialState = createEntityStateByProp(getList(listGenerator('Initial'), 2), 'prop2');

      const result = addEntitiesByProp(getList(listGenerator('New'), 2), 'prop2', initialState);

      expect(result).toMatchSnapshot();
    });

    it('should add records by id', () => {
      const listGenerator = (prefix: string) => (index: number) => ({
        id: `${prefix}_Id_${index}`,
        prop1: `${prefix}_Prop1_${index}`,
        prop2: `${prefix}_Prop2_${index}`,
        prop3: `${prefix}_Prop3_${index}`,
      });

      const initialState = createEntityStateById(getList(listGenerator('Initial'), 2));

      const result = addEntitiesById(getList(listGenerator('New'), 2), initialState);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Add entity to state => ', () => {
    it('should add entity to state by custom key function', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        4
      );

      const keyFn = <T extends { prop1: string; prop3: string }>(item: T) => `${item.prop1}_${item.prop3}_custom`;

      const state = createEntityState(list.slice(0, -1), keyFn);

      const result = addEntity(list[list.length - 1], keyFn, state);

      expect(result).toMatchSnapshot();
    });

    it('should add entity to state by prop', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        4
      );

      const prop = 'prop2';

      const state = createEntityStateByProp(list.slice(0, -1), prop);

      const result = addEntityByProp(list[list.length - 1], prop, state);

      expect(result).toMatchSnapshot();
    });

    it('should add entity to state by id', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        4
      );

      const state = createEntityStateById(list.slice(0, -1));

      const result = addEntityById(list[list.length - 1], state);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Replace entity in state => ', () => {
    it('should replace entity by custom key function', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        3
      );

      const keyFn = <T extends { prop1: string; prop3: string }>(item: T) => `${item.prop1}_${item.prop3}_custom`;

      const state = createEntityState(list, keyFn);

      const result = replaceEntity(
        {
          ...list[1],
          prop2: 'UpdatedProp2',
        },
        keyFn,
        state
      );

      expect(result).toMatchSnapshot();
    });

    it('should replace entity by prop', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        3
      );

      const prop = 'prop2';

      const state = createEntityStateByProp(list, prop);

      const result = replaceEntityByProp(
        {
          ...list[1],
          prop1: 'UpdatedProp1',
        },
        prop,
        state
      );

      expect(result).toMatchSnapshot();
    });

    it('should replace entity by id', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        3
      );

      const state = createEntityStateById(list);

      const result = replaceEntityById(
        {
          ...list[1],
          prop3: 'UpdatedProp3',
        },
        state
      );

      expect(result).toMatchSnapshot();
    });
  });

  describe('Delete entity from state => ', () => {
    it('should delete entity', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        3
      );

      const state = createEntityStateById(list);

      const result = deleteEntity(list[1].id, state);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Upsert entity in state => ', () => {
    it('should add entity to state by custom key function', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        4
      );

      const keyFn = <T extends { prop1: string; prop3: string }>(item: T) => `${item.prop1}_${item.prop3}_custom`;

      const state = createEntityState(list.slice(0, -1), keyFn);

      const result = upsertEntity(list[list.length - 1], keyFn, state);

      expect(result).toMatchSnapshot();
    });

    it('should add entity to state by prop', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        4
      );

      const prop = 'prop2';

      const state = createEntityStateByProp(list.slice(0, -1), prop);

      const result = upsertEntityByProp(list[list.length - 1], prop, state);

      expect(result).toMatchSnapshot();
    });

    it('should add entity to state by id', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        4
      );

      const state = createEntityStateById(list.slice(0, -1));

      const result = upsertEntityById(list[list.length - 1], state);

      expect(result).toMatchSnapshot();
    });

    it('should replace entity by custom key function', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        3
      );

      const keyFn = <T extends { prop1: string; prop3: string }>(item: T) => `${item.prop1}_${item.prop3}_custom`;

      const state = createEntityState(list, keyFn);

      const result = upsertEntity(
        {
          ...list[1],
          prop2: 'UpdatedProp2',
        },
        keyFn,
        state
      );

      expect(result).toMatchSnapshot();
    });

    it('should replace entity by prop', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        3
      );

      const prop = 'prop2';

      const state = createEntityStateByProp(list, prop);

      const result = upsertEntityByProp(
        {
          ...list[1],
          prop1: 'UpdatedProp1',
        },
        prop,
        state
      );

      expect(result).toMatchSnapshot();
    });

    it('should replace entity by id', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        3
      );

      const state = createEntityStateById(list);

      const result = upsertEntityById(
        {
          ...list[1],
          prop3: 'UpdatedProp3',
        },
        state
      );

      expect(result).toMatchSnapshot();
    });
  });

  describe('Partial update entity in state => ', () => {
    it('should update provided properties', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        3
      );

      const state = createEntityStateById(list);

      const result = partialUpdateEntity(
        () => list[1].id,
        () => ({ prop1: 'UpdatedProp1', prop2: 'UpdatedProp2' }),
        state
      );

      expect(result).toMatchSnapshot();
    });

    it('should update using transform functions', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        3
      );

      const state = createEntityStateById(list);

      const result = partialUpdateEntity(
        () => list[1].id,
        (item: { prop3: string }) => ({ prop3: `Updated${item.prop3}` }),
        state
      );

      expect(result).toMatchSnapshot();
    });

    it('should return same state if no match', () => {
      const list = getList(
        (index) => ({
          id: `Id_${index}`,
          prop1: `Prop1_${index}`,
          prop2: `Prop2_${index}`,
          prop3: `Prop3_${index}`,
        }),
        3
      );

      const state = createEntityStateById(list);

      const result = partialUpdateEntity(
        () => 'NotFoundId',
        (item: { prop3: string }) => ({ prop3: `Updated${item.prop3}` }),
        state
      );

      expect(result).toBe(state);
    });
  });

  describe('Add entities to state on start => ', () => {
    it('should add entities by custom key function', () => {
      const listGenerator = (prefix: string) => (index: number) => ({
        prop1: `${prefix}_Prop1_${index}`,
        prop2: `${prefix}_Prop2_${index}`,
        prop3: `${prefix}_Prop3_${index}`,
      });

      const keyFn = <T extends { prop1: string; prop3: string }>(item: T) => `${item.prop1}_${item.prop3}_custom`;

      const initialState = createEntityState(getList(listGenerator('Initial'), 2), keyFn);

      const result = addEntitiesOnStart(getList(listGenerator('New'), 2), keyFn, initialState);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Add entity to state on start => ', () => {
    it('should add entity to state by custom key function', () => {
      const listGenerator = (prefix: string) => (index: number) => ({
        prop1: `${prefix}_Prop1_${index}`,
        prop2: `${prefix}_Prop2_${index}`,
        prop3: `${prefix}_Prop3_${index}`,
      });

      const keyFn = <T extends { prop1: string; prop3: string }>(item: T) => `${item.prop1}_${item.prop3}_custom`;

      const initialState = createEntityState(getList(listGenerator('Initial'), 2), keyFn);

      const result = addEntityOnStart(getList(listGenerator('New'), 1)[0], keyFn, initialState);

      expect(result).toMatchSnapshot();
    });
  });
});
