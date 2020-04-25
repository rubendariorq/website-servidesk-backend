import { Router } from 'express';

import { getDependencies, createDependencie, findDependencie } from '../controllers/dependencie.controller';

const router = Router();

router.route('/')
    .get(getDependencies)
    .post(createDependencie);

router.route('/:dependencieId')
    .get(findDependencie);

export default router;