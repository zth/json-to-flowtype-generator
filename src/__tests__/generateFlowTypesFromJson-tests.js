const generateFlowTypesFromJson = require('../generateFromTypesFromJson');

describe('generateFlowTypesFromJson', () => {
  it('should print JSON to a valid Flow type', () => {
    expect(
      generateFlowTypesFromJson(
        {
          testString: 'test',
          testBool: false,
          testNum: 123,
          testNull: null,
          testObj: {
            str: 'hello',
            bool: true,
            num: 12324,
            not: null
          },
          testObjList: [
            {
              str: 'hello',
              bool: true,
              num: 12324,
              not: null
            }
          ],
          testPrimitiveList: [123, 'test']
        },
        {
          name: 'TestType'
        }
      )
    ).toMatchSnapshot();
  });

  it('should find lists of objects, remove duplicates, unify all objects to a single object, and add maybe types to keys not present in all objects', () => {
    expect(
      generateFlowTypesFromJson(
        {
          testList: [
            { test: '123' },
            { test: '456', maybeProp: 123 },
            {
              test: '789',
              anotherMaybeProp: 'testing',
              maybeObj: { test: '123' }
            },
            {
              test: '789',
              nestedList: [
                { prop: 'test', maybeProp: 123456 },
                { prop: 'test' }
              ]
            }
          ]
        },
        {
          name: 'TestType'
        }
      )
    ).toMatchSnapshot();
  });

  it('should handle nested arrays that are sometimes empty', () => {
    expect(
      generateFlowTypesFromJson(
        {
          testList: [
            { test: '123', nestedList: [] },
            { test: '456', maybeProp: 123, nestedList: [] },
            {
              test: '789',
              anotherMaybeProp: 'testing',
              maybeObj: { test: '123' },
              nestedList: []
            },
            {
              test: '789',
              nestedList: [
                { prop: 'test', maybeProp: 123456 },
                { prop: 'test' }
              ]
            }
          ]
        },
        {
          name: 'TestType'
        }
      )
    ).toMatchSnapshot();
  });

  describe('Realistic examples', () => {
    describe('API responses', () => {
      test('api response should yield a sensible Flow type', () => {
        expect(
          generateFlowTypesFromJson(
            {
              data: {
                notifications: {
                  count: 123,
                  edges: [
                    {
                      cursor: '1234',
                      node: {
                        id: 1234,
                        message: 'hejsan'
                      }
                    },
                    {
                      cursor: '1234',
                      node: {
                        id: 1234,
                        message: null
                      }
                    }
                  ]
                },
                user: {
                  id: 1234,
                  firstName: 'Mrs',
                  lastName: 'Test',
                  email: 'test@test.com',
                  friends: [
                    {
                      id: 1234,
                      firstName: 'Friend',
                      lastName: 'One',
                      email: 'friend@friend.com',
                      isOnline: true,
                      lastMessaged: 123455
                    },
                    {
                      id: 1234,
                      firstName: 'Friend',
                      lastName: 'One',
                      email: 'friend@friend.com',
                      isOnline: false,
                      lastMessaged: null
                    },
                    {
                      id: 1234,
                      firstName: 'Friend',
                      lastName: 'One'
                    }
                  ]
                }
              }
            },
            {
              name: 'UserAPIResponse'
            }
          )
        ).toMatchSnapshot();
      });
    });
  });
});
