import { Router } from 'express';

import { getDependencies, createDependencie } from '../controllers/dependencie.controller';

const router = Router();

router.route('/')
    .get(getDependencies)
    .post(createDependencie);


export default router;