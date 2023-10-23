import express  from "express";
import { registerController, loginController, forgotPasswordController, updateProfileController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router obj
const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/forgot-password', forgotPasswordController)
router.put('/edit-user', requireSignIn, updateProfileController)

router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router