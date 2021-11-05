#!/usr/bin/env node

const program = require('commander')
const minimist = require('minimist')
const chalk = require('chalk')
program.version(`@wow-code ${require('../package.json').version}`)

program
  .command('g <file-name>')
  .requiredOption('-c,--config <config>', 'config file path')
  .action((name, options) => {
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(
        chalk.yellow(
          "\n Info: You provided more than one argument. The first one will be used as the file's name, the rest are ignored."
        )
      )
    }
    require('../lib/generator')(name, options)
  })

program.command('ui').action(() => {
  require('../lib/ui')
})

program.command('test').action(() => {
  console.log(process.cwd())
})

program.parse()
