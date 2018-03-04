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
