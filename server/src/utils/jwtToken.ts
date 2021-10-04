import { Response } from "express";
import IMember from '../types/types'

//Create and send token and save in the cookie
const sendToken = (memberObj: IMember, statusCode: number, res: Response) => {

    //Create Jwt token
    const token = memberObj.getJwtToken();
    //Option for cookie
    const options = {
        expires:
            new Date(
                <any>Date.now + <any>process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
            ),
        httpOnly: true //cant access by js code
    }

    const member = {
        memberId: memberObj._id,
        username: memberObj.username,
        imagePath: memberObj.imagePath,
        registrationDate: memberObj.registrationDate,
        lastLoginDate: memberObj.lastLoginDate
    }
    res.status(statusCode).cookie('tweeterToken', token, options).json({
        success: true,
        token,
        member
    })

}

export default sendToken;