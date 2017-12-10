// @flow
import type { Config } from './types';
const printTypedObj = require('./utils/printTypedObj');
const generateTypeFromValue = require('./utils/generateTypeFromValue');

const DEFAULT_CONFIG: Config = {
  name: 'Type',
  readOnly: true
};

function generateFlowTypesFromJson(
  rawJson: Object,
  config?: Config = DEFAULT_CONFIG
): string {
  const opts: Config = Object.assign({}, DEFAULT_CONFIG, config);
  const json = JSON.parse(JSON.stringify(rawJson));
  const typedObj = generateTypeFromValue(json);
  return printTypedObj(typedObj, opts);
}

module.exports = generateFlowTypesFromJson;