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
  .command('g <file-path>')
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
query User {
  id: ID
  age: Int
  name: String
  phone: String
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

---

# GraphQL-Server

```shell
yarn install apollo-server-core apollo-server-express express graphql http
```

<v-click>

```js
// server.js
import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'

(async function () {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    // 数据模型
    typeDefs,
    // 解析器
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()
  server.applyMiddleware({ app })
  await new Promise((resolve) => httpServer.listen({ port: 4040 }, resolve))
  console.log('server ready at http://localhost:4040/graphql')
})()

```

</v-click>

---

# GraphQL-Vue
<a href="https://v4.apollo.vuejs.org/zh-cn/">Vue Apollo</a>


```js
// main.js
import { createApp, h, provide } from 'vue'
import App from './App.vue'
import {ApolloClient,createHttpLink,InMemoryCache,} from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

const uri = import.meta.env.DEV ? 'http://localhost:4040/graphql' : '/graphql'
const link = createHttpLink({ uri: uri })
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({ link, cache })

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render() {
    return h(App)
  },
}).mount('#app')
```

---

# GraphQL-Vue
```vue
<template>
  {{ users }}
</template>

<script setup>
import { watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const { result: users } = useQuery(gql`
  query getUsers {
    users {
      id
      name
      phone
    }
  }
`)

watch(() => {
  console.log(users.value)
})
</script>
<style scoped lang="scss"></style>
```

---

##### 监听前端dist文件夹

```js{5,6,10-13|all}
// server.js
import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import { fileURLToPath } from 'url'
import path from 'path'
(async function () {
  const app = express()
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const distPath = path.join(__dirname, './ui/dist/')
  app.use(express.static(distPath))
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    // 数据模型
    typeDefs,
    // 解析器
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()
  server.applyMiddleware({ app })
  await new Promise((resolve) => httpServer.listen({ port: 4040 }, resolve))
  console.log('server ready at http://localhost:4040/graphql')
})()

```
