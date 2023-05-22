const express = require("express");
const userCtrl = require("../../controllers/users");
const { validateBody, authenticate } = require("../../midleware");
const { registrationSchema, loginSchema } = require("../../validation");
console.log(userCtrl);

const router = express.Router();
//console.log(validateBody(registrationSchema));
router.post(
	"/registration",
	validateBody(registrationSchema),
	userCtrl.registration
);

router.post("/login", validateBody(loginSchema), userCtrl.login);

router.get("/current", authenticate, userCtrl.getCurrent);

router.post("/logout", authenticate, userCtrl.logout);

module.exports = router;
