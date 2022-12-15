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
            return db.getUser(args.id)
        },

        tasks: () => {
            return db.getAllTasks()
        },

        userTasks: (_: any, args: any) => {
            return db.getUserTasks(args.user_id)
        },

        task: (_: any, args: any) => {
            return db.getTask(args.id)
        },

        constraints: () => {
            return db.getAllConstraints()
        },

        userConstraints: (_: any, args: any) => {
            return db.getUserConstraints(args.user_id)
        },

        constraint: (_: any, args: any) => {
            return db.getConstraint(args.id)
        },
    },

    Mutation: {
        createUser: (_: any, args: any) => {
            return db.createUser(args.input)
        },

        updateUser: (_: any, args: any) => {
            return db.updateUser(args.input)
        },

        deleteUser: (_: any, args: any) => {
            return db.deleteUser(args.id)
        },

        createTask: (_: any, args: any) => {
            return db.createTask(args.input)
        },

        updateTask: (_: any, args: any) => {
            return db.updateTask(args.input)
        },

        deleteTask: (_: any, args: any) => {
            return db.deleteTask(args.id)
        },

        createConstraint: (_: any, args: any) => {
            return db.createConstraint(args.input)
        },

        updateConstraint: (_: any, args: any) => {
            return db.updateConstraint(args.input)
        },

        deleteConstraint: (_: any, args: any) => {
            return db.deleteConstraint(args.id)
        },
    },
}

export { resolvers }
