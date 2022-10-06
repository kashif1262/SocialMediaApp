import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import LockOutlineIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./authStyles";
import Input from "./Input";
const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const isSignup = false;

  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () => {};
  return (
    <Container component="main" maxWidth="ws">
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
                />
                <Input
                  name="firstName"
                  label="First name"
                  handleChange={handleChange}
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
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
