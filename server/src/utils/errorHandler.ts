//Error Handler Class
class ErrorHandler extends Error {

    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor);
    }

}
export default ErrorHandler;



export class HttpError extends Error {
    httpCode: number | undefined;
    message: any;

    constructor(httpCode: number, message?: string) {
        super();
        if (httpCode)
            this.httpCode = httpCode;
        if (message)
            this.message = message;

        this.stack = new Error().stack;
    }
}

