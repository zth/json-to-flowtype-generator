// @flow
function isObject(maybeObj: mixed): boolean {
  return (
    typeof maybeObj === 'object' &&
    maybeObj !== null &&
    Array.isArray(maybeObj) === false
  );
}

module.exports = isObject;