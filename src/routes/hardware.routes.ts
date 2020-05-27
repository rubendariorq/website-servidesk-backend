import { Router } from 'express';
import hardwareController from "../controllers/hardware.controller";

const router = Router();

router.route('/')
    .get(hardwareController.getAllHardware);

router.route('/filter/dependencie/:dependencie')
    .get(hardwareController.getHardwareForDependencies);

router.route('/filter/type/:typeHardware')
    .get(hardwareController.getHardwareForType);

router.route('/computers')
    .post(hardwareController.createComputer);

router.route('/computers/:inventoryPlate')
    .get(hardwareController.getComputer)
    .put(hardwareController.updateComputer);

router.route('/ups')
    .post(hardwareController.createUps);

router.route('/ups/:inventoryPlate')
    .get(hardwareController.getUps)
    .put(hardwareController.updateUps);

router.route('/peripherals')
    .post(hardwareController.createPeripheral);

export default router;