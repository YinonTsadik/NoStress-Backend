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
        calendar_id: String!
        description: String!
        deadline: Date!
        work_hours: Int!
    }

    type Constraint {
        id: String!
        calendar_id: String!
        description: String!
        start_time: Date!
        end_time: Date!
        type: Type!
    }

    type ScheduledTask {
        id: String!
        description: String!
        start_time: Date!
        end_time: Date!
        hours: Int!
    }

    input CreateUserInput {
        first_name: String!
        last_name: String!
        username: String!
        password: String!
    }

    input UpdateUserInput {
        id: String!
        first_name: String
        last_name: String
        username: String
        password: String
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
        start_date: Date
        end_date: Date
    }

    input CreateTaskInput {
        calendar_id: String!
        description: String!
        deadline: Date!
        work_hours: Int!
    }

    input UpdateTaskInput {
        id: String!
        description: String
        deadline: Date
        work_hours: Int
    }

    input CreateConstraintInput {
        calendar_id: String!
        description: String!
        start_time: Date!
        end_time: Date!
        type: Type = Other
    }

    input UpdateConstraintInput {
        id: String!
        description: String
        start_time: Date
        end_time: Date
        type: Type
    }

    type Query {
        usersNames: [String!]
        checkAuthDetails(username: String!, password: String!): String

        user(id: String!): User

        calendar(id: String!): Calendar
        userCalendars(id: String!): [Calendar!]

        task(id: String!): Task
        calendarTasks(calendar_id: String!): [Task!]

        constraint(id: String!): Constraint
        calendarConstraints(calendar_id: String!): [Constraint!]

        calendarScheduledTasks(calendar_id: String!): [ScheduledTask!]
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

        optimize(calendar_id: String!): Boolean
    }
`

export default typeDefs
