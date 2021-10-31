const { readFile,writeFile } = require('fs/promises')
const templateGenerator = require('./vue-code/template/template')
const scriptGenerator = require('./vue-code/script')
const styleGenerator = require('./vue-code/style')
async function generator(name, options) {
  const config = await readFile(options.config, 'utf-8')
  const code = templateGenerator() + scriptGenerator() + styleGenerator()
  await writeFile(name, code)
}

function parseConfig(config) {
  config = JSON.parse(config)
  return { searchItem } = config
}

module.exports = generator
