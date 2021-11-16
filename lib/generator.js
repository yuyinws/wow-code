import { readFile, writeFile } from 'fs/promises'
import templateGenerator from './vue-code/template/template.js'
import scriptGenerator from './vue-code/script.js'
import styleGenerator from './vue-code/style.js'


const test = JSON.stringify({
  "breadcrumbList":["业务订单","检查预约"],
  "searchItem":[
    {
      "type":"input",
      "label":"输入框"
    }
  ]
})

export default async function generator(name, options) {
  let config = ''
  if (options.json) {
    config = JSON.parse(JSON.stringify(test))
  } else {
    config = JSON.parse(await readFile(options.config, 'utf-8'))
  }
  console.log('config',typeof config)
  const { breadcrumbList, searchItem } = JSON.parse(config)
  const code =
    templateGenerator(breadcrumbList, searchItem) +
    scriptGenerator(breadcrumbList) +
    styleGenerator()
  await writeFile(name, code)
  console.log('success!')
}
