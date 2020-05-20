import { Router } from 'express';
import hardwareController from "../controllers/hardware.controller";

const router = Router();

router.route('/computers')
    .post(hardwareController.createComputer);

export default router;