import { gql } from "@apollo/client";

const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

const CREATE_COURSE_RESULT = gql`
  mutation CreateCourseResult($name: String!, $score: Int!, $learnerId: ID!) {
    createCourseResult(name: $name, score: $score, learnerId: $learnerId) {
      id
      name
      score
      learnerId
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
      email
    }
  }
`;

const DELETE_COURSE_RESULT = gql`
  mutation DeleteCourseResult($id: ID!) {
    deleteCourseResult(id: $id)
  }
`;


const UPDATE_COURSE_RESULT = gql`
  mutation UpdateCourseResult($id: ID!, $name: String!, $score: Int!) {
    updateCourseResult(id: $id, name: $name, score: $score) {
      id
      name
      score
      learnerId
    }
  }
`;

export { UPDATE_USER, DELETE_USER, CREATE_COURSE_RESULT, CREATE_USER, DELETE_COURSE_RESULT, UPDATE_COURSE_RESULT }