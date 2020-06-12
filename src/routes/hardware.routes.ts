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
    .post(hardwareController.createComputer)
    .put(hardwareForUserController.deallocateComputer);

router.route('/computer')
    .put(hardwareController.updateNetworkConfiguration);

router.route('/computers/:inventoryPlate')
    .get(hardwareController.getComputer)
    .put(hardwareController.updateComputer);

router.route('/computersForUser/:idUser')
    .get(hardwareForUserController.getComputerForUser);

router.route('/userForComputer/:idComputer')
    .get(hardwareForUserController.getUserForComputerAllocated);

router.route('/ups')
    .post(hardwareController.createUps)
    .put(hardwareForUserController.deallocateUps);

router.route('/ups/:inventoryPlate')
    .get(hardwareController.getUps)
    .put(hardwareController.updateUps);

router.route('/peripherals')
    .post(hardwareController.createPeripheral)
    .put(hardwareForUserController.deallocatePeripheral);

router.route('/peripheralsAddUbicationAndLinkComputer')
    .post(hardwareForUserController.addUbicationPeripherialAndLinkComputer);

router.route('/peripheralsAddUbication')
    .post(hardwareForUserController.addUbicationPeripherial);

router.route('/peripherals/:inventoryPlate')
    .get(hardwareController.getPeripheral)
    .put(hardwareController.updatePeripheral);

router.route('/addUbication')
    .post(hardwareForUserController.addUbicationHardware);

router.route('/addUbication/computer')
    .post(hardwareForUserController.addUbicationComputer);

router.route('/printers/:idComp')
    .get(hardwareController.getPrintersForComputer)
    .delete(hardwareForUserController.disconetPeripheral);

router.route('/printersUbication/:idPrinter')
    .get(hardwareController.getUbicationPrinter);

export default router;