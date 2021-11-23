#!/usr/bin/env node

import program from 'commander'
import minimist from 'minimist'
import chalk from 'chalk'
import server from '../lib/ui.js'
import generator from '../lib/generator.js'
import version from '../lib/util/version.cjs'

program.version(`wow-code v${version}`)
program
  .command('g <file-name>')
  .option('-c,--config <config>', 'config file path')
  .option('-j --json <json>', 'config json')
  .action((name, options) => {
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(
        chalk.yellow(
          "\n Info: You provided more than one argument. The first one will be used as the file's name, the rest are ignored."
        )
      )
    }
    generator(name, options)
  })

program
  .command('ui')
  .description('start and open the wow-code ui')
  .option('-p,--port <port>', 'Port used for the UI server')
  .option('-s,--slience','Start server but not open browser')
  .action(( options) => {
    // console.log(options)
    server(options)
  })

// program.command('test').action(() => {
//   console.log(chalk.blue('\nhello')+'world'+chalk.red('!\n'))
// })

program.parse()
