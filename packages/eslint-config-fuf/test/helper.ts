/* eslint-disable import/prefer-default-export */

import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';

import { ESLint } from 'eslint';

type EslintConfig = 'base.config.js' | 'react.config.js';

/** lints a fixture by file name and return eslint results and fixed content */
export const lintFixture = async (
  fixtureName: string,
  config: EslintConfig = 'base.config.js',
) => {
  const eslint = new ESLint({
    fix: true,
    ignore: false,
    // override config file
    overrideConfigFile: pathJoin(__dirname, 'configs', config),
  });
  const filePath = pathJoin(__dirname, 'fixtures', fixtureName);
  const fileContent = readFileSync(filePath, 'utf-8')
    // remove eslint disable comment
    .replace('/* eslint-disable */', '');
  const results = await eslint.lintText(fileContent, { filePath });

  // Assuming the first result corresponds to our linted text
  const fixedContent = results[0].output || fileContent; // Use the fixed output, or original code if no fixes were made

  return { fixedContent, results };
};
