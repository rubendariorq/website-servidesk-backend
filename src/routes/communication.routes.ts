import { Router } from "express";
import communicationController from "../controllers/communication.controller";

const router = Router();

router.route('/')
    .get(communicationController.getCommunications)
    .post(communicationController.addCommunication);

router.route('/:inventoryPlate')
    .get(communicationController.getCommunication)
    .put(communicationController.updateCommunication)
    .delete(communicationController.deleteCommunication);

export default router;