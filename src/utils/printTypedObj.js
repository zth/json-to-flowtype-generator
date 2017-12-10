// @flow
import type { Config, TypedObj } from '../types';
const formatJS = require('./formatJS');
const printValue = require('./printValue').printValue;

function printTypedObj(typedObj: TypedObj, config: Config): string {
  let printStr = '';
  printStr += `type ${config.name} = `;
  printStr += printValue(typedObj, config);
  return formatJS(printStr);
}

module.exports = printTypedObj;
