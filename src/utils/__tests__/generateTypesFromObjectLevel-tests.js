const generateTypeFromValue = require('../generateTypeFromValue');

describe('generateTypeFromValue', () => {
  it('should handle an object full of primitives', () => {
    expect(
      generateTypeFromValue({
        testString: 'some string',
        testBool: false,
        anotherBool: true,
        someNumber: 123,
        someNull: null
      })
    ).toEqual({
      testString: 'string',
      testBool: 'boolean',
      anotherBool: 'boolean',
      someNumber: 'number',
      someNull: 'null'
    });
  });

  it('should walk nested objects', () => {
    expect(
      generateTypeFromValue({
        testString: 'some string',
        testObj: {
          someString: 'stuff',
          someBoolean: false,
          anotherObj: {
            someNumber: 123
          }
        }
      })
    ).toEqual({
      testString: 'string',
      testObj: {
        someString: 'string',
        someBoolean: 'boolean',
        anotherObj: {
          someNumber: 'number'
        }
      }
    });
  });

  it('should walk nested lists', () => {
    expect(
      generateTypeFromValue({
        testString: 'some string',
        testList: [
          123,
          false,
          {
            tests: 'hello'
          },
          [
            'test',
            {
              test: false
            }
          ]
        ]
      })
    ).toEqual({
      testString: 'string',
      testList: [
        'number',
        'boolean',
        {
          tests: 'string'
        },
        [
          'string',
          {
            test: 'boolean'
          }
        ]
      ]
    });
  });
});
