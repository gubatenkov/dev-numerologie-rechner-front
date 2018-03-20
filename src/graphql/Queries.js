import gql from 'graphql-tag';

export const currentUserQuery = gql`
  query currentUser {
    currentUser {
      email
      groups {
        id
        name
        isDefault
      }
      analyses {
        id
        name
        group {
          id
        }
        inputs {
          firstNames
          lastName
          dateOfBirth
        }
      }
      credits {
        type {
          name
          description
        }
        value
      }
    }
  }
`;
