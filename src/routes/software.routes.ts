import { Router } from "express";
import softwareController from "../controllers/software.controller";

const router = Router();

router.route('/')
    .post(softwareController.addSoftware);

export default router;