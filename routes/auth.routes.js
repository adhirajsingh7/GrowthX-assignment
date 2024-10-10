const router = require("express").Router();

// To check current status of logged in user
router.post("/status", (req, res, next) => {
  console.log(req.user);
  console.log("====================");
  console.log(req.session);
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

// To logout user
router.post("/logout", (req, res, next) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((error) => {
    if (error) return res.sendStatus(401);
    return res.sendStatus(200);
  });
});

module.exports = router;
