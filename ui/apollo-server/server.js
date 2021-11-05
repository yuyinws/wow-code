const { ApolloServer, gql } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const express = require('express')
const http = require('http')
const path = require('path')

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world！！！！！',
  },
}

async function startApolloServer(typeDefs, resolvers) {
  const app = express()
  const distPath = path.resolve(__dirname, '../dist')
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

module.exports = {
  server: startApolloServer(typeDefs, resolvers),
}
//startApolloServer(typeDefs, resolvers)
