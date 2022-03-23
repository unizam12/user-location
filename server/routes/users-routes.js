const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/users-contollers");
const fileUpload = require("../middleware/file-upload");

router.get("/", userControllers.getUsers);
router.post("/signup", fileUpload.single("image"), userControllers.singup);
router.post("/login", userControllers.login);

module.exports = router;
