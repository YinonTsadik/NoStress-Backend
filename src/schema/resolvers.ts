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
        users: () => {
            return db.getAllUsers()
        },

        user: (_: any, args: any) => {
            return db.getUser(args.id)
        },

        calendars: () => {
            return db.getCalendars()
        },

        calendar: (_: any, args: any) => {
            return db.getCalendar(args.id)
        },

        tasks: () => {
            return db.getAllTasks()
        },

        task: (_: any, args: any) => {
            return db.getTask(args.id)
        },

        userTasks: (_: any, args: any) => {
            return db.getUserTasks(args.user_id)
        },

        calendarTasks: (_: any, args: any) => {
            return db.getCalendarTasks(args.calendar_id)
        },

        constraints: () => {
            return db.getAllConstraints()
        },

        constraint: (_: any, args: any) => {
            return db.getConstraint(args.id)
        },

        userConstraints: (_: any, args: any) => {
            return db.getUserConstraints(args.user_id)
        },

        calendarConstraints: (_: any, args: any) => {
            return db.getCalendarConstraints(args.calendar_id)
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
            const manager = new Manager(args.calendar_id)
            await manager.createManager()
            manager.optimize()

            console.log(manager.getAllDays)
            return JSON.stringify(manager.getAllDays) // Not returning properly
        },
    },
}

export { resolvers }
