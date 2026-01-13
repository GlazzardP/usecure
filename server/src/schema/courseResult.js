import gql from 'graphql-tag'

export default gql`
    extend type Query {
        courseResults: [CourseResult!]
        courseResultsByUser(userId: ID!): [CourseResult!]!
    }
    
    extend type User {
        courseResults: [CourseResult!]!
    }

    type CourseResult {
        id: ID
        name: String!
        score: Int!
        learnerId: ID!
    }
        

    extend type Mutation {
        createCourseResult(name: String!, score: Int!, learnerId: ID!): CourseResult
        deleteCourseResult(id: ID!): Boolean
        updateCourseResult(id: ID!, name: String!, score: Int!): CourseResult
    }
`
