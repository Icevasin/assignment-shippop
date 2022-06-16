const bcrypt = require("bcryptjs");
const { response } = require("express");
LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

const loginCheck = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //ตรวจสอบ email ว่ามีอยู่ในระบบหรือไม่

      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            //ไม่พบอีเมลในระบบ
            console.log("wrong email");
            
            return done();
          }

         

          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
               //รหัสผ่านถูกต้อง
               
              return done(null, user);
            } else {
              //รหัสผ่านไม่ตรงกัน
              console.log("Wrong password");
              
              return done();
            }
          });
        })
        .catch((error) => {
       
        console.log(error)});
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });
};

module.exports = {
  loginCheck,
};
