import express from "express";
import CourseValidation from "../../validations/courseValidation";
import {
    CreatedAction,
    DeleteTeacherAction,
    EditAction,
    GetAllAction,
    ChangeIsAvailableAction,
    GetDetailAction,
    GetAllClientAction
} from '../../controllers/courseController'
import checkAuhtUser from "../../middlewares/checkAuthUser";
import fileUpload from "../../middlewares/fileUpload";
const router = express.Router();
const validation = new CourseValidation();

router.post("/create", checkAuhtUser,fileUpload.single('image'), validation.courseValidation(), CreatedAction);
router.post("/edit", checkAuhtUser,fileUpload.single('image'), validation.courseValidation(), EditAction);
router.get('/getAll', checkAuhtUser, GetAllAction)
router.get('/getAllClient', GetAllAction)
router.delete('/remove', checkAuhtUser, DeleteTeacherAction)
router.delete('/changeavailable', checkAuhtUser, ChangeIsAvailableAction)
router.get('/detail', checkAuhtUser, GetDetailAction)
router.get('/detailClient', GetDetailAction)

export default router;
