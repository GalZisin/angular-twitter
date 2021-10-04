
import { throwError } from 'rxjs';

const handleError = (error: any) => {

    let errorMessage = '';
    // error.error instanceof ErrorEvent
    // if (error) {
    //     // client-side error
    //     errorMessage = `Error: ${error.error.message}`;
    // } else {

    //     // server-side error
    //     errorMessage = `Error Code: ${error?.status}\nMessage: ${error?.message}`;
    // }
    // // if (error.error.message !== "") {
    // //     errorMessage = `Error: ${error.error.message}`;
    // // }
    if (error) {
        errorMessage = error;
    }

    // console.log("errorMessage", errorMessage);
    // return throwError(errorMessage);
    return throwError(errorMessage);
}


export default handleError;