import { Router } from 'express';
import hardwareController from "../controllers/hardware.controller";

const router = Router();

router.route('/computers')
    .post(hardwareController.createComputer);

router.route('/ups')
    .post(hardwareController.createUps);

router.route('/peripherals')
    .post(hardwareController.createPeripheral);

export default router;