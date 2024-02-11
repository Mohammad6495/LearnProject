import express from "express";
import TeacherValidation from "../../validations/teacherValidation";
import {
    CreatedAction,
    DeleteTeacherAction,
    EditAction,
    GetAllAction
} from '../../controllers/teacherController'
import checkAuhtUser from "../../middlewares/checkAuthUser";
const router = express.Router();
const validation = new TeacherValidation();

router.post("/create", checkAuhtUser, validation.teacherValidation(), CreatedAction);
router.post("/edit", checkAuhtUser, validation.teacherValidation(), EditAction);
router.get('/getAll', checkAuhtUser, GetAllAction)
router.delete('/remove', checkAuhtUser, DeleteTeacherAction)

export default router;
