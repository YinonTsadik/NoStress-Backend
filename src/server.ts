import { ApolloServer } from 'apollo-server'
import { typeDefs, resolvers } from './graphql'

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(`🚀 Running a GraphQL API server at: ${url}`)
})
