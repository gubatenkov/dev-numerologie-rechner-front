import gql from "graphql-tag";
// disabling frament warning caused by dynamic query building (pdf vs web)
// see here for more information: https://github.com/apollographql/graphql-tag/issues/269
import { disableFragmentWarnings } from "graphql-tag";

disableFragmentWarnings();

// query for the window token used to identify purchases with open shop windows
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

// queries the current user with needed properties
export const currentUserQuery = gql`
  query currentUser {
    currentUser {
      email
      resultConfiguration
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

// queries the current user's result configuration
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

// queries the current user with needed properties
export const introTextQuery = gql`
  query introText(
    $sectionIds: [String!]!
    $isPdf: Boolean!
    $longText: Boolean!
  ) {
    introTexts(sectionIds: $sectionIds, isPdf: $isPdf, longText: $longText) {
      sectionId
      title
      text
    }
  }
`;

// result fragment for default analysis result item for the analysis on the web (not pdf)
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

// result fragment for default analysis result item for the analysis in a pdf to be generated
export const pdfAnalysisResultItemFragment = gql`
  fragment AnalysisResultItemFragment on AnalysisResultItem {
    name
    numberId
    descriptionText
    bookReference
    numberDescription {
      description
      calculationDescription
    }
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

/**
 * generates the result fragment for a personal analysis result
 * @param {Boolean} isPdf true if the result is used for a pdf generation, false else
 * @returns a gql fragment of the personal analysis result
 */
export function buildPersonalAnalysisResultFragment(isPdf) {
  return gql`
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
    ${isPdf ? pdfAnalysisResultItemFragment : webAnalysisResultItemFragment}
  `;
}

/**
 * generates the query for the results of a personal analysis by name (=input parameters are name and dob)
 * @param {Boolean} forPdf true if inteded for generating pdfs, false else
 * @returns a graphql query object
 */
export function buildPersonalAnalysisByNameQuery(isPdf) {
  return gql`
    query personalAnalysesByNames($inputs: [AnalysisInput!]!) {
      personalAnalysisResults: personalAnalysesByNames(inputs: $inputs) {
        ...PersonalAnalysisResultFragment
      }
    }
    ${buildPersonalAnalysisResultFragment(isPdf)}
  `;
}

/**
 * generates the query for the results of a personal analysis by id (=id of existing analysis)
 * @param {Boolean} forPdf true if inteded for generating pdfs, false else
 * @returns a graphql query object
 */
export function buildPersonalAnalysisByIdQuery(isPdf) {
  return gql`
    query personalAnalysesById(
      $id: ID!
      $isPdf: Boolean!
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
        personalAnalysisResults(isPdf: $isPdf, longTexts: $longTexts) {
          ...PersonalAnalysisResultFragment
        }
      }
    }
    ${buildPersonalAnalysisResultFragment(isPdf)}
  `;
}
