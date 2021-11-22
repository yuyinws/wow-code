import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import path from 'path'
import resolvers from './resolvers.js'
import { typeDefs } from './schema.js'
import { fileURLToPath } from 'url'
import openBrowser from 'open'
import portfinder from 'portfinder'
import chalk from '../util/chalk.js'
import ora from 'ora'

async function startApolloServer (options) {
  const loading = ora('Starting GUI...').start()
  let { port, slience } = options
  if (!port) {
    port = await portfinder.getPortPromise()
  }
  const app = express()
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const distPath = path.join(__dirname, '../dist')
  app.use(express.static(distPath))
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()
  server.applyMiddleware({ app })
  await new Promise((resolve) => httpServer.listen({ port: port }, resolve))
  if (!slience) {
    openBrowser(`http://localhost:${port}`)
  }

  console.log(chalk.green(`🚀GUI ready at http://localhost:${port}`))
  loading.stop()
}

export { startApolloServer as server}
