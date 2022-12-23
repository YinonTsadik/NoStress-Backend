import { gql } from 'apollo-server'

const typeDefs = gql`
    scalar Date

    enum Type {
        Studies
        Test
        Work
        Event
        Rest
        Other
    }

    type User {
        id: String!
        first_name: String!
        last_name: String!
        username: String!
        password: String!
        birthday: Date
    }

    type Calendar {
        id: String!
        user_id: String!
        name: String!
        start_date: Date!
        end_date: Date!
    }

    type Task {
        id: String!
        user_id: String!
        calendar_id: String!
        description: String!
        deadline: Date!
        hours: Int!
    }

    type Constraint {
        id: String!
        user_id: String!
        calendar_id: String!
        description: String!
        type: Type!
        start_time: Date!
        end_time: Date!
    }

    input CreateUserInput {
        first_name: String!
        last_name: String!
        username: String!
        password: String!
        birthday: Date
    }

    input UpdateUserInput {
        id: String!
        first_name: String
        last_name: String
        username: String
        password: String
        birthday: Date
    }

    input CreateCalendarInput {
        user_id: String!
        name: String!
        start_date: Date!
        end_date: Date!
    }

    input UpdateCalendarInput {
        id: String!
        name: String
        start_time: Date
        end_time: Date
    }

    input CreateTaskInput {
        user_id: String!
        calendar_id: String!
        description: String!
        deadline: Date!
        hours: Int!
    }

    input UpdateTaskInput {
        id: String!
        description: String
        deadline: Date
        hours: Int
    }

    input CreateConstraintInput {
        user_id: String!
        calendar_id: String!
        description: String!
        type: Type = Other
        start_time: Date!
        end_time: Date!
    }

    input UpdateConstraintInput {
        id: String!
        description: String
        type: Type
        start_time: Date
        end_time: Date
    }

    type Query {
        users: [User!]
        user(id: String!): User

        calendars: [Calendar!]
        calendar(id: String!): Calendar

        tasks: [Task!]
        task(id: String!): Task
        userTasks(user_id: String!): [Task!]
        calendarTasks(calendar_id: String!): [Task!]

        constraints: [Constraint!]
        constraint(id: String!): Constraint
        userConstraints(user_id: String!): [Constraint!]
        calendarConstraints(calendar_id: String!): [Constraint!]
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

        optimize(calendar_id: String!): String!
    }
`

export { typeDefs }
