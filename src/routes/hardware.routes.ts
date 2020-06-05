import { Router } from 'express';
import hardwareController from "../controllers/hardware.controller";
import hardwareForUserController from "../controllers/hardwareForUser.controller";

const router = Router();

router.route('/')
    .get(hardwareController.getAllHardware);

router.route('/:id')
    .delete(hardwareController.deleteHardware)
    .get(hardwareController.getUbication);

router.route('/filter/dependencie/:allocationStatus')
    .get(hardwareController.getHardwareForAllocationStatus);

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

router.route('/peripherals/:inventoryPlate')
    .get(hardwareController.getPeripheral)
    .put(hardwareController.updatePeripheral);

router.route('/addUbication')
    .post(hardwareForUserController.addUbicationHardware);

export default router;