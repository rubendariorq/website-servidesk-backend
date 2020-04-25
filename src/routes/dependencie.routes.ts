import { Router } from 'express';

import { getDependencies, createDependencie, findDependencie, editDependencie, deleteDependencie } from '../controllers/dependencie.controller';

const router = Router();

router.route('/')
    .get(getDependencies)
    .post(createDependencie);

router.route('/:dependencieId')
    .get(findDependencie)
    .post(editDependencie)
    .delete(deleteDependencie);

export default router;