const { admin_controller } = require("../controllers");
const { authenticate_and_login, is_admin_role } = require("../middleware/auth");
const router = require("express").Router();

router.post("/register", admin_controller.register_admin);
router.post("/login", authenticate_and_login, is_admin_role, admin_controller.login_admin);
router.get("/assignments", is_admin_role, admin_controller.get_assignments);
router.post("/assignments/:id/accept", is_admin_role, admin_controller.accept_assignment);
router.post("/assignments/:id/reject", is_admin_role, admin_controller.reject_assignment);

module.exports = router;
