#!/usr/bin/env node

// const program = require('commander')
// const minimist = require('minimist')
// const chalk = require('chalk')

import program from 'commander'
import minimist from 'minimist'
import chalk from 'chalk'
import server from '../lib/ui.js'
program.version(`@w-cli 0.0.1`)

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
  server()
})

program.command('test').action(() => {
  console.log(process.cwd())
})

program.parse()
