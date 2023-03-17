import * as db from '../db'
import Manager from '../modules/Manager'

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
        usernames: () => {
            return db.getUsernames()
        },

        user: (_: any, args: any) => {
            return db.getUser(args.username, args.password)
        },

        userCalendars: (_: any, args: any) => {
            return db.getUserCalendars(args.userID)
        },

        calendarTasks: (_: any, args: any) => {
            return db.getCalendarTasks(args.calendarID)
        },

        calendarConstraints: (_: any, args: any) => {
            return db.getCalendarConstraints(args.calendarID)
        },

        calendarEvents: (_: any, args: any) => {
            return db.getCalendarEvents(args.calendarID)
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

        createCalendar: (_: any, args: any) => {
            return db.createCalendar(args.input)
        },

        updateCalendar: (_: any, args: any) => {
            return db.updateCalendar(args.input)
        },

        deleteCalendar: (_: any, args: any) => {
            return db.deleteCalendar(args.id)
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

        optimize: async (_: any, args: any) => {
            const manager = new Manager(args.calendarID)
            await manager.generateManager()
            await manager.optimize()

            // console.log(manager)
            // console.log(manager.getAllDays)
            // console.log(manager.getAllTasks)
            return true
        },
    },
}

export default resolvers
