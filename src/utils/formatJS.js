// @flow
const prettier = require('prettier');

function formatJS(str: string): string {
  return prettier.format(str);
}

module.exports = formatJS;