import { gql } from 'apollo-server-express'
const schema = gql`
  type Folder {
    name: String
    path: String
    children:[Folder]
  }
  type Query {
    getPerson(age: Int): Int
    getFileList(base: String): Folder
  }
  type Mutation {
    generator(config: String!,path:String!): Boolean
  }

`

export {
  schema as typeDefs
}