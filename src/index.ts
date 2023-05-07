import { ApolloServer } from 'apollo-server'
import { typeDefs, resolvers } from './graphql'

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(`🚀 Running a GraphQL API server at: ${url}`)
})

// To run the server, type 'npm run build' in the terminal, and then type 'npm start'.
