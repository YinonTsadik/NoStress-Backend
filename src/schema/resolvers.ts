import { getAllUsers, getAllTasks, getAllConstraints } from '../db/queries'
import { GraphQLScalarType } from 'graphql'

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    parseValue(value: any) {
        return new Date(value)
    },
    serialize(value: any) {
        return value.toISOString()
    },
})

const resolvers = {
    Date: dateScalar,

    Query: {
        users: () => {
            return getAllUsers()
        },

        tasks: () => {
            return getAllTasks()
        },

        constraints: () => {
            return getAllConstraints()
        },
    },
}

export { resolvers }
