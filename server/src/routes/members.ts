import { Router } from 'express';

import { getMemberTweetsById } from '../controllers/memberController';
import { getMember } from '../controllers/memberController';
import { isAuthenticatedUser } from '../middlewares/auth';

const router = Router();

router.route('/me').get(isAuthenticatedUser, getMember)

router.route('/:id').get(isAuthenticatedUser, getMember) //profile

router.route('/:id/tweets').get(isAuthenticatedUser, getMemberTweetsById)

export default router;