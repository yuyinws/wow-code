import { gql } from 'apollo-server-express'
const schema = gql`
  type Folder {
    name: String
    path: String
    children: [Folder]
  }
  type Query {
    getFileList(base: String): Folder
  }
  type generatorRes {
    results: Boolean
    msg: String
  }
  type Mutation {
    generator(config: String!, path: String!): generatorRes
  }
`

export { schema as typeDefs }
