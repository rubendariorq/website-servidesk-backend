import { Router } from "express";
import licenseController from "../controllers/license.controller";

const router = Router();

router.route('/')
    .post(licenseController.addLicense)
    .get(licenseController.getLicenses)
    .put(licenseController.editLicense);

router.route('/:id')
    .get(licenseController.getLicense)
    .delete(licenseController.deleteLicense);

export default router;