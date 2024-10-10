const passport = require("passport");

const authenticate_and_login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      req.user = user;
      next();
    });
  })(req, res, next);
};

const is_user_role = async (req, res, next) => {
  if (req.user && req.user.role === "user") return next();
  return res.status(403).json({ message: "Only user can access" });
};

const is_admin_role = async (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ message: "Only admin can access" });
};

module.exports = { authenticate_and_login, is_user_role, is_admin_role };
