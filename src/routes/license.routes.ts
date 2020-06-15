import { Router } from "express";
import licenseController from "../controllers/license.controller";

const router = Router();

router.route('/')
    .post(licenseController.addLicense);

export default router;