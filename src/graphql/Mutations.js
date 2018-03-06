import gql from 'graphql-tag';

export const createGroupMutation = gql`
  mutation createGroup($groupName: String!) {
    createAnalysisGroup(name: $groupName) {
      id
      name
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

export const deleteAnalysis = gql`
  mutation deleteAnalysis($id: String!) {
    deleteAnalysis(id: $id) {
      id
      name
    }
  }
`;
