import { validators } from "./validators";

export const personalStructure = {
  analType: "ANAL_PERSONALITY_TEXT",
  formGroups: [
    {
      groupName: "names",
      groupLabel: "",
      inputs: [
        {
          value: "",
          name: "name",
          placeholder: "Jhon",
          className: "anal-group__input",
          label: "ANAL_FORM_NAME_LABEL",
          validator: validators.nameValidator
        },
        {
          value: "",
          name: "lastname",
          placeholder: "Wick",
          className: "anal-group__input",
          label: "ANAL_FORM_LASTNAME_LABEL",
          validator: validators.nameValidator
        },
        {
          value: "",
          name: "day",
          placeholder: "26",
          className: "anal-group__input anal-group__input--mw50",
          label: "",
          validator: validators.dayValidator
        },
        {
          value: "",
          name: "month",
          placeholder: "05",
          className: "anal-group__input anal-group__input--mw50",
          label: "",
          validator: validators.monthValidator
        },
        {
          value: "",
          name: "year",
          placeholder: "1986",
          className: "anal-group__input anal-group__input--mw75",
          label: "",
          validator: validators.yearValidator
        }
      ]
    }
  ]
};

export const coupleStructure = {
  analType: "ANAL_COUPLE_TEXT",
  formGroups: [
    {
      groupName: "names",
      groupLabel: "",
      inputs: [
        {
          value: "",
          name: "name",
          placeholder: "Jhon",
          className: "anal-group__input",
          label: "ANAL_FORM_NAME_LABEL",
          validator: validators.nameValidator
        },
        {
          value: "",
          name: "lastname",
          placeholder: "Wick",
          className: "anal-group__input",
          label: "ANAL_FORM_LASTNAME_LABEL",
          validator: validators.nameValidator
        },
        {
          value: "",
          name: "day",
          placeholder: "26",
          className: "anal-group__input anal-group__input--mw50",
          label: "",
          validator: validators.dayValidator
        },
        {
          value: "",
          name: "month",
          placeholder: "05",
          className: "anal-group__input anal-group__input--mw50",
          label: "",
          validator: validators.monthValidator
        },
        {
          value: "",
          name: "year",
          placeholder: "1986",
          className: "anal-group__input anal-group__input--mw75",
          label: "",
          validator: validators.yearValidator
        }
      ]
    },
    {
      groupName: "names",
      groupLabel: "",
      inputs: [
        {
          value: "",
          name: "name",
          placeholder: "Helen",
          className: "anal-group__input",
          label: "ANAL_FORM_NAME_LABEL",
          validator: validators.nameValidator
        },
        {
          value: "",
          name: "lastname",
          placeholder: "Parker",
          className: "anal-group__input",
          label: "ANAL_FORM_LASTNAME_LABEL",
          validator: validators.nameValidator
        },
        {
          value: "",
          name: "day",
          placeholder: "03",
          className: "anal-group__input anal-group__input--mw50",
          label: "",
          validator: validators.dayValidator
        },
        {
          value: "",
          name: "month",
          placeholder: "12",
          className: "anal-group__input anal-group__input--mw50",
          label: "",
          validator: validators.monthValidator
        },
        {
          value: "",
          name: "year",
          placeholder: "1995",
          className: "anal-group__input anal-group__input--mw75",
          label: "",
          validator: validators.yearValidator
        }
      ]
    }
  ]
};

export const childStructure = {
  analType: "ANAL_CHILD_TEXT",
  formGroups: [
    {
      groupName: "names",
      groupLabel: "",
      inputs: [
        {
          value: "",
          name: "name",
          placeholder: "Jhon",
          className: "anal-group__input",
          label: "ANAL_FORM_NAME_LABEL",
          validator: validators.nameValidator
        },
        {
          value: "",
          name: "lastname",
          placeholder: "Wick",
          className: "anal-group__input",
          label: "ANAL_FORM_LASTNAME_LABEL",
          validator: validators.nameValidator
        },
        {
          value: "",
          name: "day",
          placeholder: "26",
          className: "anal-group__input anal-group__input--mw50",
          label: "",
          validator: validators.dayValidator
        },
        {
          value: "",
          name: "month",
          placeholder: "05",
          className: "anal-group__input anal-group__input--mw50",
          label: "",
          validator: validators.monthValidator
        },
        {
          value: "",
          name: "year",
          placeholder: "1986",
          className: "anal-group__input anal-group__input--mw75",
          label: "",
          validator: validators.yearValidator
        }
      ]
    },
    {
      groupName: "altnames",
      groupLabel: "",
      inputs: [
        {
          value: "",
          name: "altname",
          placeholder: "",
          className: "anal-group__input",
          label: "ANAL_FORM_ALTNAME_LABEL",
          validator: validators.altNameValidator
        },
        {
          value: "",
          name: "altlastname",
          placeholder: "",
          className: "anal-group__input",
          label: "ANAL_FORM_ALTLASTNAME_LABEL",
          validator: validators.altLastnameValidator
        }
      ]
    },
    {
      groupName: "names",
      groupLabel: "",
      inputs: [
        {
          value: "",
          name: "name",
          placeholder: "",
          className: "anal-group__input",
          label: "ANAL_FORM_PARENT_1_NAME_LABEL",
          validator: validators.nameValidator
        },
        {
          value: "",
          name: "lastname",
          placeholder: "",
          className: "anal-group__input",
          label: "ANAL_FORM_PARENT_1_LASTNAME_LABEL",
          validator: validators.nameValidator
        },
        {
          value: "",
          name: "day",
          placeholder: "",
          className: "anal-group__input anal-group__input--mw50",
          label: "",
          validator: validators.dayValidator
        },
        {
          value: "",
          name: "month",
          placeholder: "",
          className: "anal-group__input anal-group__input--mw50",
          label: "",
          validator: validators.monthValidator
        },
        {
          value: "",
          name: "year",
          placeholder: "",
          className: "anal-group__input anal-group__input--mw75",
          label: "",
          validator: validators.yearValidator
        }
      ]
    },
    {
      groupName: "names",
      groupLabel: "",
      inputs: [
        {
          value: "",
          name: "name",
          placeholder: "",
          className: "anal-group__input",
          label: "ANAL_FORM_PARENT_2_NAME_LABEL",
          validator: validators.nameValidator
        },
        {
          value: "",
          name: "lastname",
          placeholder: "",
          className: "anal-group__input",
          label: "ANAL_FORM_PARENT_2_LASTNAME_LABEL",
          validator: validators.nameValidator
        },
        {
          value: "",
          name: "day",
          placeholder: "",
          className: "anal-group__input anal-group__input--mw50",
          label: "",
          validator: validators.dayValidator
        },
        {
          value: "",
          name: "month",
          placeholder: "",
          className: "anal-group__input anal-group__input--mw50",
          label: "",
          validator: validators.monthValidator
        },
        {
          value: "",
          name: "year",
          placeholder: "",
          className: "anal-group__input anal-group__input--mw75",
          label: "",
          validator: validators.yearValidator
        }
      ]
    }
  ]
};

export const altNames = {
  groupName: "altnames",
  groupLabel: "",
  inputs: [
    {
      value: "",
      name: "altname",
      placeholder: "",
      className: "anal-group__input",
      label: "ANAL_FORM_ALTNAME_LABEL",
      validator: validators.altNameValidator
    },
    {
      value: "",
      name: "altlastname",
      placeholder: "",
      className: "anal-group__input",
      label: "ANAL_FORM_ALTLASTNAME_LABEL",
      validator: validators.altLastnameValidator
    }
  ]
};
