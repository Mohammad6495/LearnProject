import express from "express";
import FamiliarServceValidation from "../../validations/familiarServiceValidation";
import {
    CreatedAction,
    EditAction,
    GetAllAction,
    DeleteFamiliarServiceAction
} from '../../controllers/familiarServiceController'
import checkAuhtUser from "../../middlewares/checkAuthUser";
const router = express.Router();
const validation = new FamiliarServceValidation();

router.post("/create", checkAuhtUser, validation.familiarServiceValidation(), CreatedAction);
router.post("/createClient", validation.familiarServiceValidation(), CreatedAction);
router.post("/edit", checkAuhtUser, validation.familiarServiceValidation(), EditAction);
router.get('/getAll', checkAuhtUser, GetAllAction)
router.delete('/remove', checkAuhtUser, DeleteFamiliarServiceAction)

export default router;
