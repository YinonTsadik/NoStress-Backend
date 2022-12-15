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

    type Task {
        id: String!
        user_id: String!
        description: String!
        deadline: Date!
        hours: Int!
        start_time: Date
        end_time: Date
    }

    type Constraint {
        id: String!
        user_id: String!
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

    input CreateTaskInput {
        user_id: String!
        description: String!
        deadline: Date!
        hours: Int!
        start_time: Date
        end_time: Date
    }

    input UpdateTaskInput {
        id: String!
        description: String
        deadline: Date
        hours: Int
        start_time: Date
        end_time: Date
    }

    input CreateConstraintInput {
        user_id: String!
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

        tasks: [Task!]
        userTasks(user_id: String!): [Task!]
        task(id: String!): Task

        constraints: [Constraint!]
        userConstraints(user_id: String!): [Constraint!]
        constraint(id: String!): Constraint
    }

    type Mutation {
        createUser(input: CreateUserInput!): User
        updateUser(input: UpdateUserInput!): User
        deleteUser(id: String!): User

        createTask(input: CreateTaskInput!): Task
        updateTask(input: UpdateTaskInput!): Task
        deleteTask(id: String!): Task

        createConstraint(input: CreateConstraintInput!): Constraint
        updateConstraint(input: UpdateConstraintInput!): Constraint
        deleteConstraint(id: String!): Constraint
    }
`

export { typeDefs }
