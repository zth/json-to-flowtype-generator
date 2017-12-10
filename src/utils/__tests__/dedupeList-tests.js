const dedupeList = require('../dedupeList');

describe('dedupeList', () => {
  it('should dedupe the provided list', () => {
    const listToDedupe = [
      { test: 'obj' },
      { test: { nested: { prop: true } } },
      { test: { nested: { prop: true } } },
      'str',
      123,
      123,
      456
    ];

    expect(dedupeList(listToDedupe)).toEqual([
      listToDedupe[0],
      listToDedupe[1],
      listToDedupe[3],
      listToDedupe[4],
      listToDedupe[6]
    ]);
  });
});
