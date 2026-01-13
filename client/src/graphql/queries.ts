import { gql } from "@apollo/client";

const GET_USER_BY_ID = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;

const GET_COURSE_RESULTS_BY_USER = gql`
  query CourseResultsByUser($userId: ID!) {
    courseResultsByUser(userId: $userId) {
      id
      name
      score
    }
  }
`;

const GET_USERS = gql`
  query GetUsers {
    usersCount
    users {
      id
      firstName
      lastName
      email
      courseResults {
        name
      }
    }
  }
`;


const GET_COURSES = gql`
  query GetCourses {
    courseResults {
      id
      name
    }
  }
`;



export { GET_USER_BY_ID, GET_COURSE_RESULTS_BY_USER, GET_USERS, GET_COURSES }