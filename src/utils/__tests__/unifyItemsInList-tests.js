const unifyItemsInList = require('../printValue').unifyItemsInList;

describe('unifyItemsInList', () => {
  let unifiedObjList;

  beforeEach(() => {
    unifiedObjList = unifyItemsInList([
      { test: 123, prop: 123412 },
      { test: 353, anotherProp: true, prop: '1234', someProp: 'hej' },
      { test: 466, prop: '133', anotherProp: 'hej' },
      { test: 465457474, prop: '123', someProp: 'hej' }
    ]);
  })
  it('should replace all objects with a single object', () => {
    expect(unifiedObjList.length).toBe(1);
  });

  test('object should have all keys from all objects present', () => {
    const unifiedObj = unifiedObjList[0];

    expect(
      Object.keys(
        unifiedObj
      )
    ).toEqual(['test', 'prop', 'anotherProp', 'someProp']);
  });
});
