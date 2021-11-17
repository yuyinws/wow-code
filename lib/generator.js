import { readFile, writeFile } from 'fs/promises'
import templateGenerator from './vue-code/template/template.js'
import scriptGenerator from './vue-code/script.js'
import styleGenerator from './vue-code/style.js'


export default async function generator (name, options) {
  let config = ''
  if (options.json) {
    config = options.json
  } else {
    config = await readFile(options.config, 'utf-8')
  }
  let _config = JSON.parse(config)
  const { breadcrumbList } = _config
  const code =
    templateGenerator(breadcrumbList) +
    scriptGenerator(breadcrumbList) +
    styleGenerator()
  await writeFile(name, code)
  console.log('success!')
}
