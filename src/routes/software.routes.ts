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

router.route('/filter/:typeSoftware')
    .get(softwareController.getSoftwareForType);

router.route('/install')
    .post(softwareController.installSoftware);

router.route('/uninstall')
    .post(softwareController.deleteSoftwareInstalled);

router.route('/install/:inventoryPlate')
    .get(softwareController.getSoftwareInstalledForComputer);

export default router;