const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys.config");

// Load input validation
const validateRegisterInput = require("../validation/register.validation");
const validateLoginInput = require("../validation/login.validation");

// Load user model
const User = require("../models/user.model");

const router = express.Router();

router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const createUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });

      // Hash password before saving in DB
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(createUser.password, salt, (err, hash) => {
          if (err) throw err;
          createUser.password = hash;
          createUser
            .save()
            .then((user) => res.json())
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// ROUTE Post api/users/login
// DESC Login user & return JWT token
// ACCESS Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const paylaod = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
        // Sign token
        jwt.sign(
          paylaod,
          keys.secretOrKey,
          {
            expiresIn: 7776000, // 90days in seconds
          },
          (err, token) => {
            res.json(token);
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordIncorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
