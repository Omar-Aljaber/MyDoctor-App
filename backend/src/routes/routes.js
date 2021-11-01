import express from "express";
import * as userController from "../controllers/userController";
import * as doctorController from "../controllers/doctorController";
import isLoggend from "../middlewares/auth";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to my Application!" });
});


/**
 * User routes
 */
router.post("/account/signup", userController.register);
router.post("/account/signin", userController.login);
router.get("/account/me", isLoggend, userController.me);
router.get("/account/profile", isLoggend, userController.profile);

/**
 * Doctor routes
 */
router.get("/doctors", doctorController.index);

export default router;
