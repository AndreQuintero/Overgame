import {Response} from '@angular/http';
import { Observable, throwError } from 'rxjs';

export class ErrorHandler {

    static handleError(error: Response | any) {
        let errorMessage: string;
        console.log(errorMessage);
        if (error instanceof Response) {
            errorMessage = `Erro ${error.status} ao obter a URL ${error.url} - ${error.statusText}}`;
        } else {
            errorMessage = error.toString();
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    static onError(res: Response) {
        const statusCode = res.status;
        const body = res.json();
        const error = {
          statusCode: statusCode,
          error: body.error
        };
        console.log(error);
        return throwError(error);
      }
}
