export const prepOptionsAnalysisByName = (params, langId) => {
  const firstNames = decodeURIComponent(params.firstNames);
  const lastNames = decodeURIComponent(params.lastNames);
  const dateOfBirth = decodeURIComponent(params.dateOfBirth);

  const options = {
    fetchPolicy: "network-only"
  };

  // if more than one first name => splitting and getting results for both names
  if (firstNames.split(",").length > 1) {
    options.variables = {
      inputs: [
        {
          firstNames: firstNames.split(",")[0],
          lastName: lastNames.split(",")[0],
          dateOfBirth
        },
        {
          firstNames: firstNames.split(",")[1],
          lastName: lastNames.split(",")[1],
          dateOfBirth
        }
      ]
    };
  } else {
    options.variables = {
      inputs: [
        {
          firstNames,
          lastName: lastNames,
          dateOfBirth
        }
      ]
    };
  }

  options.variables.langId = langId;
  options.skip = params.firstNames === undefined;
  return options;
};
