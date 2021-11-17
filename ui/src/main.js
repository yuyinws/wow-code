import { createApp, h, provide } from 'vue'
import App from './App.vue'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import './index.css'

const uri = import.meta.env.DEV ? 'http://localhost:4001/graphql' : '/graphql'

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
