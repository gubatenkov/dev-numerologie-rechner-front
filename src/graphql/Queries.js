import gql from 'graphql-tag';
// disabling frament warning caused by dynamic query building (pdf vs web)
// see here for more information: https://github.com/apollographql/graphql-tag/issues/269
import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings()


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
      wpAccessToken
      wpTokenExpiredAt
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
      inputs {
        firstNames
        lastName
        dateOfBirth
      }
    }
  }
`;

// queries the current user's result configuration
export const currentUserBasicQuery = gql`
  query currentUserResultConfiguration {
    currentUser {
      email
      resultConfiguration
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
export const webDefaultAnalysisResultItemFragment = gql`
  fragment DefaultAnalysisResultItemFragment on DefaultAnalysisResultItem {
    type
    name
    numberId
    descriptionText
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
export const pdfDefaultAnalysisResultItemFragment = gql`
  fragment DefaultAnalysisResultItemFragment on DefaultAnalysisResultItem {
    type
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

// result fragment for default analysis result item for the analysis on the web (not pdf)
export const webCustomAnalysisResultItemFragment = gql`
  fragment CustomAnalysisResultItemFragment on CustomAnalysisResultItem {
    type
    numberId
    values
    highlighted
    descriptionTextIndex
    bookReferenceIndex
    nameIndex
    valueIndex
    compareIndices
  }
`;

// result fragment for default analysis result item for the analysis in a pdf to be generated
export const pdfCustomAnalysisResultItemFragment = gql`
  fragment CustomAnalysisResultItemFragment on CustomAnalysisResultItem {
    type
    numberId
    values
    highlighted
    descriptionTextIndex
    bookReferenceIndex
    nameIndex
    valueIndex
    compareIndices
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
      az {
        ...DefaultAnalysisResultItemFragment
      }
      lz {
        ...DefaultAnalysisResultItemFragment
      }
      bz {
        ...DefaultAnalysisResultItemFragment
      }
      nnz {
        ...DefaultAnalysisResultItemFragment
      }
      wz {
        ...DefaultAnalysisResultItemFragment
      }
      iz {
        ...DefaultAnalysisResultItemFragment
      }
      gz {
        ...DefaultAnalysisResultItemFragment
      }
      gdr {
        gdr {
          ...DefaultAnalysisResultItemFragment
        }
        gdrv {
          ...DefaultAnalysisResultItemFragment
        }
        gdrf {
          ...DefaultAnalysisResultItemFragment
        }
        gdri {
          ...DefaultAnalysisResultItemFragment
        }
      }
      visz {
        ...DefaultAnalysisResultItemFragment
      }
      tz {
        ...DefaultAnalysisResultItemFragment
      }
      kz {
        ...DefaultAnalysisResultItemFragment
      }
      bfz {
        ...DefaultAnalysisResultItemFragment
      }
      visz {
        ...DefaultAnalysisResultItemFragment
      }
      sz {
        ...DefaultAnalysisResultItemFragment
      }
      iniz {
        ...DefaultAnalysisResultItemFragment
      }
      sm {
        ...DefaultAnalysisResultItemFragment
      }
      smv {
        ...DefaultAnalysisResultItemFragment
      }
      kl {
        ...DefaultAnalysisResultItemFragment
      }
      zsa {
        ...DefaultAnalysisResultItemFragment
      }
      vz {
        vzb {
          ...CustomAnalysisResultItemFragment
        }
        vzp {
          ...CustomAnalysisResultItemFragment
        }
        vze {
          ...CustomAnalysisResultItemFragment
        }
      }
      hfhp {
        hfHp1 {
          ...CustomAnalysisResultItemFragment
        }
        hfHp2 {
          ...CustomAnalysisResultItemFragment
        }
        hfHp3 {
          ...CustomAnalysisResultItemFragment
        }
        hfHp4 {
          ...CustomAnalysisResultItemFragment
        }
      }
      pj {
        pj {
          ...CustomAnalysisResultItemFragment
        }
        pjnj {
          ...CustomAnalysisResultItemFragment
        }
      }
    }
    ${isPdf
    ? pdfDefaultAnalysisResultItemFragment
    : webDefaultAnalysisResultItemFragment}
    ${isPdf
    ? pdfCustomAnalysisResultItemFragment
    : webCustomAnalysisResultItemFragment}
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
  query personalAnalysesById($id: ID!, $isPdf: Boolean!, $longTexts: Boolean!) {
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
