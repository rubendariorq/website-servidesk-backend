import { Router } from "express";
import softwareController from "../controllers/software.controller";

const router = Router();

router.route('/')
    .get(softwareController.getAllSoftware)
    .post(softwareController.addSoftware)
    .put(softwareController.editSoftware);

router.route('/:id')
    .get(softwareController.getSoftware)
    .delete(softwareController.deleteSoftware);

export default router;