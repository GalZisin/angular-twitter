import { Router } from 'express';
import { getTweets, deleteTweet, createNewTweet, starToggle } from '../controllers/tweetController';
import { isAuthenticatedUser } from '../middlewares/auth';

const router = Router();

router.route('/')
    .get(getTweets)
    .post(isAuthenticatedUser, createNewTweet)

router.route('/:id').delete(isAuthenticatedUser, deleteTweet)

router.route('/:id/star-toggle').post(isAuthenticatedUser, starToggle)
export default router;