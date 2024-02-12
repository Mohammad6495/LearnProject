import express from "express";
import REquestCourseValidation from "../../validations/requestCourseValidation";
import {
    CreatedAction,
    EditAction,
    GetAllAction,
    DeleteRequestCourseAction,
    DetailRequestCourseAction
} from '../../controllers/requestCourseController'
import checkAuhtUser from "../../middlewares/checkAuthUser";
const router = express.Router();
const validation = new REquestCourseValidation();

router.post("/create", checkAuhtUser, validation.requestCourseValidation(), CreatedAction);
router.post("/createClient", validation.requestCourseValidation(), CreatedAction);
router.post("/edit", checkAuhtUser, validation.requestCourseValidation(), EditAction);
router.get('/getAll', checkAuhtUser, GetAllAction)
router.delete('/remove', checkAuhtUser, DeleteRequestCourseAction)
router.post('/detail', checkAuhtUser, DetailRequestCourseAction)

export default router;
