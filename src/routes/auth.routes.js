import { Router } from "express";
const router = Router();
import * as authCtrl from '../controllers/auth.controller'
import { verifySignup } from '../middlewares'


router.post('/signin', authCtrl.signin);
router.post('/signup', verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExist, authCtrl.signup);

export default router;