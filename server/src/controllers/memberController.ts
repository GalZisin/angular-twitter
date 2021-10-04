import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import ErrorHandler from "../utils/errorHandler";
import Member from "../models/member";
import Tweet from "../models/tweet";


// GET: /members/:id
export const getMember = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    // console.log(" req.params.id", req.params.id)
    let memberObj;
    if (req?.params?.id) {
        memberObj = await Member.findById(req.params.id);
    } else if (req?.member?.id) {
        memberObj = await Member.findById(req.member.id);
    }

    if (!memberObj) {
        // return next(new ErrorHandler('Member not found', 404));
        res.status(404).json({
            success: true,
            message: 'Member not found'
        })
    }

    const member = {
        memberId: memberObj?._id,
        username: memberObj?.username,
        imagePath: memberObj?.imagePath,
        registrationDate: memberObj?.registrationDate,
        lastLoginDate: memberObj?.lastLoginDate
    }
    res.status(200).json({
        success: true,
        member

    })
})

// GET: /members/:id/tweets
export const getMemberTweetsById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const memberId = req?.params?.id;

    // const filterByMemberId: any = { "member": { "$in": memberId } }
    // const tweets = await Tweet.find(filterByMemberId);

    const tweets = await Tweet.where({ memberId: memberId }).populate({ path: 'memberId', select: ['username'] })
    res.status(200).json({
        success: true,
        tweets
    })
})