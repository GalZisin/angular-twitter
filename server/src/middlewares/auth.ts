import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "./catchAsyncErrors";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Token from '../types/types'

//Check if user is authenticated or not
export const isAuthenticatedUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const token = req.cookies.tweeterToken || '';

    if (!token) {
        return next(new ErrorHandler('Login first to access this resources.', 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.member = decoded as Token;
    next();
});