import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import path from 'path'
import resolvers from './resolvers.mjs'
import { typeDefs } from './schema.mjs'
import { fileURLToPath } from 'url'
async function startApolloServer() {
  const app = express()
  // const __dirname = path.resolve()
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const distPath = path.join(__dirname, '../dist')
  // const distPath = '../dist'
  app.use(express.static(distPath))
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()
  server.applyMiddleware({ app })
  await new Promise((resolve) => httpServer.listen({ port: 3000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
}

export { startApolloServer as server }
