import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import GoogleLogin from "react-google-login";
import LockOutlineIcon from "@material-ui/icons/LockOutlined";
import Icon from "./icon";
import { gapi } from "gapi-script";
import useStyles from "./authStyles";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const Client_id =
    "1071299956511-phhrl89kckduo9015uh7bvhpjbk181j5.apps.googleusercontent.com";
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useNavigate();
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const switchMode = () => {
    setIsSignup((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
    console.log(formData);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const googleSussess = async (res) => {
    const result = res?.profileObj; //chaining oprator resolve this connot get property profileObj of undefind
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history("/");
    } catch (error) {
      console.log(error);
    }
    console.log(res);
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was Unsuccessfull. Try Again Leter");
  };
  useEffect(() => {
    gapi.load("client:auth2", () => gapi.auth2.init({ clientId: Client_id }));
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlineIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "sign up" : "sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First name"
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="lastName"
                  label="First name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign up" : "Sign in"}
          </Button>
          <GoogleLogin
            clientId={Client_id}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSussess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
            scope="profile"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Allready have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
