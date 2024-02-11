import express from "express";
import CategoryValidation from "../../validations/categoryValidation";
import {
    ChangeIsAvailableAction,
    CreatedAction,
    DeleteCategoryAction,
    EditAction,
    GetAllAction,
    GetAllClientAction
} from '../../controllers/categoryController'
import checkAuhtUser from "../../middlewares/checkAuthUser";
const router = express.Router();
const validation = new CategoryValidation();

router.post("/create", checkAuhtUser, validation.categoryValidation(), CreatedAction);
router.post("/edit", checkAuhtUser, validation.categoryValidation(), EditAction);
router.get('/getAll', checkAuhtUser, GetAllAction)
router.get('/getAllClient', GetAllClientAction)
router.post('/changeavailable', checkAuhtUser, ChangeIsAvailableAction)
router.delete('/remove', checkAuhtUser, DeleteCategoryAction)

export default router;
