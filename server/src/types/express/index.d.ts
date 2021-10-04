import { JwtPayload } from "jsonwebtoken";
declare global {
    namespace Express {
        interface Request {
            member?: JwtPayload | null;
            file?: File
        }
    }
}
