// @flow
import type { FlowType } from '../types';

function getMaybeKeysInListOfObjects(
  listOfObjects: Array<Object>
): Array<string> {
  const keyCount: { [key: string]: number } = {};
  const maybeKeys = [];

  listOfObjects.forEach(obj => {
    Object.keys(obj).forEach(key => {
      if (obj[key] === 'null') {
        maybeKeys.push(key);
      }

      if (keyCount.hasOwnProperty(key) === true) {
        keyCount[key] += 1;
      } else {
        keyCount[key] = 1;
      }
    });
  });

  return Object.keys(keyCount)
    .reduce((keysNotPresentInEveryObject: Array<string>, key) => {
      if (keyCount[key] < listOfObjects.length) {
        keysNotPresentInEveryObject.push(key);
      }

      return keysNotPresentInEveryObject;
    }, maybeKeys);
}

module.exports = getMaybeKeysInListOfObjects;
