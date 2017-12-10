#!/usr/bin/env node
const clipboardy = require('clipboardy');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const program = require('commander');
const inquirer = require('inquirer');
const nodeEval = require('node-eval');
const packageJson = require('../../package');
const generateType = require('../../lib/generateFlowTypesFromJson');

program
  .version(packageJson.version)
  .option('-c, --clipboard', 'Use the clipboard to generate the type. This is the default mode.')
  .option('-f, --file <path>', 'The file path to load content from.')
  .option(
    '-r, --read-only',
    'Outputs type as a read only type. This setting is recommended for API responses etc.'
  )
  .option('-n, --name <name>', 'The desired name for the type.')
  .option('-i, --interactive', 'Asks for config interactively.')
  .parse(process.argv);

async function processContent(content) {
  // Try parsing the content as JSON
  let parsedContent;

  try {
    parsedContent = nodeEval(`module.exports = { data: ${content} }`).data;
  } catch (e) {
    // Silent
  }

  if (!parsedContent) {
    console.error(
      chalk.red(
        'Failed parsing content. Please make sure it is provided as either a JSON string or a plain JavaScript object'
      )
    );
    process.exit();
  }

  let name = program.name || 'Type';
  let readOnly = !!program.readOnly;

  if (program.interactive) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        message: 'Type name?',
        name: 'name',
        default: 'Type'
      },
      {
        type: 'checkbox',
        message: 'Output type as read only?',
        name: 'readOnly',
        choices: [{ name: 'yes', checked: false }]
      }
    ]);

    name = answers.name;
    readOnly = answers.readOnly[0] === 'yes';
  }

  const flowType = generateType(parsedContent, {
    name,
    readOnly
  });

  console.log(chalk.green(flowType));

  clipboardy.writeSync(flowType);
  console.log(chalk.yellow('Type copied to clipboard.'));
}

(async function() {
  if (program.file) {
    console.log(chalk.yellow('Using provided file.'));
    const content = fs.readFileSync(
      path.join(process.cwd(), program.file),
      'utf8'
    );

    await processContent(content);
  } else if (program.content) {
    console.log(chalk.yellow('Using provided content.'));
    await processContent(program.content);
  } else {
    console.log(chalk.yellow('Using clipboard.'));
    await processContent(clipboardy.readSync());
  }
})();
