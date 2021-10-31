const { readFile, writeFile } = require('fs/promises')
const templateGenerator = require('./vue-code/template/template')
const scriptGenerator = require('./vue-code/script')
const styleGenerator = require('./vue-code/style')
async function generator(name, options) {
  const config = JSON.parse(await readFile(options.config, 'utf-8'))
  const { breadcrumbList, searchItem } = config
  const code =
    templateGenerator(breadcrumbList, searchItem) +
    scriptGenerator(breadcrumbList) +
    styleGenerator()
  await writeFile(name, code)
  console.log('success!')
}

module.exports = generator
