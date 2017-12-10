// @flow
const deepEqual = require('deep-equal');

function dedupeList(list: Array<any>): Array<any> {
  const dedupedList = [];

  list.forEach(val => {
    if (!dedupedList.find(v => deepEqual(v, val))) {
      dedupedList.push(val);
    }
  });

  return dedupedList;
}

module.exports = dedupeList;