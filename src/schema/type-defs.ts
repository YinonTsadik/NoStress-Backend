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

    type Query {
        users: [User!]
        user(id: String!): User

        tasks: [Task!]
        task(id: String!): Task

        constraints: [Constraint!]
        constraint(id: String!): Constraint
    }

    input CreateUserInput {
        first_name: String!
        last_name: String!
        username: String!
        password: String!
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

    input CreateConstraintInput {
        user_id: String!
        description: String!
        type: Type = Other
        start_time: Date!
        end_time: Date!
    }

    type Mutation {
        createUser(input: CreateUserInput!): User

        createTask(input: CreateTaskInput!): Task

        createConstraint(input: CreateConstraintInput!): Constraint
    }
`

export { typeDefs }
