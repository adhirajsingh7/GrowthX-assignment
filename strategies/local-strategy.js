const passport = require("passport");
const { Strategy } = require("passport-local");
const { User } = require("../models/user");

passport.serializeUser((user, done) => {
  console.log("userID: ", user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new Strategy({ usernameField: "email" }, async (username, password, done) => {
    console.log("password: ", password);
    console.log("username: ", username);
    try {
      const user = await User.findOne({ email: username });
      if (!user) return done(null, false, { message: "User not found" });

      const is_password_valid = await user.is_password_correct(password);
      if (!is_password_valid)
        return done(null, false, { message: "Password is incorrect" });
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  })
);
