const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to assignment app" });
});

router.use("/api/user", require("./user.routes"));
router.use("/api/admin", require("./admin.routes"));

// Authentication routes
router.use("/api/auth", require("./auth.routes"));

module.exports = router;
