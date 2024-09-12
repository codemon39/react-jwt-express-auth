import React, { useEffect, useState } from "react";
import {
  Avatar,
  Snackbar,
  Button,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./styles";
import Input from "../Helpers/Input";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { signUp } from "../../actions/auth";
import { SET_ERROR } from "../../constants/actionTypes";
import * as EmailValidator from "email-validator";
import Alert from "../Helpers/Alert";

const initailState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  password2: "",
};

export default function Register() {
  const { error } = useSelector((state: any) => state.error);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setForm] = useState(initailState);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
      console.log(error);
    }
  }, [error]);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setShowError(false);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (form.password !== form.password2) {
      return dispatch({
        type: SET_ERROR,
        data: { error: "Passwords are not equal" },
      });
    }
    if (!EmailValidator.validate(form.email)) {
      return dispatch({
        type: SET_ERROR,
        data: { error: "Wrong email format" },
      });
    }
    dispatch(signUp(form, history));
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          {error}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input
                name="firstName"
                required
                label="First Name"
                autoFocus
                type="text"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                required
                id="lastName"
                label="Last Name"
                name="lastName"
                type="text"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                required
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                required
                name="password"
                label="Password"
                type="password"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name="password2"
                required
                type="password"
                label="Repeat Password"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
