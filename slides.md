---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
---

## 使用 Node 开发 Cli 工具&在 Vue 中使用 GraphQL

---

# 从业务开发中引发的思考

<img v-click src="/public/1.png" class="w-4xl shadow round" />

---

# CLI 交互

```shell {1,2,3|1,2,4}
# file-path：生成文件的路径
# config-path：配置文件的路径
wow-code g <file-path> -c <config-path>
wow-code g ./demo.vue -c ./config.json
```

---

# GUI 交互

```shell
# -p:指定端口号
# -s:是否自动打开浏览器
wow-code ui -p <port> -s
```

---

# 命令行开发
#### package.json
```json
{
  ...
  "bin": {
    "hello-cli": "./index.js"
  }
  ...
}
```

#### index.js
```js
#!/usr/bin/env node
console.log('Hello World!')
```

```shell
# 本地调试命令行
npm link
```

---

# 识别命令行输入

<a href="https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md">commander</a>

<v-clicks>

```shell
yarn add commander
```

```js
import program from 'commander'

program
  .command('g <file-name>')
  .option('-c,--config <config>', 'config file path')
  .action((name, options) => {
    console.log(name, options)
    ...
    ...
    ...
  })

program.parse()
```

</v-clicks>

---

# 读/写系统文件

<a href="http://nodejs.cn/api/fs.html">nodejs/fs</a>

```js {1|1-4|1,2,5,6|all}
import { readFile, writeFile } from 'fs/promises'
async funtion(){
  // 读取文件
  const _readFile = await readFile('<path>','utf-8')
  // 写入文件
  const _writeFile = await writeFile('<path>','<content>')
}
```

---

# GUI 开发

<a href="https://github.com/vuejs/vue-cli">vue-cli</a>

<img src="/public/2.png" class="bg-gray-400 w-xl mx-auto"/>

---

# GraphQL

<div class="flex">
<div>

- 一套用于 API 查询的语言规范
- 支持多种编程语言（C/C++/Go/Java/JavaScript......）
- 客户端能够准确地获得它需要的数据

</div>
<div v-click class="flex-grow">

```graphql
type User {
  id: ID
  age: Number
  name: String
  phone: Number
}
```

</div>
</div>
<div class="flex justify-around" v-click>
<div class="w-1/3">

```graphql
{
  User {
    name
    age
  }
}
```

</div>

<div class="w-1/3">

```json
{
  "User": {
    "name": "小明",
    "age": "22"
  }
}
```

</div>

</div>

<div class="flex justify-around" v-click>
<div class="w-1/3">

```graphql
{
  User {
    name
    phone
  }
}
```

</div>

<div class="w-1/3">

```json
{
  "User": {
    "name": "小明",
    "phone": "15577728881"
  }
}
```

</div>

</div>
