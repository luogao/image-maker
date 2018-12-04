#!/usr/bin/env node
const program = require('commander')

program.version(require('../package').version).usage('<command> [options]')

program
  .command('make [dir]')
  .option('-o, --output [path]', 'output path')
  .option('-t, --type [typeName]', "output image(s)'s size setting")
  .description('make icon')
  .action((dir, cmd) => {
    require('../lib/make')(dir, cmd)
  })

program
  .command('tiny [dir]')
  .description('Compress Pictures')
  .action((dir, cmd) => {
    require('../lib/tiny')(dir, cmd)
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
