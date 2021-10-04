import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import ErrorHandler from "../utils/errorHandler";
import Tweet from "../models/tweet";
import Member from "../models/member";
import IMember, { ITweet } from "../types/types";
import member from "../models/member";


// GET: /tweets
export const getTweets = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const tweets: Array<ITweet> = await Tweet.find().populate({ path: 'memberId', select: ['username', 'avatar'] })

    if (!tweets) {
        // return next(new ErrorHandler('Tweets not found', 404));
        res.status(404).json({
            message: 'Tweets not found'
        })
    }
    res.status(200).json({
        success: true,
        tweets
    })
})


export const createNewTweet = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {


    if (req.body === undefined) {
        // return next(new ErrorHandler('Bad request tweet with no content', 400));
        res.status(400).json({
            message: 'Bad request tweet with no content'
        })
    }
    const { tweetText } = req.body;

    if (tweetText.length >= 240) {
        // return next(new ErrorHandler('content must be no longer then 240 characters', 400));
        res.status(400).json({
            message: 'content must be no longer then 240 characters'
        })
    }

    let tweet: any = new Tweet();
    tweet.memberId = req?.member?.id;
    tweet.text = tweetText;


    const createdTweet = await tweet.save({ validateBeforeSave: false });
    // const memberData = await Member.findById(req.member.id);

    // await Member.findOneAndUpdate(
    //     { _id: req.member._id },
    //     { $push: { tweets: createdTweet } },
    // );

    res.status(201).json({
        success: true,
        createdTweet
    })


})

export const deleteTweet = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
        // return next(new ErrorHandler('Tweet not found', 404))
        res.status(404).json({
            message: 'Tweets not found'
        })
    }

    await tweet?.remove();

    res.status(200).json({
        success: true,
        message: 'The Tweet has been deleted.'
    })

})

export const starToggle = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const tweet: ITweet | null = await Tweet.findById(req?.params?.id);

    if (tweet?.stars?.includes(req?.member?.id)) {

        const index = tweet?.stars.indexOf(req?.member?.id);
        if (index > -1) {
            tweet?.stars.splice(index, 1);
        }
    } else {
        tweet?.stars?.push(req?.member?.id)
    }

    let tweetUpdated: ITweet | null = await Tweet.findByIdAndUpdate(req.params.id, tweet!, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    const updatatedTweets: Array<ITweet> = await Tweet.find().populate({ path: 'memberId', select: ['username', 'avatar'] })

    res.status(200).json({
        success: true,
        updatatedTweets
    })
})