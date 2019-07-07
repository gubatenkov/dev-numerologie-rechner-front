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
      credits {
        type
        total
      }
    }
    analyses {
      id
      name
      usedCreditType
      usedCreditTypes
      group {
        id
      }
      inputs {
        firstNames
        lastName
        dateOfBirth
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
    firstNames
    lastName
    dateOfBirth
    longTexts
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
  query personalAnalysesByNames( $inputs: [AnalysisInput!]! ) {
    personalAnalyses: personalAnalysesByNames(
      inputs: $inputs
    ) {
      ...PersonalAnalysisResultParts
    }
  }
  ${personalAnalysisFragment}
`;

export const personalResultsByIdQuery = gql`
  query analysis(
    $id: Int!
    $longTexts: Boolean!
  ) {
    analysis(id: $id) {
      id
      name
      inputs {
        firstNames
        lastName
        dateOfBirth
      }
      personalAnalysisResults(longTexts: $longTexts) {
        ...PersonalAnalysisResultParts
      }
    }
  }
  ${personalAnalysisFragment}
`;
