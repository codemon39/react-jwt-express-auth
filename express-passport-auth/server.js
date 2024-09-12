const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const authRouter = require("./routes/authRouter");
const proRouter = require("./routes/proRouter");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
//DB Config
const db = require("./config/keys.config").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passsport Middleware
app.use(passport.initialize());

// Passport config
require("./config/passport.config")(passport);

// Routes
app.use(authRouter);
app.use(proRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port}!`));
