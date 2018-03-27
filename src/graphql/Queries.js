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

// queries for getting results from server
export const analysisPartsFragment = gql`
  fragment AnalysisParts on AnalysisResult {
    introText {
      title
      text
    }
    name
    headings
    numbers {
      ... on DefaultAnalysisResultItem {
        name
        id
        highlighted
        descriptionText
        type
        result {
          ... on AnalysisResultValueNumber {
            type
            value
          }
          ... on AnalysisResultValueMatrix {
            type
            values
            dimensions {
              rows
              cols
            }
            highlighted
          }
          ... on AnalysisResultValueList {
            type
            list
          }
        }
      }
      ... on CustomAnalysisResultItem {
        type
        id
        values
        nameIndex
        valueIndex
        descriptionTextIndex
        highlighted
      }
    }
  }
`;

export const personalResultsQuery = gql`
  query personalAnalysis(
    $firstNames: String!
    $lastName: String!
    $dateOfBirth: String!
  ) {
    personalAnalysis(
      firstNames: $firstNames
      lastName: $lastName
      dateOfBirth: $dateOfBirth
    ) {
      analysisIntro {
        title
        text
      }
      expressionLevel {
        ...AnalysisParts
      }
      personalLevel {
        ...AnalysisParts
      }
      developmentLevel {
        ...AnalysisParts
      }
      soulLevel {
        ...AnalysisParts
      }
      vibratoryCycles {
        ...AnalysisParts
      }
      challengesHighs {
        ...AnalysisParts
      }
      personalYear {
        ...AnalysisParts
      }
    }
  }
  ${analysisPartsFragment}
`;
