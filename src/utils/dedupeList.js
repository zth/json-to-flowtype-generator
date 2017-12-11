// @flow
const deepEqual = require('deep-equal');

function dedupeList(list: Array<any>): Array<any> {
  const dedupedList = [];

  list.forEach(val => {
    if (!dedupedList.find(v => deepEqual(v, val))) {
      dedupedList.push(val);
    }
  });

  // Make sure empty arrays are properly marked up
  return dedupedList.map(
    item =>
      Array.isArray(item) && item.length === 0
        ? ['any /* FIXME: Type could not be determined */']
        : item
  );
}

module.exports = dedupeList;
