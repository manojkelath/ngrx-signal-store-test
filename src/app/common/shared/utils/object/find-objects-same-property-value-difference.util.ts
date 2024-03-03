import Requals from 'ramda/es/equals';

import { FindObjectSamePropertyValueDifferencesResponseUtilType } from './types';

export const findObjectSamePropertyValueDifferences = (
  obj1,
  obj2
): FindObjectSamePropertyValueDifferencesResponseUtilType => {
  for (const obj1Prop in obj1) {
    if (!Requals(obj1[obj1Prop], obj2[obj1Prop])) {
      return {
        [obj1Prop]: {
          oldValue: obj1[obj1Prop],
          newValue: obj2[obj1Prop],
        },
      };
    }
  }

  return null;
};
