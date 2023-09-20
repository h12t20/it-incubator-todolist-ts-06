import { useAppDispatch, useAppSelector } from "app/hook";
import { useFormik } from "formik";
import { login } from "./auth-reducer";
import { isLoggedInSelector } from "app/selectors";

type FormikErrorType = {
  email?: string;
  password?: string;
};
export const useLogin = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
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
    onSubmit: (values) => {
      dispatch(login(values));
      formik.resetForm();
    },
  });
  return {
    formik,
    isLoggedIn,
  };
};
