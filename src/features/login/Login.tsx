import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";
import { useLogin } from "./useLogin";

export const Login = () => {
  const { formik, isLoggedIn, captchaURL } = useLogin();
  if (isLoggedIn) return <Navigate to="/" />;
  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                  {" "}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                autoComplete="on"
                type="email"
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
                onBlur={formik.handleBlur}
              ></TextField>
              {formik.errors.email && formik.touched.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}
              <TextField
                autoComplete="on"
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
                onBlur={formik.handleBlur}
              ></TextField>
              {formik.errors.password && formik.touched.password && (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              )}
              {captchaURL && <img src={captchaURL} alt={"captcha"} />}
              {captchaURL && (
                <TextField
                  autoComplete="off"
                  type="captcha"
                  label="Captcha"
                  margin="normal"
                  {...formik.getFieldProps("captcha")}
                  onBlur={formik.handleBlur}
                ></TextField>
              )}

              {/*{formik.errors.captcha && formik.touched.captcha && (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
              )*/}
              <FormControlLabel
                label="Remember me"
                control={<Checkbox />}
                {...formik.getFieldProps("rememberMe")}
                checked={formik.values.rememberMe}
              />
              <Button
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                disabled={!!formik.errors.email || !!formik.errors.password}
              >
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
