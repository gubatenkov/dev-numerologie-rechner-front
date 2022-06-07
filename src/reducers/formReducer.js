import {
  personalStructure,
  coupleStructure,
  childStructure
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
    default:
      return state;
  }
};
