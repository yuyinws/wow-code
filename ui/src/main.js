import { createApp, h, provide } from 'vue'
import App from './App.vue'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import './index.css'
const link = createHttpLink({ uri: 'http://localhost:3000/graphql' })
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
