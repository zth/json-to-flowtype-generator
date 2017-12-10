const mapPrimitiveTypeToFlowType = require('../mapPrimitiveTypeToFlowType');

describe('mapPrimitiveTypeToFlowType', () => {
  it('should detect strings', () => {
    expect(mapPrimitiveTypeToFlowType('test')).toBe('string');
  });

  it('should detect numbers', () => {
    expect(mapPrimitiveTypeToFlowType(2)).toBe('number');
  });

  it('should detect booleans', () => {
    expect(mapPrimitiveTypeToFlowType(false)).toBe('boolean');
  });

  it('should detect null', () => {
    expect(mapPrimitiveTypeToFlowType(null)).toBe('null');
  });
});
