// @flow
import type { Config, FlowPrimitiveType, FlowType, TypedObj } from '../types';
const dedupeList = require('./dedupeList');
const isObject = require('./isObject');
const getMaybeKeysInListOfObjects = require('./getMaybeKeysInListOfObjects');

function unifyItemsInList(
  listOfMaybeObjects: Array<any>,
  config: Config
): Array<any> {
  const allObjects = listOfMaybeObjects.filter(obj => isObject(obj));
  const listWithoutObjects = listOfMaybeObjects.filter(obj => !isObject(obj));

  if (listWithoutObjects.length === listOfMaybeObjects.length) {
    return listWithoutObjects;
  }

  // Make sure we have one single object
  const unifiedObj = {};

  allObjects.forEach(obj => {
    Object.keys(obj).forEach(key => {
      if (unifiedObj.hasOwnProperty(key) === false) {
        unifiedObj[key] = [obj[key]];
      } else {
        unifiedObj[key].push(obj[key]);
      }
    });
  });

  // Unwrap props and make union of possible values
  Object.keys(unifiedObj).forEach(key => {
    // Dedupe and filter our empty lists
    unifiedObj[key] = dedupeList(unifiedObj[key]).filter(
      list => (Array.isArray(list) ? list.length > 0 : true)
    );

    if (unifiedObj[key].length === 1) {
      unifiedObj[key] = printValue(unifiedObj[key][0], config);
    } else {
      unifiedObj[key] = unifyItemsInList(unifiedObj[key], config)
        .map(val => printValue(val, config))
        .join(' | ');
    }
  });

  listWithoutObjects.push(unifiedObj);
  return listWithoutObjects;
}

function printValue(value: any, config: Config): string {
  if (Array.isArray(value)) {
    const dedupedList = dedupeList(value);
    const maybeKeys = getMaybeKeysInListOfObjects(dedupedList);
    const unifiedList = unifyItemsInList(dedupedList, config);

    if (unifiedList.length === 0) {
      unifiedList.push('any /* FIXME: Type could not be determined */');
    }

    return `${config.readOnly ? '$ReadOnlyArray' : 'Array'}<${unifiedList
      .map(
        val =>
          isObject(val)
            ? printObject(val, config, maybeKeys)
            : printValue(val, config)
      )
      .join(' | ')}>`;
  } else if (typeof value === 'object') {
    return printObject(value, config);
  } else {
    return value;
  }
}

function printObject(
  obj: any,
  config: Config,
  maybeKeys?: Array<string> = []
): string {
  const printStrList = ['{|\n'];

  Object.keys(obj).forEach(key => {
    let value = printValue(obj[key], config);

    if (config.readOnly) {
      printStrList.push('+');
    }

    printStrList.push(`${key}: `);

    if (
      maybeKeys.includes(key) ||
      (value !== 'null' && value.includes('null'))
    ) {
      // Filter out null and turn it into a maybe type instead
      if (value.includes('null')) {
        value = value.replace(' | null', '').replace('null |', '');
      }

      printStrList.push('?');
    }

    // Single null === not enough keys with values were present to determine the type
    printStrList.push(
      value === 'null'
        ? 'any, // FIXME: Type could not be determined\n'
        : `${value},\n`
    );
  });

  printStrList.push('|}');

  return printStrList.join('');
}

module.exports = {
  unifyItemsInList,
  printValue,
  printObject
};
