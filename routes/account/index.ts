import express from "express";
import AccountValidation from "../../validations/accountValidation";
import {
    SignAction,
    loginAction,
    GetProfile
} from '../../controllers/accountController'
import checkAuhtUser from "../../middlewares/checkAuthUser";
const router = express.Router();
const validation = new AccountValidation();

router.post("/login", validation.signUpValidation(), loginAction);
router.get('/getprofile', checkAuhtUser, GetProfile)
// router.post("/signup", validation.signUpValidation(), SignAction);

export default router;
