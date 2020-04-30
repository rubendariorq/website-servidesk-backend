import { Router } from 'express';

import dependencieController from '../controllers/dependencie.controller';

const router = Router();

router.route('/')
    .get(dependencieController.getDependencies)
    .post(dependencieController.createDependencie);

router.route('/:dependencieId')
    .get(dependencieController.findDependencie)
    .put(dependencieController.editDependencie)
    .delete(dependencieController.deleteDependencie);

export default router;