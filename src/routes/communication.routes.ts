import { Router } from "express";
import communicationController from "../controllers/communication.controller";

const router = Router();

router.route('/')
    .get(communicationController.getCommunications)
    .post(communicationController.addCommunication);

export default router;