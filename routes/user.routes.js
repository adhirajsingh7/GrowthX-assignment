const router = require("express").Router();
const { user_controller } = require("../controllers");
const { authenticate_and_login, is_user_role } = require("../middleware/auth");
const { upload } = require("../middleware/multer");

router.post("/register", user_controller.register_user);
router.post("/login", authenticate_and_login, is_user_role, user_controller.login_user);
router.post("/upload", is_user_role, upload.single("file"), user_controller.upload_assignment);
router.get("/admins", user_controller.get_admins);

module.exports = router;
