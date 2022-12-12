import * as db from '../db'

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
            return db.getAllUsers()
        },

        user: (_: any, args: any) => {
            const { id } = args
            return db.getUser(id)
        },

        tasks: () => {
            return db.getAllTasks()
        },

        task: (_: any, args: any) => {
            const { id } = args
            return db.getTask(id)
        },

        constraints: () => {
            return db.getAllConstraints()
        },

        constraint: (_: any, args: any) => {
            const { id } = args
            return db.getConstraint(id)
        },
    },

    Mutation: {
        createUser: (_: any, args: any) => {
            return db.createUser(args.input)
        },

        createTask: (_: any, args: any) => {
            return db.createTask(args.input)
        },

        createConstraint: (_: any, args: any) => {
            return db.createConstraint(args.input)
        },
    },
}

export { resolvers }
