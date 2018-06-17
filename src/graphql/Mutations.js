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

export const deleteUserMutation = gql`
  mutation deleteUser {
    deleteUser
  }
`;
