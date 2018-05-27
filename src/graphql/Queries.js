import gql from 'graphql-tag';

export const currentUserQuery = gql`
  query currentUser {
    currentUser {
      email
      canPrint
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
        numberId
        highlighted
        descriptionText
        numberDescription {
          description
          calculationDescription
        }
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
        numberId
        values
        nameIndex
        valueIndex
        descriptionTextIndex
        highlighted
        compareIndices
      }
    }
  }
`;

export const personalResultsQuery = gql`
  query personalAnalysis(
    $firstNames: String!
    $lastName: String!
    $dateOfBirth: String!
    $longTexts: Boolean!
  ) {
    personalAnalysis(
      firstNames: $firstNames
      lastName: $lastName
      dateOfBirth: $dateOfBirth
      longTexts: $longTexts
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
