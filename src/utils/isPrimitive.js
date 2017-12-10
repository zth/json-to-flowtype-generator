// @flow
function isPrimitive (variable: mixed): boolean {
  return variable === null || typeof variable !== 'object'
}

module.exports = isPrimitive;