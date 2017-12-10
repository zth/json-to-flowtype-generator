// @flow
const mapPrimitiveTypeToFlowType = require('./mapPrimitiveTypeToFlowType');
const isPrimitive = require('./isPrimitive');

function generateTypeFromValue(value: any): any {
  if (Array.isArray(value)) {
    return value.map(generateTypeFromValue);
  } else if (isPrimitive(value)) {
    return mapPrimitiveTypeToFlowType(value);
  } else if (typeof value === 'object') {
    return Object.keys(value).reduce((acc, key) => {
      acc[key] = generateTypeFromValue(value[key]);
      return acc;
    }, {});
  }

  return 'any';
}

module.exports = generateTypeFromValue;
