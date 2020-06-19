import { Router } from "express";
import communicationController from "../controllers/communication.controller";

const router = Router();

router.route('/')
    .post(communicationController.addCommunication);

export default router;