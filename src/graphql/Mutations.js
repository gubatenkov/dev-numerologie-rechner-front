import gql from 'graphql-tag';

export const createGroupMutation = gql`
  mutation createGroup($groupName: String!) {
    createAnalysisGroup(name: $groupName) {
      id
      name
      isDefault
    }
  }
`;

export const deleteGroupMutation = gql`
  mutation deleteGroup($id: String!) {
    deleteAnalysisGroup(id: $id) {
      id
      name
    }
  }
`;

export const renameGroupMutation = gql`
  mutation renameGroup($id: ID!, $newName: String!) {
    renameAnalysisGroup(id: $id, newName: $newName) {
      id
      name
    }
  }
`;

export const deleteAnalysisMutation = gql`
  mutation deleteAnalysis($id: String!) {
    deleteAnalysis(id: $id) {
      id
      name
    }
  }
`;

export const saveAnalysisMutation = gql`
  mutation saveAnalysis(
    $inputs: [AnalysisInput!]!
    $name: String!
    $group: ID!
  ) {
    saveAnalysis(inputs: $inputs, name: $name, group: $group) {
      id
      name
      inputs {
        id
        lastName
        firstNames
        dateOfBirth
      }
      group {
        id
        name
      }
    }
  }
`;

export const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const signupMutation = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password)
  }
`;

export const resetPasswordMutation = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email)
  }
`;

export const setPasswordMutation = gql`
  mutation setPassword($token: String!, $newPassword: String!) {
    setPassword(token: $token, newPassword: $newPassword)
  }
`;
