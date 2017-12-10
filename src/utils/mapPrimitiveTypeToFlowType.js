// @flow
function mapPrimitiveTypeToFlowType(primitive: string | number | boolean | null): string {
  if (primitive === null) {
    return 'null';
  }

  return typeof primitive;
}

module.exports = mapPrimitiveTypeToFlowType;