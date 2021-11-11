import { gql } from 'apollo-server-express'
const schema = gql`
  type Folder {
    name: String
    path: String
    children:[Folder]
  }
  type Query {
    getPerson(age: Int): Int
    generator(config: String!): Boolean
    getFileList(base: String): Folder
  }
`

export {
  schema as typeDefs
}