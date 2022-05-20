export const langReducer = (state, action) => {
  switch (action.type) {
    case "SET_LANG":
      const newLangState = { ...state, lang: action.payload };
      return action.payload === "en" ||
        action.payload === "de" ||
        action.payload === "it"
        ? newLangState
        : state;
    default:
      return state;
  }
};
