import {
  personalStructure,
  coupleStructure,
  childStructure,
  altNames
} from "../utils/formStructure";

export const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_PERSONAL_TYPE":
      const personalState = JSON.parse(JSON.stringify(personalStructure));
      return personalState;
    case "SET_COUPLE_TYPE":
      const coupleState = JSON.parse(JSON.stringify(coupleStructure));
      return coupleState;
    case "SET_CHILD_TYPE":
      const childState = JSON.parse(JSON.stringify(childStructure));
      return childState;
    case "PUSH_PERSONAL_ALTNAMES":
      const existAltnames = state.formGroups.find(
        group => group.groupName === "altnames"
      );
      if (!existAltnames) {
        const altnames = JSON.parse(JSON.stringify(altNames));
        const stateWithAltnames = {
          ...state,
          formGroups: [...state.formGroups, altnames]
        };
        return stateWithAltnames;
      }
      return state;
    default:
      return state;
  }
};
