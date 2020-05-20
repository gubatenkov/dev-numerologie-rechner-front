import gql from "graphql-tag";
// disabling frament warning caused by dynamic query building (pdf vs web)
// see here for more information: https://github.com/apollographql/graphql-tag/issues/269
import { disableFragmentWarnings } from "graphql-tag";

disableFragmentWarnings();

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
      resultConfiguration
      wpAccessToken
      groups {
        id
        name
        isDefault
      }
      credits {
        type
        total
      }
      langId
    }
    analyses {
      id
      name
      usedCreditTypes
      group {
        id
      }
      personalAnalysisResults(isPdf: false, longTexts: false) {
        lz {
          numberId
          result {
            ... on AnalysisResultValueNumber {
              type
              value
              __typename
            }
          }
        }
      }
      inputs {
        firstNames
        lastName
        dateOfBirth
      }
    }
  }
`;

export const userSettingsQuery = gql`
  query currentUserResultConfiguration {
    currentUser {
      email
      resultConfiguration
      showBookRecommendations
      showBookReferences
      showCategoryExplanations
      showNumberMeaningExplanations
      showNumberCalculationExplanations
    }
  }
`;

export const introTextQuery = gql`
  query introText(
    $sectionIds: [String!]!
    $isPdf: Boolean!
    $longText: Boolean!
    $langId: String
  ) {
    introTexts(
      sectionIds: $sectionIds
      isPdf: $isPdf
      longText: $longText
      langId: $langId
    ) {
      sectionId
      title
      text
    }
  }
`;

export const webAnalysisResultItemFragment = gql`
  fragment AnalysisResultItemFragment on AnalysisResultItem {
    name
    numberId
    descriptionText
    numberDescription {
      description
      calculationDescription
    }
    bookReference
    highlighted
    result {
      ... on AnalysisResultValueNumber {
        type
        value
      }
      ... on AnalysisResultValueList {
        type
        list
      }
      ... on AnalysisResultValueMatrix {
        type
        dimensions {
          rows
          cols
        }
        values
        highlighted
      }
    }
  }
`;

export const buildPersonalAnalysisResultFragment = gql`
  fragment PersonalAnalysisResultFragment on PersonalAnalysisResult {
    firstNames
    lastName
    dateOfBirth
    accessLevel
    az {
      ...AnalysisResultItemFragment
    }
    lz {
      ...AnalysisResultItemFragment
    }
    bz {
      ...AnalysisResultItemFragment
    }
    nnz {
      ...AnalysisResultItemFragment
    }
    wz {
      ...AnalysisResultItemFragment
    }
    iz {
      ...AnalysisResultItemFragment
    }
    gz {
      ...AnalysisResultItemFragment
    }
    gdr {
      gdr {
        ...AnalysisResultItemFragment
      }
      gdrv {
        ...AnalysisResultItemFragment
      }
      gdrf {
        ...AnalysisResultItemFragment
      }
      gdri {
        ...AnalysisResultItemFragment
      }
    }
    visz {
      ...AnalysisResultItemFragment
    }
    tz {
      ...AnalysisResultItemFragment
    }
    kz {
      ...AnalysisResultItemFragment
    }
    bfz {
      ...AnalysisResultItemFragment
    }
    visz {
      ...AnalysisResultItemFragment
    }
    sz {
      ...AnalysisResultItemFragment
    }
    iniz {
      ...AnalysisResultItemFragment
    }
    sm {
      ...AnalysisResultItemFragment
    }
    smv {
      ...AnalysisResultItemFragment
    }
    kl {
      ...AnalysisResultItemFragment
    }
    zsa {
      ...AnalysisResultItemFragment
    }
    vz {
      vzb {
        ...AnalysisResultItemFragment
      }
      vzp {
        ...AnalysisResultItemFragment
      }
      vze {
        ...AnalysisResultItemFragment
      }
    }
    hfhp {
      hf {
        ...AnalysisResultItemFragment
      }
      hf1 {
        ...AnalysisResultItemFragment
      }
      hf2 {
        ...AnalysisResultItemFragment
      }
      hf3 {
        ...AnalysisResultItemFragment
      }
      hf4 {
        ...AnalysisResultItemFragment
      }
      hp {
        ...AnalysisResultItemFragment
      }
      hp1 {
        ...AnalysisResultItemFragment
      }
      hp2 {
        ...AnalysisResultItemFragment
      }
      hp3 {
        ...AnalysisResultItemFragment
      }
      hp4 {
        ...AnalysisResultItemFragment
      }
    }
    pj {
      pj {
        ...AnalysisResultItemFragment
      }
      pjnj {
        ...AnalysisResultItemFragment
      }
    }
  }
  ${webAnalysisResultItemFragment}
`;

export const buildPersonalAnalysisByNameQuery = gql`
  query personalAnalysesByNames($inputs: [AnalysisInput!]!, $langId: String) {
    analysisConfiguration(langId: $langId) {
      name
      color
      tables {
        name
        numberIds
        showTitle
      }
    }
    personalAnalysisResults: personalAnalysesByNames(
      inputs: $inputs
      langId: $langId
    ) {
      ...PersonalAnalysisResultFragment
    }
  }
  ${buildPersonalAnalysisResultFragment}
`;

export const buildPersonalAnalysisByIdQuery = gql`
  query personalAnalysesById(
    $id: ID!
    $isPdf: Boolean!
    $longTexts: Boolean!
    $langId: String
  ) {
    analysisConfiguration(langId: $langId) {
      name
      color
      tables {
        name
        numberIds
        showTitle
      }
    }
    analysis(id: $id) {
      id
      name
      inputs {
        firstNames
        lastName
        dateOfBirth
      }
      personalAnalysisResults(isPdf: $isPdf, longTexts: $longTexts) {
        ...PersonalAnalysisResultFragment
      }
    }
  }
  ${buildPersonalAnalysisResultFragment}
`;

export const getAnalysisPdfQuery = gql`
  query getAnalysisPdf($id: ID!, $longTexts: Boolean!) {
    getAnalysisPdf(id: $id, longText: $longTexts)
  }
`;
