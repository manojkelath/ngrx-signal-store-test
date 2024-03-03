import { getOrderedItemsFromState } from './selectors.utils';

describe('Entity utils', () => {
  describe('Get ordered items => ', () => {
    it('should return ordered items from entity state', () => {
      const state = {
        order: ['Id2', 'Id1', 'Id3'],
        items: {
          Id1: {
            id: 'Id1',
            prop: 'Prop1',
          },
          Id2: {
            id: 'Id2',
            prop: 'Prop2',
          },
          Id3: {
            id: 'Id3',
            prop: 'Prop3',
          },
        },
      };

      const result = getOrderedItemsFromState(state);

      expect(result).toMatchSnapshot();
    });
  });
});
