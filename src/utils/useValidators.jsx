import { EMAIL_REGEX } from "./Constants";
import { useTranslation } from "react-i18next";

const useValidators = () => {
  const { t } = useTranslation();

  const emailValidators = {
    required: t("FIELD_REQUIRED"),
    maxLength: { value: 128, message: t("EMAIL_CANT_BE_MORE_128") },
    pattern: { value: EMAIL_REGEX, message: t("ENTER_EXISTING_EMAIL") }
  };

  const passwordValidators = {
    required: t("FIELD_REQUIRED"),
    maxLength: {
      value: 128,
      message: t("PASS_CANT_BE_MORE_128")
    },
    minLength: { value: 8, message: t("PASS_CANT_BE_LESS_8") }
  };

  const password2Validators = {
    // required: true,
    // maxLength: 128,
    // minLength: 8
  };

  return [emailValidators, passwordValidators, password2Validators];
};

export default useValidators;
