import { EMAIL_REGEX } from "./Constants";

const nameValidator = {
  required: "FIELD_REQUIRED",
  maxLength: { value: 30, message: "MAX_30_LETTERS" },
  pattern: {
    value: /^[A-Za-zÄÖÜäöüß( )-]+$/,
    message: "ONLY_LETTERS"
  }
};

const dayValidator = {
  required: "FIELD_REQUIRED",
  maxLength: { value: 2, message: "" }
};

const monthValidator = {
  required: "FIELD_REQUIRED",
  maxLength: { value: 2, message: "" }
};

const yearValidator = {
  required: "FIELD_REQUIRED",
  maxLength: { value: 4, message: "MAX_4_LETTERS" },
  pattern: {
    value: /^(192[2-9]|19[3-9][0-9]|20[0-1][0-9]|202[0-2])$/,
    message: "1922-2022"
  }
};

const altNameValidator = {
  maxLength: { value: 30, message: "MAX_30_LETTERS" },
  pattern: {
    value: /^[A-Za-zÄÖÜäöüß( )-]+$/,
    message: "ONLY_LETTERS"
  }
};

const altLastnameValidator = {
  maxLength: { value: 30, message: "MAX_30_LETTERS" },
  pattern: {
    value: /^[A-Za-zÄÖÜäöüß( )-]+$/,
    message: "ONLY_LETTERS"
  }
};

const emailValidators = {
  required: "FIELD_REQUIRED",
  maxLength: { value: 128, message: "EMAIL_CANT_BE_MORE_128" },
  pattern: { value: EMAIL_REGEX, message: "ENTER_EXISTING_EMAIL" }
};

const passwordValidators = {
  required: "FIELD_REQUIRED",
  maxLength: {
    value: 128,
    message: "PASS_CANT_BE_MORE_128"
  },
  minLength: { value: 8, message: "PASS_CANT_BE_LESS_8" }
};

export const validators = {
  nameValidator,
  dayValidator,
  monthValidator,
  yearValidator,
  altNameValidator,
  altLastnameValidator,
  emailValidators,
  passwordValidators
};
