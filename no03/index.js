const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

// เชื่อมต่อกับ mongodb
const database = process.env.MONGOLAB_URI;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ใช้งาน ejs
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));
  
app.use(passport.initialize());
app.use(passport.session());

//Routes
const loginRouter = require("./routes/login");
const productRouter = require("./routes/products");
app.use("/product", productRouter);
app.use("/", loginRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("Server has started at port " + PORT));
