import express from "express";
import EductionalValidation from "../../validations/eductionalValidation";
import {
    CreatedAction,
    DeleteTeacherAction,
    EditAction,
    GetAllAction,
} from '../../controllers/eductionalController'
import checkAuhtUser from "../../middlewares/checkAuthUser";
const router = express.Router();
const validation = new EductionalValidation();

router.post("/create", checkAuhtUser, validation.eductionalValidation(), CreatedAction);
router.post("/edit", checkAuhtUser, validation.eductionalValidation(), EditAction);
router.get('/getAll', checkAuhtUser, GetAllAction)
router.delete('/remove', checkAuhtUser, DeleteTeacherAction)

export default router;
