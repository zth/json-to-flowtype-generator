const getMaybeKeysInListOfObjects = require('../getMaybeKeysInListOfObjects');

describe('getMaybeKeysInListOfObjects', () => {
  it('should find keys of objects in list that are not present in every object', () => {
    expect(
      getMaybeKeysInListOfObjects([
        { test: 'key', someKey: '!' },
        { test: 'hej', someKey: '!', someMaybeKey: 'test' },
        { test: 'key', someKey: '!', anotherKey: 'hey' },
        { test: 'hej', someKey: '!', someMaybeKey: 'test' }
      ])
    ).toEqual(['someMaybeKey', 'anotherKey']);
  });
});
