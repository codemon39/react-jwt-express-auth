const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (data) => {
  let errors = {};

  // Use validator function to convert empty fields to empty string
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  const Empty = (value) => {
    value === undefined ||
      value === null ||
      (typeof value === "Object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0);
  };
  // Check if name empty
  if (Empty(data.firstName)) {
    errors.firstName = "FirstName field is required";
  }
  if (Empty(data.lastName)) {
    errors.lastName = "LastName field is required";
  }

  // Check if email empty
  if (Empty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid!";
  }

  // Check if password is empty
  if (Empty(data.password)) {
    errors.password = "Password field is required";
  }

  // check if confirm password is empty
  if (Empty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }

  // Check if the password is same with the confirm password
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords are not the same!";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
