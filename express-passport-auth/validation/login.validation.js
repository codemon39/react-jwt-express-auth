const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (data) => {
  let errors = {};

  // Use validator function to convert empty fields to empty string

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Check if email is empty
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid!";
  }

  // Check if password is empty
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
