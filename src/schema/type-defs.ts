import { gql } from 'apollo-server'

const typeDefs = gql`
    scalar Date

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

    enum constraint_type {
        Studies
        Test
        Work
        Event
        Rest
        Other
    }

    type Constraint {
        id: String!
        user_id: String!
        description: String!
        type: constraint_type!
        start_time: Date!
        end_time: Date!
    }

    type Query {
        users: [User!]!
        tasks: [Task!]!
        constraints: [Constraint!]!
    }
`

export { typeDefs }
