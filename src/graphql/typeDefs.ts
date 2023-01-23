import { gql } from 'apollo-server'

const typeDefs = gql`
    scalar Date

    type User {
        id: String!
        firstName: String!
        lastName: String!
        username: String!
        password: String!
    }

    type Calendar {
        id: String!
        userID: String!
        name: String!
        startDate: Date!
        endDate: Date!
    }

    type Task {
        id: String!
        calendarID: String!
        description: String!
        deadline: Date!
        workHours: Int!
    }

    enum Type {
        Studies
        Test
        Work
        Event
        Rest
        Other
    }

    type Constraint {
        id: String!
        calendarID: String!
        description: String!
        startTime: Date!
        endTime: Date!
        type: Type!
    }

    type ScheduledTask {
        id: String!
        description: String!
        startTime: Date!
        endTime: Date!
        hours: Int!
    }

    input CreateUserInput {
        firstName: String!
        lastName: String!
        username: String!
        password: String!
    }

    input UpdateUserInput {
        id: String!
        firstName: String
        lastName: String
        username: String
        password: String
    }

    input CreateCalendarInput {
        userID: String!
        name: String!
        startDate: Date!
        endDate: Date!
    }

    input UpdateCalendarInput {
        id: String!
        name: String
        startDate: Date
        endDate: Date
    }

    input CreateTaskInput {
        calendarID: String!
        description: String!
        deadline: Date!
        workHours: Int!
    }

    input UpdateTaskInput {
        id: String!
        description: String
        deadline: Date
        workHours: Int
    }

    input CreateConstraintInput {
        calendarID: String!
        description: String!
        startTime: Date!
        endTime: Date!
        type: Type = Other
    }

    input UpdateConstraintInput {
        id: String!
        description: String
        startTime: Date
        endTime: Date
        type: Type
    }

    type Query {
        usernames: [String!]

        user(username: String!, password: String!): User

        userCalendars(userID: String!): [Calendar!]

        calendarTasks(calendarID: String!): [Task!]

        calendarConstraints(calendarID: String!): [Constraint!]

        calendarScheduledTasks(calendarID: String!): [ScheduledTask!]
    }

    type Mutation {
        createUser(input: CreateUserInput!): User
        updateUser(input: UpdateUserInput!): User
        deleteUser(id: String!): User

        createCalendar(input: CreateCalendarInput!): Calendar
        updateCalendar(input: UpdateCalendarInput!): Calendar
        deleteCalendar(id: String!): Calendar

        createTask(input: CreateTaskInput!): Task
        updateTask(input: UpdateTaskInput!): Task
        deleteTask(id: String!): Task

        createConstraint(input: CreateConstraintInput!): Constraint
        updateConstraint(input: UpdateConstraintInput!): Constraint
        deleteConstraint(id: String!): Constraint

        optimize(calendarID: String!): Boolean
    }
`

export default typeDefs
