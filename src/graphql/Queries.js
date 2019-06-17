import gql from 'graphql-tag';

export const currentWindowToken = gql`
  query windowToken($windowToken: String!) {
    windowToken(windowToken: $windowToken) {
      id
      userId
      wpOrderId
      windowToken
    }
  }
`;

export const currentUserQuery = gql`
  query currentUser {
    currentUser {
      email
      wpAccessToken
      wpTokenExpiredAt
      canPrint
      groups {
        id
        name
        isDefault
      }
      analyses {
        id
        name
        usedCreditType
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
        type
        total
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
        bookReference
        onlyInPro
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
        bookReferenceIndex
        highlighted
        compareIndices
        onlyInPro
      }
    }
  }
`;

export const personalAnalysisFragment = gql`
  fragment PersonalAnalysisResultParts on PersonalAnalysisResult {
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
  ${analysisPartsFragment}
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
      ...PersonalAnalysisResultParts
    }
  }
  ${personalAnalysisFragment}
`;

export const personalResultsByIdQuery = gql`
  query personalAnalysisResultById(
    $id: Int!
    $longTexts: Boolean!
  ) {
    personalAnalysis: personalAnalysisResultById(
      id: $id
      longTexts: $longTexts
    ) {
      analysis {
        id
        name
      }
      ...PersonalAnalysisResultParts
    }
  }
  ${personalAnalysisFragment}
`;
