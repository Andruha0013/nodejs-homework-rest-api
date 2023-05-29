const express = require("express");
const userCtrl = require("../../controllers/users");
const { validateBody, authenticate, uploder } = require("../../midleware");
const { registrationSchema, loginSchema } = require("../../validation");
const { emailSchema } = require("../../validation/usersJoiSchema");
//console.log(userCtrl);

const router = express.Router();
router.post(
	"/registration",
	validateBody(registrationSchema),
	userCtrl.registration
);

router.post("/login", validateBody(loginSchema), userCtrl.login);

router.get("/verify/:verificationToken", userCtrl.verifyEmail);

router.post("/verify", validateBody(emailSchema));

router.get("/current", authenticate, userCtrl.getCurrent);

router.post("/logout", authenticate, userCtrl.logout);

router.patch(
	"/avatar",
	authenticate,
	uploder.single("avatar"),
	userCtrl.updateAvatar
);

module.exports = router;
