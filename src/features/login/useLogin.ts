import { useAppDispatch, useAppSelector } from "common/hooks/hook";
import { useFormik } from "formik";
import { login } from "./auth-reducer";
import { captchaURLSelector, isLoggedInSelector } from "common/selectors/selectors";
import { BaseResponse } from "../../common/types/types";
import { LoginParamsType } from "./auth-api";

type FormikErrorType = Partial<LoginParamsType>;
export const useLogin = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const captchaURL = useAppSelector(captchaURLSelector);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
      captcha: "",
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (values.password.length < 4) errors.password = "Must be more then 3 characters";
      return errors;
    },
    onSubmit: (values, formikHelpers) => {
      formikHelpers.setFieldTouched("email", true, true).then();
      formikHelpers.setFieldTouched("password", true, true).then();
      dispatch(login(values))
        .unwrap()
        .then(() => formik.resetForm())
        .catch((error: BaseResponse) => {
          formikHelpers.setFieldTouched("email", true, false).then();
          formikHelpers.setFieldTouched("password", true, false).then();
          error.fieldsErrors?.forEach((f) => {
            formikHelpers.setFieldError(f.field, f.error);
          });
          if (error.messages) formikHelpers.setFieldError("password", error.messages[0]);
        });
    },
  });
  return {
    formik,
    isLoggedIn,
    captchaURL,
  };
};
